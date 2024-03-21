import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonInput, IonLabel, IonNavLink, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';

import './GetStarted.css';

const Settings = () =>  {

    function handleChange() {

    }
    return (
        <IonPage>
            <IonGrid>
                <IonRow>
                    <IonCol size="7">
                        <IonImg src="../assets/img/icon.png"></IonImg>
                            <IonLabel>
                            <IonButton color="dark" href="/Login">Sign In</IonButton>
                            </IonLabel> 
                            By Signing in you accept our <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">Terms of use and Privacy Policy</a>
                            
                    </IonCol>
                </IonRow>
            </IonGrid>

        </IonPage>
    );
};

export default Settings;
