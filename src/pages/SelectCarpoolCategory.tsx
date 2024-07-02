import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonMenu, IonMenuButton, IonModal, IonNavLink, IonPage, IonRow, IonSelect, IonSelectOption, IonSpinner, IonSplitPane, IonText, IonTextarea, IonTitle, IonToolbar, useIonLoading, useIonViewDidEnter } from '@ionic/react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { basketball, car, carOutline, codeWorkingOutline, codeWorkingSharp, desktop, football, laptop, location, logoApple, menu, musicalNote, musicalNoteSharp, shirtOutline } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';
import { Redirect, useHistory, Route, HashRouter, Switch } from 'react-router-dom';
import GetStarted from './GetStarted';

import './GetStarted.css';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import SwiperComponent from './SwiperComponent';
import ReactGA from 'react-ga4';
import { Rating } from 'react-simple-star-rating';
import WagonCarpoolIntro from './WagonCarpoolIntro';
import WagonCarpoolWorks from './WagonCarpoolWorks';
import WhyWagonCarpool from './WhyWagonCarpool';
import AppLandingPage from './AppLandingPage';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import SocialMediaFooter from './SocialMediaFooter';
import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import AppDownloadWidget from './AppDownloadWidget';
import { IonReactRouter } from '@ionic/react-router';
import BlogSection from './BlogSection';


