import { IonAvatar, IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonMenu, IonMenuButton, IonModal, IonNavLink, IonPage, IonRow, IonSelect, IonSelectOption, IonSpinner, IonSplitPane, IonText, IonTextarea, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import axios from 'axios';
import { closeCircle, menu } from 'ionicons/icons';
import React, { useState, useEffect} from 'react';
import { Redirect, useHistory, Route, HashRouter, Switch } from 'react-router-dom';
import GetStarted from './GetStarted';
import ReactGA from 'react-ga4';
import './GetStarted.css';
import AppLandingPage from './AppLandingPage';
import { IonReactRouter } from '@ionic/react-router';

const Messaging = () => {
    let history = useHistory();
    const [messageData, setMessageData] = React.useState<any[]>([]);
    const [currUserId, setcurrUserId] = React.useState('');
    const [isOpen, setIsOpen] = useState(false);
    //const [infiniteLoop, setInfiniteLoop] = useState(true);
    const [receiver, setReceiver] = React.useState<any>({});
    const [sender, setSender] = React.useState<any>({});
    const [message, setMessageBody] = React.useState("");
    const [conversationDetails, setConversationDetails] = React.useState<any[]>([]);
    const [sessionExists, setSessionExists] = React.useState(true);
    const [feedLoading, setFeedLoading] = useState(true);

    let infiniteLoop = true;
    let wagon_token = '';
    let session_imageUrl = '';


    const openChat = (item: any) => (event: any) => {
        history.push('/chatdetails?id=' + item.receiver.id + '&receiver=' + item.sender.id);
    }

    async function loadChatDetails() {
        ReactGA.event({
            category: "Chat",
            action: "LoadChatHeaders",
          });
        const session = JSON.parse(localStorage.getItem('session') || "");
        setcurrUserId(session.userId);
        setFeedLoading(true);
        const getResponse = await axios.get(import.meta.env.VITE_APP_API + '/messages/headers?user_id=' + session.userId );
        console.log(getResponse);
        setFeedLoading(false);
        setMessageData(getResponse.data);
        
    }

    useIonViewDidEnter(() => {
        ReactGA.send({ hitType: "pageview", page: "/messaging", title: "Messaging" });
        const sessionObj = localStorage.getItem('session');
        if (sessionObj != null && JSON.parse(localStorage.getItem('session') || "").wagon_token != null && JSON.parse(localStorage.getItem('session') || "").wagon_token != '') {
            wagon_token = JSON.parse(localStorage.getItem('session') || "").wagon_token;
            session_imageUrl = JSON.parse(localStorage.getItem('session') || "").imageUrl;
            loadChatDetails();
        } else {
            console.log("Session doesn't exist");
            history.push('/App');
            localStorage.setItem("redirected_from", 'messaging');
            setSessionExists(false);
        }  
      });

    function loadChatModal(item: any) {

        // Current user id always the sender.
        let senderObj = {};
        let receiverObj = {};
        if (item.receiver.id == currUserId) {
            receiverObj = item.sender;
            senderObj = item.receiver;
        } 
        if (item.sender.id == currUserId) {
            receiverObj = item.receiver;
            senderObj = item.sender;
        }
        console.log("sender", senderObj);
        console.log("receiver", receiverObj);
        setIsOpen(true);
        setReceiver({});
        setSender({});
        setMessageBody('');
        loadChat(senderObj, receiverObj);
    }
    
    async function loadChat(senderObj: any, receiverObj: any) {
        ReactGA.event({
            category: "Chat",
            action: "LoadChatDetails",
          });
        setReceiver(receiverObj);
        setSender(senderObj);
        const queryParams = {
            fromUserId: receiverObj.id,
        }

        while(true) {
            if (infiniteLoop) {
                const getResponseInLoop = await axios.get(import.meta.env.VITE_APP_API + '/messages?user_id=' + senderObj.id
                , { params: queryParams });
    
            console.log(getResponseInLoop.data);
            setConversationDetails(getResponseInLoop.data);
                await new Promise(r => setTimeout(r, 5000));
            } else {
                break;
            }
        }

        const getResponse = await axios.get(import.meta.env.VITE_APP_API + '/messages?user_id=' + senderObj.id
            , { params: queryParams });

        console.log(getResponse.data);
        setConversationDetails(getResponse.data);

        const postResponse = await axios.post(import.meta.env.VITE_APP_API + '/messages/seen?sendUserId='+ receiverObj.id + '&user_id=' + senderObj.id + '&lastSeenMessageId=' +  getResponse.data[getResponse.data.length-1].messageId);
        console.log(postResponse.data);
        // reload headers to wipeout the count
        loadChatDetails();
    }

    window.addEventListener('ionModalDidDismiss', (event) => {
        infiniteLoop = false;
        setConversationDetails([]);
        setReceiver({});
        setSender({});
        setMessageBody('');

        setIsOpen(false);
    });

    async function sendMessage() {
        ReactGA.event({
            category: "messaging",
            action: "SendMessage",
          });
        console.log("sender:" , sender);
        console.log("receiver:" ,receiver);
        if (sender == "{}" || receiver == "{}") {
            console.log("Throw validation error");
            return;
        }
        setMessageBody("");

        const postRequestBody = {
            senderUserId: sender.id,
            receiverUserId: receiver.id,
            sendTime: new Date().toISOString(),
            body: message,
        };
        console.log(postRequestBody);
        const postResponse = await axios.post(import.meta.env.VITE_APP_API + '/messages', postRequestBody);
        console.log(postResponse.data);
      
        loadChat(sender, receiver);
    }

    function messageBody(message: any) {
        setMessageBody(message);
    }

//       useEffect(() => {
//     const intervalId = setInterval(() => {
//       console.log(new Date());
//     }, 5000);

//   }, []);

    useEffect(() => {
        const sessionObj = localStorage.getItem('session');
        if (sessionObj != null && JSON.parse(localStorage.getItem('session') || "").wagon_token != null && JSON.parse(localStorage.getItem('session') || "").wagon_token != '') {
            wagon_token = JSON.parse(localStorage.getItem('session') || "").wagon_token;
            session_imageUrl = JSON.parse(localStorage.getItem('session') || "").imageUrl;
            loadChatDetails();
        } else {
            console.log("Session doesn't exist");
            history.push('/App');
            localStorage.setItem("redirected_from", 'messaging');
            setSessionExists(false);
        }  
    }, []);

    useEffect(() => {
        //scroll to the bottom.
        const list: NodeListOf<HTMLIonContentElement> = document.querySelectorAll('ion-content')
        if (list.length) {
          const content: HTMLIonContentElement = list[list.length - 1]
          content.scrollToBottom()
        }
    }, [conversationDetails]);

    function closeChatModal() {
        infiniteLoop = false;
        setIsOpen(false);
    }

    return (
        <IonPage>
            {
                !sessionExists ? <><IonReactRouter><Switch><Redirect exact to={{ pathname: '/App' }} /><Route path="/App" component={AppLandingPage} /></Switch></IonReactRouter></>: null
            }
            <IonContent>
                {/* <IonItem routerLink='/menu' routerDirection='none'>
                    <IonIcon size="large" slot="start" color="light" icon={menu}></IonIcon>
                </IonItem> */}

                {
                    feedLoading ?
                        <IonLabel class="centerLabel"><IonSpinner color="primary"></IonSpinner></IonLabel>
                        : null
                }

                {
                    messageData.length == 0 && !feedLoading ?
                    <div className="verticalCenterFeed">
                    <IonCard>
                                <IonCardContent>
                                    <h3>You don't have any conversations yet! </h3>
                                </IonCardContent>
                            </IonCard></div>
                         : null
                }
                <div className="centerFeed">
                    {/* <IonList> */}

                        {messageData.map((item, index) => (

                            <IonCard className="cursorPointer" onClick={() => loadChatModal(item)} key={index}>
                                <IonCardContent>
                                    <div >
                                        {
                                            currUserId == item.receiver.id ?
                                                item.sender.imageUrl == null ? <img src="assets/img/avatar.svg" referrerPolicy='no-referrer' /> :
                                                    <img className="chatsummaryItemImg" src={item.sender.imageUrl} referrerPolicy='no-referrer' />

                                                :

                                                item.receiver.imageUrl == null ? <img src="assets/img/avatar.svg" referrerPolicy='no-referrer' /> :
                                                    <img className="chatsummaryItemImg" src={item.receiver.imageUrl} referrerPolicy='no-referrer' />
                                        }

                                        <div className="container">
                                            {
                                                currUserId == item.receiver.id ? <IonLabel color="success" class="summaryName">{item.sender.name} </IonLabel> : <IonLabel className="summaryName">{item.receiver.name} </IonLabel>
                                            }

                                            <p className="summaryBody"> {item.body}</p>

                                        </div>
                                        {
                                            item.unreadCount > 0 ?
                                            <div><IonBadge className="unreadCount">{item.unreadCount}</IonBadge></div>
                                            : null
                                        }
                                        
                                        <div>
                                            <p className="summaryTime">
                                                {
                                                    new Date(item.sendTime).toLocaleString(
                                                        "en-US",
                                                        {
                                                           
                                                            hour: '2-digit', 
                                                            minute: '2-digit'
                                                        }
                                                    )}
                                            </p>
                                        </div>
                                    </div>
                                </IonCardContent>
                            </IonCard>

                        ))}
                    {/* </IonList> */}
                </div>

                <IonModal id="example-modal" isOpen={isOpen}>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>{sender.name}</IonTitle>
                            <IonButtons slot="end">
                                <IonButton onClick={() => closeChatModal()}><IonIcon className="closeIcon" icon={closeCircle}></IonIcon></IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <IonList class="chatbox">
                       
                            
                            {conversationDetails.map((item, index) => (
                                    
                                currUserId == item.senderUserId ? 
                               <IonItem className="chatbubble" key={index}>
                                
                                    <IonAvatar class="chatavatar" slot="end">
                                        {
                                                sender.imageUrl == null ? <img src="assets/img/avatar.svg" referrerPolicy='no-referrer' /> : <img src={sender.imageUrl} referrerPolicy='no-referrer' />
                                            }
                                    </IonAvatar>
                                    <IonText class="chatbubbleMe" slot="end" >
                                        {item.body}
                                        <p className="chatSummaryTimeMe">{
                                        new Date(item.sendTime).toLocaleString(
                                            "en-US",
                                            {
                                                month: "short",
                                                day: "2-digit",
                                                year: "numeric",
                                                hour: '2-digit', minute: '2-digit'
                                            }
                                        )} </p>
                                        </IonText>
                                        </IonItem> :

                                    <IonItem className="chatbubble" key={index}>
                                         <IonAvatar class="chatavatar"  slot="start">
                                        {
                                                receiver.imageUrl == null ? <img src="assets/img/avatar.svg" referrerPolicy='no-referrer' /> : <img src={receiver.imageUrl} referrerPolicy='no-referrer' />
                                        }
                                        
                                    </IonAvatar>
                                        <IonText class="chatbubbleOtherParty">
                                            {item.body}
                                            <p className="chatSummaryTimeOther">{
                                            new Date(item.sendTime).toLocaleString(
                                                "en-US",
                                                {
                                                    month: "short",
                                                    day: "2-digit",
                                                    year: "numeric",
                                                    hour: '2-digit', minute: '2-digit'
                                                }
                                            )}</p>
                                            </IonText>
                                    </IonItem>
                            ))}
                        </IonList>
                    </IonContent>
                    <IonItem className="textchatitem">
                            <IonInput class="chattext" value={message} placeholder="Type something here" onIonInput={e => messageBody(e.detail.value)}></IonInput>
                            {
                                message == "" ? <IonButton disabled color="tertiary" className="chatSendButton" onClick={() => sendMessage()}>send</IonButton>: <IonButton color="tertiary" className="chatSendButton" onClick={() => sendMessage()}>send</IonButton>
                            }
                        </IonItem>
                </IonModal>

            </IonContent>
        </IonPage>
    );
};

export default Messaging;
function useRef(arg0: null) {
    throw new Error('Function not implemented.');
}

