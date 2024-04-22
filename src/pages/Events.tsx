import { IonAlert, IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCheckbox, IonCol, IonContent, IonDatetime, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonModal, IonNavLink, IonPage, IonRange, IonRow, IonSegment, IonSegmentButton, IonSelect, IonSelectOption, IonSpinner, IonText, IonTitle, IonToast, IonToolbar, useIonAlert, useIonLoading, useIonViewDidEnter } from '@ionic/react';
import React, { CSSProperties, FC, MutableRefObject, RefObject, useEffect, useRef, useState } from "react";
import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";
import { Redirect, useHistory, Route, HashRouter, Switch } from 'react-router-dom';
import './GetStarted.css';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { add, addCircleSharp, arrowBackSharp, backspace, body, car, clipboard, closeCircle, home, location, menu, menuOutline, people, peopleCircle, peopleOutline, pin, pinOutline, shieldCheckmarkSharp, swapVertical } from 'ionicons/icons';
import GetStarted from './GetStarted';
import { GoogleMap, Marker } from '@react-google-maps/api';
import UserActivity from './UserActivity';
import { RangeValue } from '@ionic/core';
import ReactGA from 'react-ga4';
import Geocode from 'react-geocode';
import { Geolocation } from '@capacitor/geolocation';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import AppLandingPage from './AppLandingPage';
import { Capacitor } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { IonReactRouter } from '@ionic/react-router';


