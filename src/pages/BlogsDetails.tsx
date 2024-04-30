import React, { useState, useEffect } from 'react';
import { IonApp, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonFooter, IonHeader, IonImg, IonItem, IonLabel, IonList, IonSpinner, IonText, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import { useParams } from 'react-router';
import axios, { AxiosError, AxiosResponse } from 'axios';

const BlogDetails = (id: any) => {
    const [blogDetails, loadBlogDetails] = React.useState<any>({});
    const [loading, setLoading] = React.useState(true);
    console.log(id);
    
    useEffect(() => {
        init();
    }, []);

    useIonViewDidEnter(() => {
        init();
    });

    function init() {
        axios.get(import.meta.env.VITE_APP_API + '/blog/' + window.location.pathname.split("/").pop())
            .then(async (axiosResponse: AxiosResponse) => {
                setLoading(false);
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
        {
            loading?  <IonLabel className="centerLabel"> <IonSpinner  color="primary"></IonSpinner></IonLabel> : null
        }
        <IonHeader>
            <IonToolbar color="success">
                <IonTitle><div className="ion-text-wrap">{blogDetails.title}: {blogDetails.subtitle} </div></IonTitle>
                
            </IonToolbar>
        </IonHeader>
        <IonContent>    
            <div dangerouslySetInnerHTML={{ __html: blogDetails.content }} />
        </IonContent>
        
    </IonApp>



    );
};

export default BlogDetails;

