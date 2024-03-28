import React, { useState, useEffect } from 'react';
import { IonButton, IonCard, IonCardContent, IonIcon, IonImg, IonLabel } from '@ionic/react';
import { pencil } from 'ionicons/icons';

const BlogSection = () => {
    function redirectToBlogs() {
        window.location.replace('blogs');
    }
    return (
        <>
           
            <IonCard>
                <IonCardContent>
                    <IonImg onClick={redirectToBlogs} className='cursorPointer' src="assets/img/dogblog.jpeg"></IonImg>
                    <br/>
                    <IonButton size="small">World of Carpoling Blogs</IonButton>
               
                </IonCardContent>
            </IonCard>

        </>
    );
};

export default BlogSection;

