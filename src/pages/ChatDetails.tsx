import { IonAvatar, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonList, IonNavLink, IonPage, IonRow, IonSelect, IonSelectOption, IonText, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import './GetStarted.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const ChatDetails = () => {
    let history = useHistory();
    const [conversationDetails, setConversationDetails] = React.useState<any[]>([]);
    const [currentUserId, setCurrentUserId] = React.useState("");
    const [receiverId, setReceiverId] = React.useState("");

    async function loadChat(id: any, receiver: any) {
        const queryParams = {
            fromUserId: receiver,
        }
        const getResponse = await axios.get(import.meta.env.VITE_APP_API + '/messages?user_id=' + id
            , { params: queryParams });

        console.log(getResponse.data);
        setConversationDetails(getResponse.data);
    }

    

    useEffect(() => {
        const session = JSON.parse(localStorage.getItem('chat_session') || "");
        console.log(session);
        loadChat(session.id, session.receiver);
    }, []);

    return (
        <IonPage>
            <IonContent>
                {/* <IonHeader>
                    <IonToolbar color="dark">
                        <IonButton class="backbuttonchat" fill="outline" shape="round" color="light" onClick={goHome}>Home</IonButton>
                        <IonButton class="backbuttonchat" fill="outline" shape="round" color="light" onClick={goBack}>Back</IonButton>
                        <IonTitle class="ion-text-center"></IonTitle>
                    </IonToolbar>
                </IonHeader> */}
                <IonList class="chatbox">
                    {conversationDetails.map((item, index) => (
                        currentUserId == item.senderUserId ? 
                            <IonItem className="ion-text-center" color="dark" key={index}>
                                <IonText slot="end" >
                                    {item.body}
                                </IonText>
                                <IonText slot="end" color="medium">{
                                    new Date(item.sendTime).toLocaleString(
                                        "en-US",
                                        {
                                            hour: '2-digit', minute: '2-digit'
                                        }
                                    )}</IonText>
                            </IonItem>

                            :

                            <IonItem className="chatbubbleMe" color="light">

                                <IonText>
                                    {item.body}
                                </IonText>
                                <IonText slot="end" color="medium">{
                                    new Date(item.sendTime).toLocaleString(
                                        "en-US",
                                        {
                                            month: "short",
                                            day: "2-digit",
                                            hour: '2-digit', minute: '2-digit'
                                        }
                                    )}</IonText>
                            </IonItem>
                    ))}
                </IonList>
                <IonItem className="textbuttonchat">
                    <IonInput class="chattext" placeholder=" Type something here"></IonInput>
                       <IonButton className="chatSendButton" >send</IonButton>
                    {/* <IonTex tarea class="chattext" placeholder=" Type something here"></IonTextarea> */}
                </IonItem>
            </IonContent>
        </IonPage>
    );
};

export default ChatDetails;
