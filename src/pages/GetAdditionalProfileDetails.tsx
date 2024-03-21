import { IonButton, IonCard, IonCardContent, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonList, IonNavLink, IonPage, IonRow, IonSegment, IonSegmentButton, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';

import './GetStarted.css';
import { Geolocation } from '@capacitor/geolocation';
import React, { useState, FormEvent, useEffect } from 'react';
import { useLocation, useHistory, HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Geocode from 'react-geocode';
import ReactGA from 'react-ga4';
import AppLandingPage from './AppLandingPage';
import { IonReactRouter } from '@ionic/react-router';

function GetAdditionalProfileDetails () {
    const [gender, setGender] = React.useState<any>('');
    const [ageChecked, setChecked] = React.useState(false);
    const [redirectToApp, setRedirectToApp] = React.useState(false);
    let history = useHistory();

    async function submitProfileInfo() {
        ReactGA.event({
            category: "FirstTimeUserSubmitProfile",
            action: "FirstTimeUserSubmitProfile",
          });
        console.log(gender);
        console.log(ageChecked);
        const temp_session = JSON.parse(localStorage.getItem('temp_session') || "");
        console.log('temp_session', temp_session);

        const postRequestBody = {
            email: temp_session.email,
            name: temp_session.name,
            gender: gender,
            imageUrl: temp_session.imageUrl
        };
        //const postResponse = await axios.post(import.meta.env.VITE_APP_API, postRequestBody);
        axios.post(import.meta.env.VITE_APP_API + '/user', postRequestBody).then((response) => {
            console.log(response);
            const newSession = {
                created: new Date().getTime(),
                token: response.data.email,
                userId: response.data.id,
                gender: response.data.gender,
                imageUrl: temp_session.imageUrl,
                name: temp_session.name
            }
    
            const userInfo = {
                session: newSession,
            }
            console.log("userInfo: ");
            console.log(userInfo);
            localStorage.removeItem("session");
            localStorage.removeItem("temp_session");
            localStorage.setItem("session", JSON.stringify(newSession) );
            setRedirectToApp(true);
            //history.push(`/App`, { data: userInfo });

          })
          .catch((reason) => {
            if (reason.response.status === 400) {
              // Handle 400
            } else {
              // Handle else
            }
            console.log(reason.message)
          }) 
    }
    return (
        

        <IonPage>
            {
            redirectToApp ? <><IonReactRouter><Switch><Redirect to={{ pathname: '/App' }} /><Route path="/App" component={AppLandingPage} /> </Switch></IonReactRouter></>: null
            }
            <div className="centerFeed">
            <IonCard>
                <IonCardContent>
                Gender<hr/>
                <IonSegment mode="ios" value={gender} onIonChange={e => setGender(e.detail.value )}>
                                            <IonSegmentButton value="M">
                                                <IonLabel class="segmentLabel">Male</IonLabel>
                                            </IonSegmentButton>
                                            <IonSegmentButton value="F">
                                                <IonLabel class="segmentLabel">Female</IonLabel>
                                            </IonSegmentButton>
                                            <IonSegmentButton value="O">
                                                <IonLabel class="segmentLabel">Other</IonLabel>
                                            </IonSegmentButton>
                                        </IonSegment>
                                        <hr/><hr/>
                                        <IonCheckbox labelPlacement="end" onIonChange={e => setChecked(e.detail.checked)}>I am 18 years old or over</IonCheckbox>
                                        {/* <IonCheckbox color="primary" onIonChange={e => setChecked(e.detail.checked)}></IonCheckbox>I am 18 years old or over */}
                                        <hr/>
                                        {
                            gender != '' && ageChecked ?
                                <IonButton color="tertiary" size="small" onClick={submitProfileInfo} >Submit</IonButton>
                             : <IonButton disabled={true} color="tertiary" size="small" onClick={submitProfileInfo} >Submit</IonButton>
                        }
                </IonCardContent>
            </IonCard>
            </div>
            {/* <IonGrid>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="stacked">Gender</IonLabel>
                            <IonSelect interface="popover" placeholder="Select Gender" onIonChange={e => setGender(e.detail.value)}>
                                <IonSelectOption value="F">Woman</IonSelectOption>
                                <IonSelectOption value="M">Man</IonSelectOption>
                                <IonSelectOption value="T">Transgender</IonSelectOption>
                                <IonSelectOption value="NB">Non-binary/non-conforming</IonSelectOption>
                                <IonSelectOption value="PNTR">Prefer not to respond</IonSelectOption>
                            </IonSelect>

                        </IonItem>
                        <IonItem>
                            <IonCheckbox color="primary" onIonChange={e => setChecked(e.detail.checked)}></IonCheckbox>I am 18 years old or over
                        </IonItem>
                        {
                            gender != '' && ageChecked ? <IonItem>
                                <IonButton onClick={submitProfileInfo} >Submit</IonButton>
                            </IonItem> : null
                        }


                    </IonCol>
                </IonRow>
            </IonGrid>
            <IonGrid> */}
                


        </IonPage>
    );
};

export default GetAdditionalProfileDetails;