const SelectCarpoolCategory = () => {
    let history = useHistory();
    const [loading, setLoading] = useState(true);
    const [loginLoading, setLoginLoading] = useState(false);
    const [feedbackDetails, setfeedbackDetails] = React.useState<any[]>([]);
    const [rating, setRating] = useState(0);
    // const [forceDismissFeedbackModal, setForceDismissFeedbackModal] = useState(false);
    const [errorLogs, setErrorLogs] = useState('');
    const [loggedinUserId, setLoggedInUserId] = React.useState(0);
    const [sessionExists, setSessionExists] = React.useState(false);
    const [redirectToUserActivity, setRedirectToUserActivity] = React.useState(false);
    const [identifyIOSApp, setIdentifyIOSApp] = React.useState(false);
    const [identifyAndroidApp, setIdentifyAndroidApp] = React.useState(false);


    let globalSessionObj: any;
    // let forceDismissFeedBackModal = false;

    function carpoolingForAirport() {
        ReactGA.event({
            category: "UserSelectsCarpoolForAirport",
            action: "UserSelectsCarpoolForAirport",
        });
        localStorage.setItem("carpool_category", 'airport');
        window.location.replace('/carpoolForAirport');
    }

    function carpoolingForWork() {
        ReactGA.event({
            category: "UserSelectsCarpoolForWork",
            action: "UserSelectsCarpoolForWork",
        });
        localStorage.setItem("carpool_category", 'work');
        window.location.replace('/carpoolForWork');
    }

    function carpoolingForEvents() {
        ReactGA.event({
            category: "UserSelectsCarpoolForEvents",
            action: "UserSelectsCarpoolForEvents",
        });
        localStorage.setItem("carpool_category", 'events');
        // history.push("/carpoolForEvents");
        window.location.replace('/carpoolForEvents');

    }

    function loadFeedbackDetails() {
        if (localStorage.getItem('session') == null) {
            setSessionExists(false);
            return;
        }
        globalSessionObj = JSON.parse(localStorage.getItem('session') || "");
        if (globalSessionObj == undefined || globalSessionObj.wagon_token == null || globalSessionObj.wagon_token == '') {
            setSessionExists(false);
            return;
        }
        axios.get(import.meta.env.VITE_APP_API_V2 + '/feedback', { headers: { 'Authorization': globalSessionObj.wagon_token } })
            .then((axiosResponse1: AxiosResponse) => {
                console.log('***feedback....GET DONE1');
                setLoading(false);
                if (axiosResponse1.data.length == 0) {
                    setfeedbackDetails([]);
                    // setForceDismissFeedbackModal(true);
                }
                else {
                    setfeedbackDetails(axiosResponse1.data);
                }
            })
            .catch((reason: AxiosError) => {
                console.log('feedback....GET CATCH');
                setLoading(false);
                // setForceDismissFeedbackModal(true);
                setfeedbackDetails([]);
                // forceDismissFeedBackModal = true;
                // setRating(0);
                if (reason.response!.status === 404) {
                    // console.log("Got a 404 from get user profile via email. Get additonal profile info to persist a new user.", postRequestBody)
                } else {
                    //console.log(reason.message)
                }
            })
    }

    function tookRide(item: any, index: number) {
        if (localStorage.getItem('session') == null) {
            setSessionExists(false);
            return;
        }
        globalSessionObj = JSON.parse(localStorage.getItem('session') || "");
        if (globalSessionObj == undefined || globalSessionObj.wagon_token == null || globalSessionObj.wagon_token == '') {
            setSessionExists(false);
            return;
        }
        if (rating == 0) {
            setErrorLogs('Please provide the rating');
            return;
        }

        axios.post(import.meta.env.VITE_APP_API_V2 + '/feedback?' + 'ride_match_id=' + item.rideMatchId + "&was_completed=true" + '&rating=' + rating, {}, { headers: { 'Authorization': globalSessionObj.wagon_token } })
            .then((axiosResponse1: AxiosResponse) => {
                ReactGA.event({
                    category: "user_feedback_took_ride",
                    action: "user_feedback_took_ride",
                });
                setRating(0);
                console.log(axiosResponse1.data);
                loadFeedbackDetails();
            })
            .catch((reason: AxiosError) => {
                setfeedbackDetails([]);
                ReactGA.event({
                    category: "user_feedback_save_failed",
                    action: "user_feedback_save_failed",
                });
            })
    }

    function didntTakeRide(item: any) {
        if (localStorage.getItem('session') == null) {
            setSessionExists(false);
            return;
        }
        globalSessionObj = JSON.parse(localStorage.getItem('session') || "");
        if (globalSessionObj == undefined || globalSessionObj.wagon_token == null || globalSessionObj.wagon_token == '') {
            setSessionExists(false);
            return;
        }
        axios.post(import.meta.env.VITE_APP_API_V2 + '/feedback?' + 'ride_match_id=' + item.rideMatchId + "&was_completed=false" + '&rating=' + rating, {}, { headers: { 'Authorization': globalSessionObj.wagon_token } })
            .then((axiosResponse1: AxiosResponse) => {
                ReactGA.event({
                    category: "user_feedback_didnt_take_ride",
                    action: "user_feedback_didnt_take_ride",
                });
                console.log(axiosResponse1.data);
                setRating(0);
                loadFeedbackDetails();
            })
            .catch((reason: AxiosError) => {
                setfeedbackDetails([]);
                ReactGA.event({
                    category: "user_feedback_save_failed",
                    action: "user_feedback_save_failed",
                });
            })
    }

    const handleRating = (rate: any, index: number) => {
        // let tempRating = rating;
        // tempRating[index] = rate;
        console.log(rate);
        setRating(rate);
    }

    function init() {
        if (Capacitor.isNativePlatform()) {
            if (Capacitor.getPlatform() == 'ios') {
                localStorage.setItem('platform', 'ios');
                setIdentifyIOSApp(true);
            }
            if (Capacitor.getPlatform() == 'android') {
                setIdentifyAndroidApp(true);
                localStorage.setItem('platform', 'android');
            }
        } else {
            localStorage.setItem('platform', 'web');
        }
        ReactGA.send({ hitType: "pageview", page: "/select-carpool-category", title: "Select Carpool Category" });
        let urlParams = new URLSearchParams(window.location.href);
        if (urlParams.get('es') !== null) {
            console.log('globalEntrySource= ' + urlParams.get('es'));
            localStorage.setItem("entry_source", urlParams.get('es') || '');

            ReactGA.event({
                category: "entry_source=" + urlParams.get('es') || '',
                action: "entry_source=" + urlParams.get('es') || '',
            });
            if (urlParams.get('cid') !== null) {
                ReactGA.event({
                    category: "campaign_id=" + urlParams.get('cid') || '',
                    action: "campaign_id=" + urlParams.get('cid') || '',
                });
            }
        } else {
            localStorage.setItem("entry_source", 'organic');
            console.log('organic');
            ReactGA.event({
                category: "entry_source=organic",
                action: "entry_source=organic",
            });
        }
        const sessionObj = localStorage.getItem('session');
        if (sessionObj != null && JSON.parse(localStorage.getItem('session') || "").wagon_token != null && JSON.parse(localStorage.getItem('session') || "").wagon_token != '') {
            globalSessionObj = JSON.parse(localStorage.getItem('session') || "");
            axios.get(import.meta.env.VITE_APP_API_V2 + '/user', { headers: { 'Authorization': globalSessionObj.wagon_token } })
                .then(async (axiosResponse: AxiosResponse) => {
                    ReactGA.event({
                        category: "session_active_token_valid",
                        action: "session_active_token_valid",
                    });
                    setSessionExists(true);
                    loadFeedbackDetails();
                })
                .catch((reason: AxiosError) => {
                    console.log('test', reason?.status);
                    console.log('test', reason?.message);
                    if (reason.response?.status === 401 || reason.response?.status === undefined) {
                        setSessionExists(false);
                        setLoading(false);
                        return;
                    }

                })
        } else {
            setSessionExists(false);
            setLoading(false);
        }
    }

    useEffect(() => {
        GoogleAuth.initialize({
            clientId: '379793457253-quhbedbbmb57amflg3asqkgtunted6kd.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
            grantOfflineAccess: true,
        });
        init();

        if (localStorage.getItem('session') == null) {
            setSessionExists(false);
            return;
        }
        globalSessionObj = JSON.parse(localStorage.getItem('session') || "");
        if (globalSessionObj == undefined || globalSessionObj.wagon_token == null || globalSessionObj.wagon_token == '') {
            setSessionExists(false);
            return;
        }

        let clientType = 'web';

        if (Capacitor.isNativePlatform()) {
            if (Capacitor.getPlatform() == 'ios') {
                clientType = 'ios';
            }
            if (Capacitor.getPlatform() == 'android') {
                clientType = 'android';
            }
        }
        let utm = '';
        let urlParams = new URLSearchParams(window.location.href);
        if (urlParams.get('es') !== null) {
            utm = urlParams.get('es') || '';
            localStorage.setItem("entry_source", urlParams.get('es') || '');

        } else {
            utm = 'organic'
            localStorage.setItem("entry_source", 'organic');
        }

        axios.post(import.meta.env.VITE_APP_API_V2 + '/user/visit?ct=' + clientType + '&utm=' + utm, {}, { headers: { 'Authorization': globalSessionObj.wagon_token } }).then(async (response) => {
            console.log('User Visits success');
        }).catch((reason) => {
            console.log('User Visits Failed');
        })
    }, []);

    useIonViewDidEnter(() => {
        init();
    });


    function googleMapsAddressRedirection(startAdd: any, destAdd: any) {
        ReactGA.event({
            category: "Redirect",
            action: "GoogleMapsButtonClicked",
        });
        window.open('https://www.google.com/maps/dir/' + startAdd + "/" + destAdd);
    }

    async function signIn(): Promise<void> {
        const response = await GoogleAuth.signIn();
        setLoginLoading(true);


        axios.post(import.meta.env.VITE_APP_API_V2 + '/user/token?idToken=' + response.authentication.idToken).then(async (response) => {
            setLoginLoading(false);
            console.log(response);
            const newSession = {
                created: new Date().getTime(),
                token: response.data.email,
                userId: response.data.id,
                gender: response.data.gender,
                imageUrl: response.data.imageUrl,
                name: response.data.name,
                wagon_token: response.data.token,
            }

            localStorage.removeItem("session");
            localStorage.removeItem("temp_session");
            localStorage.setItem("session", JSON.stringify(newSession));
            globalSessionObj = newSession;
            setSessionExists(true);
            if (Capacitor.isNativePlatform()) {
                let permStatus = await PushNotifications.checkPermissions();
                if (permStatus.receive === 'prompt') {
                    permStatus = await PushNotifications.requestPermissions();
                }
                if (permStatus.receive !== 'granted') {
                    console.log('User Denied Push Notifications');
                    throw new Error('User denied permissions!');
                }
                await PushNotifications.register();
            }
            loadFeedbackDetails();

            let clientType = 'web';

            if (Capacitor.isNativePlatform()) {
                if (Capacitor.getPlatform() == 'ios') {
                    clientType = 'ios';
                }
                if (Capacitor.getPlatform() == 'android') {
                    clientType = 'android';
                }
            }
            let utm = '';
            let urlParams = new URLSearchParams(window.location.href);
            if (urlParams.get('es') !== null) {
                utm = urlParams.get('es') || '';

            } else {
                utm = 'organic'
            }

            axios.post(import.meta.env.VITE_APP_API_V2 + '/user/visit?ct=' + clientType + '&utm=' + (localStorage.getItem('entry_source') || 'organic'), {}, { headers: { 'Authorization': response.data.token } }).then(async (response) => {
                console.log('User Visits success');
            }).catch((reason) => {
                console.log('User Visits Failed');
            })
        }).catch((reason) => {
            setLoginLoading(false);
            console.log(reason.message)
        })
    }

    function myRidesClicked() {
        //history.push('App');
        window.location.replace('/App');
    }


    return (
        <>
            <IonPage>
                <IonContent>
                    {
                        loading ? <IonLabel className="centerLabel"><IonSpinner color="primary"></IonSpinner></IonLabel>
                            : null
                    }
                    {
                        redirectToUserActivity ? <><IonReactRouter><Switch><Redirect to={{ pathname: '/App' }} /><Route path="/App" component={AppLandingPage} /> </Switch></IonReactRouter></> : null
                    }
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle><div className="ion-text-wrap">
                                {
                                    sessionExists ?
                                        localStorage.getItem('session') != null ? <><IonButton size="small" onClick={() => { myRidesClicked() }} color="success" fill="outline" className="filterButtonInPoolPage">My Rides</IonButton><IonLabel><img className="feedItemImg" src={JSON.parse(localStorage.getItem('session') || "").imageUrl == null ? "assets/img/avatar.svg" : JSON.parse(localStorage.getItem('session') || "").imageUrl} alt="" referrerPolicy='no-referrer' /> {JSON.parse(localStorage.getItem('session') || "").name} </IonLabel></> : null
                                        :
                                        loginLoading ?
                                            <IonButton disabled size="small" onClick={() => signIn()} color="success" fill="outline" className="homePageLoginWithGoogle">Login With Google
                                                <IonSpinner className="smallspinner" color="primary"></IonSpinner> </IonButton>
                                            :
                                            <IonButton size="small" onClick={() => signIn()} color="success" fill="outline" className="homePageLoginWithGoogle">Login With Google </IonButton>
                                } </div></IonTitle>

                        </IonToolbar>
                    </IonHeader>
                    {/* {
                        <IonCard>
                            <IonCardContent >
                                {
                                    identifyIOSApp ? <div className="topBarHomePage"></div> : null
                                }
                                {
                                    sessionExists ?
                                        localStorage.getItem('session') != null ? <><IonButton size="small" onClick={() => { myRidesClicked() }} color="success" fill="outline" className="filterButtonInPoolPage">My Rides</IonButton><IonLabel><img className="feedItemImg" src={JSON.parse(localStorage.getItem('session') || "").imageUrl == null ? "assets/img/avatar.svg" : JSON.parse(localStorage.getItem('session') || "").imageUrl} alt="" referrerPolicy='no-referrer' /> {JSON.parse(localStorage.getItem('session') || "").name} </IonLabel></> : null
                                        :
                                        loginLoading ?
                                            <IonButton disabled size="small" onClick={() => signIn()} color="success" fill="outline" className="homePageLoginWithGoogle">Login With Google
                                                <IonSpinner className="smallspinner" color="primary"></IonSpinner> </IonButton>
                                            :
                                            <IonButton size="small" onClick={() => signIn()} color="success" fill="outline" className="homePageLoginWithGoogle">Login With Google </IonButton>
                                }
                            </IonCardContent>
                        </IonCard>
                    } */}
                    {/* {
                        !loading ?
                            <IonCard className="swiperCard">
                                <SwiperComponent></SwiperComponent>
                            </IonCard> : null

                    } */}

                    {
                        !loading ?
                            <>
                                <IonGrid>
                                    <div className="row2">
                                    <IonRow >
                                            <IonLabel className="CheapestRidesTo" ><IonLabel color="success">  Create a Ride</IonLabel><IonLabel> </IonLabel> </IonLabel> <hr />
                                        </IonRow>
                                        <IonRow>

                                            <IonCol size="6" size-sm="3">
                                                <div onClick={carpoolingForWork} className="containerHome">
                                                    <img className="actionImage" src="assets/img/work-art.jpeg"></img>
                                                    <IonButton color="dark" fill="outline" shape="round" size="small" className='actionButtonsHome'>Work Commute</IonButton>
                                                </div>
                                            </IonCol>

                                            <IonCol size="6" size-sm="3">
                                                <div onClick={carpoolingForAirport} className="containerHome">
                                                    <img className="actionImage" src="assets/img/airport-art.jpeg"></img>
                                                    <IonButton color="dark" fill="outline" shape="round" size="small" className='actionButtonsHome'>Airport Drop off</IonButton>
                                                </div>
                                            </IonCol>
                                            <IonCol size="6" size-sm="3">
                                                <div onClick={carpoolingForEvents} className="containerHome">
                                                    <img className="actionImage" src="assets/img/event-art.jpeg"></img>
                                                    <IonButton color="dark" fill="outline" shape="round" size="small" className='actionButtonsHome'>Events & Games</IonButton>
                                                </div>
                                            </IonCol>
                                            <IonCol size="6" size-sm="3">
                                                <div className="containerHome">
                                                    <img className="actionImage" src="assets/img/intercity-art.jpeg"></img>
                                                    <IonButton color="dark" fill="outline" disabled shape="round" size="small" className='actionButtonsHome'>Intercity Trips (Coming soon) </IonButton>
                                                </div>
                                            </IonCol>
                                        </IonRow>

                                        

                                    </div>
                                </IonGrid>
                                {/* <br/> */}

                                <IonGrid>
                                    <div className="howWagonCarpoolWorks">
                                    <IonRow >
                                            <IonLabel className="CheapestRidesTo" ><IonLabel color="success">  How Wagon Carpool Works</IonLabel><IonLabel> </IonLabel> </IonLabel> <hr />
                                        </IonRow>
                                        <IonRow>

                                            <IonCol size="6" size-sm="3">
                                                <div onClick={carpoolingForWork} className="rowSCC">
                                                    Create a Ride
                                                    {/* <img className="actionImage" src="assets/img/work-art.jpeg"></img> */}
                                                    {/* <IonButton color="dark" fill="outline" shape="round" size="small" className='actionButtonsHome'>Work Commute</IonButton> */}
                                                </div>
                                            </IonCol>

                                            <IonCol size="6" size-sm="3">
                                                <div onClick={carpoolingForAirport} className="rowSCC">
                                                    Find users with matching rides and send them match request and wait for them to accept your request.

                                                </div>
                                            </IonCol>

                                            <IonCol size="6" size-sm="3">
                                                <div onClick={carpoolingForAirport} className="rowSCC">
                                                    Or, wait for other users to send a match request and then accept their request.

                                                </div>
                                            </IonCol>
                                            <IonCol size="6" size-sm="3">
                                                <div onClick={carpoolingForEvents} className="rowSCC">
                                                    Your ride match is complete. Now you can message your matched carpool partner for any change of plans or additional details.

                                                </div>
                                            </IonCol>
                                            <IonCol size="6" size-sm="3">
                                                <div className="rowSCC">
                                                    Read community guidelines and be a good carpooler, read the safety guidelines and be safe.
                                                </div>
                                            </IonCol>
                                            <IonCol size="6" size-sm="3">
                                                <div className="rowSCC">
                                                    Make the ride happen, don't forget to pay if you are the rider before you are dropped off.

                                                </div>
                                            </IonCol>
                                            <IonCol size="6" size-sm="3">
                                                <div className="rowSCC">
                                                    Come back on the app to provide feedback on your ride experience. This is what creates a trust worthy community.

                                                </div>

                                            </IonCol>
                                            <IonCol size="6" size-sm="3">
                                                <div className="rowSCC">
                                                    Rinse and repeat.


                                                </div>

                                            </IonCol>
                                        </IonRow>



                                    </div>
                                </IonGrid>
                                {/* <IonCard >
                                    <IonCardContent>
                                        <IonLabel color="success" className='mediumfont' >Create a Ride
                                        </IonLabel>
                                    </IonCardContent>
                                </IonCard>


                                <IonCard className="cursorPointer">

                                    <br />
                                    <div className="imagecenter">
                                        <img className="selectCategoryImage" onClick={carpoolingForEvents} src="assets/img/events.jpeg" />
                                        <img className="selectCategoryImage" onClick={carpoolingForWork} src="assets/img/work.jpeg" />
                                        <img className="selectCategoryImage" onClick={carpoolingForAirport} src="assets/img/airport.jpeg" />
                                    </div>
                                    <br />
                                    <div className="imagecenter">
                                        <IonLabel color="success" onClick={carpoolingForEvents} className='selectCategoryText'><IonButton className="frontPageButtons" size="small" shape='round' color="success" fill="outline">Events & Games</IonButton></IonLabel>
                                        <IonLabel color="success" onClick={carpoolingForWork} className='selectCategoryText'><IonButton className="frontPageButtons" size="small" shape="round" color="success" fill="outline">Work Commute </IonButton></IonLabel>
                                        <IonLabel color="success" onClick={carpoolingForAirport} className='selectCategoryText'><IonButton className="frontPageButtons" size="small" shape="round" color="success" fill="outline">Airport Drop off </IonButton></IonLabel>
                                    </div>
                                    <br />
                                </IonCard>

                                {
                                    !identifyIOSApp && !identifyAndroidApp ? <><AppDownloadWidget></AppDownloadWidget></> : null
                                }

                                <WagonCarpoolIntro></WagonCarpoolIntro>
                                <WagonCarpoolWorks></WagonCarpoolWorks>
                                <WhyWagonCarpool></WhyWagonCarpool>
                                <BlogSection></BlogSection>
                                <SocialMediaFooter></SocialMediaFooter> */}
                            </>
                            : null
                    }
                    <hr />
                    <IonLabel className="footer">Copyright © 2024 Procsoft LLC.</IonLabel>
                    <IonLabel className="footer"> support@wagoncarpool.com</IonLabel><hr />
                    <IonLabel className="footer"><a className="termsandpolicylink" target="_blank" href="/terms" >Terms of use </a>  <a className="termsandpolicylink" target="_blank" href="privacy-policy">privacy policy</a></IonLabel><hr />

                </IonContent>
                <IonModal id="example-modal" isOpen={feedbackDetails.length > 0}>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Ride Feedback</IonTitle>
                            <IonButtons slot="end">
                                {/* <IonButton onClick={() => closeMenu()}><IonIcon color="danger" className="closeIcon" icon={closeCircle}></IonIcon></IonButton> */}
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">
                        {/* <div className="rideFeedbackMargin"> */}

                        <IonList>

                            {feedbackDetails.map((item, index) => (
                                <IonCard className="ioncardinamodal" key={index}>
                                    {
                                        index == 0 ?

                                            <IonCardContent>
                                                <IonLabel className="largefont" color="success">Ride Feedback 1 out of {feedbackDetails.length}</IonLabel><hr />
                                                <span >You had a trip with {item.otherUser.name} on {
                                                    new Date(item.userRide.departureTime).toLocaleString(
                                                        "en-US",
                                                        {
                                                            month: "short",
                                                            day: "2-digit",
                                                            year: "numeric",
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        }
                                                    )} {
                                                        item.otherUser.imageUrl == null ? <img className="feedbackImg" src="assets/img/avatar.svg" referrerPolicy='no-referrer' /> : <img className="feedbackImg" src={item.otherUser.imageUrl} alt="" referrerPolicy='no-referrer' />
                                                    }</span> <hr />
                                                <IonButton onClick={() => googleMapsAddressRedirection(item.userRide.startAddress, item.userRide.destinationAddress)} className="feedaddressbuttons" size="small" color="medium" fill="outline">{item.userRide.startAddress}<IonIcon slot="end" size="small" icon={location}></IonIcon></IonButton>
                                                <br></br>
                                                <IonButton onClick={() => googleMapsAddressRedirection(item.userRide.startAddress, item.userRide.destinationAddress)} className="feedaddressbuttons" size="small" fill="clear">To</IonButton><br></br>
                                                <IonButton onClick={() => googleMapsAddressRedirection(item.userRide.startAddress, item.userRide.destinationAddress)} className="feedaddressbuttons" size="small" color="medium" fill="outline">{item.userRide.destinationAddress}<IonIcon slot="end" size="small" icon={location}></IonIcon></IonButton>
                                                <hr />
                                                <p>Rate your trip!</p>
                                                <IonLabel color="light">
                                                    <Rating initialValue={rating || 0} transition={true} onClick={(event) => handleRating(event, index)} />

                                                    {/* <Rating  value={rating[index] || 0}
                        onChange={(event: number) => handleRating(event, index)} /> */}
                                                    {/* <Rating style={{ maxWidth: 200 }} value={rating[index] || 0} onChange={(event: number) => handleRating(event, index)} /> */}
                                                </IonLabel>  <hr />
                                                <span>Did you complete the trip? </span>
                                                <hr />

                                                <p> <IonButton color="success" onClick={() => tookRide(item, index)} className="feedbackbutton">Yes</IonButton>
                                                    <IonButton color="danger" onClick={() => didntTakeRide(item)} className="feedbackbutton">No</IonButton>
                                                </p>

                                                <hr />
                                                {
                                                    errorLogs != '' ? <IonItem className="errorLogs" text-wrap color="danger">{errorLogs}</IonItem> : null
                                                }
                                            </IonCardContent>
                                            : null
                                    }
                                </IonCard>
                            ))}
                        </IonList>
                        {/* </div> */}

                    </IonContent>
                </IonModal>

            </IonPage>
        </>
    );
};

export default SelectCarpoolCategory;

