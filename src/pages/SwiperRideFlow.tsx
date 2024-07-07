import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, useIonViewWillEnter, IonImg, IonInput, IonItem, IonLabel, IonModal, IonNavLink, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation, EffectCoverflow, Keyboard } from 'swiper';


function SwiperRideFlow() {


    return (

        <>
            <div className="swiperDivRideFlow">
                <>

                    <Swiper loop={true}
                        slidesPerView={1}
                        spaceBetween={10}
                        pagination={{
                            clickable: true,
                        }}
                        breakpoints={{
                            '@0.00': {
                                slidesPerView: 1,
                                spaceBetween: 10,
                            },
                            '@0.75': {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            '@1.00': {
                                slidesPerView:2,
                                spaceBetween: 40,
                            },
                            '@1.50': {
                                slidesPerView: 3,
                                spaceBetween: 50,
                            },
                        }}
                        centeredSlides={true}
                        keyboard={{
                            enabled: true,
                        }}


                        modules={[Keyboard, Pagination, Navigation]}
                        className="mySwiper">

                        <SwiperSlide className='customslide'>
                            <IonGrid>
                                <IonRow>
                                    <IonCol className="vertcenter">
                                        {/* <IonImg class="wagonimg" src="assets/img/icon-without-bkg.png"></IonImg> */}
                                        <IonLabel className="rideprocess">Create a Ride</IonLabel>

                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </SwiperSlide>


                        <SwiperSlide className='customslide'>
                            <IonGrid>
                                <IonRow>
                                    <IonCol className="vertcenter">
                                        {/* <IonImg class="wagonimg" src="assets/img/icon-without-bkg.png"></IonImg> */}
                                        <IonText>
                                            <IonLabel className="rideprocess">Find users with matching rides and send them match request and wait for them to accept your request</IonLabel>
                                        </IonText>
                                        {/* <IonText class="maketingpageh2">
                                        <h2>Get a carpool now!</h2>
                                    </IonText> */}
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </SwiperSlide>

                        <SwiperSlide className='customslide'>
                            <IonGrid>
                                <IonRow>
                                    <IonCol className="vertcenter">
                                        {/* <IonImg class="wagonimg" src="assets/img/icon-without-bkg.png"></IonImg> */}
                                        <IonText>
                                            <IonLabel className="rideprocess">OR<hr /> Wait for other users to send a match request and then accept their request.</IonLabel>
                                        </IonText>
                                        {/* <IonText class="maketingpageh2">
                                        <h2>Get matched with one of your colleagues!</h2>
                                    </IonText> */}
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </SwiperSlide>

                        <SwiperSlide className='customslide'>
                            <IonGrid>
                                <IonRow>
                                    <IonCol className="vertcenter">
                                        {/* <IonImg class="wagonimg" src="assets/img/icon-without-bkg.png"></IonImg> */}
                                        <IonText>
                                            <IonLabel  className="rideprocess">Your ride match is complete. <hr />Now you can message your matched carpool partner for any change of plans or additional details.</IonLabel>
                                        </IonText>
                                        {/* <IonText class="maketingpageh2">
                                        <h2>Get matched with one of your colleagues!</h2>
                                    </IonText> */}
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </SwiperSlide>

                        <SwiperSlide className='customslide'>
                            <IonGrid>
                                <IonRow>
                                    <IonCol className="vertcenter">
                                        {/* <IonImg class="wagonimg" src="assets/img/icon-without-bkg.png"></IonImg> */}
                                        <IonText>
                                            <IonLabel className="rideprocess" >Read community guidelines and be a good carpooler.<hr /> Read the safety guidelines and be safe.</IonLabel>
                                        </IonText>

                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </SwiperSlide>



                        <SwiperSlide className='customslide'>
                            <IonGrid>
                                <IonRow>
                                    <IonCol className="vertcenter">
                                        {/* <IonImg class="wagonimg" src="assets/img/icon-without-bkg.png"></IonImg> */}
                                        <IonText>
                                            <IonLabel  className="rideprocess" >Make the ride happen, don't forget to pay if you are the rider before you are dropped off.</IonLabel>
                                        </IonText>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </SwiperSlide>


                        <SwiperSlide className='customslide'>
                            <IonGrid>
                                <IonRow>
                                    <IonCol className="vertcenter">
                                        {/* <IonImg class="wagonimg" src="assets/img/icon-without-bkg.png"></IonImg> */}
                                        <IonText>
                                            <IonLabel  className="rideprocess">Come back to <br /><a className="wagonHref" href="https://www.wagoncarpool.com/">wagoncarpool.com</a> <br />to provide feedback on your ride experience. <hr />This is what creates a trust worthy community.</IonLabel>
                                        </IonText>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </SwiperSlide>
                        <SwiperSlide className='customslide'>
                            <IonGrid>
                                <IonRow>
                                    <IonCol className="vertcenter">
                                        {/* <IonImg class="wagonimg" src="assets/img/icon-without-bkg.png"></IonImg> */}
                                        <IonText>
                                            <IonLabel className="rideprocess">Rinse & Repeat</IonLabel>
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

export default SwiperRideFlow;
