import React, { useState, useEffect } from 'react';
import { IonCard, IonCardContent, IonLabel } from '@ionic/react';

const WhyWagonCarpool = () => {
    return (
        <>
            <IonCard >
                <IonCardContent>
                    <IonLabel color="success" className='mediumfont' >Why Wagon Carpool?
                    </IonLabel>
                </IonCardContent>
            </IonCard>
            <IonCard>
                <IonCardContent>
                <IonLabel >
                        <ul className="wagoncarpoolworks">
                            <li>
                            Share the gas / parking / toll costs.
                            </li>
                            <li>Help reduce traffic on the road. 
                            </li>
                            <li>Help the environment. Every 100 miles of carpooling with one person saves 4KG of CO2 emissions.
                            </li>
                            <li>Meet people, build your network and make friends.</li>
                        </ul>
                        
                    </IonLabel>
                </IonCardContent>
            </IonCard>

        </>
    );
};

export default WhyWagonCarpool;