const Events = () => {
    let currAddress: any;
    Geocode.setApiKey('AIzaSyAqRnDMSLMKycFik1KIQkGx1RJBPp9QqwY');
    Geocode.setLanguage("en");
    // Geocode.setRegion("us");

    let history = useHistory();
    const [presentAlert] = useIonAlert();
    const [present, dismiss] = useIonLoading();

    const [fromLocation, setUserFromLocation] = useState({ "latitude": 0, "longitude": 0 });
    const [toLocation, setUserToLocation] = useState({ "latitude": 0, "longitude": 0 });

    const [startAddress, setStartAddress] = useState("");
    const [destinationAddress, setDestinationAddress] = useState("");

    const [startAddressName, setStartAddressName] = useState("");
    const [destinationAddressName, setDestinationAddressName] = useState("");
    const [departureTime, setDepartureTime] = useState('');
    const [returnTime, setReturnTimeStamp] = useState('');
    const [seats, setSeats] = useState("1");
    const [tripType, setTripType] = useState<any>("2");
    const [departureWindow, setDepartureWindow] = useState<any>("2");
    const [tripPurpose, setTripPurpose] = useState<any>("1");
    const [isDriving, setDriving] = useState("1");
    const [displayToast, setDisplayToast] = useState(false);
    const [loading, setLoading] = useState(false);
    const [statusMessages, setStatusMessages] = useState("");
    const [filpRiderDriver, setFlipRiderDriver] = useState(false);
    const [estimatedCost, setEstimatedCost] = useState(0);
    const [createdRideId, setCreatedRideId] = useState(0);
    const [tripDistance, setDistanceInMiles] = useState(0);
    const [modifiedTripCost, setModifiedTripCost] = useState<RangeValue>();
    const [showEstimatedCostModal, setEstimatedCostModal] = useState(false);
    const [showRideCreationModal, setShowRideCreationModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = React.useState<any>({});
    const [showRecommendedRideModal, setShowRecommendedRideModal] = useState(false);
    const [requestSubmitted, setRequestSubmitted] = useState(false);
    const [errorLogs, setErrorLogs] = useState('');
    const inputStartAddressRef = useRef() as MutableRefObject<HTMLInputElement>;
    const inputDestinationAddressRef = useRef() as MutableRefObject<HTMLInputElement>;
    const datetime = useRef() as MutableRefObject<HTMLIonDatetimeElement>;
    const [country] = useState("us");
    const [redirectToUserActivity, setRedirectToUserActivity] = React.useState(false);
    const [feedData, setFeedData] = React.useState<any[]>([]);
    // const [feedDataObj, setFeedDataObj] = React.useState({});
    const [feedLoading, setFeedLoading] = useState(true);
    const [isvalidZipCode, setIsValidZipCode] = useState<boolean>();
    const [currLat, setCurrLat] = useState(37.3902956);
    const [currLon, setCurrLon] = useState(-121.8961047);

    
    
    const [swapToggle, setSwapToggle] = useState(false);
    const [matchClickIndex, setMatchClickIndex] = useState(-1);
    const [matchRequestIndexSuccess, setMatchRequestIndexSuccess] = useState(-1);
    const [checkboxEighteenYearsOld, setCheckboxEighteenYearsOld] = useState(true);
    const [checkedItems, setCheckedItems] = React.useState<any>({});
    const [matchListEmpty, setMatchListEmpty] = useState(true);

    const [zipcode, setZipCode] = useState('');
    // const [termsState, setTermsState] = useState('');
    // const [urlTerms, setUrlTerms] = useState('');
    const [city, setCity] = useState('San Jose');
    // let checkedItems:any = {};
    const [eventId, setEventId] = useState('');
    const [termToggle, setTermToggle] = useState('3');
    let terms= '';
    let globalTermToggle = '3';
    let urlTerms= '';
    let globalSessionObj:any;

    const { ref } = usePlacesWidget({
        apiKey: 'AIzaSyAqRnDMSLMKycFik1KIQkGx1RJBPp9QqwY',
        onPlaceSelected: (place) => console.log(place)
    })

    const delay = (ms: number) => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    const [sessionExists, setSessionExists] = React.useState(true);
    const [eventData, setEventData] = React.useState<any[]>([]);
    const [eventClassification, setEventClassification] = useState<any>('');
    const termRef = useRef() as MutableRefObject<HTMLIonInputElement>;

    function init() {
        setFlipRiderDriver(false);
        setFeedLoading(true);
        setEventData([]);
        terms= "";
        urlTerms = "";
        ReactGA.send({ hitType: "pageview", page: "/events", title: "Carpool For Events" });
        resetForm();
        const sessionObj = localStorage.getItem('session');
        if (sessionObj != null && JSON.parse(localStorage.getItem('session') || "").wagon_token != null && JSON.parse(localStorage.getItem('session') || "").wagon_token != '') {
            globalSessionObj = JSON.parse(localStorage.getItem('session') || "");
            setSessionExists(true);
        } 
        let urlParams = new URLSearchParams(window.location.hash);
        console.log('urlParams', urlParams.get('terms'));
        let localTerms = ''
        console.log('terms', terms);
        if (urlParams.get('terms') !== null) {
            if (urlParams.get('eventId') != null || urlParams.get('eventId') != '') {
                if (urlParams.get('eventId') != null) {
                    setEventId(urlParams.get('eventId') || '');
                }
            }
            if ((urlParams.get('terms') != null || urlParams.get('terms') != '')) {
                localTerms = urlParams.get('terms') || '';
                urlTerms = localTerms;
                terms = localTerms;
                // setTermsState(terms);
                console.log(localTerms);
            }  
        }
        getCurrentLocation();
    }

    useEffect(() => {
        GoogleAuth.initialize({
            clientId: '379793457253-quhbedbbmb57amflg3asqkgtunted6kd.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
            grantOfflineAccess: true,
        });
        init();
        

        //getCurrentLocation();
        // if (localStorage.getItem("session") === null) {
        //     console.log("Session doesn't exist");
        //     localStorage.setItem("redirected_from", 'post');
        //     setSessionExists(false);
        //     return;
        // }
    }, []);

    useIonViewDidEnter(async () => {
        init();
    });

    async function getGamesAndEvents(lat: any, lng: any) {
        console.log('urlTerms', urlTerms);
        console.log('terms', terms);
        let localTerms = '';
        if (urlTerms != terms) {
            localTerms = terms;
        } else {
            localTerms = terms;
        }

        console.log('localTerms', localTerms);

        setFeedLoading(true);
        ReactGA.event({
            category: 'event_search_get_terms=' + localTerms,
            action: 'event_search_get_terms=' + localTerms,
        });
        console.log('termToggle', termToggle)

        if ((localTerms == null || localTerms == '') && globalTermToggle!= "3") {
            console.log('localTerms null');
            const getResponse = await axios.get(import.meta.env.VITE_APP_API_V2 + '/events/search?terms=sports' + '&locationLat=' + lat + '&locationLong=' + lng);
            setFeedLoading(false);
            setEventData(getResponse.data);
        } else if ((localTerms == null || localTerms == '') && globalTermToggle == "3") {
            console.log('localTerms null');
            const getResponse = await axios.get(import.meta.env.VITE_APP_API_V2 + '/events/search?locationLat=' + lat + '&locationLong=' + lng);
            setFeedLoading(false);
            setEventData(getResponse.data);
        } else {
            console.log('localTerms has data');
            const getResponse = await axios.get(import.meta.env.VITE_APP_API_V2 + '/events/search?terms=' + localTerms + '&locationLat=' + lat + '&locationLong=' + lng);
            setFeedLoading(false);
            setEventData(getResponse.data);
        }

        // inputStartAddressRef.current.value = "";
        // inputDestinationAddressRef.current.value = "";
        datetime.current?.reset();
        // setErrorLogs('');

    }


    async function getEstimatedTripCost() {
        setShowRecommendedRideModal(false);
        setEstimatedCost(0);
        setModifiedTripCost(0);
        setErrorLogs('');


        console.log(isDriving);
        // if (isDriving === undefined || isDriving == "undefined") {
        //     setErrorLogs('Please select a whether you are a Driver or a Rider');
        //     return;
        // }
        if (seats == "-1") {
            setErrorLogs('Please select number of seats');
            return;
        }
        console.log("From ")
        console.log(fromLocation)

        console.log("To ")
        console.log(toLocation)

        console.log(departureTime);
        console.log(startAddress);
        console.log(destinationAddress);

        console.log(startAddressName);
        console.log(destinationAddressName);

        if (startAddress == '' || destinationAddress == '') {
            setErrorLogs('Please select a valid "From" or "To" address.');
            return;
        }

        if (departureTime == '' || departureTime == null) {
            setErrorLogs('Please select departure time of the ride');
            return;
        }

        let currentTime: any = new Date();
        let departureTimeObj: any = new Date(departureTime);
        let diffInMins = (Math.abs(currentTime.getTime() - departureTimeObj.getTime()) / 1000) / 60;

        console.log(diffInMins);
        // if (diffInMins < 120) {
        //     setErrorLogs('The departure time should be atleast 2 hours later than the current time.');
        //     return;
        // }


        let results: any;
        let distanceInMiles: any;
        if (startAddress != '' && destinationAddress != '') {
            const directionsService = new google.maps.DirectionsService()
            results = await directionsService.route({
                origin: startAddress,
                destination: destinationAddress,
                // eslint-disable-next-line no-undef
                travelMode: google.maps.TravelMode.DRIVING,
            })
            console.log('rideDistance in miles', results?.routes[0]?.legs[0]?.distance?.text);

            distanceInMiles = (0.000621371 * (results?.routes[0]?.legs[0]?.distance?.value || 0)).toFixed(1);
            console.log('rideDistance in miles', distanceInMiles);
        }

        setDistanceInMiles(distanceInMiles);

        // Give the ride estimated cost first
        axios.get(import.meta.env.VITE_APP_API + '/rides/cost?distance=' + distanceInMiles + '&departure_time=' + departureTime)
            .then(async (esimateCostResponse: AxiosResponse) => {
                setModifiedTripCost(esimateCostResponse.data);
                setEstimatedCostModal(true);
                console.log('estimated cost=' + esimateCostResponse.data);
                setEstimatedCost(esimateCostResponse.data);
            })
            .catch((reason: AxiosError) => {
                setErrorLogs('Unable to get the estimate cost. Please try again after sometime!');
            })
    }

    async function postTrip(selectedEvent: any) {
        console.log(globalSessionObj);
        if (localStorage.getItem('session')  == null) {
            setSessionExists(false);
            return;
        }
        globalSessionObj = JSON.parse(localStorage.getItem('session') || "");
        if (globalSessionObj== undefined || globalSessionObj.wagon_token == null || globalSessionObj.wagon_token == '') {
            setSessionExists(false);
            return;
        }
        axios.get(import.meta.env.VITE_APP_API_V2 + '/user', {headers: { 'Authorization': globalSessionObj.wagon_token } })
            .then(async (axiosResponse: AxiosResponse) => {
                if (startAddress== '') {
                    setErrorLogs('Please enter the Start Address');
                    return;
                }
                
                let destAddrfromLatLon = '';
                console.log(selectedEvent.venue?.latitude);
                console.log(selectedEvent.venue?.longitude);
        
                const response = await Geocode.fromLatLng(selectedEvent.venue?.latitude, selectedEvent.venue?.longitude);
                destAddrfromLatLon = response.results[0].formatted_address;
                console.log('dest from lat long: ', destAddrfromLatLon)
        
                console.log('startadd', startAddress);
                console.log('dest', destAddrfromLatLon);
        
                let results: any;
                let distanceInMiles: any;
                //if (startAddress != '' && destAddrfromLatLon != '') {
                const directionsService = new google.maps.DirectionsService()
                results = await directionsService.route({
                    origin: startAddress || '',
                    destination: destAddrfromLatLon,
                    // eslint-disable-next-line no-undef
                    travelMode: google.maps.TravelMode.DRIVING,
                })
                console.log('rideDistance in miles', results?.routes[0]?.legs[0]?.distance?.text);
        
                distanceInMiles = (0.000621371 * (results?.routes[0]?.legs[0]?.distance?.value || 0)).toFixed(1);
                console.log('rideDistance in miles', distanceInMiles);
                //}
        
                if (distanceInMiles > 100) {
                    setErrorLogs('Ride distance cannot be more than 100 miles.');
                    return;
                }
                setLoading(true);
                setStatusMessages('Creating Ride...');
        
        
                console.log(selectedEvent.eventDateTime);
                var newDepartureDate = new Date(selectedEvent.eventDateTime);
                newDepartureDate.setHours(newDepartureDate.getHours() - departureWindow);
                console.log('departure date', newDepartureDate.toISOString())
        
        
                const postRequestBody = {
                    // userId: session.userId,
                    departureTime: newDepartureDate.toISOString(),
                    start_loc_lat: !swapToggle ? fromLocation.latitude : selectedEvent.venue?.latitude,
                    start_loc_long: !swapToggle ? fromLocation.longitude : selectedEvent.venue?.longitude,
                    destination_loc_lat: !swapToggle ? selectedEvent.venue?.latitude : fromLocation.latitude,
                    destination_loc_long: !swapToggle ? selectedEvent.venue?.longitude : fromLocation.longitude,
                    seatCount: seats,
                    driving: isDriving === "0" ? false : true,
                    startAddress: !swapToggle ? startAddress : selectedEvent.venue?.venueName + ', ' + selectedEvent.venue?.city,
                    destinationAddress: !swapToggle ? selectedEvent.venue?.venueName + ', ' + selectedEvent.venue?.city : startAddress,
                    startAddressName: !swapToggle ? startAddressName : selectedEvent.venue?.venueName + ', ' + selectedEvent.venue?.city,
                    destinationAddressName: !swapToggle ? selectedEvent.venue?.venueName + ', ' + selectedEvent.venue?.city : startAddressName,
                    rideDistance: distanceInMiles,
                    rideCost: null,
                    roundTrip: tripType == "2" ? true : false,
                    rideType: tripPurpose,
                    labelsCsv: selectedEvent.eventName
                };
                console.log(postRequestBody);
                ReactGA.event({
                    category: 'event_ride_create_attempt='+ selectedEvent.eventName,
                    action: 'event_ride_create_attempt=' + selectedEvent.eventName,
                });
        
                axios.post(import.meta.env.VITE_APP_API_V2 + '/rides', postRequestBody, {headers: { 'Authorization': globalSessionObj.wagon_token } })
                    .then(async (postResponse: AxiosResponse) => {
                        
                        ReactGA.event({
                            category: 'event_ride_create_success='+ selectedEvent.eventName,
                            action: 'event_ride_create_success=' + selectedEvent.eventName,
                        });
                        setStatusMessages('Ride Created Successfully!');
        
                        console.log(postResponse);
                        setCreatedRideId(postResponse.data);
                        setRequestSubmitted(true);
        
                        loadFilteredFeed(newDepartureDate.toISOString(), selectedEvent, postResponse.data);
                        //await delay(1000);
                        //setRedirectToUserActivity(true);
                    })
                    .catch((reason: any) => {
                        ReactGA.event({
                            category: 'event_ride_create_failed='+ selectedEvent.eventName + "&status=" + reason.response?.status,
                            action: 'event_ride_create_failed=' + selectedEvent.eventName + "&status=" + reason.response?.status,
                        });
                        setLoading(false);
                        setStatusMessages('');
                        if (reason.response?.status === 404 || reason.response?.status === 400) {
                            if(reason.response?.data.errorCode == 508) {
                                setErrorLogs('You have another ride that conflicts with this ride. Please cancel the existing ride or create a ride for some other day.');
                            } else {
                                setErrorLogs('Looks like there was something bad with the request, please try again with a valid input!');
                            }
                            
                        } else if (reason.response?.status === 500) {
                            setErrorLogs('Looks like we had something going bad with our server! Please try again in sometime!');
                        } else {
                            setErrorLogs('Looks like we have something unexpected going on! Please try again in sometime.');
                        }
                    })
            })
            .catch((reason: AxiosError) => {
                if (reason.response?.status === 401 || reason.response?.status === undefined) {
                    console.log('Events status 401');
                    setSessionExists(false);
                    return;
                }
            })
    }

    function setDeparture(departureDateTime: any) {
        setErrorLogs('');
        console.log(new Date(departureDateTime).toISOString().toString())
        setDepartureTime(new Date(departureDateTime).toISOString().toString());
    }

    function setReturnTime(returnTime: any) {
        setErrorLogs('');
        console.log(new Date(returnTime).toISOString().toString());
        setReturnTimeStamp(new Date(returnTime).toISOString().toString());
    }

    function setAvailableSeats(availableSeats: any) {
        setErrorLogs('');
        setSeats(availableSeats);
    }

    function setIsDriving(isDriving: any) {
        setErrorLogs('');
        setDisplayToast(true);
        setDriving(isDriving);
    }

    window.addEventListener('ionModalDidDismiss', (event) => {
        setShowRideCreationModal(false);
        setShowRecommendedRideModal(false);
    });

    function closeEstimatedCostModal() {
        setEstimatedCostModal(false);
    }

    function closeRecommendedRideModalModal() {
        setShowRecommendedRideModal(false);
        setShowRideCreationModal(false);
        //history.push('/App');
        window.location.replace('/App');
    }

    const disablePastDates = (dateString: string) => {
        const date = new Date(dateString);
        date.setHours(new Date().getHours());
        date.setMinutes(new Date().getMinutes());
        date.setSeconds(0);

        date.setDate(date.getDate() + 2);
        const currentDate = new Date();
        currentDate.setSeconds(0);
        return currentDate <= date;
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
        ReactGA.event({
            category: 'events_match_ride_attempt',
            action: 'events_match_ride_attempt',
        });
        setStatusMessages('Sending Match Request');
        console.log('Checked Items: ', checkedItems);
        //loop through checkedItems.
        let failCount = 0;
        let successCount = 0;
        let totalCount = 0;
        let promises = [];

        for (const rideId in checkedItems) {
            totalCount++;
            if (checkedItems[rideId] == true) {
                setLoading(true);
                console.log(rideId);
                const postMatchBody = {
                    requesterRideId: createdRideId,
                    requestedRideId: rideId,
                    detourInMiles: 2,
                    status: 0
                }

                console.log('Match Body', postMatchBody);
                let  url = '';
                if (filpRiderDriver) {
                   url =  import.meta.env.VITE_APP_API_V2 + '/rides/match_with_change'
                } else {
                    url =  import.meta.env.VITE_APP_API_V2 + '/rides/match'
                }

                promises.push(axios.post(url, postMatchBody, {headers: { 'Authorization': globalSessionObj.wagon_token } }).then(async (postMatchResponse: AxiosResponse) => {
                    console.log(postMatchResponse);
                    successCount ++ ;
                    ReactGA.event({
                        category: 'events_match_ride_success',
                        action: 'events_match_ride_success',
                    });
                    setStatusMessages('Match Request Sent for ride id: ' + rideId);
                }).catch((rideMatchPostError: AxiosError) => {
                    failCount++;
                    ReactGA.event({
                        category: 'events_match_ride_failed' + '&status=' + rideMatchPostError.response?.status,
                        action: 'events_match_ride_failed' + '&status=' + rideMatchPostError.response?.status,
                    });
                    setLoading(false);
                    if (rideMatchPostError.response?.status === 404 || rideMatchPostError.response?.status === 400) {
                        setErrorLogs('Looks like there was something bad with the request, please try again with a valid input!');
                    } else if (rideMatchPostError.response?.status === 500) {
                        setErrorLogs('Looks like we had something going bad with our server! Please try again in sometime!');
                    } else {
                        setErrorLogs('Looks like we have something unexpected going on! Please try again in sometime.');
                    }
                }))
            }
        }
        
        Promise.all(promises).then(() => {
            if (successCount == 0) {
                present({
                    message: 'Failed to send the match request. Use Find Matches to try again.',
                    duration: 7000,
                });
            } else {
                present({
                    message: successCount + ' out of ' + totalCount + 'matches requested successfully.',
                    duration: 3000,
                });
            }

            setLoading(false);
            setShowRecommendedRideModal(false);
            setShowRideCreationModal(false);
            routeToUserActivity();
        });

        // const session = JSON.parse(localStorage.getItem('session') || "");
        // let results: any;
        // let distanceInMiles: any;
        // if (startAddress != '' && destinationAddress != '') {
        //     const directionsService = new google.maps.DirectionsService()
        //     results = await directionsService.route({
        //         origin: startAddress,
        //         destination: destinationAddress,
        //         // eslint-disable-next-line no-undef
        //         travelMode: google.maps.TravelMode.DRIVING,
        //     })
        //     console.log('rideDistance in miles', results?.routes[0]?.legs[0]?.distance?.text);

        //     distanceInMiles = (0.000621371 * (results?.routes[0]?.legs[0]?.distance?.value || 0)).toFixed(1);
        //     console.log('New Trip Drivable Distance In Miles', distanceInMiles);
        // }


        // // Calculate the detour
        // let totalMilesAfterPickupAndDropOff;
        // let detour: string;
        // if (matchObject?.rideRequest?.driving) {
        //     // Calculate distance betwee matchObject startAddress and riders start address
        //     // origin - matchObject startAddress
        //     // destination - riders start address

        //     const directionsService = new google.maps.DirectionsService();
        //     const firstLeg = await directionsService.route({
        //         origin: matchObject?.rideRequest?.startAddress,
        //         destination: startAddress,
        //         // eslint-disable-next-line no-undef
        //         travelMode: google.maps.TravelMode.DRIVING,
        //     })
        //     console.log('origin: ', matchObject?.rideRequest?.startAddress)
        //     console.log('destination: ', startAddress)
        //     const firstLegMiles = (0.000621371 * (firstLeg?.routes[0]?.legs[0]?.distance?.value || 0)).toFixed(1);
        //     console.log('firstleg', firstLegMiles);

        //     // Drop to the riders destination address
        //     const secondLeg = await directionsService.route({
        //         origin: startAddress,
        //         destination: destinationAddress,
        //         // eslint-disable-next-line no-undef
        //         travelMode: google.maps.TravelMode.DRIVING,
        //     })
        //     console.log('origin: ', startAddress)
        //     console.log('destination: ', destinationAddress)

        //     console.log('origin-name: ', startAddressName)
        //     console.log('destination-name: ', destinationAddressName)
        //     const secondLegMiles = (0.000621371 * (secondLeg?.routes[0]?.legs[0]?.distance?.value || 0)).toFixed(1);
        //     console.log('secondLegMiles', secondLegMiles);


        //     // Go to your final destination 
        //     const thirdLeg = await directionsService.route({
        //         origin: matchObject?.rideRequest?.destinationAddress,
        //         destination: destinationAddress,
        //         // eslint-disable-next-line no-undef
        //         travelMode: google.maps.TravelMode.DRIVING,
        //     })
        //     console.log('origin: ', startAddress)
        //     console.log('destination: ', destinationAddress)
        //     const thirdLegMiles = (0.000621371 * (thirdLeg?.routes[0]?.legs[0]?.distance?.value || 0)).toFixed(1);
        //     console.log('thirdLegMiles', thirdLegMiles);

        //     totalMilesAfterPickupAndDropOff = parseFloat(firstLegMiles) + parseFloat(secondLegMiles) + parseFloat(thirdLegMiles);

        //     const originalDistanceForDriver = await directionsService.route({
        //         origin: matchObject?.rideRequest?.startAddress,
        //         destination: matchObject?.rideRequest?.destinationAddress,
        //         // eslint-disable-next-line no-undef
        //         travelMode: google.maps.TravelMode.DRIVING,
        //     })

        //     const originalDistanceForDriverInMiles = (0.000621371 * (originalDistanceForDriver?.routes[0]?.legs[0]?.distance?.value || 0)).toFixed(1);
        //     detour = (totalMilesAfterPickupAndDropOff - parseFloat(originalDistanceForDriverInMiles)).toFixed(1);


        // } else {
        //     const directionsService = new google.maps.DirectionsService();
        //     const firstLeg = await directionsService.route({
        //         origin: startAddress,
        //         destination: matchObject?.rideRequest?.startAddress,
        //         travelMode: google.maps.TravelMode.DRIVING,
        //     })
        //     console.log('origin: ', startAddress)
        //     console.log('destination: ', matchObject?.rideRequest?.startAddress)
        //     const firstLegMiles = (0.000621371 * (firstLeg?.routes[0]?.legs[0]?.distance?.value || 0)).toFixed(1);
        //     console.log('firstLegMiles', firstLegMiles);

        //     // Drop to the riders destination address
        //     const secondLeg = await directionsService.route({
        //         origin: matchObject?.rideRequest?.startAddress,
        //         destination: matchObject?.rideRequest?.destinationAddress,
        //         // eslint-disable-next-line no-undef
        //         travelMode: google.maps.TravelMode.DRIVING,
        //     })
        //     console.log('origin: ', matchObject?.rideRequest?.startAddress)
        //     console.log('destination: ', matchObject?.rideRequest?.destinationAddress)
        //     const secondLegMiles = (0.000621371 * (secondLeg?.routes[0]?.legs[0]?.distance?.value || 0)).toFixed(1);
        //     console.log('secondLegMiles', secondLegMiles);


        //     // Go to your final destination 
        //     const thirdLeg = await directionsService.route({
        //         origin: matchObject?.rideRequest?.destinationAddress,
        //         destination: destinationAddress,
        //         // eslint-disable-next-line no-undef
        //         travelMode: google.maps.TravelMode.DRIVING,
        //     })
        //     console.log('origin: ', matchObject?.rideRequest?.destinationAddress)
        //     console.log('destination: ', destinationAddress)
        //     const thirdLegMiles = (0.000621371 * (thirdLeg?.routes[0]?.legs[0]?.distance?.value || 0)).toFixed(1);
        //     console.log('thirdLegMiles', thirdLegMiles);

        //     totalMilesAfterPickupAndDropOff = parseFloat(firstLegMiles) + parseFloat(secondLegMiles) + parseFloat(thirdLegMiles);
        //     detour = (totalMilesAfterPickupAndDropOff - parseFloat(distanceInMiles)).toFixed(1);
        // }

        // console.log("Total Miles for Driver: ", totalMilesAfterPickupAndDropOff)

        // console.log('detour', detour);

        // const postRequestBody = {
        //     userId: session.userId,
        //     departureTime: departureTime,
        //     start_loc_lat: fromLocation.latitude,
        //     start_loc_long: fromLocation.longitude,
        //     destination_loc_lat: toLocation.latitude,
        //     destination_loc_long: toLocation.longitude,
        //     seatCount: seats,
        //     driving: isDriving === "0" ? false : true,
        //     startAddress: startAddress,
        //     rideDistance: distanceInMiles,
        //     destinationAddress: destinationAddress,
        //     startAddressName: startAddressName,
        //     destinationAddressName: destinationAddressName
        // };
        // console.log(postRequestBody);

        // axios.post(import.meta.env.VITE_APP_API + '/rides', postRequestBody)
        //     .then(async (postResponse: AxiosResponse) => {
        //         console.log(postResponse.data);

        //requesterRideId - Logged in user

        // const postMatchBody = {
        //     requesterRideId: createdRideId,
        //     requestedRideId: matchObject?.rideRequest?.rideId,
        //     detourInMiles: 2,
        //     status: 0
        // }

        // console.log('Match Body', postMatchBody);

        // axios.post(import.meta.env.VITE_APP_API + '/rides/match', postMatchBody).then(async (postMatchResponse: AxiosResponse) => {
        //     console.log(postMatchResponse);
        //     setStatusMessages('Match Request Sent!');
        //     setLoading(false);




        //     present({
        //         message: 'Match Request Sent.',
        //         duration: 1000,
        //     });

        //     //await delay(1000);
        //    // routeToUserActivity();

        // }).catch((rideMatchPostError: AxiosError) => {
        //     setLoading(false);
        //     if (rideMatchPostError.response?.status === 404 || rideMatchPostError.response?.status === 400) {
        //         setErrorLogs('Looks like there was something bad with the request, please try again with a valid input!');
        //     } else if (rideMatchPostError.response?.status === 500) {
        //         setErrorLogs('Looks like we had something going bad with our server! Please try again in sometime!');
        //     } else {
        //         setErrorLogs('Looks like we have something unexpected going on! Please try again in sometime.');
        //     }
        // })

        // })
        // .catch((reason: AxiosError) => {
        //     setLoading(false);
        //     if (reason.response?.status === 404 || reason.response?.status === 400) {
        //         setErrorLogs('Looks like there was something bad with the request, please try again with a valid input!');
        //     } else if (reason.response?.status === 500) {
        //         setErrorLogs('Looks like we had something going bad with our server! Please try again in sometime!');
        //     } else {
        //         setErrorLogs('Looks like we have something unexpected going on! Please try again in sometime.');
        //     }
        // })
    }

    async function loadFilteredFeed(newDepartureDate: any, selectedEvent: any, rideId:any) {
        setFeedData([]);
        // if (startAddress == '' || destinationAddress == '') {
        //     setErrorLogs('Please select a valid "From" or "To" address.');
        //     return;
        // }

        // if (departureTime == '' || departureTime == null) {
        //     setErrorLogs('Please select departure time of the ride');
        //     return;
        // }
        // const session = JSON.parse(localStorage.getItem('session') || "");

        // const [fromLocation, setUserFromLocation] = useState({ latitude: 0, "longitude": 0 });
        // const [toLocation, setUserToLocation] = useState({ latitude: 0, "longitude": 0 });

        // const [startAddress, setStartAddress] = useState("");
        // const [destinationAddress, setDestinationAddress] = useState("");

        var filterCount = 0;
        console.log('fromLatLon', fromLocation);
        console.log('toLatLon', toLocation);
        console.log('departureTime', departureTime);
        console.log('dest location', destinationAddress);
        console.log('start location', startAddress);
        let queryParams: any;
        queryParams = {
            rideId: rideId,
            locationLatitude: !swapToggle? fromLocation.latitude: selectedEvent.venue?.latitude,
            locationLongitude: !swapToggle?  fromLocation.longitude: selectedEvent.venue?.longitude,
            destLatitude: !swapToggle? selectedEvent.venue?.latitude : fromLocation.latitude,
            destLongitude: !swapToggle? selectedEvent.venue?.longitude: fromLocation.longitude,
            radiusInMiles: 8,
            seatCount: seats,
            pageNum: 0,
            // look for the other entity, if user is a driver look for riders and viceversa
            //isDriving: isDriving === "0" ? true : false,
            pageSize: 100
        }

        console.log('queryparams', queryParams);
        console.log(newDepartureDate);
        let drivingBool = isDriving === "0" ? false : true;

        // yesterday
        var filterDepartureDateInUTCObj = new Date(newDepartureDate);

        // plus minus 2 hours.
        var after = new Date(filterDepartureDateInUTCObj.setHours(filterDepartureDateInUTCObj.getHours() - 2)).toISOString();
        var before = new Date(filterDepartureDateInUTCObj.setHours(filterDepartureDateInUTCObj.getHours() + 4)).toISOString();
        console.log('curr-iso-utc', filterDepartureDateInUTCObj.toISOString());
        console.log('before', before);
        console.log('after', after);

        queryParams['before'] = before;
        queryParams['after'] = after;

        console.log(queryParams);

        const getResponse = await axios.get(import.meta.env.VITE_APP_API_V2 + '/rides/matches'
            , { params: queryParams , headers: { 'Authorization': globalSessionObj.wagon_token } });

        console.log(getResponse.data);
        let filteredFeed = [];
        let filteredFeedFlipDriverRider = [];
        for(let i = 0; i < getResponse.data.length; i++) {
            console.log('ride req seatcount', getResponse.data[i].rideRequest.seatCount);
            console.log('ride requestStats.acceptedTotalSeatCount', getResponse.data[i].requestStats.acceptedTotalSeatCount);
            if (getResponse.data[i].rideRequest.seatCount - getResponse.data[i].requestStats.acceptedTotalSeatCount > 0) {
                if (drivingBool !=  getResponse.data[i].rideRequest.driving) {
                    filteredFeed.push(getResponse.data[i]);
                } else {
                    filteredFeedFlipDriverRider.push(getResponse.data[i]);
                }
            }
        }

        console.log('filteredFeed', filteredFeed);
        console.log('filteredFeedFlipDriverRider', filteredFeedFlipDriverRider);

        if (filteredFeed.length == 0) {
            if (filteredFeedFlipDriverRider.length == 0) {
                setStatusMessages('');
                ReactGA.event({
                    category: 'event_ride_no_match_found',
                    action: 'event_ride_no_match_found',
                });
                //getEstimatedTripCost();
                // Take to the useractivity if there are no recommended rides.
                present({
                    message: 'Ride Created Successfully.',
                    duration: 1000,
                });
                setShowRideCreationModal(false);
                setLoading(false);
                //history.push('App');
                window.location.replace('/App');
                //setRedirectToUserActivity(true);
            } else {
                ReactGA.event({
                    category: 'events_ride_match_found',
                    action: 'events_ride_match_found',
                });
                setStatusMessages('');
                setLoading(false);
                setShowRecommendedRideModal(true);
                // let tempFeedObj:any ;
                // for (let i=0; i< filteredFeed.length; i++) {
                //     tempFeedObj[filteredFeed[i]?.rideRequest?.rideId] = filteredFeed[i]?.name;
                // }
                // console.log(tempFeedObj);
                // setFeedDataObj(tempFeedObj);
                setFlipRiderDriver(true);
                setFeedData(filteredFeedFlipDriverRider);
            }
            
        } else {
            // setShowRideCreationModal(false);
            ReactGA.event({
                category: 'events_ride_match_found',
                action: 'events_ride_match_found',
            });
            setStatusMessages('');
            setLoading(false);
            setShowRecommendedRideModal(true);
            // let tempFeedObj:any ;
            // for (let i=0; i< filteredFeed.length; i++) {
            //     tempFeedObj[filteredFeed[i]?.rideRequest?.rideId] = filteredFeed[i]?.name;
            // }
            // console.log(tempFeedObj);
            // setFeedDataObj(tempFeedObj);
            setFeedData(filteredFeed);
        }
    }

    function routeToUserActivity() {
        setShowRecommendedRideModal(false);
        //setRedirectToUserActivity(true);
        //history.push('App');
        window.location.replace('/App');
    }

    function resetForm() {
        setLoading(false);
        setStatusMessages('');
        setErrorLogs('');
        setCheckedItems({});
        setEventId('');
        setRedirectToUserActivity(false);
        setSeats("1");
        setDriving("1");
        setStartAddress("");
        setDestinationAddress("");
        setTripType("2");
        setCreatedRideId(0);
        setDepartureWindow(2);
    }

    function rideCreationModal(item: any) {
        // resetForm();
        // inputStartAddressRef.current.value = startAddress;
        setErrorLogs('');
        setShowRideCreationModal(true);
        setSelectedEvent(item);

    }

    function closeRideCreationModal() {
        setShowRideCreationModal(false);
        setSelectedEvent({});
    }

    const getCurrentLocation = async () => {
        if (localStorage.getItem('current_location') == null) {
            let response;
            try {
                ReactGA.event({
                    category: 'events_location_access_granted',
                    action: 'events_location_access_granted',
                });
                const coordinates = await Geolocation.getCurrentPosition();
                const lat = coordinates.coords.latitude;
                console.log(lat);
                const lng = coordinates.coords.longitude;
                console.log(lng);

                response = await Geocode.fromLatLng((coordinates.coords.latitude).toString(), (coordinates.coords.longitude).toString());
                console.log('zipcode', response.results[0].address_components[7].long_name);
                setZipCode(response.results[0].address_components[7].long_name);
                console.log('detail', response.results[0].address_components[3].long_name);
                let addressArray = response.results[0].formatted_address.split(",");
                setCity(addressArray[addressArray.length - 3]);
                //response => {
                const address = response.results[0].formatted_address;
                console.log('Address', address);
                console.log(address);
                currAddress = address;

                setStartAddress(address);
                setStartAddressName(address);
                setUserFromLocation({
                    ...fromLocation, latitude: coordinates.coords.latitude || 0,
                    longitude: coordinates.coords.longitude || 0,
                });

                const newCurrentLocation = {
                    zipcode: response.results[0].address_components[7].long_name,
                    lat: lat,
                    lng: lng
                }
                localStorage.removeItem("current_location");
                localStorage.setItem("current_location", JSON.stringify(newCurrentLocation));

                getGamesAndEvents(lat, lng);
                setErrorLogs('');
            } catch (e: any) {
                ReactGA.event({
                    category: 'events_location_access_denied',
                    action: 'events_location_access_denied',
                });
                console.log(e.message);
                setZipCode('95035');
                getGamesAndEvents(currLat, currLon);
            }
        } else {
            let cachedLat = JSON.parse(localStorage.getItem('current_location') || '').lat;
            let cacheLng = JSON.parse(localStorage.getItem('current_location') || '').lng;
            setZipCode(JSON.parse(localStorage.getItem('current_location') || '').zipcode);
            getGamesAndEvents(cachedLat, cacheLng);
            setErrorLogs('');

            // go ahead and get current location & cache it for next time.
            const coordinates = await Geolocation.getCurrentPosition();
            const lat = coordinates.coords.latitude;
            console.log(lat);
            const lng = coordinates.coords.longitude;
            console.log(lng);

            let response = await Geocode.fromLatLng((coordinates.coords.latitude).toString(), (coordinates.coords.longitude).toString());
            console.log('zipcode', response.results[0].address_components[7].long_name);
            setZipCode(response.results[0].address_components[7].long_name);
            console.log('detail', response.results[0].address_components[3].long_name);
            let addressArray = response.results[0].formatted_address.split(",");
            setCity(addressArray[addressArray.length - 3]);
            //response => {
            const address = response.results[0].formatted_address;
            console.log('Address', address);
            console.log(address);
            currAddress = address;

            setStartAddress(address);
            setStartAddressName(address);
            setUserFromLocation({
                ...fromLocation, latitude: coordinates.coords.latitude || 0,
                longitude: coordinates.coords.longitude || 0,
            });

            const newCurrentLocation = {
                zipcode: response.results[0].address_components[7].long_name,
                lat: lat,
                lng: lng
            }
            localStorage.removeItem("current_location");
            localStorage.setItem("current_location", JSON.stringify(newCurrentLocation));

        }
        // inputStartAddressRef.current.value = response.results[0].formatted_address;
    }

    function swapAddress() {
        setSwapToggle(!swapToggle);
    }

    async function signIn(): Promise<void> {
        setLoading(true);
        setStatusMessages('Signing In...');
        
        const response = await GoogleAuth.signIn();
        setStatusMessages('Sign In Successful!');
        console.log(response);

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
            postTrip(selectedEvent);
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
               
                console.log(reason.message)
            })        
        // let familyName = response.familyName;
        // if (response.familyName == undefined) {
        //     familyName = '';
        // }
        // const name = response.givenName + ' ' + familyName;
        // // const name = response.givenName + ' ' + response.familyName;
        // const postRequestBody = {
        //     email: response.email,
        //     name: name,
        //     imageUrl: response.imageUrl
        // };
        // axios.get(import.meta.env.VITE_APP_API + '/user/email?email=' + response.email)
        //     .then((axiosResponse: AxiosResponse) => {
        //         setLoading(false);
        //         ReactGA.event({
        //             category: "events_login_success_existing_user",
        //             action: "events_login_success_existing_user",
        //         });
        //         const newSession = {
        //             created: new Date().getTime(),
        //             token: response.email,
        //             userId: axiosResponse.data.id,
        //             gender: axiosResponse.data.gender,
        //             imageUrl: axiosResponse.data.imageUrl,
        //             name: axiosResponse.data.name
        //         }
        //         localStorage.removeItem("session");

        //         localStorage.setItem("session", JSON.stringify(newSession));
        //         setSessionExists(true);
        //         postTrip(selectedEvent);
        //     })
        //     .catch((reason: AxiosError) => {
        //         if (reason.response!.status === 404) {
        //             setStatusMessages('Creating new User Profile...');
        //             ReactGA.event({
        //                 category: "events_login_success_firsttime_user",
        //                 action: "events_login_success_firsttime_user",
        //             });

        //             //const postResponse = await axios.post(import.meta.env.VITE_APP_API, postRequestBody);
        //             axios.post(import.meta.env.VITE_APP_API + '/user', postRequestBody).then((response) => {
        //                 console.log(response);
        //                 setStatusMessages('User Profile Created!');
        //                 const newSession = {
        //                     created: new Date().getTime(),
        //                     token: response.data.email,
        //                     userId: response.data.id,
        //                     gender: response.data.gender,
        //                     imageUrl: response.data.imageUrl,
        //                     name: name
        //                 }
        //                 localStorage.removeItem("session");
        //                 localStorage.removeItem("temp_session");
        //                 localStorage.setItem("session", JSON.stringify(newSession));
        //                 postTrip(selectedEvent);
        //             })
        //                 .catch((reason) => {
        //                     if (reason.response.status === 400) {
        //                         // Handle 400
        //                     } else {
        //                         // Handle else
        //                     }
        //                     console.log(reason.message)
        //                 })
        //         } else {
        //             console.log(reason.message)
        //         }
        //     })
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
            setMatchListEmpty(true);
        } else {
            setMatchListEmpty(false);
        }
        console.log(Object.keys(tempCheckedItems).length);
    }

    function toggleAgeCheckBox() {
        setCheckboxEighteenYearsOld(!checkboxEighteenYearsOld);
    }

    function setCarpoolCategory(category: any) {
        if (category == 1) {
            ReactGA.event({
                category: 'toggle_cat_to_work',
                action: 'toggle_cat_to_work',
            });
            localStorage.setItem("carpool_category", 'work');
            //history.push('/carpoolForWork');
            window.location.replace('/carpoolForWork');

        } else if (category == 2) {
            window.location.replace('/carpoolForAirport');
        }
    }

    function setTermToggleFunc(termToggle:any) {
        
        termRef.current.value = "";
        setTermToggle(termToggle);
        globalTermToggle = termToggle;
        console.log(termToggle);
        if (termToggle == 0) {
            terms = 'sports';
        } else  if (termToggle == 1) {
            terms = 'music';
        } else if (termToggle == 2) {
            terms = 'comedy';
        } else {
            terms = '';
        }
        
        getGamesAndEventsNearZipCode();

    }

    function getGamesAndEventsNearZipCode() {
        console.log('games near you', zipcode);
        Geocode.fromAddress(zipcode).then(async ({ results }) => {
            console.log('here');
            const { lat, lng } = results[0].geometry.location;
            console.log(lat);
            console.log(lng);

            // cache the address.
            const newCurrentLocation = {
                zipcode: zipcode,
                lat: lat,
                lng: lng
            }
            localStorage.removeItem("current_location");
            localStorage.setItem("current_location", JSON.stringify(newCurrentLocation));

            const response = await Geocode.fromLatLng((lat).toString(), (lng).toString());
            console.log(response);
            let addressArray = response.results[0].formatted_address.split(",");
            setCity(addressArray[addressArray.length - 3]);

            setIsValidZipCode(true);
            setCurrLat(lat);
            setCurrLon(lng);
            getGamesAndEvents(lat, lng);
        }).catch((err) => {
            console.log('games near you', 'invalid zicode');
            setIsValidZipCode(false);
            console.log(err);
        });
    }

    function setInputZipCode(inputZipCode: any) {
        setIsValidZipCode(true);
       setZipCode(inputZipCode);
    }

    function setTerms(termsVar: any) {
       console.log(termsVar);
       terms = termsVar;
       console.log(terms);
    //    setTermsState(termsVar);
    }

    function goBack() {
        setShowRideCreationModal(false);
        setSelectedEvent({});
    }

    const [isTouched, setIsTouched] = useState(false);
    const markTouched = () => {
        setIsTouched(true);
      };

    function goToMyRides() {
        window.location.replace('/App');
    }

    return (
        <>
            <IonContent>
                {/* {
                    !sessionExists ? <><IonReactRouter><Switch><Redirect exact to={{ pathname: '/getstarted' }} /><Route path="/getstarted" component={GetStarted} /></Switch></IonReactRouter></> : null

                } */}
                {
                    redirectToUserActivity ? <><IonReactRouter><Switch><Redirect to={{ pathname: '/App' }} /><Route path="/App" component={AppLandingPage} /> </Switch></IonReactRouter></> : null
                }
                {/* {
                    loading ?
                        <IonLabel className="centerLabel"><IonSpinner color="primary"></IonSpinner></IonLabel>
                        : null
                } */}
                {
                    <IonPage>
                        <IonContent>
                            {/* {
                                feedLoading ?
                                    <IonLabel className="centerLabel"><IonSpinner color="primary"></IonSpinner></IonLabel>
                                    : null
                            } */}
                            {
                                localStorage.getItem('platform') == 'ios' ? <div className="topBarHomePage"></div> : null
                            }
                           {
                                sessionExists ? 
                                <IonCard >
                                    <IonCardContent>
                                        
                                        {
                                        
                                        localStorage.getItem('session') != null && (JSON.parse(localStorage.getItem('session') || '').wagon_token != undefined)?  <><IonButton size="small" onClick={() => { goToMyRides() }} color="success" fill="outline" className="filterButtonInPoolPage">My Rides</IonButton><IonLabel><img className="feedItemImg" src={JSON.parse(localStorage.getItem('session') || "").imageUrl == null? "assets/img/avatar.svg" :  JSON.parse(localStorage.getItem('session') || "").imageUrl} alt="" referrerPolicy='no-referrer' /> {JSON.parse(localStorage.getItem('session') || "").name} </IonLabel></>: null
                                         
                                    }
                                        {/* <IonButton size="small"  onClick={() => { setRedirectToUserActivity(true) }} color="medium" className="filterButton">People Around You</IonButton> */}
                                    </IonCardContent>

                                </IonCard>
                                : null
                               } 
                            
                            {
                                // !feedLoading && eventData.length> 0?
                                <IonCard>
                                    <IonCardHeader>
                                    <IonCardSubtitle>Carpooling UseCase</IonCardSubtitle>
                                </IonCardHeader>
                                <IonCardContent>
                                <IonSegment mode="ios" value="0" onIonChange={e => setCarpoolCategory(e.detail.value)}>
                                                    <IonSegmentButton value="0">
                                                        <IonLabel class="segmentLabel">Events</IonLabel>
                                                    </IonSegmentButton>
                                                    <IonSegmentButton value="1">
                                                        <IonLabel class="segmentLabel">Work</IonLabel>
                                                    </IonSegmentButton>
                                                    <IonSegmentButton value="2">
                                                        <IonLabel class="segmentLabel">Airports</IonLabel>
                                                    </IonSegmentButton>
                                                </IonSegment>
                                </IonCardContent>
                            </IonCard>
                            // : null
                            }
                            
                            {/* <IonToast color="tertiary"
                                isOpen={displayToast && isDriving == "0"}
                                message="Rider gets an incredibly cheap ride!"
                                duration={3000}
                            ></IonToast>
                            <IonToast color="tertiary"
                                isOpen={displayToast && isDriving == "1"}
                                message="Driver gets paid for the ride!"
                                duration={3000}
                            ></IonToast> */}
                            <hr/>
                            {
                                // !feedLoading && eventData.length> 0?
                                <IonCard>
                                <IonCardContent>
                                   <span> <IonInput label="Enter Zip Code"
                                    onIonInput={(e) => setInputZipCode(e.detail.value)}
                                    className={`${isvalidZipCode && 'ion-valid'} ${isvalidZipCode === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                                    onIonBlur={() => markTouched()}
                                    clearInput={true}
                                    errorText="Invalid Zip Code"
                                        labelPlacement="floating" value={zipcode} fill="outline"></IonInput>
                                        <hr/>
                                          <IonInput label="Search by Artist, Event or Venue"
                                    onIonInput={(e) => setTerms(e.detail.value || '')}
                                    clearInput={true} 
                                    ref={termRef}
                                    placeholder="Search by Artist, Event or Venue"
                                    labelPlacement="floating" fill="outline">
                                    </IonInput>
                                        </span>
      

                                        <IonButton className="feedbackbutton" color="medium" onClick={getGamesAndEventsNearZipCode} size="small">Search</IonButton>
                                </IonCardContent>
                            </IonCard>
                            // : null
                            }
                            
                            <hr/>
                            {
                                // !feedLoading && eventData.length> 0?
                                    <IonCard>
                                        <IonCardContent > 
                                            {/* {
                                                eventClassification != '' ?
                                                    <h2>{eventClassification[0].toUpperCase() + eventClassification.slice(1)} games near {city}</h2>
                                                    :
                                                    <h2>{eventClassification} Events near {city}</h2>
                                            } */}
                                            <IonLabel className="selectgame">(Showing Search Results)</IonLabel><br/>
                                            {
                                                feedLoading ? 
                                                <><IonLabel className="mediumfont" color="success">{eventClassification} Loading Events...</IonLabel><IonLabel><IonSpinner class="smallspinner" color="success"></IonSpinner></IonLabel><hr/></>
                                                :
                                                <><IonLabel className="mediumfont" color="success">{eventClassification} Events near {city}</IonLabel><hr/></>
                                            }
                                             
                                            {/* <IonLabel className="selectgame">Select a Game - Create a carpool ride - Get matched</IonLabel> */}

                                            {
                                                !feedLoading && eventData.length> 0 ? 
                                                <IonSegment mode="ios" value={termToggle} onIonChange={e => setTermToggleFunc(e.detail.value)}>
                                                    <IonSegmentButton value="0">
                                                        <IonLabel class="segmentLabel">Sports</IonLabel>
                                                    </IonSegmentButton>
                                                    <IonSegmentButton value="1">
                                                        <IonLabel class="segmentLabel">Music</IonLabel>
                                                    </IonSegmentButton>
                                                    <IonSegmentButton value="2">
                                                        <IonLabel class="segmentLabel">Comedy</IonLabel>
                                                    </IonSegmentButton>
                                                    <IonSegmentButton value="3">
                                                        <IonLabel class="segmentLabel">All</IonLabel>
                                                    </IonSegmentButton>
                                                </IonSegment>
                                                : null 
                                            }
                                            
                                        </IonCardContent>
                                    </IonCard>
                                    //  : null
                            }
                            {/* <IonToast color="danger"
                                isOpen={!feedLoading && eventData.length == 0 }
                                message="Unable to find events matching your search criteria!"
                                duration={3000}
                            ></IonToast> */}
                            {/* {
                                feedLoading ?
                                <IonCard>
                                        <IonCardContent>
                                        <IonLabel className="centerLabel"><IonSpinner color="primary"></IonSpinner></IonLabel>
                                        </IonCardContent>
                                    </IonCard>
                                :null
                            } */}
                            {
                                !feedLoading && eventData.length == 0 ?
                                <IonCard color="danger">
                                        <IonCardContent>
                                            <IonLabel class="italicFont">Unable to find events matching your search criteria!</IonLabel>
                                        </IonCardContent>
                                    </IonCard>
                                :null
                            }
                            {eventData.map((item, index) => (
                                index < 30 ?
                                    item.eventId != eventId ?
                                        <IonCard className="cursorPointer" onClick={() => rideCreationModal(item)} key={index}>
                                            <IonCardContent>
                                            
                                                {
                                                    <img className="feedItemImg" src={item.imageUrl} alt="" referrerPolicy='no-referrer' />
                                                }

                                                <IonLabel className="eventName">{item.eventName}</IonLabel>
                                                <hr />

                                                <IonBadge color="medium" class="eventBadge" slot="end">{
                                                    new Date(item.eventDateTime).toLocaleString(
                                                        "en-US",
                                                        {
                                                            month: "short",
                                                            day: "2-digit",
                                                            year: "numeric",
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        }
                                                    )}</IonBadge>
                                                <IonBadge color="medium" class="eventBadge" slot="end">{item.venue.venueName}, {item.venue.city}</IonBadge>

                                            </IonCardContent>
                                        </IonCard>
                                        :
                                        <IonCard color="medium" className="cursorPointer" onClick={() => rideCreationModal(item)} key={index}>
                                            <IonCardContent>
                                               
                                                {
                                                    <img className="feedItemImg" src={item.imageUrl} alt="" referrerPolicy='no-referrer' />
                                                }
                                                 

                                                <IonLabel className="eventName">{item.eventName}</IonLabel>
                                                <hr />

                                                <IonBadge color="medium" class="eventBadge" slot="end">{
                                                    new Date(item.eventDateTime).toLocaleString(
                                                        "en-US",
                                                        {
                                                            month: "short",
                                                            day: "2-digit",
                                                            year: "numeric",
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        }
                                                    )}</IonBadge>
                                                <IonBadge color="medium" class="eventBadge" slot="end">{item.venue.venueName}, {item.venue.city}</IonBadge>

                                            </IonCardContent>
                                        </IonCard>

                                    : null

                            ))}
                            <hr/>
                                    <IonLabel className="footer">Copyright © 2024 Procsoft LLC.</IonLabel>
                                    <IonLabel className="footer"> support@wagoncarpool.com</IonLabel><hr/>
                            <IonModal id="example-modal" isOpen={showEstimatedCostModal}>
                                <IonHeader>
                                    <IonToolbar>
                                        <IonTitle>Confirm Details</IonTitle>
                                        <IonButtons slot="end">
                                            <IonButton onClick={() => setEstimatedCostModal(false)}><IonIcon color="danger" className="closeIcon" icon={closeCircle}></IonIcon></IonButton>
                                        </IonButtons>
                                    </IonToolbar>
                                </IonHeader>
                                <IonContent className="ion-padding">
                                    <IonCard className="ioncardinamodal" >
                                        <IonCardContent >
                                            {
                                                isDriving == "1" ?
                                                    <>
                                                        <IonItem className="estimatedAmount" color="light">
                                                            You will receive <IonBadge class="costbadge" color="tertiary">${estimatedCost} </IonBadge>for this trip!

                                                        </IonItem>
                                                        <IonItem ><IonBadge class="costbadge" color="medium">Not Safisfied? Slide to modify!</IonBadge></IonItem>
                                                        <IonItem className="tripchargewarning">Increasing the trip charge might reduce your chances of getting matched!</IonItem>
                                                        <IonRange value={modifiedTripCost} active-bar-start={estimatedCost} min={Math.round(estimatedCost * .70)} max={Math.round(estimatedCost * 1.3)} onIonChange={({ detail }) => setModifiedTripCost(detail.value)}></IonRange>
                                                        <IonLabel class="centerLabel"><IonBadge color="medium"> You Get:  ${modifiedTripCost as number}</IonBadge></IonLabel>
                                                    </>

                                                    :
                                                    <IonItem >
                                                        Estimated trip cost is <IonBadge class="costbadge" color="medium">${estimatedCost}</IonBadge>
                                                    </IonItem>

                                            }

                                            <IonItem ><IonButton color="medium" onClick={closeEstimatedCostModal}>BACK</IonButton><IonButton color="tertiary" onClick={() =>
                                                presentAlert({
                                                    header: 'Do you want to submit your request?',
                                                    buttons: [
                                                        {
                                                            text: 'No',
                                                            role: 'cancel',
                                                            handler: () => {
                                                                //setHandlerMessage('Alert canceled');
                                                            },
                                                        },
                                                        {
                                                            text: 'Yes',
                                                            role: 'confirm',
                                                            handler: () => {
                                                                postTrip(selectedEvent);
                                                            },
                                                        },
                                                    ],
                                                    onDidDismiss: (e: CustomEvent) => null,
                                                })
                                            }>Confirm & Post</IonButton></IonItem>

                                        </IonCardContent>
                                    </IonCard>

                                </IonContent>
                            </IonModal>

                            <IonModal id="example-modal" isOpen={showRideCreationModal}>
                                <IonHeader>
                                    <IonToolbar>
                                        <IonTitle>Create Ride</IonTitle>
                                        <IonButtons slot="end">
                                            <IonButton onClick={() => closeRideCreationModal()}><IonIcon color="danger" className="closeIcon" icon={closeCircle}></IonIcon></IonButton>
                                        </IonButtons>
                                    </IonToolbar>
                                </IonHeader>
                                <IonContent className="ion-padding">
                                    <IonCard color="success" className="ioncardinamodal">
                                        <IonCardContent >
                                            <>
                                                <Swiper autoplay={{
                                                    delay: 3000,
                                                    disableOnInteraction: false,
                                                }}
                                                    style={{
                                                        "--swiper-pagination-color": "#ffc409",
                                                    } as CSSProperties}
                                                    pagination={true} modules={[Pagination, Autoplay]} >


                                                    <SwiperSlide >
                                                        <IonGrid>

                                                            <IonText>
                                                            <IonLabel color='light'>Create Ride for Events</IonLabel>
                                                            </IonText>

                                                        </IonGrid>
                                                    </SwiperSlide>

                                                    {/* <SwiperSlide>
                                                        <IonGrid>

                                                            <IonText>
                                                                <h3>Create a ride</h3>
                                                            </IonText>

                                                        </IonGrid>
                                                    </SwiperSlide>

                                                    <SwiperSlide>
                                                        <IonGrid>

                                                            <IonText>
                                                                <h3>Get Matched</h3>
                                                            </IonText>

                                                        </IonGrid>
                                                    </SwiperSlide>

                                                    <SwiperSlide>
                                                        <IonGrid>

                                                            <IonText>
                                                                <h3>Riders get an incredibly cheap ride</h3>
                                                            </IonText>

                                                        </IonGrid>
                                                    </SwiperSlide>


                                                    <SwiperSlide>
                                                        <IonGrid>

                                                            <IonText>
                                                                <p>Drivers get paid for the ride</p>
                                                            </IonText>


                                                        </IonGrid>
                                                    </SwiperSlide>
                                                    <SwiperSlide>
                                                        <IonGrid>

                                                            <IonText>
                                                                <p>Choose to be a Driver or a Rider!</p>
                                                            </IonText>

                                                        </IonGrid>
                                                    </SwiperSlide>
                                                    <SwiperSlide>
                                                        <IonGrid>

                                                            <IonText>
                                                                <p>Carpool with Wagon!</p>
                                                            </IonText>

                                                        </IonGrid>
                                                    </SwiperSlide>
                                                    <SwiperSlide>
                                                        <IonGrid>

                                                            <IonText>
                                                                <p>Network!</p>
                                                            </IonText>

                                                        </IonGrid>
                                                    </SwiperSlide>
                                                    <SwiperSlide>
                                                        <IonGrid>

                                                            <IonText>
                                                                <p>Save time!</p>
                                                            </IonText>

                                                        </IonGrid>
                                                    </SwiperSlide>
                                                    <SwiperSlide>
                                                        <IonGrid>

                                                            <IonText>
                                                                <p>Save Environment!</p>
                                                            </IonText>

                                                        </IonGrid>
                                                    </SwiperSlide> */}
                                                </Swiper>
                                            </>
                                            {/* <IonLabel className="selectgame">Do you want to Find a Ride (Rider) or Offer a Ride (Driver)?<br/> Rider gets an incredibly cheap ride and driver gets paid for the ride! </IonLabel> */}
                                        </IonCardContent></IonCard>
                                    <div>
                                        <IonCard className="ioncardinamodal">
                                            <IonCardContent >
                                                {/* <IonCard className="subcardNoPadding">

                                                    <IonCardContent> */}

                                                {
                                                    <img className="feedItemImg" src={selectedEvent.imageUrl} alt="" referrerPolicy='no-referrer' />
                                                }

                                                <IonLabel className="eventName">{selectedEvent.eventName}</IonLabel>
                                                <hr />

                                                <IonBadge color="medium" class="eventBadge" slot="end">{
                                                    new Date(selectedEvent.eventDateTime).toLocaleString(
                                                        "en-US",
                                                        {
                                                            month: "short",
                                                            day: "2-digit",
                                                            year: "numeric",
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        }
                                                    )}</IonBadge>
                                                <IonBadge color="medium" class="eventBadge" slot="end">{selectedEvent.venue?.venueName}, {selectedEvent.venue?.city}</IonBadge>
                                                <hr />

                                                {/* </IonCardContent>
                                                </IonCard> */}

                                                <IonSegment mode="ios" value={isDriving} onIonChange={e => setIsDriving(e.detail.value)}>
                                                    <IonSegmentButton value="1">
                                                        <IonLabel class="segmentLabel">Drive</IonLabel>
                                                    </IonSegmentButton>
                                                    <IonSegmentButton value="0">
                                                        <IonLabel class="segmentLabel">Ride</IonLabel>
                                                    </IonSegmentButton>
                                                </IonSegment>

                                                <hr />

                                                <IonSegment mode="ios" value={seats} onIonChange={e => setAvailableSeats(e.detail.value)}>
                                                    <IonSegmentButton value="1">
                                                        <IonLabel class="segmentLabel">1 Passenger</IonLabel>
                                                    </IonSegmentButton>
                                                    <IonSegmentButton value="2">
                                                        <IonLabel class="segmentLabel">2 Passengers</IonLabel>
                                                    </IonSegmentButton>
                                                </IonSegment>

                                                <hr />

                                                <IonSegment mode="ios" value={tripType} onIonChange={e => setTripType(e.detail.value)}>
                                                    <IonSegmentButton value="2">
                                                        <IonLabel class="segmentLabel">Round Trip</IonLabel>
                                                    </IonSegmentButton>
                                                    <IonSegmentButton value="1">
                                                        <IonLabel class="segmentLabel">One Way</IonLabel>
                                                    </IonSegmentButton>

                                                </IonSegment>
                                                <hr />
                                                <IonLabel>Departure Time</IonLabel>
                                                <IonSegment mode="ios" value={departureWindow} onIonChange={e => setDepartureWindow(e.detail.value)}>
                                                    <IonSegmentButton value="1">
                                                        <IonLabel class="smallfont">1 hr before event</IonLabel>
                                                    </IonSegmentButton>
                                                    <IonSegmentButton value="2">
                                                        <IonLabel class="smallfont">2 hrs before event</IonLabel>
                                                    </IonSegmentButton>
                                                    <IonSegmentButton value="3">
                                                        <IonLabel class="smallfont">3 hrs before event</IonLabel>
                                                    </IonSegmentButton>

                                                </IonSegment>
                                                <hr />
                                                {
                                                    swapToggle ?
                                                        <Autocomplete
                                                            disabled
                                                            style={{ width: "100%" }}
                                                            defaultValue={selectedEvent.venue?.venueName + ", " + selectedEvent.venue?.city + ", " + selectedEvent.venue?.state}
                                                        />
                                                        :
                                                        <>
                                                            {/* <IonLabel>Start Address</IonLabel> */}
                                                            <Autocomplete
                                                                style={{ width: "100%" }}
                                                                defaultValue={startAddress}
                                                                placeholder="Enter Start Address"
                                                                apiKey='AIzaSyAqRnDMSLMKycFik1KIQkGx1RJBPp9QqwY'
                                                                onPlaceSelected={(selected, a, c) => {
                                                                    setErrorLogs('');
                                                                    console.log(selected);
                                                                    console.log(selected.name);
                                                                    console.log(c);
                                                                    console.log(a);
                                                                    localStorage.setItem("curraddress", (selected.formatted_address || ''));
                                                                    localStorage.setItem("curraddressLatitude", (selected.geometry?.location?.lat().toString() || ''));
                                                                    localStorage.setItem("curraddressLongitude", (selected.geometry?.location?.lng().toString() || ''));

                                                                    setStartAddress(selected.formatted_address || "");
                                                                    setStartAddressName(selected.name || "");
                                                                    console.log('From Lat', selected.geometry?.location?.lat());
                                                                    console.log('From Lng', selected.geometry?.location?.lng());
                                                                    setUserFromLocation({
                                                                        ...fromLocation, latitude: selected.geometry?.location?.lat() || 0,
                                                                        longitude: selected.geometry?.location?.lng() || 0,
                                                                    });
                                                                    setErrorLogs('');

                                                                }}
                                                                options={{
                                                                    types: ["geocode", "establishment"],
                                                                    componentRestrictions: { country },
                                                                    fields: ['formatted_address', 'geometry.location', 'name']
                                                                }}
                                                            /> </>
                                                }

                                                <IonLabel className="swapIcon"><IonIcon className="cursorPointer" onClick={swapAddress} icon={swapVertical}></IonIcon></IonLabel>
                                                {
                                                    swapToggle ?
                                                        <>
                                                            {/* <IonLabel>Destination Address</IonLabel> */}
                                                            <Autocomplete
                                                                style={{ width: "100%" }}
                                                                defaultValue={startAddress}
                                                                placeholder="Enter Destination Address"
                                                                apiKey='AIzaSyAqRnDMSLMKycFik1KIQkGx1RJBPp9QqwY'
                                                                onPlaceSelected={(selected, a, c) => {
                                                                    setErrorLogs('');
                                                                    console.log(selected);
                                                                    console.log(selected.name);
                                                                    console.log(c);
                                                                    console.log(a);
                                                                    localStorage.setItem("curraddress", (selected.formatted_address || ''));
                                                                    localStorage.setItem("curraddressLatitude", (selected.geometry?.location?.lat().toString() || ''));
                                                                    localStorage.setItem("curraddressLongitude", (selected.geometry?.location?.lng().toString() || ''));

                                                                    setStartAddress(selected.formatted_address || "");
                                                                    setStartAddressName(selected.name || "");
                                                                    console.log('From Lat', selected.geometry?.location?.lat());
                                                                    console.log('From Lng', selected.geometry?.location?.lng());
                                                                    setUserFromLocation({
                                                                        ...fromLocation, latitude: selected.geometry?.location?.lat() || 0,
                                                                        longitude: selected.geometry?.location?.lng() || 0,
                                                                    });

                                                                }}
                                                                options={{
                                                                    types: ["geocode", "establishment"],
                                                                    componentRestrictions: { country },
                                                                    fields: ['formatted_address', 'geometry.location', 'name']
                                                                }}
                                                            /> </>
                                                        :

                                                        <Autocomplete
                                                            disabled
                                                            style={{ width: "100%" }}
                                                            defaultValue={selectedEvent.venue?.venueName + ", " + selectedEvent.venue?.city + ", " + selectedEvent.venue?.state}
                                                        />


                                                }

                                                {/* <IonLabel>Destination Address: </IonLabel> */}

                                                <hr />
                                                <IonCheckbox onIonChange={toggleAgeCheckBox} checked={checkboxEighteenYearsOld} labelPlacement="end">I am 18 years old or over</IonCheckbox><hr />

                                                {/* <Autocomplete
                                            defaultValue={destinationAddress}
                                            placeholder="Enter Destination Address"
                                            style={{ width: "100%" }}
                                            ref={inputDestinationAddressRef}
                                            apiKey={import.meta.env.VITE_APP_GOOGLE_KEY}
                                            onPlaceSelected={(selected, a, c) => {
                                                setErrorLogs('');
                                                setDestinationAddress(selected.formatted_address || "");
                                                setDestinationAddressName(selected.name || "");
                                                console.log(selected.formatted_address);
                                                console.log('To Lat', selected.geometry?.location?.lat());
                                                console.log('To Lng', selected.geometry?.location?.lng());

                                                setUserToLocation({
                                                    ...toLocation,
                                                    latitude: selected.geometry?.location?.lat() || 0,
                                                    longitude: selected.geometry?.location?.lng() || 0,
                                                });
                                            }}
                                            options={{
                                                types: ["geocode", "establishment"],
                                                componentRestrictions: { country },
                                                fields: ['formatted_address', 'geometry.location', 'name']

                                            }}
                                        />
                                        <IonDatetime ref={datetime} color="success" size="cover" presentation="date-time"
                                            isDateEnabled={disablePastDates}
                                            onIonChange={(e) => setDeparture(e.detail.value)}>

                                            <span slot="title">Start Date & Time</span>
                                        </IonDatetime>

                                        {
                                            tripType == "2" ?
                                                <><hr /> <IonDatetime color="tertiary" size="cover" presentation="time" onIonChange={(e) => setReturnTime(e.detail.value)}>
                                                    <span slot="title">Return Time</span>
                                                </IonDatetime></>
                                                : null

                                        }
                                         <hr/> */}
                                                {
                                                    errorLogs != '' ? <IonItem className="errorLogs" text-wrap color="danger">{errorLogs}</IonItem> : null
                                                }
                                                {
                                                    <>
                                                        {
                                                            loading ? <IonLabel><IonSpinner class="smallspinner" color="primary"></IonSpinner></IonLabel> : null
                                                        }

                                                        <IonLabel>{statusMessages}</IonLabel><hr /></>
                                                }
                                                {
                                                    !loading ?
                                                        (
                                                            sessionExists ? checkboxEighteenYearsOld ? <IonButton size="small" color="success" onClick={() => postTrip(selectedEvent)}> {isDriving == "1" ? <>Offer a Ride</> : <>Request a Ride</>} </IonButton> : <IonButton size="small" color="success" disabled onClick={() => postTrip(selectedEvent)}>{isDriving == "1" ? <>Offer a Ride</> : <>Request a Ride</>}</IonButton>
                                                                :
                                                                <>
                                                                    <IonLabel class="smallfont">Looks like you haven't logged in yet. </IonLabel>
                                                                    <IonLabel class="loginwithGoogle">
                                                                        <IonButton onClick={() => signIn()} className="login-button" expand="block" fill="solid" color="success">
                                                                        {isDriving == "1" ? <>Login with Google to offer a ride</> : <>Login with Google to Request a Ride </>}
                                                                        </IonButton>
                                                                    </IonLabel>
                                                                    <div className="Terms">
                                                                        By Signing in you accept our
                                                                        <a className="termsandpolicylink" target="_blank" href="/terms" >Terms of use </a> and <a className="termsandpolicylink" target="_blank" href="/privacy-policy">privacy policy</a>
                                                                    </div>
                                                                </>
                                                        ) : null
                                                }
                                                <IonButton color="medium" onClick={goBack} size="small"><IonIcon className="backIcon" icon={arrowBackSharp}></IonIcon> Back</IonButton>
                                                {/* <IonButton size="small" color="success" onClick={postTrip}>Create Ride</IonButton> */}
                                            </IonCardContent>
                                        </IonCard>
                                    </div>
                                    <hr/>
                                    <IonLabel className="footer">Copyright © 2024 Procsoft LLC.</IonLabel>
                                    <IonLabel className="footer"> support@wagoncarpool.com</IonLabel><hr/>
                                </IonContent>
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
                                                        isDriving == "1" ? <><h2 className="flipRiderDriverHeader">Willing to Ride instead of Driving?</h2><br /> No riders available for your trip, but there are other users driving your way. Select the ride(s) below and send a match request if you are willing to be a rider. </>
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

                                    {/* <hr />
                                    {
                                        feedData.length > 2 ? <IonLabel color="medium">We also found few {isDriving === "0" ? "drivers" : "riders"} going on a similar route! </IonLabel>
                                            : null
                                    }
                                    {
                                        feedData.length == 1 ? <IonLabel color="medium">We also found a {isDriving === "0" ? "driver" : "rider"} going on a similar route! </IonLabel>
                                            : null
                                    } */}

                                    {feedData.map((item, index) => (

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
                                                        {/* {
                                                        loading? <IonLabel><IonSpinner class="smallspinner" color="primary"></IonSpinner></IonLabel>:null
                                                } */}

                                                        {/* {
                                                       matchClickIndex==index &&  loading? <IonButton color="tertiary" disabled size="small" onClick={() => matchRide(item, index)} expand="block" className="matchbutton">{statusMessages}</IonButton>: <IonButton color="tertiary" size="small" onClick={() => matchRide(item, index)} expand="block" className="matchbutton">Match Ride</IonButton>
                                                } */}
                                                    </div>



                                                </IonCardContent>
                                            }

                                        </IonCard>
                                    ))}
                                    {/*                                     <hr/>
                                    <IonLabel>Didn't find any possible matches?</IonLabel>
                                   <IonButton color="success" size="small" onClick={routeToUserActivity} expand="block" className="matchbutton">Show me the ride I created</IonButton> */}

                                </IonContent>
                                {
                                    // loading? <><p><IonSpinner className="smallspinner"></IonSpinner>{statusMessages}</p></> : 
                                    matchListEmpty ? <IonButton disabled className="buttonInAModal" onClick={() => matchRide()} color="success" size="small">
                                        {
                                          !filpRiderDriver?  <>Send Match Request </> : isDriving == "1" ? <>Send Match Request as a Rider</> : <>Send Match Request and Drive Instead</>
                                        }
                                        </IonButton> :
                                        <IonButton className="buttonInAModal" onClick={() => matchRide()} color="success" size="small">
                                        {
                                          !filpRiderDriver?  <>Send Match Request </> : isDriving == "1" ? <>Send Match Request as a Rider</> : <>Send Match Request and Drive Instead</>
                                        }
                                        </IonButton>
                                }
                                <IonButton className="buttonInAModal" onClick={() => closeRecommendedRideModalModal()} color="medium" size="small">View My Ride(s)</IonButton>

                                <hr />
                            </IonModal>
                        </IonContent>
                    </IonPage>

                }


            </IonContent></>



    );
};

export default Events;
