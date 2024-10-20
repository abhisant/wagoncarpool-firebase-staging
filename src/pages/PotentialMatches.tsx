import React, { useState, useEffect, useRef, MutableRefObject } from 'react';
import { OverlayEventDetail } from '@ionic/core/components';
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
    IonLoading,
    IonListHeader,
    IonSkeletonText,
    IonThumbnail,
    IonSpinner,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonItemDivider,
    IonBadge,
    IonHeader,
    IonModal,
    IonDatetime,
    useIonAlert,
    useIonLoading,
    useIonViewDidEnter,
    IonRefresher,
    IonRefresherContent,
    RefresherEventDetail,
    IonSegment,
    IonSegmentButton,
    IonCheckbox,
    IonFab,
    IonFabButton,
    IonPopover,
    IonText,
    IonAccordionGroup,
    IonAccordion,
    IonRadioGroup,
    IonRadio,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { addCircle, settings, home, search, location, locationSharp, locationOutline, menu, map, mapOutline, mapSharp, star, pin, pinOutline, close, closeCircle, closeOutline, closeCircleSharp, closeCircleOutline, menuSharp, filter, shieldCheckmark, shieldCheckmarkSharp, funnel, funnelSharp, funnelOutline, menuOutline, add, addCircleOutline, addCircleSharp, leafSharp, logOut, starOutline, information, informationCircle, informationOutline, informationCircleSharp, informationCircleOutline, informationSharp, statsChart, searchCircleSharp, searchCircleOutline, logoFacebook, car, expand, chevronBackCircle, chevronCollapse, chevronDownCircle, chevronCollapseOutline, chevronDownCircleOutline, checkbox, checkmark, checkmarkDone, checkmarkCircle, micCircle, atCircleOutline, carOutline, carSportSharp, send, calendarClear, cash, carSharp } from 'ionicons/icons';
import { Redirect, Route, Switch } from 'react-router';
import App from '../App';
import { useLocation, useHistory, HashRouter, BrowserRouter } from 'react-router-dom';
import { Geolocation } from '@capacitor/geolocation';
import Geocode from 'react-geocode';
import axios, { AxiosError, AxiosResponse } from 'axios';
import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";
import GetStarted from './GetStarted';
import UserMenu from './UserMenu';
import VerifyUser from './VerifyUserComponent';
import Post from './Events';
import ReactGA from 'react-ga4';
import { Rating } from 'react-simple-star-rating';
import UserActivity from './UserActivity';
import GetRideFeedback from './GetRideFeedback';
import SelectCarpoolCategory from './SelectCarpoolCategory';
import SwiperComponent from './SwiperComponent';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';


