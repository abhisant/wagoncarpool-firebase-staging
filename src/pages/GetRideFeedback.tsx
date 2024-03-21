import React, { useState, useEffect } from 'react';
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
} from '@ionic/react';
import { IonReactHashRouter } from '@ionic/react-router';
import { addCircle, settings, home, search, menu, locationOutline, location, star, starOutline } from 'ionicons/icons';
import { Redirect, Route, Router, Switch } from 'react-router';
import App from '../App';
import { useLocation, useHistory, HashRouter } from 'react-router-dom';
import { Geolocation } from '@capacitor/geolocation';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Autocomplete } from '@react-google-maps/api';
import GetStarted from './GetStarted';
import AppLandingPage from './AppLandingPage';
import { Rating } from 'react-simple-star-rating'
// import Rating from '@mui/material/Rating';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const GetRideFeedback = () => {
    let history = useHistory();
    const [sessionExists, setSessionExists] = React.useState(true);
    const [feedbackDetails, setfeedbackDetails] = React.useState<any[]>([]);
    const [feedLoading, setFeedLoading] = useState(true);
    const [currUser, setCurrUser] = useState(0);
    const [feedbackSubmitted, setFeedbackSubmitted] = useState<any>({});
    const [rating, setRating] = useState(0);
    const [dataChanged, setDataChanged] = React.useState(true);
    const [errorLogs, setErrorLogs] = useState('');
    const [redirectUrl, setRedirectUrl] = React.useState(false);

    // Catch Rating value
    const handleRating = (rate: any, index: number) => {
        // let tempRating = rating;
        // tempRating[index] = rate;
        console.log(rate);
        setRating(rate);
    }

    function loadFeedbackDetails() {
        setDataChanged(true);

        const session = JSON.parse(localStorage.getItem('session') || "");
        setCurrUser(session.userId);
        setFeedLoading(true);
        axios.get(import.meta.env.VITE_APP_API + '/feedback/' + session.userId)
            .then((axiosResponse1: AxiosResponse) => {
                if (axiosResponse1.data.length == 0) {
                    history.push('/App');
                //    setRedirectUrl(true);
                }
                setRating(0);
                setFeedLoading(false);
                setfeedbackDetails(axiosResponse1.data);
                setDataChanged(false);
            })
            .catch((reason: AxiosError) => {
                setRating(0);
                setFeedLoading(false);
                setDataChanged(false);
                if (reason.response!.status === 404) {
                    // console.log("Got a 404 from get user profile via email. Get additonal profile info to persist a new user.", postRequestBody)
                } else {
                    //console.log(reason.message)
                }
            })
    }

    function googleMapsAddressRedirection(startAdd: any, destAdd: any) {
        window.open('https://www.google.com/maps/dir/' + startAdd + "/" + destAdd);
    }

    function tookRide(item: any, index: number) {
        if (rating==0) {
            setErrorLogs('Please provide the rating');
            return;
        }
        axios.post(import.meta.env.VITE_APP_API + '/feedback?' + 'ride_match_id=' + item.rideMatchId + "&user_id=" + currUser + "&was_completed=true" + '&rating='+ rating)
            .then((axiosResponse1: AxiosResponse) => {
                setRating(0);
                console.log(axiosResponse1.data);
                loadFeedbackDetails();
            })
            .catch((reason: AxiosError) => {

            })
    }

    function didntTakeRide(item: any) {
        axios.post(import.meta.env.VITE_APP_API + '/feedback?' + 'ride_match_id=' + item.rideMatchId + "&user_id=" + currUser + "&was_completed=false" + '&rating=0')
            .then((axiosResponse1: AxiosResponse) => {
                console.log(axiosResponse1.data);
                setRating(0);
                loadFeedbackDetails();
            })
            .catch((reason: AxiosError) => {

            })
    }

    useEffect(() => {
        if (localStorage.getItem("session") === null) {
            console.log("Session doesn't exist");
            localStorage.setItem("redirected_from", 'getRideFeedback');
            setSessionExists(false);
            return;
        }
        loadFeedbackDetails();
    }, []);


    return (
        <IonPage>
            <IonContent>
                {
                    redirectUrl ? <><HashRouter><Switch><Redirect to={{ pathname: '/App' }} /><Route path="/App" component={AppLandingPage} /> </Switch></HashRouter></> : null
                }
                {
                    !sessionExists ? <><Redirect exact to={{ pathname: '/getstarted' }} /><Route path="/getstarted" component={GetStarted} /></> : null
                }
                {
                    !sessionExists ? <><Redirect exact to={{ pathname: '/getstarted' }} /><Route path="/getstarted" component={GetStarted} /></> : null
                }
                {
                    feedLoading ?
                        <IonLabel className="centerLabel"><IonSpinner color="primary"></IonSpinner></IonLabel>
                        : null
                }
                {
                    !feedLoading && feedbackDetails.length == 0 ?
                        <><Redirect exact to={{ pathname: '/App' }} /><Route path="/App" component={AppLandingPage} /></> : null
                }

                <div className="rideFeedbackMargin">

                    <IonList>

                        {feedbackDetails.map((item, index) => (
                            <IonCard key={index}>
                                {
                                    index == 0 ?

                                    <IonCardContent>
                                       <IonLabel className="largefont" color="success">Ride Feedback 1 out of {feedbackDetails.length}</IonLabel><hr/>
                                        <span >You had a trip with {item.otherUser.name} on {
                                                new Date(item.userRide.departureTime).toLocaleString(
                                                    "en-US",
                                                    {
                                                        month: "short",
                                                        day: "2-digit",
                                                        year: "numeric",
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    }
                                                )}  {
                                            item.otherUser.imageUrl == null ? <img className="feedbackImg" src="assets/img/avatar.svg" referrerPolicy='no-referrer' /> : <img className="feedbackImg" src={item.otherUser.imageUrl} alt="" referrerPolicy='no-referrer' />
                                        }</span> <hr />
                                        <IonButton onClick={() => googleMapsAddressRedirection(item.userRide.startAddress, item.userRide.destinationAddress)} className="feedbackAddressbuttons" size="small" color="medium" fill="outline">{item.userRide.startAddress}<IonIcon slot="end" size="small" icon={location}></IonIcon></IonButton>
                                        <br></br>
                                        <IonButton onClick={() => googleMapsAddressRedirection(item.userRide.startAddress, item.userRide.destinationAddress)} className="feedbackAddressbuttons" size="small" fill="clear">To</IonButton><br></br>
                                        <IonButton onClick={() => googleMapsAddressRedirection(item.userRide.startAddress, item.userRide.destinationAddress)} className="feedbackAddressbuttons" size="small" color="medium" fill="outline">{item.userRide.destinationAddress}<IonIcon slot="end" size="small" icon={location}></IonIcon></IonButton>
                                        <hr />
                                        <p>Rate your trip!</p>
                                        <IonLabel color="light">
                                        <Rating initialValue={rating || 0} transition={true} onClick={(event) => handleRating(event, index)} />

                                            {/* <Rating  value={rating[index] || 0}
                                            onChange={(event: number) => handleRating(event, index)} /> */}
                                            {/* <Rating style={{ maxWidth: 200 }} value={rating[index] || 0} onChange={(event: number) => handleRating(event, index)} /> */}
                                        </IonLabel>  <hr />
                                        {/* <span>Did you complete the trip on:
                                            <p className="feedDepartureTime">{
                                                new Date(item.userRide.departureTime).toLocaleString(
                                                    "en-US",
                                                    {
                                                        month: "short",
                                                        day: "2-digit",
                                                        year: "numeric",
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    }
                                                )}</p> </span> */}
                                        <hr />

                                        <p> <IonButton color="success" onClick={() => tookRide(item, index)} className="feedbackbutton">Yes</IonButton>
                                            <IonButton color="danger" onClick={() => didntTakeRide(item)} className="feedbackbutton">No</IonButton>
                                        </p> 

                                        <hr/>
                                        {
                                            errorLogs != '' ? <IonItem className="errorLogs" text-wrap color="danger">{errorLogs}</IonItem> : null
                                        }      
                                    </IonCardContent>
                                            : null
                                }
                            </IonCard>
                        ))}
                    </IonList>
                </div>
            </IonContent>
        </IonPage>

    );
}
export default GetRideFeedback;
