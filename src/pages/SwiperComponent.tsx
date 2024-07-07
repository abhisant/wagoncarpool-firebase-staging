import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, useIonViewWillEnter, IonImg, IonInput, IonItem, IonLabel, IonModal, IonNavLink, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from 'swiper';


function SwiperComponent() {


    return (

        <>
            <div className="swiperDiv">
            <IonImg class="wagonimg" src="assets/img/icon-without-bkg.png"></IonImg>
            <>
                <Swiper loop={true} autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}

                    pagination={true} modules={[Pagination, Autoplay]} >
                    <SwiperSlide className=''>
                        <IonGrid>
                            <IonRow>
                            <IonCol size="7">
                                    {/* <IonImg class="wagonimg" src="assets/img/icon-without-bkg.png"></IonImg> */}
                                    <IonText>
                                        <IonLabel className='maketingpage'>Carpool with Wagon! <br/></IonLabel>
                                    </IonText>
                                    
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </SwiperSlide>


                    <SwiperSlide className=''>
                        <IonGrid>
                            <IonRow>
                                <IonCol size="7">
                                    {/* <IonImg class="wagonimg" src="assets/img/icon-without-bkg.png"></IonImg> */}
                                    <IonText>
                                        <IonLabel className='maketingpage'>Attending an Event or a Game?</IonLabel>
                                    </IonText>
                                    {/* <IonText class="maketingpageh2">
                                        <h2>Get a carpool now!</h2>
                                    </IonText> */}
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </SwiperSlide>

                    <SwiperSlide className=''>
                        <IonGrid>
                            <IonRow>
                                <IonCol size="7">
                                    {/* <IonImg class="wagonimg" src="assets/img/icon-without-bkg.png"></IonImg> */}
                                    <IonText>
                                        <IonLabel className='maketingpage'>Commuting to work?</IonLabel>
                                    </IonText>
                                    {/* <IonText class="maketingpageh2">
                                        <h2>Get matched with one of your colleagues!</h2>
                                    </IonText> */}
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </SwiperSlide>

                    <SwiperSlide className=''>
                        <IonGrid>
                            <IonRow>
                                <IonCol size="7">
                                    {/* <IonImg class="wagonimg" src="assets/img/icon-without-bkg.png"></IonImg> */}
                                    <IonText>
                                        <IonLabel className='maketingpage'>Need a drop off to the airport? </IonLabel>
                                    </IonText>
                                    {/* <IonText class="maketingpageh2">
                                        <h2>Get matched with one of your colleagues!</h2>
                                    </IonText> */}
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </SwiperSlide>

                    <SwiperSlide className=''>
                        <IonGrid>
                            <IonRow>
                                <IonCol size="7">
                                    {/* <IonImg class="wagonimg" src="assets/img/icon-without-bkg.png"></IonImg> */}
                                    <IonText>
                                        <IonLabel className='maketingpage'>Drivers get paid and get free access to carpool lane!</IonLabel>
                                    </IonText>
                                    
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </SwiperSlide>

                    

                    <SwiperSlide className=''>
                        <IonGrid>
                            <IonRow>
                                <IonCol size="7">
                                    {/* <IonImg class="wagonimg" src="assets/img/icon-without-bkg.png"></IonImg> */}
                                    <IonText>
                                        <IonLabel className='maketingpage'>Riders get cheap ride!</IonLabel>
                                    </IonText>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </SwiperSlide>


                    <SwiperSlide className=''>
                        <IonGrid>
                            <IonRow>
                                <IonCol size="7">
                                    {/* <IonImg class="wagonimg" src="assets/img/icon-without-bkg.png"></IonImg> */}
                                    <IonText>
                                        <IonLabel className='maketingpage'>Choose to Drive or Ride!</IonLabel>
                                    </IonText>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </SwiperSlide>
                </Swiper>
                </>
                </div>



        </>

    );
}

export default SwiperComponent;
