import React, { useState, useEffect } from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonImg, IonLabel, useIonViewDidEnter } from '@ionic/react';
import axios, { AxiosError, AxiosResponse } from 'axios';


const BlogHeadlines = (blogId: any) => {
    const [blogHeadlines, loadBlogHeadlines] = React.useState<any[]>([]);

    function redirectToBlogDetails(blogId:any) {
    window.location.replace('blogDetail?&id=' + blogId);
    }

    useEffect(() => {
        init();
    }, []);

    useIonViewDidEnter(() => {
        init();
    });
    
    function init() {
       
        axios.get(import.meta.env.VITE_APP_API + '/blog/headers')
            .then(async (axiosResponse: AxiosResponse) => {
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
            <IonCard color="success">
                <IonCardContent>
                    <IonLabel className='mediumfont' >Wagon Carpool Blogs
                    </IonLabel>
                </IonCardContent>
            </IonCard>
            {
                blogHeadlines.map((item, index) => (
                    <IonCard key={index}  onClick={() => redirectToBlogDetails(item.blogId)} className="cursorPointer">
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

