import React, { useState, useEffect } from 'react';
import { IonApp, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonFooter, IonHeader, IonImg, IonItem, IonLabel, IonList, IonText, IonTitle, IonToolbar } from '@ionic/react';

const BlogDetails = () => {
    function redirectToBlogDetails() {
        window.location.replace('details?id=xyz');
    }
    return (
        <IonApp>
        <IonHeader>
            <IonToolbar color="success">
                <IonTitle>Benefits of Carpooling</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <div style={{ padding: '20px' }}>
                <h2>Save Money</h2>
                <p>Carpooling can significantly reduce your transportation costs. By sharing the ride with others, you can split the fuel expenses, tolls, and parking fees. Over time, these savings can add up and leave more money in your pocket.</p>

                <h2>Reduce Environmental Impact</h2>
                <p>Sharing a ride with others reduces the number of vehicles on the road, leading to fewer emissions and less pollution. Carpooling helps decrease traffic congestion and lowers the carbon footprint, contributing to a cleaner and healthier environment.</p>

                <h2>Save Time</h2>
                <p>Carpooling can help you save time by using HOV (High Occupancy Vehicle) lanes or carpool lanes, which are often less congested than regular lanes. Additionally, having multiple people in the car allows you to share driving responsibilities, reducing the overall travel time.</p>

                <h2>Build Relationships</h2>
                <p>Sharing a ride with others provides an opportunity to socialize and build relationships. Whether it's chatting about shared interests, discussing current events, or simply enjoying each other's company, carpooling can foster connections and friendships.</p>

                <h2>Reduce Stress</h2>
                <p>Driving alone in traffic can be stressful and exhausting. Carpooling allows you to relax, read, or catch up on work during the commute, making the journey more enjoyable and less stressful. Sharing the driving duties can also provide a welcome break from the road.</p>
            </div>
        </IonContent>
        
    </IonApp>



    );
};

export default BlogDetails;

