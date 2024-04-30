import React, { useState, useEffect } from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonImg, IonLabel, IonSpinner, useIonViewDidEnter } from '@ionic/react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Capacitor } from '@capacitor/core';


const BlogHeadlines = (blogId: any) => {
    const [blogHeadlines, loadBlogHeadlines] = React.useState<any[]>([]);
    const [identifyIOSApp, setIdentifyIOSApp] = React.useState(false);
    const [identifyAndroidApp, setIdentifyAndroidApp] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    function redirectToBlogDetails(blogId:any,  blogStringId: any) {
        window.location.replace('blogDetail/' + blogStringId);
    }

    useEffect(() => {
        init();
    }, []);

    useIonViewDidEnter(() => {
        init();
    });
    
    function init() {
        if (Capacitor.isNativePlatform()) {
            if (Capacitor.getPlatform() == 'ios') {
                setIdentifyIOSApp(true);
            }
            if (Capacitor.getPlatform() == 'android') {
                setIdentifyAndroidApp(true);
            }
        }
       
        axios.get(import.meta.env.VITE_APP_API + '/blog/headers')
            .then(async (axiosResponse: AxiosResponse) => {
                setLoading(false);
                loadBlogHeadlines(axiosResponse.data);
            })
            .catch((reason: AxiosError) => {
                // if (reason.response?.status === 401 || reason.response?.status === undefined) {
                //   setSessionExists(false);
                //   return;
                // }
            })
    }

    return (
        <>
        {
            identifyIOSApp ? <div className="topBarHomePage"></div> : null
        }
        {
            loading?  <IonLabel className="centerLabel"> <IonSpinner  color="primary"></IonSpinner></IonLabel> : null
        }
            <IonCard color="success">
                <IonCardContent>
                    <IonLabel className='mediumfont' >Wagon Carpool Blogs
                    </IonLabel>
                </IonCardContent>
            </IonCard>
            {
                blogHeadlines.map((item, index) => (
                    <IonCard key={index}  onClick={() => redirectToBlogDetails(item.blogId, item.blogStringId)} className="cursorPointer">
                        <IonCardHeader>
                            <IonCardTitle>{item.title}</IonCardTitle>
                            <IonCardSubtitle>{item.subtitle}</IonCardSubtitle>
                        </IonCardHeader>

                        <IonCardContent>{item.preview}</IonCardContent>
                    </IonCard>
                ))
            }


        </>
    );
};

export default BlogHeadlines;

