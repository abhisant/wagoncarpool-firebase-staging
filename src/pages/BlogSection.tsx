import React, { useState, useEffect } from 'react';
import { IonButton, IonCard, IonCardContent, IonIcon, IonImg, IonLabel } from '@ionic/react';
import { pencil } from 'ionicons/icons';

const BlogSection = () => {
    function redirectToBlogs() {
        window.location.replace('blogs');
    }
    return (
        <>
        <IonCard >
                <IonCardContent>
                    <IonLabel color="success" className='mediumfont' >Blogs
                    </IonLabel>
                </IonCardContent>
            </IonCard>
           
            <IonCard>
                <IonCardContent>
                    <IonImg onClick={redirectToBlogs} className='cursorPointer' src="assets/img/dogblog.jpeg"></IonImg>
                    <br/>
                    <IonButton onClick={redirectToBlogs} size="small">World of Carpooling Blogs</IonButton>
               
                </IonCardContent>
            </IonCard>

        </>
    );
};

export default BlogSection;

