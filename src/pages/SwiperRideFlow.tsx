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
                                        <IonLabel className="rideprocess">Choose ride type (Office/Airport/Event) & create a ride</IonLabel>

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
                                            <IonLabel className="rideprocess">Send match requests to any available ride matches</IonLabel>
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
                                            <IonLabel className="rideprocess">Or, Accept match requests you receive from other users</IonLabel>
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
                                            <IonLabel  className="rideprocess">The match is confirmed, coordinate with your partner using chat.</IonLabel>
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
                                            <IonLabel className="rideprocess" >Read community and Safety guidelines, be an awesome carpooler.</IonLabel>
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
                                            <IonLabel  className="rideprocess" >Be on time for the ride, Pay before you get off if you are the rider.</IonLabel>
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
                                            <IonLabel  className="rideprocess">Visit the app/website after the ride to provide feedback.</IonLabel>
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
                                            <IonLabel className="rideprocess">Nothing can beat it, so Rinse it and repeat it</IonLabel>
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
