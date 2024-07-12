import React from 'react';
import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonMenu, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import AppDownloadWidget from './AppDownloadWidget';
import { arrowForwardCircle, arrowForwardCircleOutline, caretBack, logoInstagram, logoLinkedin, logoYoutube } from 'ionicons/icons';
import ReactGA from 'react-ga4';
function HeaderBackBar() {
    function goBack() {
        window.location.replace('/home');
    }

    return (
        <>
            
            {/* <IonPage id="main-content"> */}
                <>
                <IonHeader>
                        <IonToolbar>
                            <IonTitle>
                            </IonTitle>
                            <IonButtons slot="start"><IonButton color="success" shape="round" fill="outline" onClick={goBack}> <IonIcon icon={caretBack}></IonIcon>back </IonButton></IonButtons>
                        </IonToolbar>
                    </IonHeader>
                </>
            {/* </IonPage> */}
        </>
    );
}
export default HeaderBackBar;


