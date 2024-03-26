import React, { useState, useEffect } from 'react';
import { IonCard, IonCardContent, IonImg, IonLabel } from '@ionic/react';

const BlogSection = () => {
    function redirectToBlogs() {
        window.location.replace('blogs');
    }
    return (
        <>
            <IonCard >
                <IonCardContent>
                    <IonLabel color="success" className='mediumfont' >World of Carpooling Blogs
                    </IonLabel>
                </IonCardContent>
            </IonCard>
            <IonCard>
                <IonCardContent>
                    <IonImg onClick={redirectToBlogs} className='cursorPointer' src="assets/img/dogblog.jpeg"></IonImg>

               
                </IonCardContent>
            </IonCard>

        </>
    );
};

export default BlogSection;

