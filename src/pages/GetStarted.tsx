import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, useIonViewWillEnter, IonImg, IonInput, IonItem, IonLabel, IonModal, IonNavLink, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import React, { useState, FormEvent, useEffect, CSSProperties } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from 'swiper';

import axios, { AxiosError, AxiosResponse } from 'axios';
import { HashRouter, Link, Redirect, Route, Switch, useHistory } from 'react-router-dom';


import './GetStarted.css';
import UserActivity from './UserActivity';
import AppLandingPage from './AppLandingPage';
import Messaging from './Messaging';
import App from '../App';
import MatchRequest from './MatchRequest';
import Post from './Events';
import CarPoolingGuidelines from './CarpoolingGuidelines';
import SafetyGuidelines from './SafetyGuidelines';
import SupportDetails from './SupportDetails';
import TermsAndPolicy from './TermsAndPolicy';
import GetRideFeedback from './GetRideFeedback';
import GetAdditionalProfileDetails from './GetAdditionalProfileDetails';
import ReactGA from 'react-ga4';
import SelectCarpoolCategory from './SelectCarpoolCategory';
import { IonReactRouter } from '@ionic/react-router';

export interface UserSession {
    created: number,
    token: string
}


const session_key = 'user-session';
const path_to_component = {
    'userActivity': 'UserActivity'

}

