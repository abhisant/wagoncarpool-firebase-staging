import React, { useState, useEffect } from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonImg, IonLabel } from '@ionic/react';

const BlogHeadlines = () => {
    function redirectToBlogDetails() {
        window.location.replace('blogDetail?id=xyz');
    }
    return (
        <>
            <IonCard color="success">
                <IonCardContent>
                    <IonLabel className='mediumfont' >Wagon Carpool Blogs
                    </IonLabel>
                </IonCardContent>
            </IonCard>
            <IonCard onClick={redirectToBlogDetails} className="cursorPointer">
                <IonCardHeader>
                    <IonCardTitle>Card Title</IonCardTitle>
                    <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
            </IonCard>
            <IonCard onClick={redirectToBlogDetails} className="cursorPointer">
                <IonCardHeader>
                    <IonCardTitle>Card Title</IonCardTitle>
                    <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
            </IonCard>
            <IonCard onClick={redirectToBlogDetails} className="cursorPointer">
                <IonCardHeader>
                    <IonCardTitle>Card Title</IonCardTitle>
                    <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
            </IonCard>
            <IonCard onClick={redirectToBlogDetails} className="cursorPointer">
                <IonCardHeader>
                    <IonCardTitle>Card Title</IonCardTitle>
                    <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
            </IonCard>
            <IonCard onClick={redirectToBlogDetails} className="cursorPointer">
                <IonCardHeader>
                    <IonCardTitle>Card Title</IonCardTitle>
                    <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
            </IonCard>

        </>
    );
};

export default BlogHeadlines;

