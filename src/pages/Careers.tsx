import React from 'react';
import { IonButton, IonButtons, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonMenu, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import AppDownloadWidget from './AppDownloadWidget';
import { arrowForwardCircle, arrowForwardCircleOutline, logoInstagram, logoLinkedin, logoYoutube } from 'ionicons/icons';
import ReactGA from 'react-ga4';
import HeaderBackBar from './HeaderBackBar';
function Careers() {
    return (
        <>
        <IonPage  id="main-content">
           
                <IonContent>
                <HeaderBackBar></HeaderBackBar>

                    
                <hr/><hr/><IonLabel > <span className="sorryNoJob"> Sorry, no job openings at the moment.</span></IonLabel><hr/>
                <IonLabel ><p className="weAreOpen">We open new jobs from time to time, so please check again soon!</p></IonLabel>


                </IonContent>
            </IonPage>
        </>
    );
}
export default Careers;


