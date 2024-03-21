import React, { useState, useEffect } from 'react';
import { IonCard, IonCardContent, IonLabel } from '@ionic/react';

const WagonCarpoolIntro = () => {
    return (
        <>
            <IonCard >
                <IonCardContent>
                    <IonLabel color="success" className='mediumfont' >What is Wagon Carpool?
                    </IonLabel>
                </IonCardContent>
            </IonCard>
            <IonCard>
                <IonCardContent>
                    <div>
                        {/* <h2></h2><br/> */}
                        <p>Wagon Carpool the service that connects you with other carpoolers for office commutes and events like sports games, music concerts and comedy shows!</p>
                        <br />

                    </div>
                    <div className="video-responsive">
                        <iframe width="340" height="200"
                            src="https://www.youtube.com/embed/29XFOWjknOA?si=rpUEkfhrp7dsymPr"
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        ></iframe>
                    </div>
                </IonCardContent>
            </IonCard>

        </>
    );
};

export default WagonCarpoolIntro;

