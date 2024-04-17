import React, { useState, useEffect } from 'react';
import { IonApp, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonFooter, IonHeader, IonImg, IonItem, IonLabel, IonList, IonText, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import { useParams } from 'react-router';
import axios, { AxiosError, AxiosResponse } from 'axios';

const BlogDetails = (id: any) => {
    const [blogDetails, loadBlogDetails] = React.useState<any>({});
    console.log(id);
    function redirectToBlogDetails() {
        window.location.replace('details?id=xyz');
    }
    useEffect(() => {
        init();
    }, []);

    useIonViewDidEnter(() => {
        init();
    });

    function init() {
    
        let urlParams = new URLSearchParams(window.location.href);
        let blogId='1';
            if (urlParams.get('id') !== null) {
                blogId = urlParams.get('id') || '';
            }
    
        axios.get(import.meta.env.VITE_APP_API + '/blog?blogId=' + blogId)
            .then(async (axiosResponse: AxiosResponse) => {
                loadBlogDetails(axiosResponse.data);
            })
            .catch((reason: AxiosError) => {
                // if (reason.response?.status === 401 || reason.response?.status === undefined) {
                //   setSessionExists(false);
                //   return;
                // }
            })
    }

    return (
        <IonApp>
            
        <IonHeader>
            <IonToolbar color="success">
                <IonTitle>{blogDetails.title}</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <div style={{ padding: '20px' }}>
            <div dangerouslySetInnerHTML={{ __html: blogDetails.content }} />
            </div>
        </IonContent>
        
    </IonApp>



    );
};

export default BlogDetails;