function GetStarted() {

    //const [userData, setUserData] = useState({});
    let history = useHistory();
    const [redirectUrl, setRedirectUrl] = React.useState("");
    const [sessionExists, setSessionExists] = React.useState(false);
    const [feedbackReceived, setFeedbackReceived] = React.useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [showTermsOfUser, setShowTermsOfUse] = React.useState(false);


    window.addEventListener('ionModalDidDismiss', (event) => {
        setIsOpen(false);
    });

    function openTermsOfUse() {
        setShowTermsOfUse(true);
        setIsOpen(true);
    }

    
    // useIonViewWillEnter(() => {
        
    // });


    useEffect(() => {
        ReactGA.send({ hitType: "pageview", page: "/GetStarted", title: "GetStarted" });
        // console.log('Get Started Use Effect called' + import.meta.env.VITE_APP_API);
        if (localStorage.getItem('redirected_from') != null) {
            console.log(localStorage.getItem('redirected_from'));
            // history.push('/userActivity');
        }
        // On screen load, check if the session already exists, if yes, then go to the feedpage
        GoogleAuth.initialize({
            clientId: '379793457253-quhbedbbmb57amflg3asqkgtunted6kd.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
            grantOfflineAccess: true,
        });

        if (localStorage.getItem('session')) {
            setRedirectUrl('App');
            setSessionExists(true);
        }
    }, []);


    async function signIn(): Promise<void> {
        ReactGA.event({
            category: "SignIN",
            action: "SignInWithGoogle",
          });
        const response = await GoogleAuth.signIn();
        console.log(response);

        let familyName = response.familyName;
        if (response.familyName == undefined || response.familyName == '') {
            familyName = '';
        }
        const name = response.givenName + ' ' + familyName;
        const postRequestBody = {
            email: response.email,
            name: name,
            gender: '',
            imageUrl: response.imageUrl
        };
        axios.get(import.meta.env.VITE_APP_API + '/user/email?email=' + response.email)
            .then((axiosResponse: AxiosResponse) => {
                ReactGA.event({
                    category: "existinguser",
                    action: "ExistingUserSignIn",
                  });
                const newSession = {
                    created: new Date().getTime(),
                    token: response.email,
                    userId: axiosResponse.data.id,
                    gender: axiosResponse.data.gender,
                    imageUrl: axiosResponse.data.imageUrl,
                    name: axiosResponse.data.name
                }
                localStorage.removeItem("session");
                localStorage.setItem("session", JSON.stringify(newSession));

                const userInfo = {
                    session: newSession,
                }

                console.log('reached here');

                if (localStorage.getItem('redirected_from') != null) {
                    console.log('redireced_from');
                    // This means that user tried to access another link and the session wasn't found
                    // the user was redirected to login page.
                    const url = localStorage.getItem('redirected_from');
                    console.log("redirected_from not empty redirecting to - ", url);
                    setRedirectUrl(url || "");
                } else {
                    axios.get(import.meta.env.VITE_APP_API + '/feedback?user_id=' + axiosResponse.data.id)
                    .then((axiosResponse1: AxiosResponse) => {
                        console.log('feedback call');

                        if (axiosResponse1.data.length > 0 ) {
                            console.log('feedback length >0');
                            ReactGA.event({
                                category: "feedback",
                                action: "RedirectedToRideFeedback",
                              });
                            setRedirectUrl('getRideFeedback');
                        } else {
                            console.log('redirect to App');
                            history.push('/scc')
                           setRedirectUrl('scc');
                        }
                    })
                    .catch((reason: AxiosError) => {
                        if (reason.response!.status === 404) {
                           // console.log("Got a 404 from get user profile via email. Get additonal profile info to persist a new user.", postRequestBody)
                        } else {
                            //console.log(reason.message)
                        }
                    })
                }
            })
            .catch((reason: AxiosError) => {
                if (reason.response!.status === 404) {
                    ReactGA.event({
                        category: "FirstTimeUser",
                        action: "FirstTimeUser",
                      });
                    console.log("Got a 404 from get user profile via email. Get additonal profile info to persist a new user.", postRequestBody)
                    localStorage.removeItem("temp_session");
                    localStorage.setItem("temp_session", JSON.stringify(postRequestBody));
                    setRedirectUrl('getAdditionalProfileDetails');
                } else {
                    console.log(reason.message)
                }
            })
    }

    return (

        <IonPage className="getstarted">
            {
                (() => {
                    switch (redirectUrl) {
                        case ('getAdditionalProfileDetails'): {
                            return (
                                <><IonReactRouter><Switch><Redirect to={{ pathname: '/getAdditionalProfileDetails' }} /><Route path="/getAdditionalProfileDetails" component={GetAdditionalProfileDetails} /> </Switch></IonReactRouter></>
                            )
                        }
                            break;
                        case ('userActivity'): {
                            return (
                                <><IonReactRouter><Switch><Redirect to={{ pathname: '/userActivity' }} /><Route path="/userActivity" component={UserActivity} /> </Switch></IonReactRouter></>
                            )
                        }
                            break;

                        case ('messaging'): {
                            return (
                                <><IonReactRouter><Switch><Redirect to={{ pathname: '/messaging' }} /><Route path="/messaging" component={Messaging} /> </Switch></IonReactRouter></>
                            )
                        }
                            break;

                        case ('App'): {
                            return (
                                <><IonReactRouter><Switch><Redirect to={{ pathname: '/App' }} /><Route path="/App" component={AppLandingPage} /> </Switch></IonReactRouter></>
                            )
                        }
                            break;

                        case ('pendingRequests'): {
                            return (
                                <><IonReactRouter><Switch><Redirect to={{ pathname: '/pendingRequests' }} /><Route path="/pendingRequests" component={MatchRequest} /> </Switch></IonReactRouter></>
                            )
                        }
                            break;

                        case ('scc'): {
                            return (
                                <><IonReactRouter><Switch><Redirect to={{ pathname: '/scc' }} /><Route path="/scc" component={SelectCarpoolCategory} /> </Switch></IonReactRouter></>
                            )
                        }
                            break;
                        case ('getRideFeedback'): {
                            return (
                                <><IonReactRouter><Switch><Redirect to={{ pathname: '/getRideFeedback' }} /><Route path="/getRideFeedback" component={GetRideFeedback} /> </Switch></IonReactRouter></>
                            )
                        }
                            break;
                        default: {
                            return (
                                null
                            )
                        }
                            break;
                    }
                })()
            }
             <>
    <Swiper  autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            
                pagination={true} modules={[Pagination, Autoplay]} >        
            <SwiperSlide className='customslide'>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="7">
                                <IonImg class="wagonimg" src="/assets/img/icon-without-bkg.png"></IonImg>
                                <IonText>
                                    <IonLabel className='maketingpage'>Sign in and connect with a social network of carpoolers around you!</IonLabel>
                                </IonText>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </SwiperSlide>


                <SwiperSlide className='customslide'>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="7">
                                <IonImg class="wagonimg" src="assets/img/icon-without-bkg.png"></IonImg>
                                <IonText>
                                <IonLabel className='maketingpage'>Attending an Event or a Game?</IonLabel>
                                </IonText>
                                <IonText class="maketingpageh2">
                                    <h2>Get a carpool now!</h2>
                                </IonText>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </SwiperSlide>

                {/* <SwiperSlide>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="7">
                                <IonImg class="wagonimg" src="assets/img/icon-without-bkg.png"></IonImg>
                                <IonText>
                                    <h1 className='maketingpage'>Planning to work from office?</h1>
                                </IonText>
                                <IonText class="maketingpageh2">
                                    <h2>Get a match with one of your colleagues!</h2>
                                </IonText>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </SwiperSlide> */}

                {/* <SwiperSlide>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="7">
                                <IonImg class="wagonimg" src="assets/img/icon-without-bkg.png"></IonImg>
                                <IonText>
                                    <h1 className='maketingpage'>Taking a Flight?</h1>
                                </IonText>
                                <IonText class="maketingpageh2">
                                    <h2 >Book an incredibly cheap ride to the airport!</h2>
                                </IonText>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </SwiperSlide> */}

                <SwiperSlide className='customslide'>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="7">
                                <IonImg class="wagonimg" src="assets/img/icon-without-bkg.png"></IonImg>
                                <IonText>
                                <IonLabel  className='maketingpage'>Drivers earn money and get free access to carpool lane!</IonLabel>
                                </IonText>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </SwiperSlide>

                <SwiperSlide className='customslide'>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="7">
                                <IonImg class="wagonimg" src="assets/img/icon-without-bkg.png"></IonImg>
                                <IonText>
                                <IonLabel  className='maketingpage'>Riders get an incredibly cheap ride!</IonLabel>
                                </IonText>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </SwiperSlide>


                <SwiperSlide className='customslide'>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="7">
                                <IonImg class="wagonimg" src="assets/img/icon-without-bkg.png"></IonImg>
                                <IonText>
                                <IonLabel className='maketingpage'>Choose Drive or Ride!</IonLabel>
                                </IonText>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </SwiperSlide>
            </Swiper></>
            {/* {
                sessionExists ? */}
            <IonGrid>
                <IonRow>
                    <IonCol size="7">
                        {/* <IonImg src="../assets/img/icon-with-text.png"></IonImg> */}
                        <IonLabel class="loginwithGoogle">
                            {/* <IonButton color="dark" href="/Login">Sign In</IonButton> */}
                            <IonButton className="login-button" onClick={() => signIn()} expand="block" fill="solid" color="tertiary">
                                Login with Google
                            </IonButton>
                        </IonLabel>
                        <div className="Terms">
                        By Signing in you accept our  
                        <a className="termsandpolicylink" target="_blank" href="/terms" >Terms of use </a> and <a className="termsandpolicylink" target="_blank" href="/privacy-policy">privacy policy</a> 
                        </div>
                    </IonCol>
                </IonRow>
            </IonGrid>

            <IonModal id="example-modal" isOpen={isOpen}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>
                            {
                                showTermsOfUser ? <>Terms & Privacy Policy</> : null
                            }

                        </IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent overflow-scroll>
                    {
                        showTermsOfUser ? <TermsAndPolicy></TermsAndPolicy> : null
                    }
                </IonContent>
            </IonModal>


        </IonPage>

    );
}

export default GetStarted;
