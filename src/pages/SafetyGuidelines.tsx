import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';

function CarPoolingGuidelines() {


    return (
        <IonPage>
            {/* <IonHeader>
                <IonToolbar>
                    <IonTitle>Safety Guidelines for Carpoolers</IonTitle>
                </IonToolbar>
            </IonHeader> */}
            <IonContent>
                <IonList>
                    <h2 className="carpoolingguidelinesmargin">Be Punctual:</h2>

                    <IonItem className="item-text-wrap">

                        <ul>
                            <li>Respect your carpool partners' time by being punctual for pick-up and drop-off times.</li>
                            <li>Notify your carpool group in advance if you will be running late or unable to make it to a carpool session.</li>
                        </ul>

                    </IonItem>
                    <h2 className="carpoolingguidelinesmargin">Obey Traffic Laws:</h2>

                    <IonItem className="item-text-wrap">

                        <ul className="safetyGuielinesWrap">
                            <li>Follow all traffic laws, speed limits, and road signs. Avoid reckless driving and maintain a safe distance from other vehicles.</li>
                        </ul>

                    </IonItem>
                    <h2 className="carpoolingguidelinesmargin">Designate a Responsible Driver:</h2>

                    <IonItem className="item-text-wrap">

                        <ul className="safetyGuielinesWrap">
                            <li>If your carpooling group takes turns driving, ensure that the designated driver is sober and not under the influence of alcohol or drugs.</li>
                        </ul>

                    </IonItem>
                    <h2 className="carpoolingguidelinesmargin">Avoid Distractions:</h2>

                    <IonItem className="item-text-wrap">

                        <ul className="safetyGuielinesWrap">
                            <li>Avoid using mobile phones, texting, or engaging in any activity that diverts your attention from the road. Distracted driving can lead to accidents.</li>
                        </ul>

                    </IonItem>
                    <h2 className="carpoolingguidelinesmargin">Keep the Car Clean:</h2>

                    <IonItem className="item-text-wrap">

                        <ul className="safetyGuielinesWrap">
                            <li>Avoid cluttering the car with unnecessary items that may become projectiles during sudden stops or crashes. A clean car ensures a safer environment.</li>
                        </ul>

                    </IonItem>
                    <h2 className="carpoolingguidelinesmargin">Follow COVID-19 Safety Measures:</h2>

                    <IonItem className="item-text-wrap">

                        <ul className="safetyGuielinesWrap">
                            <li>During the COVID-19 pandemic, follow guidelines such as wearing masks, maintaining physical distance, and practicing good hand hygiene.</li>
                        </ul>

                    </IonItem>
                    <h2 className="carpoolingguidelinesmargin">Inspect the Vehicle:</h2>

                    <IonItem className="item-text-wrap">

                        <ul className="safetyGuielinesWrap">
                            <li>Before starting the journey, ensure that the car is in good condition, with working brakes, lights, tires, and mirrors.</li>
                        </ul>

                    </IonItem>
                    <h2 className="carpoolingguidelinesmargin">Emergency Preparedness:</h2>

                    <IonItem className="item-text-wrap">

                        <ul className="safetyGuielinesWrap">
                            <li>Carry essential items like a first aid kit, flashlight, and emergency contact numbers in case of unexpected situations.</li>
                        </ul>

                    </IonItem>
                    <h2 className="carpoolingguidelinesmargin">Share Medical Information:</h2>

                    <IonItem className="item-text-wrap">

                        <ul className="safetyGuielinesWrap">
                            <li>If anyone in the carpool has specific medical conditions or allergies, make sure that information is shared with other carpoolers.</li>
                        </ul>

                    </IonItem>
                    <h2 className="carpoolingguidelinesmargin">Be Punctual:</h2>

                    <IonItem className="item-text-wrap">

                        <ul className="safetyGuielinesWrap">
                            <li>Respect your carpool partners' time by being punctual for pick-up and drop-off times. Communicate in advance if you will be running late.</li>
                        </ul>

                    </IonItem>
                    <h2 className="carpoolingguidelinesmargin">Avoid Strong Scents:</h2>

                    <IonItem className="item-text-wrap">

                        <ul className="safetyGuielinesWrap">
                            <li>Be mindful of using strong perfumes, colognes, or other scents that may bother other passengers.</li>
                        </ul>

                    </IonItem>
                    <h2 className="carpoolingguidelinesmargin">Communicate Changes:</h2>

                    <IonItem className="item-text-wrap">

                        <ul className="safetyGuielinesWrap">
                            <li>Inform your carpool group about any changes in your schedule or carpool arrangements to avoid confusion.</li>
                        </ul>

                    </IonItem>
                    <h2 className="carpoolingguidelinesmargin">Respect Personal Space:</h2>

                    <IonItem className="item-text-wrap">

                        <ul className="safetyGuielinesWrap">
                            <li>Be considerate of others' personal space and avoid intruding on their comfort during the ride.</li>
                        </ul>

                    </IonItem>
                    <h2 className="carpoolingguidelinesmargin">Keep Valuables Secure:</h2>

                    <IonItem className="item-text-wrap">

                        <ul className="safetyGuielinesWrap">
                            <li>Do not leave valuable items visible in the car, as it may attract theft.</li>
                        </ul>

                    </IonItem>
                    <h2 className="carpoolingguidelinesmargin">Limit Stops:</h2>

                    <IonItem className="item-text-wrap">

                        <ul className="safetyGuielinesWrap">
                            <li>Minimize unnecessary stops during the carpool to reduce travel time and maintain an efficient schedule.</li>
                        </ul>

                    </IonItem>
                    <h2 className="carpoolingguidelinesmargin">Stay Alert:</h2>

                    <IonItem className="item-text-wrap">

                        <ul className="safetyGuielinesWrap">
                            <li>Be aware of your surroundings and report any suspicious activities during the carpool.</li>
                        </ul>

                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>

    );
};

export default CarPoolingGuidelines;
