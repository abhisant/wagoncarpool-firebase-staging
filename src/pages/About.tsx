import React from 'react';
import { IonButton, IonButtons, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonMenu, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import AppDownloadWidget from './AppDownloadWidget';
import { arrowForwardCircle, arrowForwardCircleOutline, logoInstagram, logoLinkedin, logoYoutube } from 'ionicons/icons';
import ReactGA from 'react-ga4';
import HeaderBackBar from './HeaderBackBar';
function About() {

    return (
        <>
            
            <IonPage id="main-content">
                <IonContent>
                    <HeaderBackBar></HeaderBackBar>
                <hr/><hr/>
                    <IonLabel >
                    <span className='sorryNoJob'> About Us</span>

                    </IonLabel> <hr/><hr/>

                    <IonLabel >
                        <p className='weAreOpen'>
                    Wagon Carpool is a platform built with a mission to connect carpoolers together to help reduce the costs of travel, reduce traffic on the roads and help the environment. 

We do not charge any fees for this service and hope to inculcate the culture of sharing in our user base. 
</p>


                    </IonLabel>




                </IonContent>
            </IonPage>
        </>
    );
}
export default About;


