import { IonAlert, IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCheckbox, IonCol, IonContent, IonDatetime, IonDatetimeButton, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonModal, IonNavLink, IonPage, IonRange, IonRow, IonSegment, IonSegmentButton, IonSelect, IonSelectOption, IonSpinner, IonText, IonTitle, IonToast, IonToolbar, useIonAlert, useIonLoading, useIonViewDidEnter } from '@ionic/react';
import React, { CSSProperties, FC, MutableRefObject, RefObject, useEffect, useRef, useState } from "react";
import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";
import { Redirect, useHistory, Route, HashRouter, Switch, BrowserRouter } from 'react-router-dom';
import './GetStarted.css';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { add, addCircleSharp, body, car, closeCircle, infinite, location, logoStencil, menu, people, peopleCircle, peopleOutline, returnUpBackOutline, settings, shieldCheckmarkSharp, swapVertical } from 'ionicons/icons';
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
import { h } from '@ionic/pwa-elements/dist/types/stencil-public-runtime';


const Airport = () => {
    let currAddress: any;
    Geocode.setApiKey('AIzaSyAqRnDMSLMKycFik1KIQkGx1RJBPp9QqwY');
    Geocode.setLanguage("en");
    // Geocode.setRegion("us");

    let history = useHistory();
    const [presentAlert] = useIonAlert();
    const [present, dismiss] = useIonLoading();

    const [fromLocation, setUserFromLocation] = useState({ latitude: 0, "longitude": 0 });
    const [toLocation, setUserToLocation] = useState({ latitude: 0, "longitude": 0 });

    const [startAddress, setStartAddress] = useState("");

    const [homeAddress, setHomeAddress] = useState("");
    const [homeLatitude, setHomeLatitude] = useState(0);
    const [homeLongitude, setHomeLongitude] = useState(0);

    const [airportAddress, setAirportAddress] = useState("");
    const [airportAddressName, setAirportAddressName] = useState("");
    const [airportLatitide, setAirportLatitude] = useState(0);
    const [airportLongitude, setAirportLongitude] = useState(0);

    const [destinationAddress, setDestinationAddress] = useState("");

    const [profileHomeAddress, setProfileHomeAddress] = useState("");
    const [profileHomeLatitude, setProfileHomeLatitude] = useState(0);
    const [profileHomeLongitude, setProfileHomeLongitude] = useState(0);

    const [profileOfficeAddress, setProfileOfficeAddress] = useState("");
    const [profileOfficeAddressName, setProfileOfficeAddressName] = useState("");
    const [profileOfficeLatitude, setProfileOfficeLatitude] = useState(0);
    const [profileOfficeLongitude, setProfileOfficeLongitude] = useState(0);

    const [startAddressName, setStartAddressName] = useState("");
    const [destinationAddressName, setDestinationAddressName] = useState("");
    const [departureTime, setDepartureTime] = useState('');
    const [returnTime, setReturnTimeStamp] = useState('');
    const [seats, setSeats] = useState("1");
    const [tripType, setTripType] = useState<any>("1");
    const [departureWindow, setDepartureWindow] = useState<any>("2");
    const [tripPurpose, setTripPurpose] = useState<any>("1");
    const [isDriving, setDriving] = useState("1");
    const [displayToast, setDisplayToast] = useState(false);
    const [loading, setLoading] = useState(false);
    const [feedLoading, setFeedLoading] = useState(false);
    const [statusMessages, setStatusMessages] = useState("");
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
    const inputHomeAddressRef = useRef() as MutableRefObject<HTMLInputElement>;
    const inputairportAddressRef = useRef() as MutableRefObject<HTMLInputElement>;
    const inputDestinationAddressRef = useRef() as MutableRefObject<HTMLInputElement>;
    const datetime = useRef() as MutableRefObject<HTMLIonDatetimeElement>;
    const [country] = useState("us");
    const [redirectToUserActivity, setRedirectToUserActivity] = React.useState(false);
    const [feedData, setFeedData] = React.useState<any[]>([]);
    const [filpRiderDriver, setFlipRiderDriver] = useState(false);
    const [swapToggle, setSwapToggle] = useState(false);
    const [matchClickIndex, setMatchClickIndex] = useState(-1);
    const [matchRequestIndexSuccess, setMatchRequestIndexSuccess] = useState(-1);
    const [checkboxEighteenYearsOld, setCheckboxEighteenYearsOld] = useState(true);
    const [checkedItems, setCheckedItems] = React.useState<any>({});
    const [dateObject, setDateObject] = React.useState<any>({});
    const [dateObjectMap, setDateObjectMap] = React.useState<any>({});
    const [matchListEmpty, setMatchListEmpty] = useState(true);
    const [disableRoundTrip, setDisableRoundTrip] = useState(false);
    let globalSessionObj: any;

    // let checkedItems:any = {};
    const [eventId, setEventId] = useState('');

    const { ref } = usePlacesWidget({
        apiKey: 'AIzaSyAqRnDMSLMKycFik1KIQkGx1RJBPp9QqwY',
        onPlaceSelected: (place) => console.log(place)
    })

    const delay = (ms: number) => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    const [sessionExists, setSessionExists] = React.useState(true);
    const [homeairportAddressExists, setHomeairportAddressExists] = React.useState(false);
    const [homeOrOfficeAddDifferent, setHomeOrOfficeAddDifferent] = React.useState(false);
    const [eventData, setEventData] = React.useState<any[]>([]);
    const [eventClassification, setEventClassification] = useState<any>('');
    const [currentMonth, setCurrentMonth] = useState('');
    const [departureDateArray, setDepartureDateArray] = React.useState<any[]>([]);
    const [startTimeSlots, setStartTimeSlots] = React.useState<any[]>([]);
    const [returnTimeSlots, setReturnTimeSlots] = React.useState<any[]>([]);
    const [startTimeVar, setStartTimeVar] = useState<any>('');
    const [returnTimeVar, setReturnTimeVar] = useState<any>('');
    const [departureDateVar, setDepartureDateVar] = useState<any>('');
    // let minDate = ;

    useEffect(() => {
        GoogleAuth.initialize({
            clientId: '379793457253-quhbedbbmb57amflg3asqkgtunted6kd.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
            grantOfflineAccess: true,
        });
        resetForm();
        setStartReturnTime();
        init();
    }, []);

    function init() {
        // minDate = new Date();
        // minDate.setHours(new Date().getHours() + 3);
        // minDate = minDate.toISOString()
        // console.log('MIN DATE *****',minDate.toISOString());
        // setFlipRiderDriver(false);
        // ReactGA.send({ hitType: "pageview", page: "/work", title: "Carpool For Work" });
        // const sessionObj = localStorage.getItem('session');
        // if (sessionObj != null && JSON.parse(localStorage.getItem('session') || "").wagon_token != null && JSON.parse(localStorage.getItem('session') || "").wagon_token != '') {
        //     globalSessionObj = JSON.parse(localStorage.getItem('session') || "");
        //     console.log('globalSessionObj', globalSessionObj);
        //     axios.get(import.meta.env.VITE_APP_API_V2 + '/user/addresses', { headers: { 'Authorization': globalSessionObj.wagon_token } }).
        //         then(async (getResponse: AxiosResponse) => {
        //             if (getResponse.data == '' || getResponse.data == null) {
        //                 console.log('address doesnt exists');
        //                 setHomeairportAddressExists(false);
        //                 setFeedLoading(false);
        //             } else {
        //                 console.log('Address exists');

        //                 setHomeAddress(getResponse.data.homeAddress);
        //                 setHomeLatitude(getResponse.data.homeLatitude);
        //                 setHomeLongitude(getResponse.data.homeLongitude);

        //                 setAirportAddress(getResponse.data.officeAddress);
        //                 setAirportAddressName(getResponse.data.officeAddressName);
        //                 setAirportLatitude(getResponse.data.officeLatitude);
        //                 setAirportLongitude(getResponse.data.officeLongitude);

        //                 setProfileHomeAddress(getResponse.data.homeAddress);
        //                 setProfileHomeLatitude(getResponse.data.homeLatitude);
        //                 setProfileHomeLongitude(getResponse.data.homeLongitude);

        //                 setProfileOfficeAddress(getResponse.data.officeAddress);
        //                 setProfileOfficeLatitude(getResponse.data.officeLatitude);
        //                 setProfileOfficeLongitude(getResponse.data.officeLongitude);
        //                 setProfileOfficeAddressName(getResponse.data.officeAddressName);

        //                 setHomeairportAddressExists(true);
        //                 setFeedLoading(false);
        //             }
        //         })
        //         .catch((reason: AxiosError) => {
        //             //setErrorLogs('Unable to get the estimate cost. Please try again after sometime!');
        //         })
        // } else {
        //     setFeedLoading(false);
        // }
    }

    useIonViewDidEnter(() => {
        resetForm();
        setStartReturnTime();
        init();
        // resetForm();
        // const urlParams = new URLSearchParams(window.location.hash);
        // let classification = ''
        // if (urlParams != null) {
        //     if (urlParams.get('eventId') != null || urlParams.get('eventId') != '') {
        //         if (urlParams.get('eventId') != null) {
        //             setEventId(urlParams.get('eventId') || '');
        //         }
        //         //console.log(urlParams.get('eventId'));

        //     }
        //     if (urlParams.get('classification') != null || urlParams.get('classification') != '') {
        //         classification = urlParams.get('classification') || '';
        //         console.log(classification);
        //     }


        // }

        // setFeedLoading(true);
        // if (classification == null || classification == '') {
        //     setEventClassification('');
        //     const getResponse = await axios.get(import.meta.env.VITE_APP_API + '/events');
        //     setFeedLoading(false);
        //     setEventData(getResponse.data);
        // } else {
        //     setEventClassification(classification);
        //     const getResponse = await axios.get(import.meta.env.VITE_APP_API + '/events?classification=' + classification);
        //     setFeedLoading(false);
        //     setEventData(getResponse.data);
        // }

        // // inputStartAddressRef.current.value = "";
        // // inputDestinationAddressRef.current.value = "";
        // datetime.current?.reset();
        // setErrorLogs('');

    });


    function setStartReturnTime() {
        setDisableRoundTrip(false);
        setSwapToggle(false);
        setStartTimeSlots([]);
        setReturnTimeSlots([]);
        setStartTimeVar('');
        setReturnTimeVar('');
        const currentDate = new Date();
        console.log('current date day - ' + currentDate.getDay());
        console.log(currentDate.toLocaleString());
        var shortMonthName = new Intl.DateTimeFormat("en-US", { month: "short" }).format;

        const tomorrow = new Date(currentDate);
        tomorrow.setDate(tomorrow.getDate() + 1);
        console.log('tomorrow  day - ' + tomorrow.getDay());

        const dayAfterTomorrow = new Date(tomorrow);
        dayAfterTomorrow.setDate(tomorrow.getDate() + 1);
        console.log('day after tomorrow', dayAfterTomorrow.getDay());

        const nextDayAfterTomorrow = new Date(dayAfterTomorrow);
        nextDayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);
        console.log("nextDayAfterTomorrow", nextDayAfterTomorrow.getDate());
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        const currDateKey = daysOfWeek[currentDate.getDay()] + ' ' + shortMonthName(currentDate) + ' ' + currentDate.getDate();
        const tomorrowKey = daysOfWeek[tomorrow.getDay()] + ' ' + shortMonthName(tomorrow) + ' ' + tomorrow.getDate();
        const dayAfterTomorrowKey = daysOfWeek[dayAfterTomorrow.getDay()] + ' ' + shortMonthName(dayAfterTomorrow) + ' ' + dayAfterTomorrow.getDate();
        const nextDayAfterTomorrowKey = daysOfWeek[nextDayAfterTomorrow.getDay()] + ' ' + shortMonthName(nextDayAfterTomorrow) + ' ' + nextDayAfterTomorrow.getDate();

        let dateObject: any = {};
        dateObject[currDateKey] = "currentDate";
        dateObject[tomorrowKey] = "tomorrow";
        dateObject[dayAfterTomorrowKey] = "dayAfterTomorrow";
        dateObject[nextDayAfterTomorrowKey] = "nextDayAfterTomorrow";
        setDateObject(dateObject);
        console.log('dateObject', dateObject);

        let actualDateObject: any = {};
        
        actualDateObject[currDateKey] = currentDate;
        actualDateObject[tomorrowKey] = tomorrow;
        actualDateObject[dayAfterTomorrowKey] = dayAfterTomorrow;
        actualDateObject[nextDayAfterTomorrowKey] = nextDayAfterTomorrow;
        setDateObjectMap(actualDateObject);
        console.log('actualDateObject', actualDateObject);

        let tempArray: any = [];
        if (currentDate.getHours() + 3 < 22) {
            console.log('in if');
            tempArray.push(currDateKey);
            tempArray.push(tomorrowKey);
            tempArray.push(dayAfterTomorrowKey);
            tempArray.push(nextDayAfterTomorrowKey);
            setDepartureDateVar(currDateKey);
        } else {
            console.log('in else');
            tempArray.push(tomorrowKey);
            tempArray.push(dayAfterTomorrowKey);
            tempArray.push(nextDayAfterTomorrowKey);
            setDepartureDateVar(tomorrowKey);
            //tempArray.push(shortMonthName(nextDayAfterTomorrow)  + ' ' + nextDayAfterTomorrow.getDate());   
        }

        console.log(tempArray);
        setDepartureDateArray(tempArray);

        let tempStartTimeSlots = [];
        setDepartureDate(tempArray[1]);

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

    async function createRideForAirport() {
        if (homeAddress === '' && airportAddress === '') {
            setErrorLogs('Please Enter Pick Up and Airport Address');
            return;
        }
        if (homeAddress === '' && airportAddress != '') {
            setErrorLogs('Please Enter Pick Up address');
            return;
        }
        if (homeAddress != '' && airportAddress === '') {
            setErrorLogs('Please Enter Airport Address');
            return;
        }
        console.log('globalSessionObj', globalSessionObj);
        if (localStorage.getItem('session') == null) {
            setSessionExists(false);
            return;
        }

        globalSessionObj = JSON.parse(localStorage.getItem('session') || "");
        if (globalSessionObj == undefined || globalSessionObj.wagon_token == null || globalSessionObj.wagon_token == '') {
            setSessionExists(false);
            return;
        }
        // Check validity of the token
        axios.get(import.meta.env.VITE_APP_API_V2 + '/user', { headers: { 'Authorization': globalSessionObj.wagon_token } })
            .then(async (axiosResponse: AxiosResponse) => {
                setSessionExists(true);
                let departureTime = '';
                let departureDateObj = new Date();
                departureDateObj.setDate(dateObjectMap[departureDateVar].getDate());
                departureDateObj.setMonth(dateObjectMap[departureDateVar].getMonth());
                departureDateObj.setFullYear(dateObjectMap[departureDateVar].getFullYear());

                let hours = startTimeVar.substring(0, startTimeVar.indexOf(":"));
                const minutes = startTimeVar.slice(startTimeVar.indexOf(':') + 1);
                departureDateObj.setHours(hours);
                departureDateObj.setMinutes(minutes);
                departureDateObj.setSeconds(0);
                departureDateObj.setMilliseconds(0);
                console.log(departureDateObj.toISOString().toString());

                let returnDate = new Date();

                // if (tripType == "2") {
                //     returnDate.setDate(dateObjectMap[departureDateVar].getDate());
                //     returnDate.setMonth(dateObjectMap[departureDateVar].getMonth());
                //     returnDate.setFullYear(dateObjectMap[departureDateVar].getFullYear());

                //     returnDate.setHours(returnTimeVar.substring(0, returnTimeVar.indexOf(":")));
                //     returnDate.setMinutes(returnTimeVar.slice(returnTimeVar.indexOf(':') + 1));
                //     returnDate.setSeconds(0);
                //     returnDate.setMilliseconds(0);
                // }
                // console.log(returnDate.toISOString().toString());

                const session = JSON.parse(localStorage.getItem('session') || "");
                let results: any;
                let distanceInMiles: any;
                const directionsService = new google.maps.DirectionsService()
                results = await directionsService.route({
                    origin: homeAddress || '',
                    destination: airportAddress || '',
                    travelMode: google.maps.TravelMode.DRIVING,
                })
                console.log('rideDistance in miles', results?.routes[0]?.legs[0]?.distance?.text);

                distanceInMiles = (0.000621371 * (results?.routes[0]?.legs[0]?.distance?.value || 0)).toFixed(1);
                console.log('rideDistance in miles', distanceInMiles);

                if (distanceInMiles > 100) {
                    ReactGA.event({
                        category: "airport_ridedistace_limit_exceeded",
                        action: "airport_ridedistace_limit_exceeded",
                    });
                    setErrorLogs('Ride distance cannot be more than 100 miles.');
                    return;
                }
                setStatusMessages('Creating Ride...');
                setLoading(true);

                setHomeOrOfficeAddDifferent(false);

                // if (!useProfileAddress) {
                //     submitHomeairportAddress();
                // }

                // let tempHomeLatitude = useProfileAddress ? profileHomeLatitude : homeLatitude;
                // let tempHomeLongitude = useProfileAddress ? profileHomeLongitude : homeLongitude;
                // let tempHomeAddress = useProfileAddress ? profileHomeAddress : homeAddress;

                // let tempairportLatitide = useProfileAddress ? profileOfficeLatitude : airportLatitide;
                // let tempairportLongitude = useProfileAddress ? profileOfficeLongitude : airportLongitude;
                // let tempairportAddress = useProfileAddress ? profileOfficeAddress : airportAddress;
                // let tempairportAddressName = useProfileAddress ? profileOfficeAddressName : airportAddressName;


                const postRequestBody = {
                    // userId: session.userId,
                    departureTime: departureDateObj.toISOString().toString(),
                    start_loc_lat: homeLatitude,
                    start_loc_long: homeLongitude,
                    destination_loc_lat: airportLatitide,
                    destination_loc_long: airportLongitude,
                    seatCount: seats,
                    driving: isDriving === "0" ? false : true,
                    startAddress: homeAddress,
                    destinationAddress: airportAddress,
                    startAddressName: homeAddress,
                    destinationAddressName: airportAddressName,
                    rideDistance: distanceInMiles,
                    rideCost: null,
                    roundTrip: false,
                    rideType: 3,
                    labelsCsv: 'airport-drop-off',
                    returnTime:  0
                };
                console.log(postRequestBody);
                ReactGA.event({
                    category: "airport_ridecreate_attempt",
                    action: "airport_ridecreate_attempt",
                });
                console.log(postRequestBody);

                axios.post(import.meta.env.VITE_APP_API_V2 + '/rides', postRequestBody, { headers: { 'Authorization': globalSessionObj.wagon_token } })
                    .then(async (postResponse: AxiosResponse) => {
                        ReactGA.event({
                            category: "airport_ridecreate_success",
                            action: "airport_ridecreate_success",
                        });
                        setStatusMessages('Ride Created Successfully!');

                        console.log(postResponse);
                        setCreatedRideId(postResponse.data);
                        setRequestSubmitted(true);

                        loadFilteredFeed(departureDateObj.toISOString().toString(), postResponse.data);
                        //await delay(1000);
                        //setRedirectToUserActivity(true);
                    })
                    .catch((reason: any) => {
                        ReactGA.event({
                            category: "airport_ridecreate_failed" + "&status=" + reason.response?.status,
                            action: "airport_ridecreate_failed" + "&status=" + reason.response?.status,
                        });
                        setLoading(false);
                        setStatusMessages('');
                        if (reason.response?.status === 404 || reason.response?.status === 400) {
                            if (reason.response?.data.errorCode == 508) {
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

    function setDepartureDate(departureDate: any) {
        setDisableRoundTrip(false);
        setDepartureDateVar(departureDate);
        setErrorLogs('');
        console.log(dateObject);
        if (dateObject[departureDate] == 'currentDate') {
            const currentDate = new Date();
            let tempStartTimeSlots: any = [];
            for (let i: any = currentDate.getHours() + 3 > 7 ? currentDate.getHours() + 3 : 7; i < (tripType == "1" ? 22: 12); i++) {
                tempStartTimeSlots.push(i.toString() + ':00');
                tempStartTimeSlots.push(i.toString() + ':30');
            }

            let tempReturnSlots = [];
            console.log('TIME START TIME SLOTS '+ tempStartTimeSlots.length);

            if (tempStartTimeSlots.length > 0) {
                setStartTimeSlots(tempStartTimeSlots);
                // if the trip is on the current date
                // first slot is later than 12
                // set trip to oneway by default.
                const firstTimeSlot = tempStartTimeSlots[0].substring(0, tempStartTimeSlots[0].indexOf(":"));
                if (Number(firstTimeSlot) > 12) {
                    setDisableRoundTrip(true);
                }

                for (let i: any = 15; i < 22; i++) {
                    // i = currentDate.getHours() + 3;
                    tempReturnSlots.push(i.toString() + ':00');
                    tempReturnSlots.push(i.toString() + ':30');
                }
                setReturnTimeSlots(tempReturnSlots);
                setReturnTimeVar(tempReturnSlots[2]);
            }

            if (tempStartTimeSlots.length == 0) {
                console.log('START TIMESLOTS  00');
                // Trip can't start from home to office anymore
                // create a one way trip from work to home
                for (let i: any = currentDate.getHours() + 3 > 15 ? currentDate.getHours() + 3 : 15; i < 22; i++) {
                    // i = currentDate.getHours() + 3;
                    tempStartTimeSlots.push(i.toString() + ':00');
                    tempStartTimeSlots.push(i.toString() + ':30');
                }
                setDisableRoundTrip(true);

                setStartTimeSlots(tempStartTimeSlots);
                setTripType("1");
                setSwapToggle(true);
                setReturnTimeSlots([]);
                setReturnTimeVar('');
            }
            if (tempStartTimeSlots.length == 1) {
                setStartTimeVar(tempStartTimeSlots[0]);
            } else if ((tempStartTimeSlots.length == 2)) {
                setStartTimeVar(tempStartTimeSlots[1]);
            } else if ((tempStartTimeSlots.length > 2)) {
                setStartTimeVar(tempStartTimeSlots[2]);
            }

        } else {
            setDisableRoundTrip(false);
            //setSwapToggle(false);
            //setTripType("2");
            let tempStartTimeSlots: any = [];
            for (let i: any = 7; i < (tripType == "1" ? 22: 12); i++) {
                //i = currentDate.getHours() + 3;
                tempStartTimeSlots.push(i.toString() + ':00');
                tempStartTimeSlots.push(i.toString() + ':30');
            }
            setStartTimeSlots(tempStartTimeSlots);
            setStartTimeVar(tempStartTimeSlots[2]);

            let tempReturnSlots = [];

            for (let i: any = 15; i < 20; i++) {
                tempReturnSlots.push(i.toString() + ':00');
                tempReturnSlots.push(i.toString() + ':30');
            }
            setReturnTimeSlots(tempReturnSlots);
            setReturnTimeVar(tempReturnSlots[2]);
        }
    }

    function setStartTime(startTime: any) {
        setStartTimeVar(startTime);
        console.log(startTime);
        // const tempTime = startTime.substring(0, startTime.indexOf(":"));
        // console.log(tempTime);

        // let tempReturnSlots = [];
        // for (let i:any = parseInt(tempTime) + 5; i < 20; i++) {
        //     tempReturnSlots.push(i.toString() + ':00');
        //     tempReturnSlots.push(i.toString() + ':30');
        // }
        // setReturnTimeSlots(tempReturnSlots);
        // setReturnTimeVar(tempReturnSlots[0]);
    }

    function setReturnTime(returnTime: any) {
        setReturnTimeVar(returnTime);

        // setErrorLogs('');
        // console.log(new Date(returnTime).toISOString().toString());
        // setReturnTimeStamp(new Date(returnTime).toISOString().toString());
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
                ReactGA.event({
                    category: 'work_match_ride_attempt',
                    action: 'work_match_ride_attempt',
                });
                let  url = '';
                if (filpRiderDriver) {
                   url =  import.meta.env.VITE_APP_API_V2 + '/rides/match_with_change'
                } else {
                    url =  import.meta.env.VITE_APP_API_V2 + '/rides/match'
                }

                promises.push(axios.post(url, postMatchBody, {headers: { 'Authorization': globalSessionObj.wagon_token }}).then(async (postMatchResponse: AxiosResponse) => {
                    console.log(postMatchResponse);
                    successCount++;
                    ReactGA.event({
                        category: 'work_match_ride_success',
                        action: 'work_match_ride_success',
                    });
                    setStatusMessages('Match Request Sent for ride id: ' + rideId);

                }).catch((rideMatchPostError: AxiosError) => {
                    failCount++;
                    ReactGA.event({
                        category: 'work_match_ride_failed' + '&status=' + rideMatchPostError.response?.status,
                        action: 'work_match_ride_failed' + '&status=' + rideMatchPostError.response?.status,
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

    async function loadFilteredFeed(departureTimeString: any, rideId: any) {
        setFeedData([]);
        // if (startAddress == '' || destinationAddress == '') {
        //     setErrorLogs('Please select a valid "From" or "To" address.');
        //     return;
        // }

        // if (departureTime == '' || departureTime == null) {
        //     setErrorLogs('Please select departure time of the ride');
        //     return;
        // }
        const session = JSON.parse(localStorage.getItem('session') || "");

        // const [fromLocation, setUserFromLocation] = useState({ latitude: 0, "longitude": 0 });
        // const [toLocation, setUserToLocation] = useState({ latitude: 0, "longitude": 0 });

        // const [startAddress, setStartAddress] = useState("");
        // const [destinationAddress, setDestinationAddress] = useState("");

        var filterCount = 0;
        let queryParams: any;
        queryParams = {
            rideId: rideId, 
            locationLatitude: homeLatitude,
            locationLongitude: homeLongitude,
            destLatitude: airportLatitide,
            destLongitude: airportLongitude,
            radiusInMiles: 5,
            pageNum: 0,
            seatCount: seats,
            // look for the other entity, if user is a driver look for riders and viceversa
            //isDriving: isDriving === "0" ? true : false,
            pageSize: 100
        }


        // yesterday
        var filterDepartureDateInUTCObj = new Date(departureTimeString);

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
            , { params: queryParams, headers: { 'Authorization': globalSessionObj.wagon_token } });

        console.log(getResponse.data);
        let filteredFeed = [];
        let filteredFeedFlipDriverRider = [];
        let drivingBool = isDriving === "0" ? false : true;
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
        // setRedirectToUserActivity(true);
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
        setTripPurpose("0");
        setTripType("1");
        setCreatedRideId(0);
        setDepartureWindow(2);
        // setHomeairportAddressExists(false);
        // setHomeAddress('');
        // setAirportAddress('');
        // setHomeLatitude(0);
        // setHomeLongitude(0);
        // setAirportLatitude(0);
        // setAirportLongitude(0);
    }

    function rideCreationModal(item: any) {
        resetForm();
        getCurrentLocation();
        setShowRideCreationModal(true);
        setSelectedEvent(item);
    }

    function closeRideCreationModal() {
        setShowRideCreationModal(false);
        setSelectedEvent({});
    }

    const getCurrentLocation = async () => {
        try {
            const coordinates = await Geolocation.getCurrentPosition();
            // const lat = coordinates.coords.latitude;
            // const lng = coordinates.coords.longitude;

            const response = await Geocode.fromLatLng((coordinates.coords.latitude).toString(), (coordinates.coords.longitude).toString());
            //response => {
            const address = response.results[0].formatted_address;
            console.log(address);
            //   localStorage.setItem("curraddress", address);
            //   localStorage.setItem("curraddressLatitude", (coordinates.coords.latitude).toString());
            //   localStorage.setItem("curraddressLongitude", (coordinates.coords.longitude).toString());
            currAddress = address;
            inputStartAddressRef.current.value = response.results[0].formatted_address;
            setStartAddress(address);
            setStartAddressName(address);
            setUserFromLocation({
                ...fromLocation, latitude: coordinates.coords.latitude || 0,
                longitude: coordinates.coords.longitude || 0,
            });



        } catch (e: any) {
            console.log(e.message);
        }
    }

    function swapAddress() {
        setSwapToggle(!swapToggle);
    }

    function setTripTypeFunc(value: any) {
        setTripType(value);
        console.log(departureDateVar);
        console.log(dateObject);
        const currentDate = new Date();
        let tempStartTimeSlots: any = [];
        if (dateObject[departureDateVar] == 'currentDate' ) {
            for (let i: any = currentDate.getHours() + 3 > 7 ? currentDate.getHours() + 3 : 7; i < (tripType == "2" ? 22: 12); i++) {
                tempStartTimeSlots.push(i.toString() + ':00');
                tempStartTimeSlots.push(i.toString() + ':30');
            }
        } else {
            for (let i: any = 7; i < (tripType == "2" ? 22: 12); i++) {
                tempStartTimeSlots.push(i.toString() + ':00');
                tempStartTimeSlots.push(i.toString() + ':30');
            }
            // for (let i: any = 15; i < 20; i++) {
            //     tempStartTimeSlots.push(i.toString() + ':00');
            //     tempStartTimeSlots.push(i.toString() + ':30');
            // }
        }
        setStartTimeSlots(tempStartTimeSlots);
        setStartTimeVar(tempStartTimeSlots[2]);
    }

    async function signIn(): Promise<void> {
        //setLoading(true);
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
            
            setSessionExists(true);
            createRideForAirport();
            // sent visit count.
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
        if (category == 0) {
            ReactGA.event({
                category: 'ToggleCategoryToEvents',
                action: 'ToggleCategoryToEvents',
            });
            localStorage.setItem("carpool_category", 'events');
            window.location.replace('/carpoolForEvents');
        } else if (category == 1) {
            window.location.replace('/carpoolForWork');
        }
    }

    function submitHomeairportAddress() {
        // const session = JSON.parse(localStorage.getItem('session') || "");
        const postRequestBody = {
            // userId: session.userId,
            homeAddress: homeAddress,
            homeLatitude: homeLatitude,
            homeLongitude: homeLongitude,
            officeAddress: airportAddress,
            officeLatitude: airportLatitide,
            officeLongitude: airportLongitude,
            officeAddressName: airportAddressName,
        };
        console.log(postRequestBody);
        setStatusMessages('Saving Home and Work Location..');
        axios.post(import.meta.env.VITE_APP_API_V2 + '/user/addresses', postRequestBody, { headers: { 'Authorization': globalSessionObj.wagon_token } })
            .then(async (postResponse: AxiosResponse) => {
                // setLoading(false);
                ReactGA.event({
                    category: "SaveairportAddress",
                    action: "SaveairportAddress",
                });
                present({
                    message: 'Home and Work Address Saved Successfully!',
                    duration: 1000,
                });
                setStatusMessages('Home and Work Location Saved!');
                setHomeairportAddressExists(true);
            })
            .catch((reason: AxiosError) => {
                //setLoading(false);
                setErrorLogs('Error in saving home and work address, please try again later!');
                present({
                    message: 'Error in saving home and work address, please try again later!',
                    duration: 1000,
                });
                ReactGA.event({
                    category: "SaveairportAddressFailed",
                    action: "SaveairportAddressFailed",
                });

            })

    }

    function goToMyRides() {
        window.location.replace('/App');
    }


    return (
        <>
            <IonContent>
                {
                    feedLoading ?
                        <IonLabel className="centerLabel"><IonSpinner color="primary"></IonSpinner></IonLabel>
                        : null
                }
                {/*                 
                {
                    !sessionExists ?
                        <>
                            <div className="centerFeed">
                                <IonCard >
                                    <IonCardContent class="topBarHomePage">
                                        {
                                            <>
                                                {
                                                    loading ? <IonLabel><IonSpinner class="smallspinner" color="primary"></IonSpinner></IonLabel> : null
                                                }

                                                <IonLabel>{statusMessages}</IonLabel><hr /></>
                                        }
                                        <IonLabel class="smallfont">Looks like you haven't logged in yet. </IonLabel>
                                        <IonLabel class="loginwithGoogle">
                                            <IonButton onClick={() => signIn()} className="login-button" expand="block" fill="solid" color="tertiary">
                                                Login with Google to create a ride
                                            </IonButton>
                                        </IonLabel>
                                        <div className="Terms">
                                            By Signing in you accept our
                                            <a className="termsandpolicylink" target="_blank" href="#/terms" >Terms of use </a> and <a className="termsandpolicylink" target="_blank" href="#/privacy-policy">privacy policy</a>
                                        </div>
                                    </IonCardContent></IonCard>
                            </div>
                        </>
                        : null
                } */}
                {/* {
                    !homeairportAddressExists ?
                        <>
                            <div className="centerFeed">
                                <IonCard >
                                    <IonCardContent class="topBarHomePage">
                                        <IonLabel class="smallfont">Please enter Home and Work Location.</IonLabel><br />
                                        <IonLabel class="smallfont">(You can change that later in <IonIcon icon={settings}></IonIcon> Settings)</IonLabel><hr />
                                        <Autocomplete

                                            style={{ width: "100%" }}
                                            ref={inputHomeAddressRef}
                                            defaultValue={homeAddress}
                                            placeholder="Enter Your Home Address"
                                            apiKey='AIzaSyAqRnDMSLMKycFik1KIQkGx1RJBPp9QqwY'
                                            onPlaceSelected={(selected, a, c) => {
                                                setErrorLogs('');
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
                                            ref={inputairportAddressRef}
                                            defaultValue={airportAddress}
                                            placeholder="Enter Your Work Address"
                                            apiKey='AIzaSyAqRnDMSLMKycFik1KIQkGx1RJBPp9QqwY'
                                            onPlaceSelected={(selected, a, c) => {
                                                setErrorLogs('');
                                                console.log(selected);
                                                console.log(selected.name);
                                                console.log(c);
                                                console.log(a);
                                                setAirportAddress(selected.formatted_address || "");
                                                setAirportAddressName(selected.name || "");
                                                setAirportLatitude(selected.geometry?.location?.lat() || 0);
                                                setAirportLongitude(selected.geometry?.location?.lng() || 0);
                                            }}
                                            options={{
                                                types: ["geocode", "establishment"],
                                                componentRestrictions: { country },
                                                fields: ['formatted_address', 'geometry.location', 'name']
                                            }}
                                        />
                                        <hr />
                                        {
                                            homeAddress != '' && airportAddress != '' && !loading ? <IonButton color="success" onClick={submitHomeairportAddress} size="small">Submit</IonButton> : loading ? <IonButton disabled color="success" size="small"> Submit <IonSpinner class="smallspinner" color="primary"></IonSpinner></IonButton> : <IonButton disabled color="success" size="small">Submit</IonButton>
                                        }
                                    </IonCardContent></IonCard>
                            </div>
                        </>
                        : null

                } */}
                {
                    redirectToUserActivity ? <Switch><Route path="/App" exact component={AppLandingPage} /> </Switch> : null
                }

                {

                    <IonPage>
                        <IonContent>
                            {
                                feedLoading ?
                                    <IonLabel className="centerLabel"><IonSpinner color="primary"></IonSpinner></IonLabel>
                                    : null
                            }
                            {
                                localStorage.getItem('platform') == 'ios' ? <div className="topBarHomePage"></div> : null
                            }


                            {
                                sessionExists ?
                                    <IonCard >
                                        <IonCardContent>

                                            {

                                                localStorage.getItem('session') != null && (JSON.parse(localStorage.getItem('session') || '').wagon_token != undefined) ? <><IonButton size="small" onClick={() => { goToMyRides() }} color="success" fill="outline" className="filterButtonInPoolPage">My Rides</IonButton><IonLabel><img className="feedItemImg" src={JSON.parse(localStorage.getItem('session') || "").imageUrl == null ? "assets/img/avatar.svg" : JSON.parse(localStorage.getItem('session') || "").imageUrl} alt="" referrerPolicy='no-referrer' /> {JSON.parse(localStorage.getItem('session') || "").name} </IonLabel></> : null

                                            }
                                            {/* <IonButton size="small"  onClick={() => { setRedirectToUserActivity(true) }} color="medium" className="filterButton">People Around You</IonButton> */}
                                        </IonCardContent>

                                    </IonCard>
                                    : null
                            }


                            <IonCard>
                                <IonCardHeader>
                                    <IonCardSubtitle>Carpooling UseCase</IonCardSubtitle>
                                </IonCardHeader>
                                <IonCardContent >
                                    <IonSegment mode="ios" value="2" onIonChange={e => setCarpoolCategory(e.detail.value)}>
                                        <IonSegmentButton value="0">
                                            <IonLabel class="segmentLabel">Events</IonLabel>
                                        </IonSegmentButton>
                                        <IonSegmentButton value="1">
                                            <IonLabel class="segmentLabel">Work</IonLabel>
                                        </IonSegmentButton>
                                        <IonSegmentButton value="2">
                                            <IonLabel class="segmentLabel">Airport</IonLabel>
                                        </IonSegmentButton>
                                    </IonSegment>
                                </IonCardContent>
                            </IonCard>
                            <hr />
                            <IonCard color='success' >
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


                                            {/* <SwiperSlide >
                                                    <IonGrid>

                                                        <IonText>
                                                            <h3>Carpool for Work</h3>
                                                        </IonText>

                                                    </IonGrid>
                                                </SwiperSlide> */}

                                            <SwiperSlide>
                                                <IonGrid>

                                                    <IonText>
                                                    <IonLabel color='light'>Create ride for Airport Drop off</IonLabel>
                                                    </IonText>

                                                </IonGrid>
                                            </SwiperSlide>

                                            {/* <SwiperSlide>
                                                    <IonGrid>

                                                        <IonText>
                                                            <h3>Get Matched!</h3>
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
                            <IonCard >
                                <IonCardContent >
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

                                    <IonSegment mode="ios" value={tripType} onIonChange={e => setTripTypeFunc(e.detail.value)}>
                                       

                                        <IonSegmentButton value="1">
                                            <IonLabel class="segmentLabel">One Way</IonLabel>
                                        </IonSegmentButton>

                                    </IonSegment>
                                    <hr />
                                    {
                                       
                                            <> <IonLabel>Home Address</IonLabel>
                                            
                                                {
                                                    
                                                        <Autocomplete
                                                            style={{ width: "100%" }}
                                                            defaultValue={homeAddress}
                                                            placeholder="Enter pick up address"
                                                            apiKey='AIzaSyAqRnDMSLMKycFik1KIQkGx1RJBPp9QqwY'
                                                            onPlaceSelected={(selected, a, c) => {
                                                                setErrorLogs('');
                                                                setHomeAddress((selected.formatted_address || ''));
                                                                setHomeLatitude((selected.geometry?.location?.lat() || 0));
                                                                setHomeLongitude((selected.geometry?.location?.lng() || 0));

                                                            }}
                                                            options={{
                                                                types: ["geocode", "establishment"],
                                                                componentRestrictions: { country },
                                                                fields: ['formatted_address', 'geometry.location', 'name']
                                                            }}
                                                        />
                                                }
                                            </>
                                            
                                    }
                                    <br/>
                                    <br/>

                                    {
                                            <>
                                                <IonLabel>Drop off Airport </IonLabel>
                                                {
                                                   
                                                        <Autocomplete
                                                            style={{ width: "100%" }}
                                                            placeholder="Enter the airport location"
                                                            apiKey='AIzaSyAqRnDMSLMKycFik1KIQkGx1RJBPp9QqwY'
                                                            onPlaceSelected={(selected, a, c) => {
                                                                setErrorLogs('');
                                                                setAirportAddress((selected.formatted_address || ''));
                                                                setAirportAddressName(selected.name || '');
                                                                setAirportLatitude((selected.geometry?.location?.lat() || 0));
                                                                setAirportLongitude((selected.geometry?.location?.lng() || 0));
                                                            }}
                                                            options={{
                                                                types: ["airport"],
                                                                componentRestrictions: { country },
                                                                fields: ['formatted_address', 'geometry.location', 'name']
                                                            }}
                                                        />
                                                }
                                            </>
                                            
                                    }
                                    <hr />

                                   

                                    {/* <IonLabel>Departure date</IonLabel>
                                    <br />
                                    <IonLabel className="dateTimeButton">
                                        <IonDatetimeButton datetime="datetime" ></IonDatetimeButton>

                                        <IonModal keepContentsMounted={true}>
                                            <IonDatetime min={new Date().toISOString()} id="datetime" ></IonDatetime>
                                        </IonModal>
                                    </IonLabel> */}
                                    <IonLabel>Departure date</IonLabel>
                                    <IonSegment scrollable={true} mode="ios" value={departureDateVar} onIonChange={e => setDepartureDate(e.detail.value)}>
                                        {departureDateArray.map((item, index) => (
                                            <IonSegmentButton class="returnSegmentButton" value={item}>
                                                <IonLabel class="returnTimeSegment">{item}</IonLabel>
                                            </IonSegmentButton>
                                        ))}
                                    </IonSegment>

                                    <IonLabel>Start time (scroll to see more slots)</IonLabel>
                                    <IonSegment scrollable={true} mode="ios" value={startTimeVar} onIonChange={e => setStartTime(e.detail.value)}>
                                        {startTimeSlots.map((item, index) => (
                                            <IonSegmentButton class="returnSegmentButton" value={item}>
                                                <IonLabel class="returnTimeSegment">{item}</IonLabel>
                                            </IonSegmentButton>
                                        ))}
                                    </IonSegment>
                                    <hr />
                                    {/* {
                                        tripType == "2" ?
                                            <>
                                                <hr />
                                                <IonLabel>Return time (scroll to see more slots)</IonLabel>
                                                <IonSegment scrollable={true} mode="ios" value={returnTimeVar} onIonChange={e => setReturnTime(e.detail.value)}>
                                                    {returnTimeSlots.map((item, index) => (
                                                        <IonSegmentButton class="returnSegmentButton" value={item}>
                                                            <IonLabel class="returnTimeSegment">{item}</IonLabel>
                                                        </IonSegmentButton>
                                                    ))}
                                                </IonSegment>
                                            </>
                                            : null
                                    } */}

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
                                        /> */}

                                    <hr />
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
                                                sessionExists ? checkboxEighteenYearsOld ? <IonButton size="small" color="success" onClick={() => createRideForAirport()}>{isDriving == "1" ? <>Offer a Ride</> : <>Request a Ride</>}</IonButton> : <IonButton size="small" color="success" disabled onClick={() => createRideForAirport()}>{isDriving == "1" ? <>Offer a Ride</> : <>Request a Ride</>}</IonButton>
                                                    :
                                                    (
                                                        checkboxEighteenYearsOld ?
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
                                                            </> : null
                                                    )

                                            ) : null
                                    }
                                    {/* <IonButton size="small" color="success" onClick={postTrip}>Create Ride</IonButton> */}
                                </IonCardContent>
                            </IonCard>
                            <hr />
                            <IonLabel className="footer">Copyright © 2024 Procsoft LLC.</IonLabel>
                            <IonLabel className="footer"> support@wagoncarpool.com</IonLabel><hr />

                

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
                                        <IonCardContent className="potentialMatchText">
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
                                        </IonCardContent>
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

export default Airport;
