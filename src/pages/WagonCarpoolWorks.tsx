import React, { useState, useEffect } from 'react';
import { IonCard, IonCardContent, IonItem, IonLabel } from '@ionic/react';

const WagonCarpoolWorks = () => {
    return (
        <>
            <IonCard >
                <IonCardContent>
                    <IonLabel color="success" className='mediumfont' >How Wagon Carpool Works?
                    </IonLabel>
                </IonCardContent>
            </IonCard>
            <IonCard>
                <IonCardContent>
                <IonLabel >
                        <ul className="wagoncarpoolworks">
                            <li>
                            Create a ride for work commute or an event.
                            </li>
                            <li>Find users with matching rides and send them match request and wait for them to accept your request.
                                <br/>
                                OR
                                <br/>
                                Wait for other users to send a match request and then accept their request.
                            </li>
                            <li>Your ride match is complete. Now you can message your matched carpool partner for any change of plans or additional details.</li>
                            <li>Read community guidelines and be a good carpooler, read the safety guidelines and be safe.</li>
                            <li>Make the ride happen, don't forget to pay if you are the rider before you are dropped off.</li>
                            <li>Come back to <a href="https://www.wagoncarpool.com/">wagoncarpool.com</a> to provide feedback on your ride experience. This is what creates a trust worthy community.</li>
                            <li>Rinse and repeat.</li>
                        </ul>
                        
                    </IonLabel>
                </IonCardContent>
            </IonCard>

        </>
    );
};

export default WagonCarpoolWorks;