const PotentialMatches = () => {
    let userRequestArr = [];
    let history = useHistory();
    Geocode.setApiKey('AIzaSyAqRnDMSLMKycFik1KIQkGx1RJBPp9QqwY');
    Geocode.setLanguage("en");
    Geocode.setRegion("us");
    const [presentAlert] = useIonAlert();
    const [present, dismiss] = useIonLoading();
    const [errorLogs, setErrorLogs] = useState('');
    const [statusMessages, setStatusMessages] = useState("");
    const [currLat, setCurrLat] = useState(0);
    const [currLon, setCurrLon] = useState(0);
    const [fromLocation, setUserFromLocation] = useState({ latitude: 0, "longitude": 0 });
    const [startAddress, setStartAddress] = useState("");
    const [destinationAddress, setDestinationAddress] = useState("");
    const [startAddressName, setStartAddressName] = useState("");
    const [destinationAddressName, setDestinationAddressName] = useState("");
    const [toLocation, setUserToLocation] = useState({ latitude: 0, "longitude": 0 });
    const [seats, setSeats] = useState("1");
    const [loading, setLoading] = useState(false);
    const [feedLoading, setFeedLoading] = useState(true);
    const [userActivityFeedLoading, setuserActivityFeedLoading] = useState(true);
    const [loadPotentialMatchSpinner, setLoadPotentialMatches] = useState(true);
    const [signInLoader, setSignInLoader] = useState(false);
    const inputRef = useRef(null);
    const [country] = useState("us");
    const [userActivityData, setUserActivityData] = useState<any>({});
    const [sessionExists, setSessionExists] = React.useState(true);
    const [displayType, setDisplayType] = React.useState<any>("1");
    const [userId, setUserId] = React.useState("0");
    const [invalidZipCode, setIsInvalidZipCode] = React.useState(false);
    const [loggedinUserId, setLoggedInUserId] = React.useState(0);
    const [userGender, setUserGender] = React.useState("");
    // Filters
    const dateFilter = useRef() as MutableRefObject<HTMLIonDatetimeElement>;
    const inputFilterStartLocationRef = useRef() as MutableRefObject<HTMLInputElement>;
    const inputFilterDestinationLocationRef = useRef() as MutableRefObject<HTMLInputElement>;

    const [feedSelectionFilter, setFeedSelectionFilter] = React.useState<any>("2");
    const [filterStartLatLong, setFilterStartLatLong] = useState({ "latitude": 0, "longitude": 0 });
    const [filterDestinationLatLong, setFilterDestinationLatLong] = useState({ "latitude": 0, "longitude": 0 });
    const [filterGender, setFilterGender] = React.useState(false);
    const [filterDepartureDate, setFilterDepartureDate] = React.useState("");
    const [startLocationFilterText, setStartLocationFilterText] = React.useState<any>("");
    const [destLocationFilterText, setDestLocationFilterText] = React.useState<any>("");
    const [filterCount, setFilterCount] = React.useState(0);
    const [filterStartAddress, setFilterStartAddress] = React.useState("");
    const [filterDestinationAddress, setFilterDestinationAddress] = React.useState("");
    const [filterStartName, setFilterStartName] = React.useState("");
    const [filterDestinationName, setFilterDestinationName] = React.useState("");
    const [userActivityFeedData, setuserActivityFeedData] = React.useState<any[]>([]);
    const [historicalRides, setHistoricalRides] = React.useState<any[]>([]);
    const [potentialMatches, setPotentialMatches] = React.useState<any[]>([]);
    const [redirectToFeedBackURL, setRedirectToFeedBackURL] = React.useState(false);

    const [isVerifyClicked, setIsVerifyClicked] = React.useState(false);

    const [goToMenu, setMenuClicked] = React.useState(false);
    const [redirectToNewRide, setRedirectToNewRide] = React.useState(false);
    const [redirectToUserActivity, setRedirectToUserActivity] = React.useState(false);

    const [receiver, setReceiver] = React.useState<any>({});
    const [sender, setSender] = React.useState<any>({});
    const [message, setMessageBody] = React.useState("");
    const [conversationDetails, setConversationDetails] = React.useState<any[]>([]);

    const [recommendedRidesFound, setRecommendedRidesFound] = useState(false);
    const [requesterRideId, setRequesterRideId] = useState(0);
    const [recommendedRidesLoading, setRecommendedRidesLoading] = useState(false);
    const [showRecommendedRideModal, setShowRecommendedRideModal] = useState(false);
    const [filpRiderDriver, setFlipRiderDriver] = useState(false);
    const [selectedItemDriving, setSelectedItemDriving] = useState(false);
    const [recommendedRidesFeedData, setRecommendedRidesFeedData] = React.useState<any[]>([]);

    const [checkedItems, setCheckedItems] = React.useState<any>({});
    const [matchListEmpty, setMatchListEmpty] = useState(0);
    const [forceRideCreateIndex, setForceRideCreate] =  useState(-1);
    const [matchSentForIndex, setMatchSentForIndex]  =  useState<any>([]);
    const [approvedMatchForIndex, setApprovedMatchForIndex]  =  useState<any>([]);
    
    let matchIndexArr: any = [];
    let matchApprovedIndexArr: any = [];

    const [findRideLoaderIndex, setFindRideLoaderIndex] = useState(-1);
    const [cancelRideModalOpen, setCancelRideModalOpen] = useState(false);
    const [rideCancellationReason, setRideCancellationReason] = useState<any>('xeqg!okjw');
    const [cancelRideId , setCancelRideID] = useState(-1);

    let infiniteLoop = true;

    const popover = useRef<HTMLIonPopoverElement>(null);
    const [popoverOpen, setPopoverOpen] = useState(false);

    const openPopover = (e: any) => {
        popover.current!.event = e;
        setPopoverOpen(true);
    };


    const { ref } = usePlacesWidget({
        apiKey: 'AIzaSyAqRnDMSLMKycFik1KIQkGx1RJBPp9QqwY',
        onPlaceSelected: (place) => console.log(place)
    })

    const delay = (ms: number) => new Promise(
        resolve => setTimeout(resolve, ms)
    );


    const [locationReceived, setLocationReceived] = React.useState(true);
    const [zipCodeFormVisible, setZipCodeFormVisible] = React.useState(true);
    const [feedData, setFeedData] = React.useState<any[]>([]);
    const [zipCode, setZipCode] = React.useState<any>('');

    const [items, setItems] = useState<string[]>([]);

    const [isOpen, setIsOpen] = useState(false);
    const [isFilterModalOpen, setFilterModelOpen] = useState(false);
    const [matchObject, setMatchObject] = useState<any>({});
    let matchedRideIdArr = [];
    let globalSessionObj:any;

    window.addEventListener('ionModalDidDismiss', (event) => {
        infiniteLoop = false;
        setIsOpen(false);
        setCancelRideModalOpen(false);
        setRideCancellationReason('xeqg!okjw');
        setCancelRideID(-1);
        setErrorLogs('');

        setFilterModelOpen(false);
        setIsVerifyClicked(false);
        setMenuClicked(false);
    });

    const getCurrentLocation = async () => {
        try {

            if (currLat == 0 || currLon == 0) {
                console.log("Getting Location");
                const coordinates = await Geolocation.getCurrentPosition();
                const lat = coordinates.coords.latitude;
                const lng = coordinates.coords.longitude;
                setCurrLat(lat);
                setCurrLon(lng);
                setLocationReceived(true);
                console.log('Current position:', lat + "," + lng);
                //loadFeed(lat, lng);
            } else {
                //loadFeed(currLat, currLon);
            }

        } catch (e: any) {
            console.log(e.message);
            setFeedLoading(false);
            setLocationReceived(false);
            console.log(currLat, currLon)
            setZipCodeFormVisible(true);
        }
    }

    function googleMapsAddressRedirection(startAdd: any, destAdd: any) {
        ReactGA.event({
            category: "Redirect",
            action: "GoogleMapsButtonClicked",
        });
        window.open('https://www.google.com/maps/dir/' + startAdd + "/" + destAdd);
    }

    function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        setTimeout(() => {
            init();
            event.detail.complete();
        }, 2000);
    }

    async function loadHistoricalRides() {
        ReactGA.event({
            category: "get_historical_rides",
            action: "get_historical_rides",
        });
        const getResponse = await axios.get(import.meta.env.VITE_APP_API_V2 + '/rides/user/history', {headers: { 'Authorization': globalSessionObj.wagon_token } });
        setHistoricalRides(getResponse.data);
    }

    async function loadPotentialMatches() {
        matchIndexArr = [];
        matchApprovedIndexArr = [];
        const getResponse = await axios.get(import.meta.env.VITE_APP_API_V2 + '/rides/user/commute_match', {headers: { 'Authorization': globalSessionObj.wagon_token } });
        // for (var i=0; i < getResponse.data.length; i++ ) {
        //     for (var k=0; k < getResponse.data[i].matchingRides.length; k++ ) {
        //         let matchingRidesObj = getResponse.data[i].matchingRides[k];
        //         for (var j=0; j < matchingRidesObj.requestStats.userAndRequestStatus.length; j++) {
        //             if (getResponse.data[i].matchingRides[k].requestStats.userAndRequestStatus[j].user.id == JSON.parse(localStorage.getItem('session') || "").userId) {
        //                  // if the ride is in pending state
        //                 if (getResponse.data[i].matchingRides[k].requestStats.userAndRequestStatus[j].status == 0) {
        //                     matchIndexArr.push(i +  k);
        //                 }
        //                 // if the ride is approved
        //                 if (getResponse.data[i].matchingRides[k].requestStats.userAndRequestStatus[j].status == 1) {
        //                     matchApprovedIndexArr.push(i + k);
        //                 }
                       
                        
        //             }
        //         }
        //     }
        // }
        console.log(matchIndexArr);
        setMatchSentForIndex(matchIndexArr);
        setApprovedMatchForIndex (matchApprovedIndexArr);
        setPotentialMatches(getResponse.data);
        setLoadPotentialMatches(false)
        console.log('potential matches', getResponse.data);
    }

    async function loadUserActivityFeed() {
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
            category: "get_user_rides",
            action: "get_user_rides",
        });
        // console.log(userData.state.data.session.userId);
        const getResponse = await axios.get(import.meta.env.VITE_APP_API_V2 + '/rides/user', {headers: { 'Authorization': globalSessionObj.wagon_token } });
        setSignInLoader(false);
        console.log(getResponse.data);
        setuserActivityFeedData(getResponse.data);
        setuserActivityFeedLoading(false);
    }

    useIonViewDidEnter(() => {
        ReactGA.send({ hitType: "pageview", page: "/app", title: "App" });
        // setShowNewRide(false);
        setRedirectToFeedBackURL(false);
        setRedirectToUserActivity(false);
        setRedirectToNewRide(false);
        console.log('ionViewDidEnter event fired');
        init();
    });

    function init() {
        setFlipRiderDriver(false);
        let urlParams = new URLSearchParams(window.location.href);
        console.log('urlParams',urlParams.get('tog'));
        if (urlParams.get('tog') !== null) {
           let toggleParam = urlParams.get('tog') || '';
           if (toggleParam == 'pm') {
            setDisplayType("1");
           }
           

        }
        // setDisplayType("0");
        const sessionObj = localStorage.getItem('session');
        if (sessionObj != null && JSON.parse(localStorage.getItem('session') || "").wagon_token != null && JSON.parse(localStorage.getItem('session') || "").wagon_token != '') {
            globalSessionObj = JSON.parse(localStorage.getItem('session') || "");
            axios.get(import.meta.env.VITE_APP_API_V2 + '/user', { headers: { 'Authorization': globalSessionObj.wagon_token } })
                .then(async (axiosResponse: AxiosResponse) => {
                    loadUserActivityFeed();
                    loadPotentialMatches();
                    //getCurrentLocation();
                    setUserId(JSON.parse(localStorage.getItem('session') || "").userId);
                    setSessionExists(true);
                    loadHistoricalRides();
                    
                })
                .catch((reason: AxiosError) => {
                    if (reason.response?.status === 401 || reason.response?.status === undefined) {
                        setSessionExists(false);
                        return;
                    }
                })
            
        } else {
            console.log("Session doesn't exist");
            localStorage.setItem("redirected_from", 'App');
            setSessionExists(false);
        }
    }

    useEffect(() => {
        GoogleAuth.initialize({
            clientId: '379793457253-quhbedbbmb57amflg3asqkgtunted6kd.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
            grantOfflineAccess: true,
        });
        init();
    }, []);

    function prepareForRideCancellation(rideId: number) {
        setCancelRideID(rideId);
        setCancelRideModalOpen(true);
    }
    
    function rideCancellationReasonHandler(reason: any) {
        console.log(reason);
        setErrorLogs('');
        setRideCancellationReason(reason);
    }

    function cancelRide() {
        console.log('RideId', cancelRideId);
        console.log(rideCancellationReason);
        if (rideCancellationReason == '' ) {
            setErrorLogs('Please select / enter the Ride Cancellation Reason');
            return;
        }

        if (rideCancellationReason == 'xeqg!okjw') {
            setErrorLogs('Please enter the Ride cancellation reason in the text area above!');
            return;
        }

        if (rideCancellationReason.length < 10) {
            setErrorLogs('Alteast 10 characters reason needed');
            return;
        }
        
        
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
            category: "CancelRide",
            action: "CancelRide",
        });
        console.log('Cancel ride id ', cancelRideId);
        setCancelRideModalOpen(false);
        setLoading(true);
        axios.delete(import.meta.env.VITE_APP_API_V2 + '/rides?id=' + cancelRideId + '&reason=' + rideCancellationReason, {headers: { 'Authorization': globalSessionObj.wagon_token } })
            .then(() => {
                loadUserActivityFeed();
                loadHistoricalRides();
            }
            );
        setLoading(false);
    }

    function loadChatModal(item: any, subItem: any) {
        // TODO:  Check whether a ride already exists
        setIsOpen(true);
        setReceiver({});
        setSender({});
        setMessageBody('');
        infiniteLoop = true;
        loadChat(item.user, subItem.user);
    }

    async function loadChat(senderObj: any, receiverObj: any) {
        ReactGA.event({
            category: "Chat",
            action: "LoadChat",
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
        console.log(senderObj);
        console.log(receiverObj);
        console.log('****');
        setReceiver(receiverObj);
        setSender(senderObj);
        const queryParams = {
            fromUserId: receiverObj.id,
        }

        let count = 0
        while (true) {
            if (infiniteLoop && count <60) {
                const getResponseInLoop = 
                await axios.get(import.meta.env.VITE_APP_API_V2 + '/messages?receiverNAT=' + receiverObj.nat
                , {headers: { 'Authorization': globalSessionObj.wagon_token } });

                const postResponse = await axios.post(import.meta.env.VITE_APP_API_V2 + '/messages/seen?senderNat='+ receiverObj.nat + '&lastSeenMessageId=' + 
                getResponseInLoop.data[getResponseInLoop.data.length-1].messageId, {} , {headers: { 'Authorization': globalSessionObj.wagon_token } });

                console.log(getResponseInLoop.data);
                setConversationDetails(getResponseInLoop.data);
                await new Promise(r => setTimeout(r, 5000));
            } else {
                setIsOpen(false);
                break;
            }
            count++;
        }

        // const getResponse =  await axios.get(import.meta.env.VITE_APP_API_V2 + '/messages?fromUserToken=' + receiverObj.token
        // , {headers: { 'Authorization': senderObj.token } });

        // console.log(getResponse.data);
        // setConversationDetails(getResponse.data);

        // const postResponse = await axios.post(import.meta.env.VITE_APP_API_V2 + '/messages/seen?sender='+ receiverObj.token + '&lastSeenMessageId=' +  getResponse.data[getResponse.data.length-1].messageId, {} , {headers: { 'Authorization': senderObj.token } });
        // console.log(postResponse.data);
    }

    function closeChatModal() {
        infiniteLoop = false;
        setIsOpen(false);
    }

    async function sendMessage() {
        if (localStorage.getItem('session')  == null) {
            setSessionExists(false);
            return;
        }
        globalSessionObj = JSON.parse(localStorage.getItem('session') || "");
        if (globalSessionObj== undefined || globalSessionObj.wagon_token == null || globalSessionObj.wagon_token == '') {
            setSessionExists(false);
            return;
        }
        console.log("sender:" + sender);
        console.log("receiver:" + receiver);
        if (sender == "{}" || receiver == "{}") {
            console.log("Throw validation error");
            return;
        }

        const postRequestBody = {
            senderUserId: sender.id,
            receiverUserId: receiver.id,
            sendTime: new Date().toISOString(),
            body: message,
        };
        setMessageBody("");
        console.log(postRequestBody);
        const postResponse = await axios.post(import.meta.env.VITE_APP_API_V2 + '/messages?receiverNat=' + receiver.nat, postRequestBody , {headers: { 'Authorization': globalSessionObj.wagon_token } });
        console.log(postResponse.data);
        loadChat(sender, receiver);
    }

    function messageBody(message: any) {
        console.log('message', message)
        setMessageBody(message);
    }

    function menuClicked() {
        ReactGA.event({
            category: "Menu",
            action: "MenuOpen",
        });
        //history.push('/menu');
        setMenuClicked(true);
    }

    function closeMenu() {
        ReactGA.event({
            category: "Menu",
            action: "MenuClosed",
        });
        //hist
        setMenuClicked(false);
    }

    function logoutUser() {
        console.log("signout");
        localStorage.removeItem('session');
        localStorage.removeItem('redirected_from');
        localStorage.removeItem('temp_session');
        localStorage.removeItem('carpool_category');
        setSessionExists(false);
        // window.location.reload();
    }
    function newRideClicked() {
        ReactGA.event({
            category: "new_ride_clicked_from_home",
            action: "new_ride_clicked_from_home",
        });
        window.location.replace('/scc');
        // history.push('scc');
        //setRedirectToNewRide(true);
    }

    function goToMyRides() {
        window.location.replace('/App');
    }

    async function findRecommendedRides(item: any, index: any) {
        if (localStorage.getItem('session')  == null) {
            setSessionExists(false);
            return;
        }
        globalSessionObj = JSON.parse(localStorage.getItem('session') || "");
        if (globalSessionObj== undefined || globalSessionObj.wagon_token == null || globalSessionObj.wagon_token == '') {
            setSessionExists(false);
            return;
        }
        console.log(matchListEmpty);
        setErrorLogs('');
        setStatusMessages('');
        ReactGA.event({
            category: 'find_matches_clicked',
            action: 'find_matches_clicked',
        });
        setFindRideLoaderIndex(index);
        setRecommendedRidesFeedData([]);
        setCheckedItems({});
        // setMatchListEmpty(false);

        setRecommendedRidesFound(false);
        setRecommendedRidesLoading(true);
        setRequesterRideId(item.rideRequest.rideId);
        let alreadyMatchedRidesArr = [];

        if (item.requestStats.requestedTotalSeatCount > 0 || item.requestStats.acceptedTotalSeatCount > 0) {
            for (let i = 0; i < item.requestStats.userAndRequestStatus.length; i++) {
                alreadyMatchedRidesArr.push(item.requestStats.userAndRequestStatus[i].rideId);
            }
        }
        matchedRideIdArr = alreadyMatchedRidesArr;
        console.log(alreadyMatchedRidesArr);

        console.log('item', item);
        let queryParams: any;
        queryParams = {
            rideId: item.rideRequest.rideId,
            locationLatitude: item.rideRequest.start_loc_lat,
            locationLongitude: item.rideRequest.start_loc_long,
            destLatitude: item.rideRequest.destination_loc_lat,
            destLongitude: item.rideRequest.destination_loc_long,
            radiusInMiles: 5,
            seatCount: item.rideRequest.seatCount,
            pageNum: 0,
            // look for the other entity, if user is a driver look for riders and viceversa
            //isDriving: !item.rideRequest.driving,
            pageSize: 100
        }

        //console.log(newDepartureDate);

        // yesterday
        var filterDepartureDateInUTCObj = new Date(item.rideRequest.departureTime);

        // plus minus 2 hours.
        var after = new Date(filterDepartureDateInUTCObj.setHours(filterDepartureDateInUTCObj.getHours() - 2)).toISOString();
        var before = new Date(filterDepartureDateInUTCObj.setHours(filterDepartureDateInUTCObj.getHours() + 4)).toISOString();
        console.log('curr-iso-utc', filterDepartureDateInUTCObj.toISOString());
        console.log('before', before);
        console.log('after', after);

        queryParams['before'] = before;
        queryParams['after'] = after;

        console.log(queryParams);

        const session = JSON.parse(localStorage.getItem('session') || "");
        const getResponse = await axios.get(import.meta.env.VITE_APP_API_V2 + '/rides/matches'
            , { params: queryParams, headers: { 'Authorization': globalSessionObj.wagon_token }});

        setRecommendedRidesLoading(false);

        console.log(getResponse.data);

        // loop through the recommended rides and remove the rideIds whom we 
        // have already sent a request.
        let filteredRecommendedRidesArr = [];
        let filteredFeedFlipDriverRider = [];
        console.log('matched ride arr', matchedRideIdArr);
        let drivingBool = item.rideRequest.driving;
        setSelectedItemDriving(drivingBool);

        for (let j = 0; j < getResponse.data.length; j++) {
            // console.log('ride id', getResponse.data[j].rideRequest.rideId);
            // console.log('rideRequest.seatCount',getResponse.data[j].rideRequest.seatCount);
            // console.log('requestStats.acceptedTotalSeatCount', getResponse.data[j].requestStats.acceptedTotalSeatCount);
            // console.log('condition 1' ,matchedRideIdArr.includes(getResponse.data[j].rideRequest.rideId));
            // console.log(getResponse.data[j].rideRequest.seatCount - getResponse.data[j].requestStats.acceptedTotalSeatCount);
            if ((!matchedRideIdArr.includes(getResponse.data[j].rideRequest.rideId) &&
                (getResponse.data[j].rideRequest.seatCount - getResponse.data[j].requestStats.acceptedTotalSeatCount > 0))) {
                    if (drivingBool !=  getResponse.data[j].rideRequest.driving) {
                        filteredRecommendedRidesArr.push(getResponse.data[j]);
                    } else {
                        filteredFeedFlipDriverRider.push(getResponse.data[j]);
                    }
            }
        }

        if (filteredRecommendedRidesArr.length == 0) {
            if (filteredFeedFlipDriverRider.length == 0) {
                ReactGA.event({
                    category: 'find_matches_no_match',
                    action: 'find_matches_no_match',
                });
                presentAlert({
                    header: 'No matching rides found!',
                    subHeader: 'We will notify you once other user sends you a match request.',
                    buttons: ['OK'],
                })
            } else {
                setFlipRiderDriver(true);
                setShowRecommendedRideModal(true);
                setRecommendedRidesFeedData(filteredFeedFlipDriverRider);
    
            }
        } else {
            ReactGA.event({
                category: 'find_matches_match_found',
                action: 'find_matches_match_found',
            });
            // setShowRideCreationModal(false);
            setShowRecommendedRideModal(true);
            
            setRecommendedRidesFeedData(filteredRecommendedRidesArr);
        }
    }
    function closeRecommendedRideModalModal() {
        setShowRecommendedRideModal(false);
    }

    function selectRidesToMatch(item: any) {
        console.log('called for = ', item?.rideRequest?.rideId);
        let tempCheckedItems = checkedItems;
        if (tempCheckedItems[item?.rideRequest?.rideId] === undefined || tempCheckedItems[item?.rideRequest?.rideId] === null) {
            tempCheckedItems[item?.rideRequest?.rideId] = true;
            setCheckedItems(tempCheckedItems);

        } else {
            delete tempCheckedItems[item?.rideRequest?.rideId];
            setCheckedItems(tempCheckedItems);
        }
        console.log(tempCheckedItems);
        // console.log(checkedItems);
        if (Object.keys(tempCheckedItems).length === 0) {
            setMatchListEmpty(0);
        } else {
            setMatchListEmpty(1);
        }
        console.log(Object.keys(tempCheckedItems).length);
    }


    async function matchRide() {
        if (localStorage.getItem('session')  == null) {
            setSessionExists(false);
            return;
        }
        globalSessionObj = JSON.parse(localStorage.getItem('session') || "");
        if (globalSessionObj== undefined || globalSessionObj.wagon_token == null || globalSessionObj.wagon_token == '') {
            setSessionExists(false);
            return;
        }
        setErrorLogs('');
        setStatusMessages('');
        console.log('Checked Items: ', checkedItems);
        //loop through checkedItems.
        let matchRequestStatusMessage = 'Match Request sent to - ';
        let failCount: number = 0;
        let successCount: number = 0;
        let totalCount: number = 0;

        let promises = [];
        for (const rideId in checkedItems) {
            totalCount++;
            if (checkedItems[rideId] == true) {
                //setLoading(true);
                console.log(rideId);
                const postMatchBody = {
                    requesterRideId: requesterRideId,
                    requestedRideId: rideId,
                    detourInMiles: 2,
                    status: 0
                }

                console.log('Match Body', postMatchBody);
                let url = '';
                if (filpRiderDriver) {
                    url =  import.meta.env.VITE_APP_API_V2 + '/rides/match_with_change'
                 } else {
                     url =  import.meta.env.VITE_APP_API_V2 + '/rides/match'
                 }

                promises.push(axios.post(url, postMatchBody, {headers: { 'Authorization': globalSessionObj.wagon_token } }).then(async (postMatchResponse: AxiosResponse) => {
                    console.log(postMatchResponse);
                    successCount = successCount + 1;
                }).catch((rideMatchPostError: AxiosError) => {
                    failCount = failCount + 1;
                    //setLoading(false);
                    if (rideMatchPostError.response?.status === 404 || rideMatchPostError.response?.status === 400) {
                        //setErrorLogs('Looks like there was something bad with the request, please try again with a valid input!');
                    } else if (rideMatchPostError.response?.status === 500) {
                        // setErrorLogs('Looks like we had something going bad with our server! Please try again in sometime!');
                    } else {
                        //setErrorLogs('Looks like we have something unexpected going on! Please try again in sometime.');
                    }
                }))
            }
        }
        Promise.all(promises).then(() => {

            setShowRecommendedRideModal(false);
            loadUserActivityFeed();

            console.log('success count', successCount);
            console.log('failed count', failCount);
            console.log('Total count', totalCount);

            if (successCount == 0) {
                present({
                    message: 'Failed to send the match request. Please try again later.',
                    duration: 5000,
                });
            } else {
                present({
                    message: successCount + ' out of ' + totalCount + 'matches requested successfully.',
                    duration: 3000,
                });
            }
        })

        //window.location.reload();


        //setLoading(false);

    }

    async function signIn(): Promise<void> {
        const response = await GoogleAuth.signIn();
        setSignInLoader(true);
        axios.post(import.meta.env.VITE_APP_API_V2 + '/user/token?idToken=' + response.authentication.idToken).then(async (response) => {
            console.log(response);
            const newSession = {
                created: new Date().getTime(),
                token: response.data.email,
                userId: response.data.id,
                gender: response.data.gender,
                imageUrl: response.data.imageUrl,
                wagon_token: response.data.token,
            }
            localStorage.removeItem("session");
            localStorage.removeItem("temp_session");
            localStorage.setItem("session", JSON.stringify(newSession));
            globalSessionObj = newSession;
            setSessionExists(true);
            if (Capacitor.isNativePlatform()) {
                let permStatus = await PushNotifications.checkPermissions();
                if (permStatus.receive === 'prompt') {
                  permStatus = await PushNotifications.requestPermissions();
                }
                if (permStatus.receive !== 'granted') {
                    console.log('User Denied Push Notifications');
                  throw new Error('User denied permissions!');
                }
                await PushNotifications.register();
            }
          
            init();

            let clientType = 'web';

            if (Capacitor.isNativePlatform()) {
                if (Capacitor.getPlatform() == 'ios') {
                    clientType = 'ios';
                }
                if (Capacitor.getPlatform() == 'android') {
                    clientType = 'android';
                }
            }
            let utm = '';
            let urlParams = new URLSearchParams(window.location.href);
            if (urlParams.get('es') !== null) {
                utm = urlParams.get('es') || '';
                
            } else {
                utm = 'organic'
            }
            
            axios.post(import.meta.env.VITE_APP_API_V2 + '/user/visit?ct=' + clientType + '&utm=' + (localStorage.getItem('entry_source') || 'organic'), {}, {headers: { 'Authorization': response.data.token } }).then(async (response) => {
                console.log('User Visits success');
            }).catch((reason) => {
                    console.log('User Visits Failed');
            })
        })
            .catch((reason) => {
            })
    }


    function toggleDisplayType(type: any) {
        getCurrentLocation();
        loadUserActivityFeed();
        loadHistoricalRides();
        loadPotentialMatches();
        setDisplayType(type);
    }

    function sendMatchRequest(item: any, index: any, globalItem: any) {
        console.log('match req index', index);
        if (localStorage.getItem('session') == null) {
            setSessionExists(false);
            return;
        }

        globalSessionObj = JSON.parse(localStorage.getItem('session') || "");
        if (globalSessionObj == undefined || globalSessionObj.wagon_token == null || globalSessionObj.wagon_token == '') {
            setSessionExists(false);
            return;
        }
        setStatusMessages('Creating a ride...');
        setForceRideCreate(index);
        // Create a ride and match
        const postRequestBody = {
            // userId: session.userId,
            departureTime: item.rideRequest.departureTime,
            start_loc_lat: globalItem.oldRide.start_loc_lat,
            start_loc_long: globalItem.oldRide.start_loc_long,
            destination_loc_lat: globalItem.oldRide.destination_loc_lat,
            destination_loc_long: globalItem.oldRide.destination_loc_long,
            seatCount: item.rideRequest.seatCount,
            driving: !item.rideRequest.driving,
            startAddress: item.rideRequest.startAddress,
            destinationAddress: globalItem.oldRide.destinationAddress,
            startAddressName: globalItem.oldRide.startAddressName,
            destinationAddressName: globalItem.oldRide.destinationAddressName,
            rideDistance: item.rideRequest.rideDistance,
            rideCost: null,
            roundTrip: item.rideRequest.roundTrip,
            rideType: item.rideRequest.rideType,
            labelsCsv: 'match-request',
            returnTime: item.rideRequest.returnTime
        };
        console.log(postRequestBody);
        ReactGA.event({
            category: "request_to_drive_attempt",
            action: "request_to_drive_attempt",
        });
        console.log(postRequestBody);
        console.log(index);

        axios.post(import.meta.env.VITE_APP_API_V2 + '/rides', postRequestBody, { headers: { 'Authorization': globalSessionObj.wagon_token } })
            .then(async (postResponse: AxiosResponse) => {
                setStatusMessages('Requesting a match');
                ReactGA.event({
                    category: "request_to_drive_success",
                    action: "request_to_drive_success",
                });
                ReactGA.event({
                    category: "request_to_drive_match_request",
                    action: "request_to_drive_match_request",
                });
                const matchPostBody = {
                    requesterRideId: postResponse.data,
                    requestedRideId: item.rideRequest.rideId,
                    detourInMiles: 2,
                    status: 0
                }
                axios.post(import.meta.env.VITE_APP_API_V2 + '/rides/match', matchPostBody, { headers: { 'Authorization': globalSessionObj.wagon_token } })
                    .then(async (matchResponse: AxiosResponse) => {
                        setStatusMessages('Match Request Sent..');
                        setForceRideCreate(-1);
                        var arr = [...matchSentForIndex];
                        arr.push(index);
                        setMatchSentForIndex(arr);
                        matchIndexArr.push(index);
                        loadUserActivityFeed();
                    }).catch((reason: any) => {
                        setForceRideCreate(-1);
                        present({
                            message: 'Unable to match, please try again later!',
                            duration: 2000,
                        });
                    })
            })
            .catch((reason: any) => {
                setForceRideCreate(-1);
                ReactGA.event({
                    category: "work_ride_create_failed" + "&status=" + reason.response?.status,
                    action: "work_ride_create_failed" + "&status=" + reason.response?.status,
                });
                setLoading(false);
                setStatusMessages('');
                setForceRideCreate(-1);
                if (reason.response?.status === 404 || reason.response?.status === 400) {
                    if (reason.response?.data.errorCode == 508) {
                        present({
                            message: 'You have another ride that conflicts with this ride. Please cancel the existing ride or create a ride for some other day.',
                            duration: 5000,
                        });
                        //setErrorLogs('You have another ride that conflicts with this ride. Please cancel the existing ride or create a ride for some other day.');
                    } else {
                        present({
                            message: 'Looks like there was something bad with the request, please try again with a valid input!',
                            duration: 2000,
                        });
                        // setErrorLogs('Looks like there was something bad with the request, please try again with a valid input!');
                    }
                } else if (reason.response?.status === 500) {
                    present({
                        message: 'Looks like there was something bad with the request, please try again with a valid input!',
                        duration: 2000,
                    });
                    // setErrorLogs('Looks like we had something going bad with our server! Please try again in sometime!');
                } else {
                    present({
                        message: 'Looks like there was something bad with the request, please try again with a valid input!',
                        duration: 2000,
                    });
                    //setErrorLogs('Looks like we have something unexpected going on! Please try again in sometime.');
                }
            })

    }

    function approveRejectRequest() {
        window.location.replace('/pendingRequests');
    }


    return (
        <IonPage>


            {/* {
                !sessionExists ? <><IonReactRouter><Switch><Redirect exact to={{ pathname: '/getstarted' }} /><Route path="/getstarted" component={GetStarted} /></Switch></IonReactRouter></> : null

            } */}
            {
                !sessionExists ? <>
                <IonCard   className="swiperCard"><IonCardContent></IonCardContent>

                    {/* <div className="swiperDiv"> */}
                        <SwiperComponent ></SwiperComponent>
                        </IonCard>
                    {/* </div> */}
                    {/* <IonGrid>
                        <IonRow>
                            <IonCol size="7"> */}
                            
                            <IonCard><IonCardContent>
                                <IonLabel class="loginwithGoogle">
                                    {
                                        signInLoader ?
                                            <IonButton disabled className="login-button" onClick={() => signIn()} expand="block" fill="solid" color="success">
                                                <IonSpinner className="smallspinner" color="primary"></IonSpinner> Login with Google
                                            </IonButton>
                                            :
                                            <> <IonButton className="login-button" onClick={() => signIn()} expand="block" fill="solid" color="success">
                                                Login with Google
                                            </IonButton>
                                            </>

                                    }

                                </IonLabel>
                                <div className="Terms">
                                    By Signing in you accept our
                                    <a className="termsandpolicylink" target="_blank" href="/terms" >Terms of use </a> and <a className="termsandpolicylink" target="_blank" href="/privacy-policy">privacy policy</a>

                                </div>
                                

                            {/* </IonCol>
                        </IonRow>
                        <br />
                    </IonGrid> */}
                    </IonCardContent></IonCard>
                    <br/>
                    <IonLabel className="footer">Copyright © 2024 Procsoft LLC.</IonLabel>
                                <IonLabel className="footer"> support@wagoncarpool.com</IonLabel>

                    {/* <SwiperComponent></SwiperComponent> */}
                   

                </> : null
            }
            {
                redirectToNewRide ? <IonReactRouter><Route path="/scc" component={SelectCarpoolCategory} /> </IonReactRouter>: null
            }
            {
                redirectToFeedBackURL ? <><IonReactRouter><Switch><Redirect to={{ pathname: '/getRideFeedback' }} /><Route path="/getRideFeedback" component={GetRideFeedback} /> </Switch></IonReactRouter></> : null
            }
            {
                redirectToUserActivity ? <><IonReactRouter><Switch><Redirect to={{ pathname: '/userActivity' }} /><Route path="/App" component={UserActivity} /> </Switch></IonReactRouter></> : null
            }
            {/* {
                goToMenu ? <UserMenu></UserMenu> : null
            } */}
            {/* {
                showNewRide ? <><Redirect exact to={{ pathname: '/post' }} /><Route path="/post" component={Post} /></> : null
            } */}
            {/* <IonItem routerLink='/menu' routerDirection='none'>
                <IonIcon size="large" slot="start" color="light" icon={menu}></IonIcon>
            </IonItem> */}



            <IonContent>
                <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>

                {/* <IonList> */}


                {
                    sessionExists ?
                        <div>
                            {
                                localStorage.getItem('platform') == 'ios' ? <div className="topBarHomePage"></div> : null
                            }
                            <IonCard >
                                <IonCardContent >
                                    
                                    {/* <IonButton size="small" onClick={menuClicked} color="medium" className="menuButton"><IonIcon icon={menuOutline}></IonIcon></IonButton> */}


                                    <IonButton color="success" size="small" shape="round" fill="outline" onClick={newRideClicked} className="filterButton">New Ride <IonIcon icon={addCircle}></IonIcon></IonButton>
                                    <IonButton color="success" size="small" shape="round" fill="outline"  onClick={goToMyRides} className="filterButton">My Rides <IonIcon className="homeButtonIcons" icon={carSharp}></IonIcon></IonButton>

                                </IonCardContent>

                            </IonCard></div>
                        : null

                }
                {/* {

                    sessionExists ?
                        <IonCard>
                            <IonCardContent>
                                <IonSegment mode="ios" value={displayType} onIonChange={e => toggleDisplayType(e.detail.value)}>
                                    <IonSegmentButton value="0">
                                        <IonLabel class="homeSegmentLabel">My Rides</IonLabel>
                                    </IonSegmentButton>
                                    <IonSegmentButton value="1">
                                        <IonLabel class="homeSegmentLabel">Potential Matches</IonLabel> 
                                    </IonSegmentButton>
                                    
                                </IonSegment>
                            </IonCardContent>
                        </IonCard> : null

                } */}



              
                {
                    displayType == "1" && loadPotentialMatchSpinner? 
                                    
                    <IonLabel className="centerLabel">  <IonSpinner color="primary"></IonSpinner> </IonLabel>
                                    
                    : null

                }

{
                    displayType == "1" && !loadPotentialMatchSpinner && potentialMatches.length == 0 && sessionExists ?
                        <IonCard color="">
                            <IonCardContent>
                                
                            <IonLabel className="cantFind">Currently, there are no potential matches. You'll receive an email once a suitable match is available.</IonLabel>
                            <IonLabel className="centerLabel">
                                    {
                                        loadPotentialMatchSpinner ? <IonSpinner color="primary"></IonSpinner> : null
                                    }
                                </IonLabel>

                            </IonCardContent>
                        </IonCard> : null
                }

{
                    displayType == "1" && !loadPotentialMatchSpinner && potentialMatches.length > 0 && sessionExists ?
                        <IonCard>
                            <IonCardContent>
                                <IonLabel className="cantFind">Based on your previous commute(s), the following ride(s) could be a good match for your office travel. Send a request to get matched.</IonLabel>
                                <IonLabel className="centerLabel">
                                    {
                                        loadPotentialMatchSpinner ? <IonSpinner color="primary"></IonSpinner> : null
                                    }
                                </IonLabel>

                                

                            </IonCardContent>
                        </IonCard> : null
                }

                {
                    displayType == "1" && sessionExists ?
                        <div className="fixedheight">
                            {
                                potentialMatches.map((globalItem, globalIndex) => (
                                    globalItem.matchingRides.map((item: any, index: any) => (

                                    <IonCard>

                                    <IonCardContent>
                                        {
                                            item.user.imageUrl == null ? <img className="feedItemImg" src="assets/img/avatar.svg" referrerPolicy='no-referrer' /> : <img className="feedItemImg" src={item.user.imageUrl} alt="" referrerPolicy='no-referrer' />
                                        }

                                        <span className="feedName">{item.user.name}
                                            {
                                                item.user.verificationStatus == 'STATUS_VERIFIED' ? <IonIcon size="small" color='success' icon={shieldCheckmarkSharp}></IonIcon> : null
                                            }

                                        </span>
                                        <p>
                                            {
                                                item.user.verificationStatus == 'STATUS_VERIFIED' ? <IonIcon size="small" color='success' icon={shieldCheckmarkSharp}></IonIcon> : null
                                            }
                                        </p>
                                        
                                        {
                                            item.rideRequest.driving == false ? <IonLabel color="success">Requesting a ride on </IonLabel> : <IonLabel color="success">Offering a ride on </IonLabel>
                                        }


                                        {
                                            new Date(item.rideRequest.departureTime).toLocaleString(
                                                "en-US",
                                                {
                                                    month: "short",
                                                    day: "2-digit",
                                                    year: "numeric",
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                }
                                            )}
                                        {/* {
                                    item.rideRequest.roundTrip ?
                                        <p className="feedDepartureTime">Tentative Return Time: {
                                            new Date(item.rideRequest.returnTime).toLocaleString(
                                                "en-US",
                                                {
                                                    month: "short",
                                                    day: "2-digit",
                                                    year: "numeric",
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                }
                                            )}</p>
                                        : null
                                } */}
                                        <br />


                                        <IonButton onClick={() => googleMapsAddressRedirection(item.rideRequest.startAddress, item.rideRequest.destinationAddress)} color='medium' className="feedaddressbuttons" size="small" fill="outline">{item.rideRequest.startAddressName == null ? item.rideRequest.startAddress : item.rideRequest.startAddress.includes(item.rideRequest.startAddressName) ? item.rideRequest.startAddress : (item.rideRequest.startAddressName + "," + item.rideRequest.startAddress.split(',').splice(item.rideRequest.startAddress.split(",").length - 3).join(',')).substring(0, 45).concat('..')}<IonIcon slot="end" size="small" icon={location}></IonIcon></IonButton>
                                        <br /><IonButton onClick={() => googleMapsAddressRedirection(item.rideRequest.startAddress, item.rideRequest.destinationAddress)} color="medium" className="feedaddressbuttons" size="small" fill="outline">{item.rideRequest.destinationAddressName == null ? item.rideRequest.destinationAddress : item.rideRequest.destinationAddress.includes(item.rideRequest.destinationAddressName) ? item.rideRequest.destinationAddress : (item.rideRequest.destinationAddressName + "," + item.rideRequest.destinationAddress.split(',').splice(item.rideRequest.destinationAddress.split(",").length - 3).join(',')).substring(0, 45).concat('..')}<IonIcon slot="end" size="small" icon={location}></IonIcon></IonButton>

                                        <hr />
                                        {
                                            item.rideRequest.driving == false ?
                                                item.rideRequest.seatCount != item.requestStats.acceptedTotalSeatCount ?
                                                    <IonBadge color="medium" class="ionBadge" slot="end">Seats: {item.rideRequest.seatCount - item.requestStats.acceptedTotalSeatCount}</IonBadge> : null :

                                                item.rideRequest.seatCount != item.requestStats.acceptedTotalSeatCount ?
                                                    <IonBadge color="medium" class="ionBadge" slot="end">Seats: {item.rideRequest.seatCount - item.requestStats.acceptedTotalSeatCount}</IonBadge> : null
                                        }
                                        {
                                            item.rideRequest.roundTrip ? <IonBadge color="medium" class="ionBadge" slot="end">Round Trip</IonBadge> : <IonBadge color="medium" class="ionBadge" slot="end">One Way</IonBadge>
                                        }

                                        {
                                            item.rideRequest.driving == false ?
                                                <IonBadge color="medium" className="ionBadge" slot="end">You Get: ${item.rideRequest.rideCost}</IonBadge> :

                                                <IonBadge color="medium" className="ionBadge" slot="end">You Pay: ${item.rideRequest.rideCost}</IonBadge>
                                        }
                                        <IonBadge color="medium" className="ionBadge" slot="end">{item.rideRequest.labelsCsv}</IonBadge>
                                        <hr/>
                                        
                                
                                        {
                                            matchSentForIndex.includes(globalIndex + index) ? 
                                           <> <IonButton color="success" className="feedbackbutton"  disabled size="small" fill="outline">Match Request Sent <IonIcon icon={checkmarkCircle}></IonIcon></IonButton>
                                            <IonButton size="small" fill="outline" onClick={() => toggleDisplayType("0")} className="feedbackbutton"  color="success">View Ride</IonButton>
                                            </> : null
                                        }
                                        {
                                            approvedMatchForIndex.includes(globalIndex + index) ?
                                            <> <IonButton color="success" className="feedbackbutton"  disabled size="small" fill="outline">Match Request Approved <IonIcon icon={checkmarkCircle}></IonIcon></IonButton>
                                            </> : null
                                        }
                                        {
                                            // item.rideRequest.driving == false && 
                                            !matchSentForIndex.includes(globalIndex + index) && !approvedMatchForIndex.includes(globalIndex + index)? 
                                            forceRideCreateIndex == (globalIndex + index) ? <IonButton disabled color="success"  className="feedbackbutton" size="small" > {statusMessages} <IonIcon icon={car}></IonIcon><IonSpinner class="smallspinner" color="primary"></IonSpinner></IonButton>
                                            :
                                            <IonButton color="success"  className="feedbackbutton" size="small" 
                                            onClick={() =>
                                                presentAlert({
                                                    header: 'This will create a new ride & send a match request to another user. Do you want to proceed?',
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
                                                                sendMatchRequest(item, (globalIndex + index), globalItem);
                                                            },
                                                        },
                                                    ],
                                                    onDidDismiss: (e: CustomEvent) => null,
                                                })
                                            }
                                             
                                             >Send Match Request </IonButton> : null
                                        }


                                    </IonCardContent>
                                    </IonCard>
                                    ))
                                ))
                            }
                        </div> : null
                }
                            
                
                {
                    sessionExists && displayType == "0" ?
                        <IonCard className="myHistoricalRides">
                            <IonCardContent>
                                <h2>Active Rides</h2>

                                <IonLabel className="centerLabel">
                                    {
                                        userActivityFeedLoading ? <IonSpinner color="primary"></IonSpinner> : null
                                    }
                                </IonLabel>

                            </IonCardContent>
                        </IonCard> : null
                }
                
                {

                    displayType == "0" && !userActivityFeedLoading && userActivityFeedData.length == 0 && sessionExists ?
                        <IonCard>
                            <IonCardContent>
                                <IonLabel>You don't have any active rides at this moment!</IonLabel><br />
                                <IonButton fill="outline" color="success" size="small" onClick={newRideClicked} className="filterBadge" >New Ride <IonIcon icon={addCircle}></IonIcon></IonButton>
                                {/* <IonButton fill="outline" color="success" size="small" onClick={() => { setDisplayType("1") }} className="filterBadge">People around Me</IonButton> */}
                            </IonCardContent>
                        </IonCard>
                        : null

                }


                {
                    displayType == "0" && sessionExists ?
                        <div className="fixedheight">
                            {userActivityFeedData.map((item, index) => (

                                <IonCard key={index}>

                                    <IonCardContent>
                                        {
                                            item.rideRequest.driving == false ? <IonLabel color="success" >Requesting a Ride on </IonLabel> : <IonLabel color="success">Offering a ride on </IonLabel>
                                        }
                                        {/* <hr/> */}


                                        {/* <p className="feedDepartureTime"> */}
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
                                        {/* </p> */}

                                        <br />
                                        {
                                            item.rideRequest.labelsCsv == 'work-commute' && item.rideRequest.roundTrip
                                                ?
                                                <IonLabel> and returning at  {
                                                    new Date(item.rideRequest.returnTime).toLocaleString(
                                                        "en-US",
                                                        {
                                                            // month: "short",
                                                            // day: "2-digit",
                                                            // year: "numeric",
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        }
                                                    )} </IonLabel> : null
                                        }
                                        {/* {
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
                                } */}


                                        {/* {
                item.requestStats.acceptedTotalSeatCount > 0 ? 
                null
                // <p>Passengers Matched: {item.requestStats.acceptedTotalSeatCount} out of {item.rideRequest.seatCount}</p> 
                
                : <><hr/><p>Passengers: {item.rideRequest.seatCount} </p><hr/></>
            } */}



                                        {/* <IonButton onClick={() => googleMapsAddressRedirection(item.rideRequest.startAddress, item.rideRequest.destinationAddress)} className="feedaddressbuttons" color="success" size="small" fill="outline">{item.rideRequest.startAddressName == null ? item.rideRequest.startAddress : item.rideRequest.startAddress.includes(item.rideRequest.startAddressName) ? item.rideRequest.startAddress : (item.rideRequest.startAddressName + "," + item.rideRequest.startAddress.split(',').splice(item.rideRequest.startAddress.split(",").length - 3).join(',')).substring(0, 53).concat('..')}<IonIcon slot="end" size="small" icon={location}></IonIcon></IonButton>
            <br></br> */}
                                        {/* <IonButton onClick={() => googleMapsAddressRedirection(item.rideRequest.startAddress, item.rideRequest.destinationAddress)} className="feedaddressbuttons" size="small" color="medium" fill="clear">To</IonButton><br></br> */}
                                        {/* <IonButton onClick={() => googleMapsAddressRedirection(item.rideRequest.startAddress, item.rideRequest.destinationAddress)} className="feedaddressbuttons" color="success" size="small" fill="outline">{item.rideRequest.destinationAddressName == null ? item.rideRequest.destinationAddress : (item.rideRequest.destinationAddress.includes(item.rideRequest.destinationAddressName) ? item.rideRequest.destinationAddress : item.rideRequest.destinationAddressName + "," + item.rideRequest.destinationAddress.split(',').splice(item.rideRequest.destinationAddress.split(",").length - 3).join(',')).substring(0, 45)}<IonIcon slot="end" size="small" icon={location}></IonIcon></IonButton> */}
                                        {/* <IonBadge color="dark" class="ionBadge_addresslink" >
                     <a className="addresslink" target="_blank" rel="noopener noreferrer" href="" onClick={() => googleMapsAddressRedirection(item.rideRequest.startAddress, item.rideRequest.destinationAddress)}> From<br /><br /> {item.rideRequest.startAddress} </a><br />
                     <a className="addresslink" target="_blank" rel="noopener noreferrer" href="" onClick={() => googleMapsAddressRedirection(item.rideRequest.startAddress, item.rideRequest.destinationAddress)}><br /> To <br /><br /> {item.rideRequest.destinationAddress}</a>
                </IonBadge>
                <hr /> */}

                                        {/* <p> Departure Time: </p>
                <IonBadge class="ionBadge">
                {
                    new Date(item.departureTime).toLocaleString(
                        "en-US",
                        {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                        }
                    )}</IonBadge> */}
                                        {
                                            item.rideRequest.seatCount - item.requestStats.acceptedTotalSeatCount == 0 ? <><hr /><IonBadge color="success" class="ionBadge" slot="end">Ride Approved</IonBadge></> : null
                                        }
                                        {
                                            item.requestStats.acceptedTotalSeatCount > 0 && item.rideRequest.seatCount - item.requestStats.acceptedTotalSeatCount == 1 ? <><hr /><IonBadge color="medium" class="ionBadge" slot="end">Ride Approved For {item.requestStats.acceptedTotalSeatCount} out of {item.rideRequest.seatCount} seats</IonBadge><hr /></> : null
                                        }
                                        {/* {
                                            item.requestStats.requestedTotalSeatCount - item.requestStats.acceptedTotalSeatCount > 0 ? <><hr /><IonBadge color="medium" class="ionBadge" slot="end">Ride Request Sent</IonBadge></> : null
                                        } */}
                                        {/* <IonAccordionGroup>
                                            <IonAccordion value="first">
                                                <IonItem slot="header" color="light">
                                                    <IonLabel className="accordianLabel" color="medium">View Details</IonLabel>
                                                </IonItem> */}

                                        {/* <div className="ion-padding" slot="content"> */}
                                        <hr />
                                        <IonButton onClick={() => googleMapsAddressRedirection(item.rideRequest.startAddress, item.rideRequest.destinationAddress)} className="feedaddressbuttons" color="medium" size="small" fill="outline">{item.rideRequest.destinationAddressName == null ? item.rideRequest.destinationAddress : (item.rideRequest.destinationAddress.includes(item.rideRequest.destinationAddressName) ? item.rideRequest.destinationAddress : item.rideRequest.destinationAddressName + "," + item.rideRequest.destinationAddress.split(',').splice(item.rideRequest.destinationAddress.split(",").length - 3).join(',')).substring(0, 45)}<IonIcon slot="end" size="small" icon={location}></IonIcon></IonButton>
                                        <hr />
                                        {/* {
                                                        item.requestStats.acceptedTotalSeatCount == 0 && item.requestStats.requestedTotalSeatCount == 0 ? <><IonBadge color="medium" class="ionBadge" slot="end">Ride Created</IonBadge></> : null
                                                    } */}
                                        {
                                            item.rideRequest.labelsCsv != null ? <IonBadge color="medium" class="ionBadge" slot="end">{item.rideRequest.labelsCsv}</IonBadge> : null
                                        }
                                        <IonBadge color="medium" class="ionBadge" slot="end">Seats: {item.rideRequest.seatCount}</IonBadge>

                                        {
                                            item.rideRequest.roundTrip ? <IonBadge color="medium" class="ionBadge" slot="end">Round Trip</IonBadge> : <IonBadge color="medium" class="ionBadge" slot="end">One Way</IonBadge>
                                        }
                                        {
                                            item.rideRequest.driving ? <IonBadge color="medium" class="ionBadge" slot="end">You get: ${item.rideRequest.rideCost} </IonBadge> : <IonBadge color="medium" class="ionBadge" slot="end">You Pay: ${item.rideRequest.rideCost} </IonBadge>
                                        }
                                        <IonIcon className="feeIcon" onClick={openPopover} icon={informationCircle}></IonIcon> <br />
                                        
                                        <hr />
                                        {/* </div> */}
                                        {/* </IonAccordion>
                                        </IonAccordionGroup> */}


                                        {/* <IonBadge class="ionBadge" slot="end">Seats Matched: {item.requestStats.acceptedTotalSeatCount} out of {item.requestedMatchCount}</IonBadge> */}
                                        <p>
                                            {
                                                <IonButton
                                                    color="danger"
                                                    fill="solid" className="userActivityContact"
                                                    size="small"
                                                    onClick={() => prepareForRideCancellation(item.rideRequest.rideId)}
                                                    // onClick={() =>
                                                    //     presentAlert({
                                                    //         header: 'Do you want to cancel your ride?',
                                                    //         buttons: [
                                                    //             {
                                                    //                 text: 'No',
                                                    //                 role: 'cancel',
                                                    //                 handler: () => {
                                                    //                 },
                                                    //             },
                                                    //             {
                                                    //                 text: 'Yes',
                                                    //                 role: 'confirm',
                                                    //                 handler: () => {
                                                    //                     cancelRide(item.rideRequest.rideId);
                                                    //                 },
                                                    //             },
                                                    //         ],
                                                    //         onDidDismiss: (e: CustomEvent) => null,
                                                    //     })
                                                    // }
                                                    >Cancel Ride</IonButton>
                                                //  : null

                                            }
                                            {
                                                item.rideRequest.seatCount - item.requestStats.acceptedTotalSeatCount != 0 ?
                                                    (recommendedRidesLoading && findRideLoaderIndex == index ?
                                                        <>  <IonButton disabled color="success" fill="solid" size="small" className="userActivityContact" onClick={() => findRecommendedRides(item, index)}>Find Matches <IonSpinner class="smallspinner"></IonSpinner></IonButton></>
                                                        : <><IonButton color="success" fill="solid" size="small" className="userActivityContact" onClick={() => findRecommendedRides(item, index)}>Find Matches</IonButton></>
                                                    )


                                                    : null
                                            }
                                            {/* {
                    <IonButton size="small" className="userActivityContact">match</IonButton>
            } */}

                                            {
                                                item.requestStats.userAndRequestStatus.map((subItem: any, index: any) => (
                                                    subItem.status == 0 ? 
                                                    <><IonButton disabled color="medium" fill="outline" size="small" className="userActivityContact"> {subItem.isApprover? <>Match request sent to</> 
                                                    : <>Received a match request from</>} {subItem.user.name}</IonButton> 
                                                    {
                                                    !subItem.isApprover? <IonButton color="success" fill="solid" onClick={() => approveRejectRequest()}  className="userActivityContact" size="small"> <>Approve / Reject Match Request</></IonButton>
                                                    : null
                                                    }
                                                    {/* <IonButton color="success" fill="solid" size="small" className="userActivityContact" onClick={() => loadChatModal(item, subItem)}>Contact {subItem.user.name}</IonButton> */}
                                                    </> 
                                                    : 
                                                    // subItem.status == 1 ||
                                                     subItem.status == 1 ? <IonButton color="success" fill="solid" size="small" className="userActivityContact" onClick={() => loadChatModal(item, subItem)}>Contact {subItem.user.name}</IonButton> : null
                                                ))
                                            }</p>


                                    </IonCardContent>
                                </IonCard>
                            ))}
                        </div> : null
                }
               

                {/* {
                    sessionExists && displayType == "0" && historicalRides.length > 0 ?
                        <IonCard className="myrides">
                            <IonCardContent>
                                <h2>Ride History</h2>
                            </IonCardContent>
                        </IonCard> : null
                } */}
                {/* {
                    sessionExists && displayType == "" && historicalRides.length == 0 ?
                        <IonCard>
                            <IonCardContent>
                            <IonLabel>Looks like you haven't created rides yet!</IonLabel><br />
                                <IonButton fill="outline" color="success" size="small" onClick={newRideClicked} className="filterBadge" >New Ride <IonIcon icon={addCircle}></IonIcon></IonButton>
                            </IonCardContent>
                        </IonCard> : null
                } */}

                
                
                {
                    displayType == "0" && sessionExists && historicalRides.length > 0?
                
                        <>
                        <IonAccordionGroup>
      <IonAccordion >
        <IonCard slot="header" className="myHistoricalRides">
         <IonCardContent><h2>Ride History <IonIcon icon={chevronCollapse}></IonIcon></h2></IonCardContent>
        </IonCard>
        <div slot="content">
          
        
                        {/* <IonCard className="myrides">
                            <IonCardContent>
                                <h2>Ride History</h2>
                            </IonCardContent>
                        </IonCard> */}
                            {
                                historicalRides.map((item, index) => (

                                    <IonCard key={index}>
                                        <IonCardContent>
                                        {
                                            item.rideRequest.driving == false ? <IonLabel color="success" >Ride Requested on </IonLabel> : <IonLabel color="success">Ride Offered on</IonLabel>
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
                                        {/* </p> */}

                                        <br />
                                        {
                                            item.rideRequest.labelsCsv == 'work-commute' && item.rideRequest.roundTrip
                                                ?
                                                <IonLabel> and returning at  {
                                                    new Date(item.rideRequest.returnTime).toLocaleString(
                                                        "en-US",
                                                        {
                                                            // month: "short",
                                                            // day: "2-digit",
                                                            // year: "numeric",
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        }
                                                    )} </IonLabel> : null
                                        }
                                        
                                        
                                        <hr />
                                        <IonButton onClick={() => googleMapsAddressRedirection(item.rideRequest.startAddress, item.rideRequest.destinationAddress)} className="feedaddressbuttons" color="success" size="small" fill="outline">{item.rideRequest.destinationAddressName == null ? item.rideRequest.destinationAddress : (item.rideRequest.destinationAddress.includes(item.rideRequest.destinationAddressName) ? item.rideRequest.destinationAddress : item.rideRequest.destinationAddressName + "," + item.rideRequest.destinationAddress.split(',').splice(item.rideRequest.destinationAddress.split(",").length - 3).join(',')).substring(0, 45)}<IonIcon slot="end" size="small" icon={location}></IonIcon></IonButton>
                                        <hr />
                                       
                                        <IonBadge color="medium" class="ionBadge" slot="end">Seats: {item.rideRequest.seatCount}</IonBadge>

                                        {
                                            item.rideRequest.roundTrip ? <IonBadge color="medium" class="ionBadge" slot="end">Round Trip</IonBadge> : <IonBadge color="medium" class="ionBadge" slot="end">One Way</IonBadge>
                                        }
                                        {
                                            item.rideRequest.driving ? <IonBadge color="medium" class="ionBadge" slot="end"> ${item.rideRequest.rideCost} </IonBadge> : <IonBadge color="medium" class="ionBadge" slot="end"> ${item.rideRequest.rideCost} </IonBadge>
                                        }
                                        {/* <IonIcon className="feeIcon" onClick={openPopover} icon={informationCircle}></IonIcon> <br /> */}
                                        {
                                            item.rideRequest.labelsCsv != null ? <IonBadge color="medium" class="ionBadge" slot="end">{item.rideRequest.labelsCsv}</IonBadge> : null
                                        }
                                        {
                                            item.status == 'STATUS_INCOMPLETE' ? <IonBadge color="medium" class="ionBadge" slot="end">Ride Not Completed</IonBadge> : null
                                        }
                                        {
                                            item.status == 'STATUS_CANCELLED' ? <IonBadge color="danger" class="ionBadge" slot="end">Ride Canceled</IonBadge> : null
                                        }
                                        {
                                            item.status == 'STATUS_COMPLETE' ? <IonBadge color="success" class="ionBadge" slot="end">Ride Complete</IonBadge> : null
                                        }
                                        <hr />
                                        
                                       

                                        </IonCardContent>
                                    </IonCard>


                                ))
                            }
                            </div>
      </IonAccordion>
    </IonAccordionGroup>
                            </> 
                           
                            : null
                }
               


                {/* {sessionExists && displayType == "0" ? <><hr />
                    <IonLabel className="footer">Copyright © 2024 Procsoft LLC.</IonLabel>
                    <IonLabel className="footer"> support@wagoncarpool.com</IonLabel><hr /></> : null
                } */}

                {/* {
                    sessionExists && displayType == "1" ?
                        <IonCard className="myrides">
                            <IonCardContent>
                                {
                                    sessionExists ? <h2>People Around Me</h2> : null
                                }

                                <IonLabel className="centerLabel">
                                    {
                                        sessionExists && feedLoading ? <IonSpinner color="primary"></IonSpinner> : null
                                    }
                                </IonLabel>
                            </IonCardContent>
                        </IonCard> : null
                } */}
                {/* {
                    displayType == "1" && !locationReceived && zipCodeFormVisible && feedData.length == 0 ?
                        <IonCard>
                            <IonCardContent >
                                Looks like we didn't get your location access<hr />
                                Please enter the zipcode to get the carpoolers around you.
                                <IonInput type="number" className="zipcodeinput" placeholder="Enter your zipcode" onIonInput={(e) => setZipCode(e.target.value)}></IonInput>
                                <hr />
                                <IonButton size="small" color="success" onClick={getLocationByZipCode} >Submit</IonButton>
                                {
                                    invalidZipCode ? <IonLabel position="stacked" color='danger'>Please enter a valid zipcode.</IonLabel> : null
                                }
                            </IonCardContent></IonCard>


                        : null
                } */}




                {/* {
                    displayType == "1" ?
                        <div className="fixedheight">

                            {feedData.map((item, index) => (

                                <IonCard key={index}>
                                    <IonCardContent>
                                        {
                                            item.user.imageUrl == null ? <img className="feedItemImg" src="assets/img/avatar.svg" referrerPolicy='no-referrer' /> : <img className="feedItemImg" src={item.user.imageUrl} alt="" referrerPolicy='no-referrer' />
                                        }

                                        <span className="feedName">{item.user.name}
                                            {
                                                item.user.verificationStatus == 'STATUS_VERIFIED' ? <IonIcon size="small" color='success' icon={shieldCheckmarkSharp}></IonIcon> : null
                                            }

                                        </span>
                                        <p>
                                            {
                                                item.user.verificationStatus == 'STATUS_VERIFIED' ? <IonIcon size="small" color='success' icon={shieldCheckmarkSharp}></IonIcon> : null
                                            }
                                        </p>
                                        {
                                            item.userStats.averageRating != "0" ? <><Rating readonly={true} size={20} initialValue={item.userStats.averageRating} transition={true} /> ({item.userStats.ratedRidesCount})
                                            </> : null
                                        }<br />
                                        {
                                            item.rideRequest.driving == false ? <IonLabel color="success">Requesting a ride on </IonLabel> : <IonLabel color="success">Offering a ride on </IonLabel>
                                        }


                                        {
                                            new Date(item.rideRequest.departureTime).toLocaleString(
                                                "en-US",
                                                {
                                                    month: "short",
                                                    day: "2-digit",
                                                    year: "numeric",
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                }
                                            )}
                                        
                                        <br />


                                        <IonButton onClick={() => googleMapsAddressRedirection(item.rideRequest.startAddress, item.rideRequest.destinationAddress)} color='medium' className="feedaddressbuttons" size="small" fill="outline">{item.rideRequest.startAddressName == null ? item.rideRequest.startAddress : item.rideRequest.startAddress.includes(item.rideRequest.startAddressName) ? item.rideRequest.startAddress : (item.rideRequest.startAddressName + "," + item.rideRequest.startAddress.split(',').splice(item.rideRequest.startAddress.split(",").length - 3).join(',')).substring(0, 45).concat('..')}<IonIcon slot="end" size="small" icon={location}></IonIcon></IonButton>
                                        <br /><IonButton onClick={() => googleMapsAddressRedirection(item.rideRequest.startAddress, item.rideRequest.destinationAddress)} color="medium" className="feedaddressbuttons" size="small" fill="outline">{item.rideRequest.destinationAddressName == null ? item.rideRequest.destinationAddress : item.rideRequest.destinationAddress.includes(item.rideRequest.destinationAddressName) ? item.rideRequest.destinationAddress : (item.rideRequest.destinationAddressName + "," + item.rideRequest.destinationAddress.split(',').splice(item.rideRequest.destinationAddress.split(",").length - 3).join(',')).substring(0, 45).concat('..')}<IonIcon slot="end" size="small" icon={location}></IonIcon></IonButton>

                                        <hr />
                                        {
                                            item.rideRequest.driving == false ?
                                                item.rideRequest.seatCount != item.requestStats.acceptedTotalSeatCount ?
                                                    <IonBadge color="medium" class="ionBadge" slot="end">Seats: {item.rideRequest.seatCount - item.requestStats.acceptedTotalSeatCount}</IonBadge> : null :

                                                item.rideRequest.seatCount != item.requestStats.acceptedTotalSeatCount ?
                                                    <IonBadge color="medium" class="ionBadge" slot="end">Seats: {item.rideRequest.seatCount - item.requestStats.acceptedTotalSeatCount}</IonBadge> : null
                                        }
                                        {
                                            item.rideRequest.roundTrip ? <IonBadge color="medium" class="ionBadge" slot="end">Round Trip</IonBadge> : <IonBadge color="medium" class="ionBadge" slot="end">One Way</IonBadge>
                                        }

                                        {
                                            item.rideRequest.driving == false ?
                                                <IonBadge color="medium" className="ionBadge" slot="end">Drive & Get: ${item.rideRequest.rideCost}</IonBadge> :

                                                <IonBadge color="medium" className="ionBadge" slot="end">Rider Pays: ${item.rideRequest.rideCost}</IonBadge>
                                        }
                                        <IonBadge color="medium" className="ionBadge" slot="end">{item.rideRequest.labelsCsv}</IonBadge>
                                        <hr/>
                                        
                                
                                        {
                                            matchSentForIndex.includes(index) ? 
                                           <> <IonButton color="success" className="feedbackbutton"  disabled size="small" fill="outline">Drive Request Sent <IonIcon icon={checkmarkCircle}></IonIcon></IonButton>
                                            <IonButton size="small" fill="outline" onClick={() => toggleDisplayType("0")} className="feedbackbutton"  color="success">View Ride</IonButton></> : null
                                        }
                                        {
                                            item.rideRequest.driving == false && !matchSentForIndex.includes(index) ? 
                                            forceRideCreateIndex == index ? <IonButton disabled color="success"  className="feedbackbutton" size="small" > {statusMessages} <IonIcon icon={car}></IonIcon><IonSpinner class="smallspinner" color="primary"></IonSpinner></IonButton>
                                            :
                                            <IonButton color="success"  className="feedbackbutton" size="small" 
                                            onClick={() =>
                                                presentAlert({
                                                    header: 'This will create a new ride & send a match request to the rider. Do you want to proceed?',
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
                                                                sendMatchRequest(item, index, null);
                                                            },
                                                        },
                                                    ],
                                                    onDidDismiss: (e: CustomEvent) => null,
                                                })
                                            }
                                             
                                             >Send Request to Drive <IonIcon icon={car}></IonIcon></IonButton> : null
                                        }


                                    </IonCardContent>
                                </IonCard>
                            ))} </div>
                        : null
                } */}


                {/* {displayType == "1" ? <><hr />
                    <IonLabel className="footer">Copyright © 2024 Procsoft LLC.</IonLabel>
                    <IonLabel className="footer"> support@wagoncarpool.com</IonLabel><hr /></> : null
                } */}
                {/* </IonList> */}
                {/* <IonInfiniteScroll
                    onIonInfinite={(ev) => {
                        setTimeout(() => ev.target.complete(), 500);
                    }}
                >
                    <IonInfiniteScrollContent></IonInfiniteScrollContent>
                </IonInfiniteScroll> */}
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


                <IonModal id="example-modal" isOpen={isOpen}>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle color="dark"> {receiver.name}</IonTitle>
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
                                                        month: "short",
                                                        day: "2-digit",
                                                        year: "numeric",
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
                        <IonButton color="tertiary" className="chatSendButton" onClick={() => sendMessage()}>send</IonButton>
                    </IonItem>
                </IonModal>

                <IonModal id="example-modal" isOpen={showRecommendedRideModal}>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Recommended Rides</IonTitle>
                            <IonButtons slot="end">
                                <IonButton onClick={() => closeRecommendedRideModalModal()}><IonIcon color="danger" className="closeIcon" icon={closeCircle}></IonIcon></IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">
                        <IonCard className="ioncardinamodal">
                        {
                                            filpRiderDriver ?
                                                <IonCardContent className="potentialMatchText">
                                                    {
                                                        selectedItemDriving ? <><h2 className="flipRiderDriverHeader">Willing to Ride instead of Driving?</h2><br /> No riders available for your trip, but there are other users driving your way. Select the ride(s) below and send a match request if you are willing to be a rider. </>
                                                        :
                                                        <><h2 className="flipRiderDriverHeader">Willing to Drive instead of Riding?</h2><br /> No matches are available for your trip, but there are other users willing to ride. Select the ride(s) below and send a match request if you are willing to drive them.</>
                                                    }
                                                </IonCardContent>
                                                :
                                                <IonCardContent className="potentialMatchText">
                                                    We have found potential matches for you! <br />Select the rides to send a Match Request!
                                                </IonCardContent>
                                        }
                        </IonCard>


                        {recommendedRidesFeedData.map((item, index) => (

                            <IonCard className="ioncardinamodal" key={index}>
                                {
                                    <IonCardContent>
                                        <div>
                                            {
                                                item.user.imageUrl == null ? <img className="feedItemImg" src="assets/img/avatar.svg" referrerPolicy='no-referrer' /> : <img className="feedItemImg" src={item.user.imageUrl} alt="" referrerPolicy='no-referrer' />
                                            }
                                            <span className="feedName">{item.user.name}
                                                <IonCheckbox color="success" checked={checkedItems[item?.rideRequest?.rideId]} class="matchCheckbox" onIonChange={() => selectRidesToMatch(item)} ></IonCheckbox>
                                                {/* <IonIcon size="small" color='success' icon={shieldCheckmarkSharp}></IonIcon> */}
                                            </span>

                                            <hr />
                                            {
                                                item.rideRequest.driving == false ? <IonLabel color="success" className="RiderOrDriver">Requesting a Ride</IonLabel> : <IonLabel color="success" className="RiderOrDriver">Offering a Ride</IonLabel>
                                            }
                                            <p>Departure Time: {
                                                new Date(item.rideRequest.departureTime).toLocaleString(
                                                    "en-US",
                                                    {
                                                        month: "short",
                                                        day: "2-digit",
                                                        year: "numeric",
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    }
                                                )}</p>

                                            <IonButton color='success' className="recommendedridebutton" size="small" fill="outline">{item.rideRequest.startAddressName == null ? item.rideRequest.startAddress : item.rideRequest.startAddress.includes(item.rideRequest.startAddressName) ? item.rideRequest.startAddress : (item.rideRequest.startAddressName + "," + item.rideRequest.startAddress.split(',').splice(item.rideRequest.startAddress.split(",").length - 3).join(',')).substring(0, 53).concat('..')}<IonIcon slot="end" size="small" icon={location}></IonIcon></IonButton>

                                            {/* <IonButton color="medium" className="recommendedridebutton" size="small" fill="clear">To</IonButton> */}
                                            <br />
                                            <IonButton color="success" className="recommendedridebutton" size="small" fill="outline">{item.rideRequest.destinationAddressName == null ? item.rideRequest.destinationAddress : item.rideRequest.destinationAddress.includes(item.rideRequest.destinationAddressName) ? item.rideRequest.destinationAddress : (item.rideRequest.destinationAddressName + "," + item.rideRequest.destinationAddress.split(',').splice(item.rideRequest.destinationAddress.split(",").length - 3).join(',')).substring(0, 53).concat('..')}<IonIcon slot="end" size="small" icon={location}></IonIcon></IonButton>
                                            <hr />
                                            {
                                                item.rideRequest.driving == false ?
                                                    <IonBadge color="medium" className="ionBadge" slot="end">You Get: ${item.rideRequest.rideCost}</IonBadge> :

                                                    <IonBadge color="medium" className="ionBadge" slot="end">You Pay: ${item.rideRequest.rideCost}</IonBadge>
                                            }
                                            {
                                                item.rideRequest.driving == false ?
                                                    item.rideRequest.seatCount != item.acceptedTotalSeatCount ?
                                                        <IonBadge color="medium" className="ionBadge" slot="end">Requested Seats: {item.rideRequest.seatCount - item.requestStats.acceptedTotalSeatCount}</IonBadge> : null :

                                                    item.rideRequest.seatCount != item.acceptedTotalSeatCount ?
                                                        <IonBadge color="medium" className="ionBadge" slot="end">Available Seats: {item.rideRequest.seatCount - item.requestStats.acceptedTotalSeatCount}</IonBadge> : null
                                            }

                                        </div>




                                    </IonCardContent>
                                }

                            </IonCard>
                        ))}
                        <hr />
                        <IonLabel color="medium">{statusMessages}</IonLabel>
                        {
                            errorLogs != '' ? <IonItem className="errorLogs" text-wrap color="danger">{errorLogs}</IonItem> : null
                        }

                    </IonContent>
                    {
                        // loading? <><p><IonSpinner className="smallspinner"></IonSpinner>{statusMessages}</p></> : 
                        matchListEmpty == 0 ? <IonButton disabled className="buttonInAModal" onClick={() => matchRide()} color="success" size="small">
                            {
                                !filpRiderDriver?  <>Send Match Request </> : selectedItemDriving ? <>Send Match Request as a Rider</> : <>Send Match Request and Drive Instead</>
                            }
                        </IonButton> :
                            <IonButton className="buttonInAModal" onClick={() => matchRide()} color="success" size="small">
                            {
                                !filpRiderDriver?  <>Send Match Request </> : selectedItemDriving ? <>Send Match Request as a Rider</> : <>Send Match Request and Drive Instead</>
                            }
                            </IonButton>
                    }
                    <IonButton className="buttonInAModal" onClick={() => closeRecommendedRideModalModal()} color="medium" size="small">Go Back to My Rides</IonButton>

                    <hr />
                </IonModal>
            </IonContent>
            <IonPopover side="right" alignment="center" ref={popover} isOpen={popoverOpen} onDidDismiss={() => setPopoverOpen(false)}>
                <IonContent className="popOverScroll">
                    <IonLabel >
                        <ul className="popOverContent">
                            <li>
                                The amount is based on the distance travelled for the trip. As the distance can change based on the matched partner, the actual cost might differ slightly. An email will be sent after matching, confirming the final amount.
                            </li><br />
                            <li>This is the amount due for one way trip. If the trip is a round trip the rider will pay this amount twice, once at the end of each leg.
                            </li><br />
                            <li>The carpooling partners can agree to use any payment method like Paypal/Venmo/Cashapp/Zelle or cash for the rider to pay.</li><br />
                            {/* <li>
                                This amount does not include the cost for parking or tolls. The carpooling partners should clarify expectations for splitting those costs using the messaging option on <a href="https://www.wagoncarpool.com/">wagoncarpool</a> after rides are fully matched.
                            </li> */}

                        </ul>

                    </IonLabel>
                </IonContent>
            </IonPopover>
            <IonModal isOpen={cancelRideModalOpen}>
          <IonHeader >
            <IonToolbar>
              <IonTitle>Ride Cancellation</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setCancelRideModalOpen(false)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
                <IonContent className="ion-padding">
                    <h3>Select reason for ride cancellation</h3>
                    <IonRadioGroup  onIonChange={e => rideCancellationReasonHandler(e.detail.value)}>
                        <IonRadio color="success" value="My travel plans have changed" labelPlacement="end">My travel plans have changed</IonRadio>
                        <br />
                        <IonRadio color="success" value="Not satisfied with the pricing" labelPlacement="end">Not satisfied with the pricing</IonRadio>
                        <br />
                        <IonRadio color="success" value="Ride created accidently" labelPlacement="end">Ride created accidently</IonRadio>
                        <br />
                        <IonRadio color="success" value="other" labelPlacement="end">Other</IonRadio>
                    </IonRadioGroup>
                    {
                        rideCancellationReason != 'xeqg!okjw' &&
                        rideCancellationReason != 'My travel plans have changed' &&
                        rideCancellationReason != 'Not satisfied with the pricing' &&
                        rideCancellationReason != 'Ride created accidently' 

                         ?
                        <IonInput color="success"
                        label="Please specify the cancellation reason"
                        labelPlacement="stacked"
                        clearInput={true}
                        onIonInput={e => rideCancellationReasonHandler(e.detail.value)}
                        placeholder="Specify your reason (Aleast 10 Characters)"
                        counter={true}
                        maxlength={50}
                        counterFormatter={(inputLength) => `${inputLength} characters`}
                
                      ></IonInput>
                            : null
                    }
                    <br/>
                    <IonLabel color="danger">{errorLogs}</IonLabel>
                    <hr/>
                    <IonButton className="userActivityContact" size="small" color="medium"  onClick={() => setCancelRideModalOpen(false)}>back to My Rides</IonButton><IonButton  size="small" className="userActivityContact" color="danger" onClick={() => cancelRide()}>Cancel Ride</IonButton>
                </IonContent>
        </IonModal>
        </IonPage>

    );
}
export default PotentialMatches;