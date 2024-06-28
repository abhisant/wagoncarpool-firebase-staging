import React from 'react';
import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonMenu, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import AppDownloadWidget from './AppDownloadWidget';
import { arrowForwardCircle, arrowForwardCircleOutline } from 'ionicons/icons';
function Home() {
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
                            <IonImg class="menuWagonImg" src="assets/img/icon-without-bkg.png"></IonImg>

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
                                        <IonLabel className="homePageText1" color="medium">Get a <IonLabel color="success">$20 gift card </IonLabel>on your first ride completion.
                                        </IonLabel>
                                        <hr /><hr /><hr />
                                        <IonButton color="success" shape='round' fill="outline" size="large" className='createARideHome'>Create a Ride</IonButton>
                                        <hr />
                                        <hr />
                                        <hr /><hr />
                                        <a target="_blank" href="https://apps.apple.com/us/app/wagon-carpool/id6478844608"><img className="appleStoreIconHome" src="assets/img/AppStore.png" alt="bn45" /></a>
                                        <a target="_blank" href="https://play.google.com/store/apps/details?id=com.wagon.starter"><img className="googlePlayIconHome" src="assets/img/GooglePlay.png" alt="bn45" /></a>
                                        <hr /><hr />
                                    </div>
                                </IonCol>
                                <IonCol size="12" size-sm="6"><IonItem><img className="carpoolImg" src="assets/img/carpooling.jpeg"></img></IonItem></IonCol>
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
                                    <div className="containerHome">
                                        <img className="actionImage" src="assets/img/work-art.jpeg"></img>
                                        <IonButton color="dark" fill="outline" shape="round" size="small" className='actionButtonsHome'>Work</IonButton>
                                    </div>
                                </IonCol>

                                <IonCol size="6" size-sm="3">
                                    <div className="containerHome">
                                        <img className="actionImage" src="assets/img/airport-art.jpeg"></img>
                                        <IonButton color="dark" fill="outline" shape="round" size="small" className='actionButtonsHome'>Airport</IonButton>
                                    </div>
                                </IonCol>
                                <IonCol size="6" size-sm="3">
                                    <div className="containerHome">
                                        <img className="actionImage" src="assets/img/event-art.jpeg"></img>
                                        <IonButton color="dark" fill="outline" shape="round" size="small" className='actionButtonsHome'>Events & Games</IonButton>
                                    </div>
                                </IonCol>
                                <IonCol size="6" size-sm="3">
                                    <div className="containerHome">
                                        <img className="actionImage" src="assets/img/intercity-art.jpeg"></img>
                                        <IonButton color="dark" fill="outline" disabled shape="round" size="small" className='actionButtonsHome'>Intercity [Coming soon] </IonButton>
                                    </div>
                                </IonCol>
                            </IonRow>

                        </div>
                        <IonRow>

                            <IonCol size="12" size-sm="6">

                                <div className="homePageContainer">

                                    <hr /><hr />
                                    <IonLabel className="driveRide" > <IonLabel color="dark"><IonLabel color='success'>Drive</IonLabel> With a Minimum Detour &</IonLabel> <IonLabel color='success'>Get Paid </IonLabel></IonLabel> <hr /><hr />
                                    <IonLabel className="driveRide" > <IonLabel color="dark">Request a </IonLabel> <IonLabel color='success'>low cost</IonLabel><IonLabel color="dark"> Ride</IonLabel></IonLabel> <hr /><hr />
                                    <IonLabel className="driveRide" > <IonLabel color="dark">Build your</IonLabel> <IonLabel color='success'>Network</IonLabel></IonLabel> <hr /><hr />
                                    <IonLabel className="driveRide" > <IonLabel color="dark">Choose To </IonLabel> <IonLabel color='success'>Drive Or Ride</IonLabel></IonLabel> <hr /><hr />
                                    <IonLabel className="driveRide" > <IonLabel color="dark">Get </IonLabel> <IonLabel color='success'>HOV/Carpool Lane Access</IonLabel></IonLabel> <hr /><hr />
                                    <hr />
                                </div>
                            </IonCol>
                            <IonCol size="12" size-sm="6"><IonItem><img className="carpoolImg" src="assets/img/driveRide.jpeg"></img></IonItem></IonCol>


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
                                        <hr /><hr />
                                        <IonLabel className="wagonprocess" > <IonLabel color="dark">Create a</IonLabel> <IonLabel color='success'>Ride</IonLabel></IonLabel> <hr /><hr />
                                        <IonLabel className="wagonprocess" > <IonLabel color="dark">Get</IonLabel> <IonLabel color='success'>Matched</IonLabel></IonLabel> <hr /><hr />
                                        <IonLabel className="wagonprocess" > <IonLabel color="dark">Complete the </IonLabel> <IonLabel color='success'>Ride</IonLabel></IonLabel> <hr /><hr />
                                        <IonLabel className="wagonprocess" > <IonLabel color="dark">Provide the</IonLabel> <IonLabel color='success'>Feedback</IonLabel></IonLabel> <hr /><hr />
                                        <IonLabel className="wagonprocess" > <IonLabel color="dark">Rinse & Repeat </IonLabel> <IonLabel color='success'></IonLabel></IonLabel> <hr /><hr />
                                        <hr />
                                    </div>
                                </IonCol>
                                <IonCol size="12" size-sm="6"><IonItem><img className="carpoolImg" src="assets/img/GirlUsingMobile.jpeg"></img></IonItem></IonCol>
                            </IonRow>


                        </div>
                        <IonRow>
                            <IonCol size="12">
                                <IonLabel className="wagonBenefitOrg" > <IonLabel>How Can Wagon Benefit</IonLabel><IonLabel color="success"> Organizations?</IonLabel></IonLabel>
                            </IonCol>
                        </IonRow>
                        <div className="homePageContainer">
                            <IonRow>
                                <IonCol size="12" size-sm="6">

                                    <div className="homePageDiv">
                                        <IonLabel className="homePageText1" color="medium">Employees can integrate with <IonLabel color="success">Wagon </IonLabel> For Free and Get  <IonLabel color="success">Verified </IonLabel>via work email.</IonLabel>
                                        <hr /><hr />
                                        <IonLabel className="homePageText2"> <IonLabel>Organizations Preserve Extensive <IonLabel color="success">Parking </IonLabel> Space </IonLabel>
                                        </IonLabel>

                                    </div>
                                </IonCol>
                                <IonCol size="12" size-sm="6"><IonItem><img className="carpoolImg" src="assets/img/corporateOffice.jpeg"></img></IonItem></IonCol>
                            </IonRow>
                        </div>
                    </IonGrid>



                </IonContent>
            </IonPage>
        </>
    );
}
export default Home;


