import React, { useState, useEffect } from 'react';
import { IonCard, IonCardContent, IonIcon, IonLabel } from '@ionic/react';
import { logoAppleAppstore, logoGooglePlaystore } from 'ionicons/icons';

const AppDownloadWidget = () => {
    function appStore() {
        window.open("https://apps.apple.com/us/app/wagon-carpool/id6478844608");
    }
    function playStore() {
    }
    return (
        <>
            {/* <IonCard >
                <IonCardContent>
                    <IonLabel color="success" className='mediumfont' >Apps Available Now
                    </IonLabel>
                </IonCardContent>
            </IonCard> */}
            <IonCard>
                <IonCardContent>
                <div className="imagecenter">
                <a target="_blank" href="https://apps.apple.com/us/app/wagon-carpool/id6478844608"><img className="appleStoreIcon" src="assets/img/Download-on-app-store.png"alt="bn45"/></a>
                {/* <a target="_blank" href=""> */}
                    <img className="googlePlayIcon" src="assets/img/google-play-badge.png"alt="bn45"/>
                    {/* </a> */}
                    {/* <IonLabel><IonIcon color="success" onClick={appStore} className="appsAvailable" icon={logoAppleAppstore} ></IonIcon></IonLabel>
                    <IonLabel><IonIcon color="success" onClick={playStore} className="appsAvailable" icon={logoGooglePlaystore} ></IonIcon></IonLabel> */}
                    </div>
                </IonCardContent>
                
            </IonCard>

        </>
    );
};

export default AppDownloadWidget
;

