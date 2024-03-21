import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';


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
    IonItemDivider,
    IonItemGroup,
    useIonAlert,
    IonAccordion,
    IonAccordionGroup,
    useIonLoading,
    useIonViewDidEnter,
    IonSegment,
    IonSegmentButton,
    IonPopover,
} from '@ionic/react';
import { IonReactHashRouter } from '@ionic/react-router';
import { addCircle, settings, home, search, menu, location, homeOutline, homeSharp, informationCircle, car, shieldCheckmarkSharp } from 'ionicons/icons';
import { Redirect, Route, Switch } from 'react-router';
import App from '../App';
import { useLocation, useHistory, HashRouter } from 'react-router-dom';
import { Geolocation } from '@capacitor/geolocation';
import axios, { AxiosError, AxiosResponse } from 'axios';
import GetStarted from './GetStarted';
import UserActivity from './UserActivity';
import ReactGA from 'react-ga4'
import AppLandingPage from './AppLandingPage';
import { Rating } from 'react-simple-star-rating';

const MatchRequest = () => {
    let history = useHistory();
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_KEY || "",
        libraries: ['places'],
    })
    const [present, dismiss] = useIonLoading();

    const [presentAlert] = useIonAlert();
    const [loading, setLoading] = React.useState(false);
    const [feedLoading, setFeedLoading] = useState(true);
    const [feedData, setFeedData] = React.useState<any[]>([]);
    const [userId, setUserId] = React.useState("0");
    const [sessionExists, setSessionExists] = React.useState(true);
    const [detour, setDetour] = React.useState(-1);
    const [redirectToUserActivity, setRedirectToUserActivity] = React.useState(false);
    const [errorLogs, setErrorLogs] = useState('');

    const popover = useRef<HTMLIonPopoverElement>(null);
    const [popoverOpen, setPopoverOpen] = useState(false);
    let globalSessionObj:any;


    const openPopover = (e: any) => {
        popover.current!.event = e;
        setPopoverOpen(true);
    };

    const delay = (ms: number) => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    const [items, setItems] = useState<string[]>([]);

    const generateItems = () => {
        const newItems = [];
        for (let i = 0; i < 50; i++) {
            newItems.push(`Item ${1 + items.length + i}`);
        }
        setItems([...items, ...newItems]);
    };

    async function loadFeed(id: any) {
        setFeedLoading(true);
        const getResponse = await axios.get(import.meta.env.VITE_APP_API_V2 + '/rides/user/approvals', {headers: { 'Authorization': globalSessionObj.wagon_token } });
        console.log(getResponse.data);
        setFeedData(getResponse.data);
        setFeedLoading(false);
    }

    function init() {
        const sessionObj = localStorage.getItem('session');
        if (sessionObj != null && JSON.parse(localStorage.getItem('session') || "").wagon_token != null && JSON.parse(localStorage.getItem('session') || "").wagon_token != '') {
            globalSessionObj = JSON.parse(localStorage.getItem('session') || "");
            axios.get(import.meta.env.VITE_APP_API_V2 + '/user', {headers: { 'Authorization': globalSessionObj.wagon_token } })
            .then(async (axiosResponse: AxiosResponse) => {
                setUserId(JSON.parse(localStorage.getItem('session') || "").userId);
                loadFeed(JSON.parse(localStorage.getItem('session') || "").userId);
            })
            .catch((reason: AxiosError) => {
                if (reason.response?.status === 401 || reason.response?.status === undefined) {
                    setSessionExists(false);
                }
            })
        } else  {
            console.log("Session doesn't exist");
            history.push('/App');
            localStorage.setItem("redirected_from", 'pendingRequests');
            setSessionExists(false);
            return;
        }
    }

    useIonViewDidEnter(() => {
        ReactGA.send({ hitType: "pageview", page: "/matchrequest", title: "Match Request" });
        setRedirectToUserActivity(false);
        init();

    });


    useEffect(() => {
        init();
    }, []);

    async function approveMatch(item: any) {
        setFeedLoading(true);
        ReactGA.event({
            category: "match_req_approve_attempt",
            action: "match_req_approve_attempt",
        });
        setErrorLogs('');
        setRedirectToUserActivity(false);
        axios.post(import.meta.env.VITE_APP_API + '/rides/match/approve?approver_ride_id=' + item.tobeApprovedRide.rideId + '&requester_ride_id=' + item.requesterRideDetails.rideRequest.rideId)
            .then(async (postResponse: AxiosResponse) => {
                ReactGA.event({
                    category: "match_req_approve_success",
                    action: "match_req_approve_success",
                });
                setFeedLoading(false);
                console.log('approve', postResponse.data);
                present({
                    message: 'Ride Approved.',
                    duration: 1000,
                });
                setRedirectToUserActivity(true);
            })
            .catch((reason: AxiosError) => {
                ReactGA.event({
                    category: "match_req_approve_failed" + '&status=' + reason.response?.status,
                    action: "match_req_approve_failed" + '&status=' + reason.response?.status,
                });
                setFeedLoading(false);
                if (reason.response?.status === 404 || reason.response?.status === 400) {
                    console.log(reason);
                    setErrorLogs('Looks like there was something bad with the request!');
                } else if (reason.response?.status === 500) {
                    setErrorLogs('Looks like we had something going bad with our server! Please try again in sometime!');
                } else {
                    setErrorLogs('Looks like we have something unexpected going on! Please try again in sometime!');
                }
            })
    }

    async function rejectMatch(item: any) {
        ReactGA.event({
            category: "match_req_reject",
            action: "match_req_reject",
        });
        setErrorLogs('');
        const postResponse = await axios.post(import.meta.env.VITE_APP_API + '/rides/match/reject?approver_ride_id=' + item.tobeApprovedRide.rideId + '&requester_ride_id=' + item.requesterRideDetails.rideRequest.rideId);
        console.log('reject', postResponse.data);
        present({
            message: 'Ride Rejected.',
            duration: 1000,
        });

        const session = JSON.parse(localStorage.getItem('session') || "");
        setUserId(session.userId);
        setRedirectToUserActivity(true);
    }

    function googleMapsAddressRedirection(startAdd: any, destAdd: any) {
        window.open('https://www.google.com/maps/dir/' + startAdd + "/" + destAdd);
    }

    function viewTripOnGoogleMaps(item: any) {
        let url = 'https://www.google.com/maps/dir/'
        if (item.requesterRideDetails.rideRequest.driving == false) {
            url = url + item.tobeApprovedRide.startAddress + "/" + item.requesterRideDetails.rideRequest.startAddress
                + "/" + item.requesterRideDetails.rideRequest.destinationAddress
            //+ "/" + item.tobeApprovedRide.destinationAddress
        } else {
            url = url + item.requesterRideDetails.rideRequest.startAddress + "/" + item.tobeApprovedRide.startAddress + "/" +
                item.tobeApprovedRide.destinationAddress
            // + "/" + item.requesterRideDetails.rideRequest.destinationAddress
        }
        window.open(url);
    }

    return (
        <IonPage>
            {
                !sessionExists ? <><HashRouter><Switch><Redirect exact to={{ pathname: '/App' }} /><Route path="/App" component={AppLandingPage} /></Switch></HashRouter></> : null

            }
            {
                redirectToUserActivity ? <><HashRouter><Switch><Redirect to={{ pathname: '/App' }} /><Route path="/App" component={AppLandingPage} /> </Switch></HashRouter></> : null
            }


            <IonContent>
                {/* <IonItem routerLink='/menu' routerDirection='none'>
                    <IonIcon size="large" slot="start" color="light" icon={menu}></IonIcon>
                </IonItem> */}


                {
                    feedLoading ?
                        <IonLabel className="centerLabel"><IonSpinner color="primary"></IonSpinner></IonLabel>
                        : null
                }

                {
                    !feedLoading && feedData.length == 0 ?
                        <div className="verticalCenterFeed">
                            <IonCard>
                                <IonCardContent>

                                    <h3>You don't have any new match requests!</h3>
                                    <h3>Go to <a href="/App"><IonIcon icon={car}></IonIcon> Rides </a>to view your rides or approved requests!</h3>
                                </IonCardContent>
                            </IonCard>
                        </div>
                        : null
                }

                {
                    errorLogs != '' ?
                        <IonCard>
                            <IonCardContent>
                                <IonItem className="errorLogs" text-wrap color="danger">{errorLogs}</IonItem>
                            </IonCardContent>
                        </IonCard>

                        : null
                }

                {
                    !feedLoading ?
                        <div className="centerFeed">
                            {feedData.map((item, index) => (
                                <IonCard key={index}>

                                    <IonCardContent>
                                        {
                                            item.requesterRideDetails.user.imageUrl == null ? <img className="feedItemImg" src="assets/img/avatar.svg" referrerPolicy='no-referrer' /> :
                                                <img className="feedItemImg" src={item.requesterRideDetails.user.imageUrl} alt="avatar" referrerPolicy='no-referrer' />
                                        }


                                        <span className="feedName">{item.requesterRideDetails.user.name} </span>
                                        {
                                    item.requesterRideDetails.userStats.averageRating != "0" ? <><Rating readonly={true} size={20} initialValue={item.requesterRideDetails.userStats.averageRating} transition={true} />({item.requesterRideDetails.userStats.ratedRidesCount})
                                    </> : null
                                }

                                        <hr />
                                        {
                                            item.requesterRideDetails.user.verificationStatus == 'STATUS_VERIFIED' ? <><IonBadge color="success" class="ionBadge" slot="end">Verified Profile</IonBadge><IonIcon size="small" color='success' icon={shieldCheckmarkSharp}></IonIcon></>: null
                                        }
                                        <hr />
                                        {
                                            item.requesterRideDetails.rideRequest.driving == false ? <IonLabel color="success" >Has requested to ride with you!</IonLabel> : <IonLabel color="success" >Has offered you a ride!</IonLabel>
                                        }
                                        <br/>
                                        {
                                          item.requesterRideDetails.rideRequest.labelsCsv != 'work-commute' ?  <IonBadge class="ionBadge" slot="end" color="medium">{item.requesterRideDetails.rideRequest.labelsCsv} </IonBadge>: null
                                        }

                                        {/* <p>Passengers: {item.requesterRideDetails.rideRequest.seatCount}</p> */}
                                        <p>Departure Time: {
                                            new Date(item.requesterRideDetails.rideRequest.departureTime).toLocaleString(
                                                "en-US",
                                                {
                                                    month: "short",
                                                    day: "2-digit",
                                                    year: "numeric",
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                }
                                            )}</p>
                                            <hr/>
                                            {
                                    item.requesterRideDetails.rideRequest.labelsCsv == 'work-commute' && item.requesterRideDetails.rideRequest.roundTrip
                                    ? 
                                    <IonLabel> Return Time:  {
                                        new Date(item.requesterRideDetails.rideRequest.returnTime).toLocaleString(
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
                                <hr/>

                                        {/* {
                                    item.requesterRideDetails.rideRequest.roundTrip ?
                                        <p className="feedDepartureTime">Tentative Return Time: {
                                            new Date(item.requesterRideDetails.rideRequest.returnTime).toLocaleString(
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

                                        {/* <hr />
                                <IonButton onClick={() => googleMapsAddressRedirection(item.requesterRideDetails.rideRequest.startAddress, item.requesterRideDetails.rideRequest.destinationAddress)} className="feedaddressbuttons" size="small" color="success" fill="outline">{item.requesterRideDetails.rideRequest.startAddressName == null ? item.requesterRideDetails.rideRequest.startAddress : item.requesterRideDetails.rideRequest.startAddress.includes(item.requesterRideDetails.rideRequest.startAddressName) ? item.requesterRideDetails.rideRequest.startAddress : item.requesterRideDetails.rideRequest.startAddressName + "," + (item.requesterRideDetails.rideRequest.startAddress.split(',').splice(item.requesterRideDetails.rideRequest.startAddress.split(",").length - 3).join(',')).substring(0, 53).concat('..')}<IonIcon slot="end" size="small" icon={location}></IonIcon></IonButton>
                                <br></br>
                                <IonButton onClick={() => googleMapsAddressRedirection(item.requesterRideDetails.rideRequest.startAddress, item.requesterRideDetails.rideRequest.destinationAddress)} className="feedaddressbuttons" size="small" color="medium" fill="clear">To</IonButton><br></br>
                                <IonButton onClick={() => googleMapsAddressRedirection(item.requesterRideDetails.rideRequest.startAddress, item.requesterRideDetails.rideRequest.destinationAddress)} className="feedaddressbuttons" size="small" color="success" fill="outline">{item.requesterRideDetails.rideRequest.destinationAddressName == null ? item.requesterRideDetails.rideRequest.destinationAddress : item.requesterRideDetails.rideRequest.destinationAddress.includes(item.requesterRideDetails.rideRequest.destinationAddressName) ? item.requesterRideDetails.rideRequest.destinationAddress : (item.requesterRideDetails.rideRequest.destinationAddressName + "," + item.requesterRideDetails.rideRequest.destinationAddress.split(',').splice(item.requesterRideDetails.rideRequest.destinationAddress.split(",").length - 3).join(',')).substring(0, 53).concat('..')}<IonIcon slot="end" size="small" icon={location}></IonIcon></IonButton> */}


                                        {/* <IonBadge color="dark" className="ionBadge_addresslink">
                                       <a className="addresslink" target="_blank" rel="noopener noreferrer" href="" onClick={() => googleMapsAddressRedirection(item.requesterRideDetails.rideRequest.startAddress, item.requesterRideDetails.rideRequest.destinationAddress)}>  From<br /> <br /> {item.requesterRideDetails.rideRequest.startAddress} </a><br />
                                        <a className="addresslink" target="_blank" rel="noopener noreferrer" href="" onClick={() => googleMapsAddressRedirection(item.requesterRideDetails.rideRequest.startAddress, item.requesterRideDetails.rideRequest.destinationAddress)}><br /> To<br />  <br /> {item.requesterRideDetails.rideRequest.destinationAddress}</a>
                                    </IonBadge> */}

                                        {/* <p> <a target="_blank" rel="noopener noreferrer" href=""> From {item.requesterRideDetails.rideRequest.startAddress} <br /> To <br /> {item.requesterRideDetails.rideRequest.destinationAddress}</a></p> */}
                                        {/* {
                                            item.tobeApprovedRide.driving ? <IonBadge className="matchRequestDetour" color="primary">Total detour: {item.detourInMiles} miles</IonBadge> : null
                                        } */}

{/* <IonAccordionGroup>
      <IonAccordion value="first">
        <IonItem slot="header" color="light">
          <IonLabel className="accordianLabel" color="medium">View Details</IonLabel>
        </IonItem>
        <div className="ion-padding" slot="content"> */}
        
                                        {
                                            item.tobeApprovedRide.roundTrip ? <IonBadge class="ionBadge" slot="end" color="medium" >Round Trip</IonBadge> : <IonBadge class="ionBadge" slot="end" color="medium">One Way</IonBadge>
                                        }
                                        {
                                            item.tobeApprovedRide.driving ? <IonBadge class="ionBadge" slot="end" color="medium">You Get: ${item.requesterRideDetails.rideRequest.rideCost} </IonBadge> : <IonBadge class="ionBadge" slot="end" color="medium">You Pay: ${item.requesterRideDetails.rideRequest.rideCost} </IonBadge>

                                        }
                                        <IonIcon className="feeIcon" onClick={openPopover} icon={informationCircle}></IonIcon> <br />
                                        <IonBadge class="ionBadge" color="medium">{item.requesterRideDetails.rideRequest.labelsCsv}</IonBadge>

                                        {/* <IonAccordionGroup >
                                    <IonAccordion value="first">
                                        <IonItem slot="header">
                                            <IonLabel className="accordianLabel">Expand to see your request!
                                            </IonLabel>
                                        </IonItem>
                                        <div className="ion-padding" slot="content">

                                            <IonCard className="subcard">
                                                {
                                                    item.tobeApprovedRide.driving == false ? <span className="RiderOrDriver">Rider</span> : <span className="RiderOrDriver">Driver</span>
                                                }

                                                <IonCardContent>
                                                    <p>Passengers: {item.tobeApprovedRide.seatCount}</p>
                                                    <p>Tentative Departure Time: {
                                                        new Date(item.tobeApprovedRide.departureTime).toLocaleString(
                                                            "en-US",
                                                            {
                                                                month: "short",
                                                                day: "2-digit",
                                                                year: "numeric",
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            }
                                                        )}</p>

                                                    {
                                                        item.tobeApprovedRide.roundTrip ?
                                                            <p className="feedDepartureTime">Tentative Return Time: {
                                                                new Date(item.tobeApprovedRide.returnTime).toLocaleString(
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
                                                    }

                                                    <hr />
                                                    <hr />
                                                    <IonButton onClick={() => googleMapsAddressRedirection(item.tobeApprovedRide.startAddress, item.tobeApprovedRide.destinationAddress)} className="feedaddressbuttons" size="small" color="success" fill="outline">{item.tobeApprovedRide.startAddressName == null ? item.tobeApprovedRide.startAddress : item.tobeApprovedRide.startAddress.includes(item.tobeApprovedRide.startAddressName) ? item.tobeApprovedRide.startAddress : (item.tobeApprovedRide.startAddressName + "," + item.tobeApprovedRide.startAddress.split(',').splice(item.tobeApprovedRide.startAddress.split(",").length - 3)).substring(0, 53).concat('..')}<IonIcon slot="end" size="small" icon={location}></IonIcon></IonButton>
                                                    <br></br>
                                                    <IonButton onClick={() => googleMapsAddressRedirection(item.tobeApprovedRide.startAddress, item.tobeApprovedRide.destinationAddress)} className="feedaddressbuttons" size="small" color="medium" fill="clear">To</IonButton><br></br>
                                                    <IonButton onClick={() => googleMapsAddressRedirection(item.tobeApprovedRide.startAddress, item.tobeApprovedRide.destinationAddress)} className="feedaddressbuttons" size="small" color="success" fill="outline">{item.tobeApprovedRide.destinationAddressName == null ? item.tobeApprovedRide.destinationAddress : item.tobeApprovedRide.destinationAddress.includes(item.tobeApprovedRide.destinationAddressName) ? item.tobeApprovedRide.destinationAddress : (item.tobeApprovedRide.destinationAddressName + "," + item.tobeApprovedRide.destinationAddress.split(',').splice(item.tobeApprovedRide.destinationAddress.split(",").length - 3)).substring(0, 53).concat('..')}<IonIcon slot="end" size="small" icon={location}></IonIcon></IonButton>



                                                </IonCardContent>
                                            </IonCard>
                                        </div>
                                    </IonAccordion>
                                </IonAccordionGroup> */}
                                        <p><IonButton className="calculateDetourButton" color="medium" size="small" onClick={() => viewTripOnGoogleMaps(item)}>View Trip Details <IonIcon size="small" icon={location}></IonIcon></IonButton></p>
                                        {/* </div>
                                        </IonAccordion>
                                        </IonAccordionGroup> */}
                                        <p> <IonButton color="success" onClick={() =>
                                            presentAlert({
                                                header: 'Do you want to approve the request?',
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
                                                            approveMatch(item);
                                                        },
                                                    },
                                                ],
                                                onDidDismiss: (e: CustomEvent) => null,
                                            })
                                        } size="small" className="approveOrRejectRideButton">Approve</IonButton>

                                            <IonButton color="danger" onClick={() =>
                                                presentAlert({
                                                    header: 'Do you want to reject the request?',
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
                                                                rejectMatch(item);
                                                            },
                                                        },
                                                    ],
                                                    onDidDismiss: (e: CustomEvent) => null,
                                                })
                                            } size="small" className="approveOrRejectRideButton">Reject</IonButton></p>
                                    </IonCardContent>
                                </IonCard>
                            ))}

                        </div>
                        : null
                }



            </IonContent>
            <IonPopover side="right" alignment="center" ref={popover} isOpen={popoverOpen} onDidDismiss={() => setPopoverOpen(false)}>
                <IonContent className="popOverScroll">
                    <IonLabel >
                        <ul className="popOverContent">
                            {/* <li>
                                The amount is based on the distance travelled for the trip. As the distance can change based on the mactched partner, the actual cost might differ slightly. An email will be sent after matching, confirming the final amount.
                            </li><br /> */}
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

        </IonPage>

    );
}
export default MatchRequest;
