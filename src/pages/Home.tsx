import React from 'react';
import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonMenu, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import AppDownloadWidget from './AppDownloadWidget';
import { arrowForwardCircle, arrowForwardCircleOutline, logoInstagram, logoLinkedin, logoYoutube } from 'ionicons/icons';
import ReactGA from 'react-ga4';
function Home() {
    function selectCarpoolCategory() {
        ReactGA.event({
            category: "UserSelectsCarpoolForAirport",
            action: "UserSelectsCarpoolForAirport",
        });
        localStorage.setItem("carpool_category", 'scc');
        window.location.replace('/scc');
    }

    function carpoolingForAirport() {
        ReactGA.event({
            category: "UserSelectsCarpoolForAirport",
            action: "UserSelectsCarpoolForAirport",
        });
        localStorage.setItem("carpool_category", 'airport');
        window.location.replace('/carpoolForAirport');
    }

    function carpoolingForWork() {
        ReactGA.event({
            category: "UserSelectsCarpoolForWork",
            action: "UserSelectsCarpoolForWork",
        });
        localStorage.setItem("carpool_category", 'work');
        window.location.replace('/carpoolForWork');
    }

    function carpoolingForEvents() {
        ReactGA.event({
            category: "UserSelectsCarpoolForEvents",
            action: "UserSelectsCarpoolForEvents",
        });
        localStorage.setItem("carpool_category", 'events');
        // history.push("/carpoolForEvents");
        window.location.replace('/carpoolForEvents');
        
    }
    return (
        <>
            <IonMenu side="end" contentId="main-content">
                <IonHeader >
                    <IonToolbar >
                        <IonTitle>Menu Content</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">This is the menu content.</IonContent>
            </IonMenu>
            <IonPage id="main-content">
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="end">
                            <IonMenuButton></IonMenuButton>
                        </IonButtons>
                        <IonTitle class="homeToolBar">
                            {/* <IonImg class="menuWagonImg" src="assets/img/icon-without-bkg.png"></IonImg> */}

                        </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>

                    <IonGrid>
                        <div className="homePageContainer">
                            <IonRow>
                                <IonCol size="12" size-sm="6">

                                    <div className="homePageDiv">
                                        <IonLabel className="carpoolWithWagon" > <IonLabel color="dark">Carpool</IonLabel> <IonLabel color="dark">With</IonLabel> <IonLabel color='success'>Wagon</IonLabel></IonLabel> <hr />
                                        <hr />
                                        <hr />
                                        <IonLabel className="homePageTextItalics" color="medium"> Save <IonLabel color="success">Money</IonLabel>, Save <IonLabel color="success">Time</IonLabel>, Save the <IonLabel color="success">Planet</IonLabel> </IonLabel>
                                        <hr /><hr /><hr />
                                        <IonButton color="dark" shape='round' fill="outline" size="large" className='createARideHome' onClick={selectCarpoolCategory}>Create a Ride</IonButton>
                                        
                                        <hr />
                                        <hr />
                                        <IonLabel className="homePageText1" color="medium">Get a <IonLabel color="success">$20  </IonLabel>gift card on your first ride completion.
                                        </IonLabel>
                                        <hr /><hr />
                                        <a target="_blank" href="https://apps.apple.com/us/app/wagon-carpool/id6478844608"><img className="appleStoreIconHome" src="assets/img/AppStore.png" alt="bn45" /></a>
                                        <a target="_blank" href="https://play.google.com/store/apps/details?id=com.wagon.starter"><img className="googlePlayIconHome" src="assets/img/GooglePlay.png" alt="bn45" /></a>
                                        <hr /><hr />
                                    </div>
                                </IonCol>
                                <IonCol size="12" size-sm="6"><img className="carpoolImg" src="assets/img/carpooling.jpeg"></img></IonCol>
                            </IonRow>
                        </div>
                        <hr /><hr />


                        <hr />
                        <div className="row2">
                            <IonRow >
                                <IonLabel className="CheapestRidesTo" > <IonLabel color="success">Cheapest </IonLabel><IonLabel> Ride For</IonLabel> </IonLabel> <hr />
                            </IonRow>
                            <IonRow>

                                <IonCol size="6" size-sm="3">
                                    <div onClick={carpoolingForWork} className="containerHome">
                                        <img className="actionImage" src="assets/img/work-art.jpeg"></img>
                                        <IonButton color="dark" fill="outline" shape="round" size="small" className='actionButtonsHome'>Work Commute</IonButton>
                                    </div>
                                </IonCol>

                                <IonCol size="6" size-sm="3">
                                    <div onClick={carpoolingForAirport} className="containerHome">
                                        <img className="actionImage" src="assets/img/airport-art.jpeg"></img>
                                        <IonButton color="dark" fill="outline" shape="round" size="small" className='actionButtonsHome'>Airport Drop off</IonButton>
                                    </div>
                                </IonCol>
                                <IonCol size="6" size-sm="3">
                                    <div onClick={carpoolingForEvents} className="containerHome">
                                        <img className="actionImage" src="assets/img/event-art.jpeg"></img>
                                        <IonButton color="dark" fill="outline" shape="round" size="small" className='actionButtonsHome'>Events & Games</IonButton>
                                    </div>
                                </IonCol>
                                <IonCol size="6" size-sm="3">
                                    <div className="containerHome">
                                        <img className="actionImage" src="assets/img/intercity-art.jpeg"></img>
                                        <IonButton color="dark" fill="outline" disabled shape="round" size="small" className='actionButtonsHome'>Intercity Trips (Coming soon) </IonButton>
                                    </div>
                                </IonCol>
                            </IonRow>

                        </div>
                        <IonRow>

                            <IonCol size="12" size-sm="6">
                                <div className="homePageContainer">
                                    <hr /><hr />
                                    <IonLabel className="wagonprocess" > Share Your<IonLabel color="dark"><IonLabel color='success'> Gas & Parking</IonLabel> Expense</IonLabel> <IonLabel color='success'> </IonLabel></IonLabel> <hr /><hr />
                                    <IonLabel className="wagonprocess" > <IonLabel color="dark">Build your</IonLabel> <IonLabel color='success'>NETWORK</IonLabel></IonLabel> <hr /><hr />
                                    <IonLabel className="wagonprocess" > <IonLabel color="dark">Get  </IonLabel> <IonLabel color='success'>Get HOV/CARPOOL </IonLabel>lane access</IonLabel> <hr /><hr />
                                    <IonLabel className="wagonprocess" > Feel good about helping the <IonLabel color="dark"> </IonLabel> <IonLabel color='success'>Environment</IonLabel><IonLabel color="dark"></IonLabel></IonLabel> <hr /><hr />
                                    <hr />
                                </div>
                            </IonCol>
                            <IonCol size="12" size-sm="6"><img className="carpoolImg" src="assets/img/driveRide.jpeg"></img></IonCol>


                        </IonRow>
                        <IonRow>
                            <IonCol size="12">
                                <IonLabel className="sustainableFuture" > <IonLabel>A step towards</IonLabel><IonLabel color="success"> sustainable future</IonLabel></IonLabel>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="12">
                                <img className="forestImg" src="assets/img/forest.jpeg"></img>
                            </IonCol>
                        </IonRow>
                        <div className="homePageContainer">

                            <IonRow>
                                <IonCol size="12" size-sm="6">

                                    <div className="homePageDivRow3">
                                        
                                        <IonLabel className="wagonprocess" > <IonLabel color="dark">Create a</IonLabel> <IonLabel color='success'>Ride</IonLabel></IonLabel> <hr /><hr /><hr />
                                        <IonLabel className="wagonprocess" > <IonLabel color="dark">Find Matches </IonLabel> and send  <IonLabel color='success'>  Match Request <IonLabel color="dark">or </IonLabel>  Accept Match Request </IonLabel>that you receive</IonLabel> <hr /><hr /><hr />
                                        <IonLabel className="wagonprocess" > <IonLabel color="dark">Complete the </IonLabel> <IonLabel color='success'>Ride</IonLabel></IonLabel> <hr /><hr /><hr />
                                        <IonLabel className="wagonprocess" > <IonLabel color="dark">Provide the</IonLabel> <IonLabel color='success'>Feedback</IonLabel></IonLabel> <hr /><hr /><hr />
                                        <IonLabel className="wagonprocess" > <IonLabel color="dark">Rinse & Repeat </IonLabel> <IonLabel color='success'></IonLabel></IonLabel> <hr /><hr /><hr />
                                        <hr />
                                    </div>
                                </IonCol>
                                <IonCol size="12" size-sm="6"><img className="carpoolImg" src="assets/img/GirlUsingMobile.jpeg"></img></IonCol>
                            </IonRow>


                        </div>
                        <div className="row2">
                            <IonRow>
                                <IonCol size="12">
                                    <IonLabel className="wagonBenefitOrg" > <IonLabel>Wagon Carpool  & </IonLabel><IonLabel color="success"> Businesses</IonLabel></IonLabel>
                                </IonCol>
                            </IonRow>
                            <div className="">
                                <IonRow>
                                    <IonCol size="12" size-sm="6">

                                        <div className="">
                                            <IonLabel className="wagonprocess" >Businesses help their employees discover <IonLabel color="success">Wagon Carpool </IonLabel> </IonLabel>
                                            <hr /><hr />
                                            <IonLabel className="wagonprocess" >Employees use <IonLabel color="success">Wagon Carpool</IonLabel></IonLabel>
                                            <hr /><hr />
                                            <IonLabel className="wagonprocess" >Employees save <IonLabel color="success">Time & Money </IonLabel></IonLabel><hr /><hr />
                                            <IonLabel className="wagonprocess"> <IonLabel>Businesses need less </IonLabel><IonLabel color="success">Parking Infrastructure </IonLabel>  </IonLabel><hr /><hr /><hr /><hr />
                                            <IonLabel className="wagonprocess"> <IonLabel> <IonLabel color="success">Everybody Wins </IonLabel>  </IonLabel>
                                            </IonLabel>

                                        </div>
                                    </IonCol>
                                    <IonCol size="12" size-sm="6"><img className="carpoolImg" src="assets/img/corporateOffice.jpeg"></img></IonCol>
                                </IonRow>
                            </div>
                        </div>
                        <div className="footerHome">
                            <br />
                            <br />
                            <br />
                            <IonRow>
                                <IonCol size="6" size-sm="6">
                                    <IonLabel className="footerBoldLabels">Company</IonLabel>
                                </IonCol>
                                <IonCol size="6" size-sm="6">
                                    <IonLabel className="footerBoldLabels">Resources</IonLabel>
                                </IonCol>
                            </IonRow> <br /><br />
                            <IonRow>
                                <IonCol size="6" size-sm="6">
                                    <IonLabel>About Us</IonLabel>
                                </IonCol>
                                <IonCol size="6" size-sm="6">
                                    <IonLabel>Terms of Use</IonLabel>
                                </IonCol>
                                <IonCol size="6" size-sm="6">
                                    <IonLabel>Why Wagon</IonLabel>
                                </IonCol>
                                <IonCol size="6" size-sm="6">
                                    <IonLabel >Privacy Policy</IonLabel>
                                </IonCol>
                                <IonCol size="6" size-sm="6">
                                    <IonLabel >Blogs</IonLabel>
                                </IonCol>
                                <IonCol size="6" size-sm="6">
                                    <IonLabel >Community Guidelines</IonLabel>
                                </IonCol>
                                <IonCol size="6" size-sm="6">
                                    <IonLabel>Our Fees</IonLabel>
                                </IonCol>
                                <IonCol size="6" size-sm="6">
                                    <IonLabel>Safety</IonLabel>
                                </IonCol>
                                <IonCol size="6" size-sm="6">
                                    <IonLabel>Career</IonLabel>
                                </IonCol>
                                <IonCol size="6" size-sm="6">
                                    <IonLabel>Support</IonLabel>
                                </IonCol>
                            </IonRow>
                            <br />
                            <br />
                            <br />
                        </div>

                        <div className="footerSocialContainer">
                            <IonRow>
                                <IonCol size="4">
                                    <IonIcon className="socialMediaIcons" icon={logoInstagram}></IonIcon>
                                </IonCol>
                                <IonCol>
                                    <IonIcon className="socialMediaIcons" icon={logoLinkedin}></IonIcon></IonCol>
                                <IonCol>
                                    <IonIcon className="socialMediaIcons" icon={logoYoutube}></IonIcon>
                                </IonCol>

                            </IonRow>


                        </div>
                        <hr /><hr /><hr />
                        <div className="llc">
                            <IonRow>
                                <IonCol size="12">
                                    <IonLabel >Copyright © 2024 Procsoft LLC.</IonLabel><hr />
                                </IonCol>
                            </IonRow>
                        </div>
                        <div className="llc">
                            <IonRow>
                                <IonCol size="12">
                                    <IonLabel > support@wagoncarpool.com</IonLabel><hr /></IonCol>
                            </IonRow>
                        </div><hr /><hr />

                    </IonGrid>



                </IonContent>
            </IonPage>
        </>
    );
}
export default Home;


