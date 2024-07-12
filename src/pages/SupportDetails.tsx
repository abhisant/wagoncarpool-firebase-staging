import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import HeaderBackBar from './HeaderBackBar';

function SupportDetails() {


    return (
        <IonPage>
        
            <IonContent>
            <HeaderBackBar></HeaderBackBar>
                <IonList>
                    <h2 className="carpoolingguidelinesmargin">support@wagoncarpool.com</h2>
                    <IonItem className="item-text-wrap">
                        <ul>
                            <li>Please reachout to "support@wagoncarpool.com" for any support needed. Someone from our team will look into the matter and reachout to you within 48 hours.</li>
                        </ul>
                    </IonItem>

                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default SupportDetails;
