import React from 'react';
import { IonButton, IonButtons, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonMenu, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import AppDownloadWidget from './AppDownloadWidget';
import { arrowForwardCircle, arrowForwardCircleOutline, car, carSport, cash, logoInstagram, logoLinkedin, logoYoutube } from 'ionicons/icons';
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

    function driveAndEarn() {
       
        localStorage.setItem("carpool_category", 'drive');
        window.location.replace('/drive');
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

    function aboutUs () {
        window.location.replace('/about');
    }

    function termsOfUse () {
        window.location.replace('/terms');
    }

    function careers () {
        window.location.replace('/careers');
    }

    function privacyPolicy () {
        window.location.replace('/privacy-policy');
    }

    function blogs () {
        window.location.replace('/blogs');
    }

    function communityGuidelines () {
        window.location.replace('/community-guidelines');
    }

    function support () {
        window.location.replace('/support');
    }

    function redirectLinkedIn() {
        window.open( "https://www.linkedin.com/company/wagon-carpool/");
        
    }
    function redirectYouTube() {
        window.open( "https://www.youtube.com/@WagonCarpool");
    }
    function redirectInstagram() {
        window.open("https://www.instagram.com/wagoncarpool/");
        
    }
    
    return (
        <>
            {/* <IonMenu side="end" contentId="main-content">
                <IonHeader >
                    <IonToolbar >
                        <IonTitle>Menu Content</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">This is the menu content.</IonContent>
            </IonMenu> */}
            <IonPage id="main-content">
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="end">
                            {/* <IonMenuButton></IonMenuButton> */}
                        </IonButtons>
                        <IonTitle class="homeToolBar">

                        </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>

                    <IonGrid>
                        <div className="homePageContainer">
                            <IonRow>
                                <IonCol size="12" size-sm="6">

                                    <div className="homePageDiv">
                                        <IonLabel className="carpoolWithWagon" > <IonLabel color="dark">Wagon</IonLabel> <IonLabel color="dark"></IonLabel> <IonLabel color='success'> Carpool</IonLabel></IonLabel> <hr />
                                        <hr />
                                        <hr />
                                        <IonLabel><IonButton color="success" shape='round' fill="outline" size="default" className='createARideHome' onClick={selectCarpoolCategory}>Create a Ride <IonIcon className="homeButtonIcons" color="success" icon={car}> </IonIcon></IonButton>
                                        <IonButton color="success" shape='round' fill="outline" size="default" className='createARideHome' onClick={driveAndEarn}>Drive & Earn <IonIcon className="homeButtonIcons" color="success" icon={cash}> </IonIcon></IonButton>
                                        </IonLabel>
                                        
                                        <hr />
                                        <hr />
                                        <IonLabel className="homePageText1" color="medium"> Save <IonLabel color="success">Money</IonLabel>, Save <IonLabel color="success">Time</IonLabel>, Save the <IonLabel color="success">Planet</IonLabel> </IonLabel>
                                        <hr />
                                        
                                        <IonLabel className="homePageText1" color="medium">Get a <IonLabel color="success">$20  </IonLabel>gift card on your first ride completion.
                                        </IonLabel><hr />
                                        {/* <IonLabel className="homePageText1" color="medium">We don't take a cut between rides <IonLabel color="success">$20  </IonLabel>gift card on your first ride completion.
                                        </IonLabel> */}
                                        <hr /><hr /><hr />
                                        <div className='createARideHome' >
                                        <a target="_blank" href="https://apps.apple.com/us/app/wagon-carpool/id6478844608"><img className="appleStoreIconHome" src="assets/img/AppStore.png" alt="bn45" /></a>
                                        <a target="_blank" href="https://play.google.com/store/apps/details?id=com.wagon.starter"><img className="googlePlayIconHome" src="assets/img/GooglePlay.png" alt="bn45" /></a>
                                        </div>
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
                                  <div className="wagonprocessMorePadding" >  <IonLabel> Share Your<IonLabel color="dark"><IonLabel color='success'> Gas & Parking</IonLabel> Expense</IonLabel> <IonLabel color='success'> </IonLabel></IonLabel> </div>
                                  <div className="wagonprocessMorePadding" >  <IonLabel  > <IonLabel color="dark">Build your</IonLabel> <IonLabel color='success'>NETWORK</IonLabel></IonLabel> </div>
                                  <div className="wagonprocessMorePadding" > <IonLabel > <IonLabel color="dark">Get  </IonLabel> <IonLabel color='success'>Get HOV/CARPOOL </IonLabel>lane access</IonLabel> </div>
                                  <div className="wagonprocessMorePadding" > <IonLabel > Feel good about helping the <IonLabel color="dark"> </IonLabel> <IonLabel color='success'>Environment</IonLabel><IonLabel color="dark"></IonLabel></IonLabel> </div>
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
                                        
                                    <div className="wagonprocess" > <IonLabel> <IonLabel color="dark">Choose a ride type & </IonLabel> <IonLabel color='success'>Create a Ride.</IonLabel></IonLabel> </div>
                                    <div className="wagonprocess" >   <IonLabel> <IonLabel color="dark">Find Matches </IonLabel> &  <IonLabel color='success'> Send Match Request.  </IonLabel>/</IonLabel> </div>
                                    <div className="wagonprocess" >   <IonLabel> Accept Match  </IonLabel> <IonLabel color="success">Requests You Receive.</IonLabel> </div>
                                        <div className="wagonprocess" >   <IonLabel> <IonLabel color="dark">Complete the </IonLabel> <IonLabel color='success'>Ride.</IonLabel></IonLabel></div>
                                        <div className="wagonprocess" >  <IonLabel> <IonLabel color="dark">Provide the</IonLabel> <IonLabel color='success'>Feedback.</IonLabel></IonLabel> </div>
                                        <div className="wagonprocess" > <IonLabel> <IonLabel color="dark">Rinse & Repeat. </IonLabel> <IonLabel color='success'></IonLabel></IonLabel> </div>
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

                                        <div className="homePageDivRow3">
                                        <div className="wagonprocess" ><IonLabel>Businesses helps Employees Discover <IonLabel color="success">Wagon Carpool.</IonLabel> </IonLabel></div>
                                        <div className="wagonprocess" >   <IonLabel>Employees use <IonLabel color="success">Wagon Carpool</IonLabel> to commute.</IonLabel></div>
                                        <div className="wagonprocess" >   <IonLabel> <IonLabel>Businesses need less </IonLabel><IonLabel color="success">Parking Infrastructure. </IonLabel>  </IonLabel></div>
                                        <div className="wagonprocess" >    <IonLabel>Employees save <IonLabel color="success">Time & Money. </IonLabel></IonLabel></div>
                                        <div className="wagonprocess" >   <IonLabel> <IonLabel>Business gets credit towards </IonLabel><IonLabel color="success">CSR goals. </IonLabel>  </IonLabel></div>

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
                            </IonRow> <br />
                            <IonRow>
                                <IonCol size="6" size-sm="6">
                                    <IonLabel onClick={aboutUs}>About Us</IonLabel>
                                </IonCol>
                                <IonCol size="6" size-sm="6">
                                    <IonLabel onClick={termsOfUse}>Terms of Use</IonLabel>
                                </IonCol>
                                <IonCol size="6" size-sm="6">
                                    <IonLabel onClick={careers}>Careers</IonLabel>
                                </IonCol>
                                <IonCol size="6" size-sm="6">
                                    <IonLabel  onClick={privacyPolicy}>Privacy Policy</IonLabel>
                                </IonCol>
                                <IonCol size="6" size-sm="6">
                                    <IonLabel onClick={blogs}>Blogs</IonLabel>
                                </IonCol>
                                <IonCol size="6" size-sm="6">
                                    <IonLabel onClick={communityGuidelines}>Community Guidelines</IonLabel>
                                </IonCol>
                                
                                <IonCol size="6" size-sm="6">
                                    <IonLabel ></IonLabel>
                                </IonCol>
                               
                                <IonCol size="6" size-sm="6">
                                    <IonLabel onClick={support}>Contact Us</IonLabel>
                                </IonCol>
                            </IonRow>
                            <br />
                            <br />
                            <br />
                        </div>

                        <IonFooter class="ion-no-border">
                            <IonToolbar className="footerToolbar">
                                <IonTitle></IonTitle>
                                <IonButtons slot="start">
                                    <IonLabel className="copyrightHome">Copyright © 2024 Procsoft LLC.</IonLabel><hr />
                                </IonButtons>
                                <IonButtons slot="end">
                                    <div >
                                    <IonLabel className='socialMediaIcons'> <IonIcon size='small' onClick={redirectInstagram}  icon={logoInstagram}></IonIcon></IonLabel>
                                    <IonLabel className='socialMediaIcons'> <IonIcon size='small' onClick={redirectLinkedIn} icon={logoLinkedin}></IonIcon></IonLabel>
                                    <IonLabel className='socialMediaIcons'> <IonIcon size='small' onClick={redirectYouTube}  icon={logoYoutube}></IonIcon></IonLabel>
                                    </div>
                                </IonButtons>
                                
                            </IonToolbar>
                        </IonFooter>
                    </IonGrid>



                </IonContent>
            </IonPage>
        </>
    );
}
export default Home;


