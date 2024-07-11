import React, { useState, useEffect, MutableRefObject, useRef } from 'react';
import {
    IonContent,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonList,
    IonItem,
    IonAvatar,
    IonLabel,
    IonIcon,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonToolbar,
    IonSelect,
    IonSelectOption,
    IonButtons,
    IonButton,
    IonTitle,
    IonToggle,
    IonTextarea,
    IonImg,
    IonPage,
    IonCol,
    IonGrid,
    IonInput,
    IonRow,
    IonSpinner,
    IonBadge,
    IonCard,
    IonCardContent,
    IonHeader,
    useIonViewDidEnter,
    useIonViewWillEnter,
    useIonAlert,
    IonModal,
    IonText,
    IonRefresher,
    IonRefresherContent,
    RefresherEventDetail,
    IonSegment,
    IonSegmentButton,
    IonAccordionGroup,
    IonAccordion,
    useIonLoading,
} from '@ionic/react';
import { IonReactHashRouter, IonReactRouter } from '@ionic/react-router';
import { addCircle, settings, home, search, menu, locationOutline, location, shieldCheckmarkSharp, pencil, closeCircle, logOut, menuOutline } from 'ionicons/icons';
import { Redirect, Route, Router, Switch } from 'react-router';
import App from '../App';
import { useLocation, useHistory, HashRouter } from 'react-router-dom';
import { Geolocation } from '@capacitor/geolocation';
import axios, { AxiosError, AxiosResponse } from 'axios';
import GetStarted from './GetStarted';
import ReactGA from 'react-ga4';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import VerifyUser from './VerifyUserComponent';
import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";
import SelectCarpoolCategory from './SelectCarpoolCategory';
import AppLandingPage from './AppLandingPage';
import UserMenu from './UserMenu';
import Home from './Home';
import InternalRouter from './InternalRouter';
const UserActivity = () => {

    let history = useHistory();
    const [presentAlert] = useIonAlert();
    let userData = useLocation<any>();
    const [loading, setLoading] = React.useState(false);
    const [userActivityFeedLoading, setuserActivityFeedLoading] = useState(true);
    const [userActivityFeedData, setuserActivityFeedData] = React.useState<any[]>([]);
    const [userId, setUserId] = React.useState("0");
    const [isOpen, setIsOpen] = useState(false);
    const [receiver, setReceiver] = React.useState<any>({});
    const [sender, setSender] = React.useState<any>({});
    const [message, setMessageBody] = React.useState("");
    const [conversationDetails, setConversationDetails] = React.useState<any[]>([]);
    const [sessionExists, setSessionExists] = React.useState(true);
    const [userSession, setUserSession] = React.useState<any>({});
    const [userProfile, setUserProfile] = React.useState<any>({});
    const [editNameEnabled, setEditNameEnabled] = React.useState(false);
    const [isEditedNameValid, setIsEditedNameValid] = React.useState(false);
    const [editedName, setEditedName] = React.useState("");
    const [imageUrl, setImageUrl] = React.useState("");
    const [isVerifyClicked, setIsVerifyClicked] = React.useState(false);
    const [gender, setGender] = React.useState<any>('');

    const [homeAddress, setHomeAddress] = useState("");
    const [homeLatitude, setHomeLatitude] = useState(0);
    const [homeLongitude, setHomeLongitude] = useState(0);

    const [workAddress, setWorkAddress] = useState("");
    const [workAddressName, setWorkAddressName] = useState("");
    const [workLatitude, setWorkLatitude] = useState(0);
    const [workLongitude, setWorkLongitude] = useState(0);

    const [homeWorkAddressExists, setHomeWorkAddressExists] = React.useState(true);

    const [country] = useState("us");
    const inputHomeAddressRef = useRef() as MutableRefObject<HTMLInputElement>;
    const inputWorkAddressRef = useRef() as MutableRefObject<HTMLInputElement>;
    const [goToMenu, setMenuClicked] = React.useState(false);

    const [present, dismiss] = useIonLoading();
    const [items, setItems] = useState<string[]>([]);
    let infiniteLoop = true;
    let globalSessionObj:any;


    function loadChatModal(item: any, subItem: any) {
        // TODO:  Check whether a ride already exists
        // setIsOpen(true);
        // setReceiver({});
        // setSender({});
        // setMessageBody('');
        // loadChat(item.user, subItem.user);
    }

    // const generateItems = () => {
    //     const newItems = [];
    //     for (let i = 0; i < 50; i++) {
    //         newItems.push(`Item ${1 + items.length + i}`);
    //     }
    //     setItems([...items, ...newItems]);
    // };

    // async function loadUserActivityFeed() {
    //     ReactGA.event({
    //         category: "UserRides",
    //         action: "LoadUserRides",
    //     });
    //     // console.log(userData.state.data.session.userId);
    //     const getResponse = await axios.get(import.meta.env.VITE_APP_API_V2 + '/rides/user', {headers: { 'Authorization': globalSessionObj.wagon_token } });
    //     console.log(getResponse.data);
    //     setuserActivityFeedData(getResponse.data);
    //     setuserActivityFeedLoading(false);
    // }

    // async function loadChat(senderObj: any, receiverObj: any) {
    //     ReactGA.event({
    //         category: "Chat",
    //         action: "LoadChat",
    //     });
    //     console.log(senderObj);
    //     console.log(receiverObj);
    //     console.log('****');
    //     setReceiver(receiverObj);
    //     setSender(senderObj);
    //     const queryParams = {
    //         fromUserId: receiverObj.id,
    //     }

    //     while (true) {
    //         if (infiniteLoop) {
    //             const getResponseInLoop = await axios.get(import.meta.env.VITE_APP_API + '/messages?user_id=' + senderObj.id
    //                 , { params: queryParams });

    //             console.log(getResponseInLoop.data);
    //             setConversationDetails(getResponseInLoop.data);
    //             await new Promise(r => setTimeout(r, 5000));
    //         } else {
    //             break;
    //         }
    //     }

    //     const getResponse = await axios.get(import.meta.env.VITE_APP_API + '/messages?user_id=' + senderObj.id
    //         , { params: queryParams });

    //     console.log(getResponse.data);
    //     setConversationDetails(getResponse.data);

    //     const postResponse = await axios.post(import.meta.env.VITE_APP_API + '/messages/seen?sendUserId=' + receiverObj.id + '&user_id=' + senderObj.id  + '&lastSeenMessageId=' + getResponse.data[getResponse.data.length - 1].messageId);
    //     console.log(postResponse.data);
    // }

    window.addEventListener('ionModalDidDismiss', (event) => {
        infiniteLoop = false;
        setConversationDetails([]);
        setReceiver({});
        setSender({});
        setMessageBody('');
        setIsOpen(false);
    });

    // async function sendMessage() {
    //     console.log("sender:" + sender);
    //     console.log("receiver:" + receiver);
    //     if (sender == "{}" || receiver == "{}") {
    //         console.log("Throw validation error");
    //         return;
    //     }

    //     const postRequestBody = {
    //         senderUserId: sender.id,
    //         receiverUserId: receiver.id,
    //         sendTime: new Date().toISOString(),
    //         body: message,
    //     };
    //     setMessageBody("");
    //     console.log(postRequestBody);
    //     const postResponse = await axios.post(import.meta.env.VITE_APP_API + '/messages', postRequestBody);
    //     console.log(postResponse.data);
    //     loadChat(sender, receiver);
    // }

    function messageBody(message: any) {
        console.log('message', message)
        setMessageBody(message);
    }

    function loadHomeWorkDetails() {
        setuserActivityFeedLoading(true);
        const session = JSON.parse(localStorage.getItem('session') || "");
        axios.get(import.meta.env.VITE_APP_API_V2 + '/user/addresses', {headers: { 'Authorization': globalSessionObj.wagon_token } }).
            then(async (getResponse: AxiosResponse) => {
                ReactGA.event({
                    category: "settings_load_user_home_work_add",
                    action: "settings_load_user_home_work_add",
                });
                setuserActivityFeedLoading(false);
                if (getResponse.data == '' || getResponse.data == null) {
                    setHomeWorkAddressExists(false);
                } else {
                    setHomeAddress(getResponse.data.homeAddress);
                    setHomeLatitude(getResponse.data.homeLatitude);
                    setHomeLongitude(getResponse.data.homeLongitude);

                    setWorkAddress(getResponse.data.officeAddress);
                    setWorkAddressName(getResponse.data.officeAddressName);
                    setWorkLatitude(getResponse.data.officeLatitude);
                    setWorkLongitude(getResponse.data.officeLongitude);
                    setHomeWorkAddressExists(true);
                }
            })
            .catch((reason: AxiosError) => {
                setuserActivityFeedLoading(false);
                //setErrorLogs('Unable to get the estimate cost. Please try again after sometime!');
            })
    }

    function init() {
        ReactGA.send({ hitType: "pageview", page: "/settings", title: "Settings" });
        const sessionObj = localStorage.getItem('session');
        if (sessionObj != null && JSON.parse(localStorage.getItem('session') || "").wagon_token != null && JSON.parse(localStorage.getItem('session') || "").wagon_token != '') {
            globalSessionObj = JSON.parse(localStorage.getItem('session') || "");
            setUserId(JSON.parse(localStorage.getItem('session') || "").userId);
            //Check token validity
            axios.get(import.meta.env.VITE_APP_API_V2 + '/user', {headers: { 'Authorization': globalSessionObj.wagon_token } })
            .then(async (axiosResponse: AxiosResponse) => {
                setSessionExists(true);
            console.log(JSON.parse(localStorage.getItem('session') || ""));
            setUserSession(JSON.parse(localStorage.getItem('session') || ""));
            loadUserProfile();
            loadHomeWorkDetails();
            })
            .catch((reason: AxiosError) => {
                if (reason.response?.status === 401 || reason.response?.status === undefined) {
                    window.location.replace('/home');
                    setSessionExists(false);
                }
            })
        } else {
            // history.push('/App');
            console.log('Redirect to App');
            window.location.replace('/home');
            localStorage.setItem("redirected_from", 'userActivity');
            setSessionExists(false);
        }
    }

    useIonViewDidEnter(() => {
        setRedirectToNewRide(false);
        init();
    });

    function loadUserProfile() {
        
        //const session = JSON.parse(localStorage.getItem('session') || "");

        axios.get(import.meta.env.VITE_APP_API_V2 + '/user', {headers: { 'Authorization': globalSessionObj.wagon_token } })
            .then(async (axiosResponse: AxiosResponse) => {
                ReactGA.event({
                    category: "settings_load_user_profile",
                    action: "settings_load_user_profile",
                });
                setuserActivityFeedLoading(false);
                console.log(axiosResponse.data);
                setUserProfile(axiosResponse.data);

                const newSession = {
                    created: new Date().getTime(),
                    token: axiosResponse.data.email,
                    userId: axiosResponse.data.id,
                    gender: axiosResponse.data.gender,
                    imageUrl: axiosResponse.data.imageUrl,
                    name: axiosResponse.data.name
                }
                console.log('newsesion', newSession);
                setUserSession(newSession);
                // localStorage.removeItem("session");
                // localStorage.removeItem("temp_session");
                // localStorage.setItem("session", JSON.stringify(newSession));

            })
            .catch((reason: AxiosError) => {
            })
    }

    useEffect(() => {
        init();
    }, []);

    function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        ReactGA.event({
            category: "DataRefresh",
            action: "PullToRefreshUserActivity",
        });
        setTimeout(() => {
            console.log('handleRefresh event fired for useractivity');
            const session = JSON.parse(localStorage.getItem('session') || "");
            if (session == "") {
                setSessionExists(false);
            }
            setUserId(session.userId);
            loadUserProfile();
            // loadUserActivityFeed();
            event.detail.complete();
        }, 2000);
    }

    function googleMapsAddressRedirection(startAdd: any, destAdd: any) {
        window.open('https://www.google.com/maps/dir/' + startAdd + "/" + destAdd);
    }

    useEffect(() => {
        //scroll to the bottom.
        const list: NodeListOf<HTMLIonContentElement> = document.querySelectorAll('ion-content')
        if (list.length) {
            const content: HTMLIonContentElement = list[list.length - 1]
            content.scrollToBottom()
        }
    }, [conversationDetails]);

    function newRide() {
        history.push('/post');
    }


    function editName() {
        setEditNameEnabled(true);
    }

    async function exectueEditName() {
        if (localStorage.getItem('session')  == null) {
            setSessionExists(false);
            return;
        }
        globalSessionObj = JSON.parse(localStorage.getItem('session') || "");
        if (globalSessionObj== undefined || globalSessionObj.wagon_token == null || globalSessionObj.wagon_token == '') {
            setSessionExists(false);
            return;
        }
        ReactGA.event({
            category: "settings_edit_name_attempt",
            action: "settings_edit_name_attempt",
        });
        console.log(editedName);
        const postRequestBody = {
            // id: userSession.userId,
            name: editedName,
            email: userSession.token,
            gender: userSession.gender,
        };
        console.log(postRequestBody);
        axios.put(import.meta.env.VITE_APP_API_V2 + '/user/update', postRequestBody, {headers: { 'Authorization': globalSessionObj.wagon_token } })
            .then(async (axiosResponse: AxiosResponse) => {
                ReactGA.event({
                    category: "settings_edit_name_success",
                    action: "settings_edit_name_success",
                });
                loadUserProfile();
                setEditNameEnabled(false);
            })
            .catch((reason: AxiosError) => {
                ReactGA.event({
                    category: "settings_edit_name_failed",
                    action: "settings_edit_name_failed",
                });
                console.log(reason);
            })
    }

    function setEditNameEnabledText(editedName: any) {
        var re = /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{1,}\s?([a-zA-Z]{1,})?)/;
        setIsEditedNameValid(re.test(editedName));
        console.log(re.test(editedName));
        setEditedName(editedName);
    }

    async function uploadProfilePicture() {
        ReactGA.event({
            category: "settings_upload_pic_attmept",
            action: "settings_upload_pic_attmept",
        });
        if (localStorage.getItem('session')  == null) {
            setSessionExists(false);
            return;
        }
        globalSessionObj = JSON.parse(localStorage.getItem('session') || "");
        if (globalSessionObj== undefined || globalSessionObj.wagon_token == null || globalSessionObj.wagon_token == '') {
            setSessionExists(false);
            return;
        }
        setuserActivityFeedLoading(true);
        const url = import.meta.env.VITE_APP_API_V2 + '/user/upload_pic';
        const formData = new FormData();
        let blob = await fetch(imageUrl).then(r => r.blob());
        formData.append('file', blob)
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': globalSessionObj.wagon_token
            }
        }

        axios.post(url, formData, config).then(async (postMatchResponse: AxiosResponse) => {
            ReactGA.event({
                category: "settings_upload_pic_success",
                action: "settings_upload_pic_success",
            });
            console.log(postMatchResponse);
            loadUserProfile();
            setImageUrl("");
            setuserActivityFeedLoading(false);

        }).catch((axiosError: AxiosError) => {
            ReactGA.event({
                category: "settings_upload_pic_failed",
                action: "settings_upload_pic_failed",
            });
            setuserActivityFeedLoading(false);
            console.log(axiosError);
        })
    }

    function closeMenu() {
        ReactGA.event({
            category: "Menu",
            action: "MenuClosed",
        });
        //hist
        setMenuClicked(false);
    }

    function menuClicked() {
        ReactGA.event({
            category: "Menu",
            action: "MenuOpen",
        });
        //history.push('/menu');
        setMenuClicked(true);
    }

    const takePhoto = async () => {
       
        //const permissions = await Camera.requestPermissions();
        // console.log(permissions);
        try {
            console.log(await Camera.checkPermissions());
            // setCameraPermissions((await Camera.checkPermissions()).camera == 'granted' ? true : false);
            const photo = await Camera.getPhoto({
                quality: 90,
                allowEditing: true,
                resultType: CameraResultType.Uri
            });

            console.log('photo', photo);
            setImageUrl(photo.webPath || "");

            // image.webPath will contain a path that can be set as an image src.
            // You can access the original file using image.path, which can be
            // passed to the Filesystem API to read the raw data of the image,
            // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
            //var imageUrl = photo.webPath;
            //console.log('imageurl', imageUrl);
        } catch (e: any) {
            console.log(e);

        }


        // Can be set to the src of an image now


    }

    function cancelImageUpload() {
        setImageUrl("");
    }

    function closeChatModal() {
        infiniteLoop = false;
        setIsOpen(false);
    }

    function openVerifyModal() {
        ReactGA.event({
            category: "Verify",
            action: "VerfiyClicked",
        });

        setIsVerifyClicked(true);
    }

    function closeVerifyModal() {
        setIsVerifyClicked(false);
    }

    function submitHomeWorkAddress() {
        ReactGA.event({
            category: "settings_edit_work_address",
            action: "settings_edit_work_address",
        });
        if (localStorage.getItem('session')  == null) {
            setSessionExists(false);
            return;
        }
        globalSessionObj = JSON.parse(localStorage.getItem('session') || "");
        if (globalSessionObj== undefined || globalSessionObj.wagon_token == null || globalSessionObj.wagon_token == '') {
            setSessionExists(false);
            return;
        }
        const postRequestBody = {
            // userId: session.userId,
            homeAddress: homeAddress,
            homeLatitude: homeLatitude,
            homeLongitude: homeLongitude,
            officeAddress: workAddress,
            officeAddressName: workAddressName,
            officeLatitude: workLatitude,
            officeLongitude: workLongitude,

        };
        console.log(postRequestBody);
        setLoading(true);
        axios.post(import.meta.env.VITE_APP_API_V2 + '/user/addresses' , postRequestBody, {headers: { 'Authorization': globalSessionObj.wagon_token } })
            .then(async (postResponse: AxiosResponse) => {
                setLoading(false);
                ReactGA.event({
                    category: "SaveWorkAddress",
                    action: "SaveWorkAddress",
                });
                present({
                    message: 'Home and Work Address Saved Successfully!',
                    duration: 1000,
                });
                loadHomeWorkDetails();
                //setHomeWorkAddressExists(true);
            })
            .catch((reason: AxiosError) => {
                setLoading(false);
                present({
                    message: 'Error in saving home and work address, please try again later!',
                    duration: 1000,
                });
                ReactGA.event({
                    category: "SaveWorkAddressFailed",
                    action: "SaveWorkAddressFailed",
                });
            })
    }
    
    function logoutUser() {
        ReactGA.event({
            category: "logout_from_settings",
            action: "logout_from_settings",
        });
        console.log("signout");
        localStorage.removeItem('session');
        localStorage.removeItem('redirected_from');
        localStorage.removeItem('temp_session');
        localStorage.removeItem('carpool_category');
        window.location.reload();
        setSessionExists(false);
        
    }
    const [redirectToNewRide, setRedirectToNewRide] = React.useState(false);
    function newRideClicked() {
        ReactGA.event({
            category: "NewRide",
            action: "NewRideClickedFromHome",
        });
        setRedirectToNewRide(true);
    }

    return (
        <IonPage>
            {/* {
                redirectToNewRide ? <><IonReactRouter><Switch><Redirect to={{ pathname: '/scc' }} /><Route path="/App" component={SelectCarpoolCategory} /> </Switch></IonReactRouter></> : null
            }
            {
                !sessionExists ? <><IonReactRouter><Switch><Redirect exact to={{ pathname: '/router' }} /><Route path="/home" component={InternalRouter} /></Switch></IonReactRouter></> : null
            } */}

            {/* <IonItem routerLink='/menu' routerDirection='none'>
                <IonIcon size="large" slot="start" color="light" icon={menu}></IonIcon>
            </IonItem> */}

            <IonContent>
                {
                     userActivityFeedLoading ?
                        <IonLabel class="centerLabel"><IonSpinner color="primary"></IonSpinner></IonLabel>
                        : null
                }

                {/* <div className="centerFeed"> */}
                <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                {
                    localStorage.getItem('platform') == 'ios' ? <div className="topBarHomePage"></div> : null
                }

                {
                    sessionExists && !userActivityFeedLoading?
                    <IonCard >
                    <IonCardContent >
                        <IonButton size="small" color="medium" onClick=
                        {() =>
                            presentAlert({
                                header: 'Do you want to logout?',
                                buttons: [
                                    {
                                        text: 'No',
                                        role: 'cancel',
                                        handler: () => {
                                        },
                                    },
                                    {
                                        text: 'Yes',
                                        role: 'confirm',
                                        handler: () => {
                                            logoutUser();
                                        },
                                    },
                                ],
                                onDidDismiss: (e: CustomEvent) => null,
                            })
                        }
                        className="filterButton"><IonIcon icon={logOut}></IonIcon>logout</IonButton>
                        {/* <IonButton size="small" onClick={menuClicked} color="medium" className="menuButton"><IonIcon icon={menuOutline}></IonIcon></IonButton> */}

                        {/* <IonButton color="success" size="small" onClick={newRideClicked} className="filterButton">New Ride <IonIcon icon={addCircle}></IonIcon></IonButton> */}

                    </IonCardContent>

                </IonCard> : null

                }

                {
                    !userActivityFeedLoading ?
                        <IonCard >
                            <IonCardContent class="topBarHomePage">
                                {
                                    imageUrl != "" ?
                                        <>
                                            <IonImg src={imageUrl}></IonImg>
                                            <IonButton className="feedbackbutton" size="small" color="success" onClick={uploadProfilePicture}>Change Profile Picture</IonButton>
                                            <IonButton className="feedbackbutton" size="small" color="medium" onClick={cancelImageUpload}> Cancel</IonButton>
                                        </> :
                                        <>
                                        

                                            {
                                                userProfile.imageUrl == null ?
                                                    <>
                                                        <img className="feedItemImg" src="assets/img/avatar.svg" referrerPolicy='no-referrer' />
                                                        {
                                                            imageUrl == "" ? <IonIcon className="cursorPointer" onClick={takePhoto} icon={pencil}></IonIcon> : null
                                                        }
                                                    </>
                                                    :
                                                    <>

                                                        <img className="feedItemImg" src={userProfile.imageUrl} alt="" referrerPolicy='no-referrer' />
                                                        {
                                                            imageUrl == "" ? <IonIcon className="cursorPointer" onClick={takePhoto} icon={pencil}></IonIcon> : null
                                                        }
                                                    </>
                                            }
                                            {
                                                editNameEnabled ? <><hr /><IonItem><IonInput label="Edit Name" labelPlacement="stacked" fill="outline" clearInput={true} onIonInput={e => setEditNameEnabledText(e.detail.value)} placeholder="Firstname Lastname"></IonInput></IonItem><hr />
                                                    <span>
                                                        {
                                                            !isEditedNameValid ? <IonButton className="feedbackbutton" size="small" disabled color="success" onClick={exectueEditName}> Submit</IonButton>
                                                                :
                                                                <IonButton className="feedbackbutton" size="small" color="success" onClick={exectueEditName}> Submit</IonButton>
                                                        }

                                                        <IonButton className="feedbackbutton" size="small" onClick={() => { setEditNameEnabled(false) }} color="medium"> Cancel</IonButton>
                                                    </span>
                                                </>
                                                    : <><span className="feedName">{userProfile.name} </span>
                                                    
                                                    <IonIcon className="cursorPointer" onClick={editName} icon={pencil}></IonIcon>
                                                    </>
                                            }

                                            <hr />
                                            {
                                                userProfile.gender != 'U' ? <IonBadge color="medium" class="ionBadge" slot="end">{userProfile.gender == 'M' ? 'Male' : userProfile.gender == 'F' ? 'Female' : null} </IonBadge> : null
                                            }
                                            

                                            <IonBadge color="medium" class="ionBadge" slot="end">{userProfile.email} </IonBadge>
                                            {
                                                        userProfile.verificationStatus == 'STATUS_VERIFIED' ? <><IonBadge color="success" class="ionBadge" slot="end">Verified Profile</IonBadge><IonIcon size="small" color='success' icon={shieldCheckmarkSharp}></IonIcon></>: null
                                            }
                                            {
                                                        userProfile.verificationStatus == 'STATUS_PENDING' ? <><IonBadge color="warning" class="ionBadge" slot="end">Profile Verification Pending</IonBadge></>: null
                                            }
                                            


                                        </>
                                }
                            </IonCardContent>
                        </IonCard> : null
                }
                {/* {
                   !userActivityFeedLoading && userProfile.gender == 'U' ?
                        <IonCard>
                            <IonCardContent >
                                <IonAccordionGroup>
                                    <IonAccordion value="first">
                                        <IonItem slot="header" color="light">
                                            <IonLabel className="accordianLabel" color="success">Complete your User Profile</IonLabel>
                                        </IonItem>

                                        <div className="ion-padding" slot="content">
                                            <span>Please specify your gender</span>
                                            <IonSegment mode="ios" value={gender} onIonChange={e => setGender(e.detail.value)}>
                                                <IonSegmentButton value="M">
                                                    <IonLabel class="segmentLabel">Male</IonLabel>
                                                </IonSegmentButton>
                                                <IonSegmentButton value="F">
                                                    <IonLabel class="segmentLabel">Female</IonLabel>
                                                </IonSegmentButton>
                                                <IonSegmentButton value="O">
                                                    <IonLabel class="segmentLabel">Other</IonLabel>
                                                </IonSegmentButton>
                                            </IonSegment>

                                            <hr /><IonButton size="small" color="success" onClick={openVerifyModal} >Submit</IonButton>
                                        </div>
                                    </IonAccordion>
                                </IonAccordionGroup>
                            </IonCardContent>
                        </IonCard> : null
                } */}

                {
                    !userActivityFeedLoading ? 
                        <IonCard>
                            <IonCardContent >
                                {/* <IonAccordionGroup>
                                    <IonAccordion value="first">
                                        <IonItem slot="header" color="light"> */}
                                            {
                                                !homeWorkAddressExists ?
                                                <IonLabel className="accordianLabel" color="success">Enter your Home and Work Location</IonLabel>
                                                :
                                                <IonLabel className="accordianLabel" color="success">Edit your Home and Work Location</IonLabel>
                                            }
                                        {/* </IonItem> */}

                                        {/* <div className="ion-padding" slot="content"> */}
                                            <Autocomplete
                                                style={{ width: "100%" }}
                                                ref={inputHomeAddressRef}
                                                defaultValue={homeAddress}
                                                placeholder="Enter Your Home Address"
                                                apiKey='AIzaSyAqRnDMSLMKycFik1KIQkGx1RJBPp9QqwY'
                                                onPlaceSelected={(selected, a, c) => {
                                                    console.log(selected);
                                                    console.log(selected.name);
                                                    console.log(c);
                                                    console.log(a);
                                                    setHomeAddress(selected.formatted_address || "");
                                                    setHomeLatitude(selected.geometry?.location?.lat() || 0);
                                                    setHomeLongitude(selected.geometry?.location?.lng() || 0);
                                                }}
                                                options={{
                                                    types: ["geocode", "establishment"],
                                                    componentRestrictions: { country },
                                                    fields: ['formatted_address', 'geometry.location', 'name']
                                                }}
                                            />
                                            <hr />
                                            <Autocomplete
                                                style={{ width: "100%" }}
                                                ref={inputWorkAddressRef}
                                                defaultValue={workAddress}
                                                placeholder="Enter Your Work Address"
                                                apiKey='AIzaSyAqRnDMSLMKycFik1KIQkGx1RJBPp9QqwY'
                                                onPlaceSelected={(selected, a, c) => {
                                                    console.log(selected);
                                                    console.log(selected.name);
                                                    console.log(c);
                                                    console.log(a);
                                                    setWorkAddress(selected.formatted_address || "");
                                                    setWorkAddressName(selected.name || "");
                                                    setWorkLatitude(selected.geometry?.location?.lat() || 0);
                                                    setWorkLongitude(selected.geometry?.location?.lng() || 0);
                                                }}
                                                options={{
                                                    types: ["geocode", "establishment"],
                                                    componentRestrictions: { country },
                                                    fields: ['formatted_address', 'geometry.location', 'name']
                                                }}
                                            />
                                            <hr />
                                            {
                                                homeAddress != '' && workAddress != '' && !loading ? <IonButton color="success" onClick={submitHomeWorkAddress} size="small">Submit</IonButton> : loading ? <IonButton disabled color="success" size="small"> Submit <IonSpinner class="smallspinner" color="primary"></IonSpinner></IonButton> : <IonButton disabled color="success" size="small">Submit</IonButton>
                                            }
                                        {/* </div>
                                    </IonAccordion>
                                </IonAccordionGroup> */}
                            </IonCardContent>
                        </IonCard> : null
                }


                {
                    !userActivityFeedLoading && userProfile.verificationStatus == 'STATUS_UNVERIFIED' ?
                        <IonCard>
                            <IonCardContent >
                                <IonLabel className="verifyForFree" color="success">Verify for free <IonIcon size="small" color='success' icon={shieldCheckmarkSharp}></IonIcon></IonLabel><hr />
                                <span>Adding verification helps in creating trust and boosts your profile's authenticity.</span><hr />
                                {/* <span>Each verfied user gets a Green Leaf badge <IonIcon size="small" color="success" icon={shieldCheckmarkSharp}></IonIcon>.</span><hr /> */}
                                <IonButton fill="outline" size="small" color="success" onClick={openVerifyModal} className="verifyNowButton">Verify Now</IonButton>
                            </IonCardContent>
                        </IonCard> : null
                }

                {/* {
                    !userActivityFeedLoading ?
                        <IonCard className="myrides">
                            <IonCardContent>
                                <h1>My Rides</h1>
                            </IonCardContent>
                        </IonCard>
                        : null
                } */}

                {/* {
                    !userActivityFeedLoading && userActivityFeedData.length == 0 ?

                        <IonCard>
                            <IonCardContent>
                                Looks like you don't have any activity yet!
                                <hr />
                                <IonButton color="success" className="verifyNowButton" size="small" onClick={newRide} >Create a new ride <IonIcon icon={addCircle}></IonIcon></IonButton>
                            </IonCardContent>
                        </IonCard>
                        : null
                } */}

                {/* <div className="fixedheight">

                    {userActivityFeedData.map((item, index) => (

                        <IonCard key={index}>

                            <IonCardContent>
                                {
                                    item.rideRequest.driving == false ? <IonLabel color="success" >Riding on </IonLabel> : <IonLabel color="success">Driving on </IonLabel>
                                }
                                <IonLabel> {
                                    new Date(item.rideRequest.departureTime).toLocaleString(
                                        "en-US",
                                        {
                                            month: "short",
                                            day: "2-digit",
                                            year: "numeric",
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        }
                                    )} </IonLabel>
                                <hr />
                                {
                                    item.rideRequest.roundTrip ?
                                        <> <p className="feedDepartureTime">Tentative Return Time: {
                                            new Date(item.rideRequest.returnTime).toLocaleString(
                                                "en-US",
                                                {
                                                    month: "short",
                                                    day: "2-digit",
                                                    year: "numeric",
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                }
                                            )}</p></>
                                        : null
                                }


                                <IonButton onClick={() => googleMapsAddressRedirection(item.rideRequest.startAddress, item.rideRequest.destinationAddress)} className="feedaddressbuttons" color="success" size="small" fill="outline">{item.rideRequest.destinationAddressName == null ? item.rideRequest.destinationAddress : (item.rideRequest.destinationAddress.includes(item.rideRequest.destinationAddressName) ? item.rideRequest.destinationAddress : item.rideRequest.destinationAddressName + "," + item.rideRequest.destinationAddress.split(',').splice(item.rideRequest.destinationAddress.split(",").length - 3).join(',')).substring(0, 53).concat('..')}<IonIcon slot="end" size="small" icon={location}></IonIcon></IonButton>
                                <hr />

                                {
                                    item.requestStats.acceptedTotalSeatCount == 0 && item.requestStats.requestedTotalSeatCount == 0 ? <><IonBadge color="medium" class="ionBadge" slot="end">Ride Created</IonBadge></> : null
                                }
                                {
                                    item.rideRequest.seatCount - item.requestStats.acceptedTotalSeatCount == 0 ? <><IonBadge color="success" class="ionBadge" slot="end">Ride Approved</IonBadge></> : null
                                }
                                {
                                    item.requestStats.acceptedTotalSeatCount > 0 && item.rideRequest.seatCount - item.requestStats.acceptedTotalSeatCount == 1 ? <><IonBadge color="warning" class="ionBadge" slot="end">Ride Approved For {item.requestStats.acceptedTotalSeatCount} out of {item.rideRequest.seatCount} seats</IonBadge><hr /></> : null
                                }
                                {
                                    item.requestStats.requestedTotalSeatCount - item.requestStats.acceptedTotalSeatCount > 0 ? <><IonBadge color="warning" class="ionBadge" slot="end">Ride Request Sent</IonBadge></> : null
                                }
                                {
                                    item.rideRequest.roundTrip ? <IonBadge color="warning" class="ionBadge" slot="end">Round Trip</IonBadge> : <IonBadge color="warning" class="ionBadge" slot="end">One Way</IonBadge>
                                }
                                {
                                    item.rideRequest.driving ? <IonBadge color="warning" class="ionBadge" slot="end">You get: ${item.rideRequest.rideCost} </IonBadge> : <IonBadge color="warning" class="ionBadge" slot="end">You Pay: ${item.rideRequest.rideCost} </IonBadge>
                                }

                                <p>
                                    {

                                        <IonButton
                                            color="danger"
                                            fill="solid" className="userActivityContact"
                                            size="small"
                                            onClick={() =>
                                                presentAlert({
                                                    header: 'Do you want to cancel your ride?',
                                                    buttons: [
                                                        {
                                                            text: 'No',
                                                            role: 'cancel',
                                                            handler: () => {
                                                            },
                                                        },
                                                        {
                                                            text: 'Yes',
                                                            role: 'confirm',
                                                            handler: () => {
                                                                cancelRide(item.rideRequest.rideId);
                                                            },
                                                        },
                                                    ],
                                                    onDidDismiss: (e: CustomEvent) => null,
                                                })
                                            }>Cancel Ride</IonButton>

                                    }
                                   

                                    {
                                        item.requestStats.userAndRequestStatus.map((subItem: any, index: any) => (
                                            subItem.status == 1 ?
                                                <IonButton color="success" fill="solid" size="small" className="userActivityContact" onClick={() => loadChatModal(item, subItem)}>Contact {subItem.user.name}</IonButton> :
                                                <IonButton disabled color="success" fill="outline" size="small" className="userActivityContact">Request Sent to {subItem.user.name}</IonButton>
                                        ))
                                    }</p>


                            </IonCardContent>
                        </IonCard>
                    ))}
                </div> */}


                <IonModal id="example-modal" isOpen={isVerifyClicked}>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Verify</IonTitle>
                            <IonButtons slot="end">
                                <IonButton onClick={() => closeVerifyModal()}><IonIcon color="danger" className="closeIcon" icon={closeCircle}></IonIcon></IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">
                        <VerifyUser></VerifyUser>
                    </IonContent>
                </IonModal>

                {/* <IonModal id="example-modal" isOpen={isOpen}>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle color="dark">Message {receiver.name}</IonTitle>
                            <IonButtons slot="end">
                                <IonButton onClick={() => closeChatModal()}><IonIcon color="danger" className="closeIcon" icon={closeCircle}></IonIcon></IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">
                        <IonList class="chatbox">
                            {conversationDetails.map((item, index) => (
                                userId == item.senderUserId ?
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
                                                        hour: '2-digit', minute: '2-digit'
                                                    }
                                                )}</p>
                                        </IonText>
                                    </IonItem> :

                                    <IonItem className="chatbubble" key={index}>
                                        <IonAvatar class="chatavatar" slot="start">
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
                </IonModal> */}

                <IonModal id="example-modal" isOpen={goToMenu}>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Menu</IonTitle>
                            <IonButtons slot="end">
                                <IonButton onClick={() => closeMenu()}><IonIcon color="danger" className="closeIcon" icon={closeCircle}></IonIcon></IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">
                        <UserMenu></UserMenu>

                    </IonContent>
                </IonModal>


            </IonContent>
        </IonPage>

    );
}
export default UserActivity;
