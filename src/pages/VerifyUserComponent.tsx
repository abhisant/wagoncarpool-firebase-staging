import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonMenu, IonMenuButton, IonModal, IonNavLink, IonPage, IonRow, IonSelect, IonSelectOption, IonSpinner, IonSplitPane, IonText, IonTextarea, IonTitle, IonToolbar, useIonLoading, useIonViewDidEnter } from '@ionic/react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { menu } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';
import { Redirect, useHistory, Route } from 'react-router-dom';
import GetStarted from './GetStarted';

import './GetStarted.css';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export interface Photo {
    filePath: string;
    webViewPath?: string;
}

const VerifyUser = () => {
    const [photos, setPhotos] = React.useState<Photo[]>([]);
    const [permissions, setCameraPermissions] = React.useState(true);
    const [imageUrl, setImageUrl] =  React.useState("");

    const [isTouched, setIsTouched] = useState(false);
    const [isOtpFormVisible ,setOtpFormVisible] = useState<boolean>(false);
    const [otp, setOtpNumber] = useState("");
    const [isValid, setIsValid] = useState<boolean>();
    const [workEmailId, setWorkEmailId] = useState("");
    const [errorLogs, setErrorLogs] = useState('');
    const [successLogs, setSuccessLogs] = useState('');
    const [present, dismiss] = useIonLoading();
    const [loading, setLoading] = useState(false);
    let globalSessionObj:any;

    
    const providers = ""
  
    const validateEmail = (email: string) => {
      return email.match(
        /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      );
    };
  
    const validate = (ev: Event) => {
    setErrorLogs('');
      const value = (ev.target as HTMLInputElement).value;
      setWorkEmailId(value);
      setIsValid(undefined);
  
      if (value === '') return;
  
      validateEmail(value) !== null ? setIsValid(true) : setIsValid(false);
    };
  
    const markTouched = () => {
      setIsTouched(true);
    };

    function setOtp (ev: Event) {
        setErrorLogs('');
        const value = (ev.target as HTMLInputElement).value;
        setOtpNumber(value);
        console.log(value);
    }

    function verifyOtp() {
        if (localStorage.getItem('session')  == null) {
            return;
        }
        globalSessionObj = JSON.parse(localStorage.getItem('session') || "");
        if (globalSessionObj== undefined || globalSessionObj.wagon_token == null || globalSessionObj.wagon_token == '') {
            return;
        }
        setLoading(true);
        setSuccessLogs('');
        setErrorLogs('');
        console.log(otp);
        const session = JSON.parse(localStorage.getItem('session') || "");

        axios.post(import.meta.env.VITE_APP_API_V2 + '/user/verify_otp?otp=' + otp, {} ,{headers: { 'Authorization': globalSessionObj.wagon_token } }).then(async (postMatchResponse: AxiosResponse) => {
            console.log(postMatchResponse);
            setLoading(false);
            if (postMatchResponse.data == 'OTP_RESULT_VALID') {
                present({
                    message: 'OTP Matched Successfully. You are now a verified user.',
                    duration: 3000,
                });

                setTimeout(function () {
                    window.location.reload();
                }, 3000);
                

            } else if (postMatchResponse.data == 'OTP_RESULT_UNKNOWN_DOMAIN'){
                present({
                    message: 'OTP Verified. We will verify your company details and get back to you if we need any details from your end.',
                    duration: 3000,
                });

                setTimeout(function () {
                    window.location.reload();
                }, 3000);
            } else {
                setErrorLogs('The OTP entered is incorrect!');
            }
            // setOtpFormVisible(true);
        }).catch((axiosError: AxiosError) => {
            if (axiosError.response?.status === 400) {
                setErrorLogs('Specified email address is not a valid work email id');
            }
        })
    }

    function resetForm() {
        setErrorLogs('');
        setIsValid(undefined);
        setWorkEmailId('');
        setOtpFormVisible(false);
        setOtpNumber("");
    }

   async function verifyEmail() {
    setLoading(false);
    setErrorLogs('');
    if (localStorage.getItem('session')  == null) {
        return;
    }
    globalSessionObj = JSON.parse(localStorage.getItem('session') || "");
    if (globalSessionObj== undefined || globalSessionObj.wagon_token == null || globalSessionObj.wagon_token == '') {
        return;
    }
        const session = JSON.parse(localStorage.getItem('session') || "");
        console.log(workEmailId + globalSessionObj.wagon_token);

        axios.post(import.meta.env.VITE_APP_API_V2 + '/user/send_otp?workEmail=' + workEmailId, {} , {headers: { 'Authorization': globalSessionObj.wagon_token } }).
        then(async (postMatchResponse: AxiosResponse) => {
            console.log(postMatchResponse);
            setOtpFormVisible(true);
        }).catch((axiosError: any) => {
            if (axiosError.response?.status === 400) {
                setErrorLogs('Specified email address is not a valid work email id');
            } if (axiosError.response?.status === 404) {
                if(axiosError.response?.data.errorCode == 509) {
                    setErrorLogs(axiosError.response?.data.message);
                } else {
                    setErrorLogs('Looks like there was something bad with the request, please try again with a valid input!');
                }
            }
        })
    }

    const takePhoto = async () => {
        //const permissions = await Camera.requestPermissions();
        // console.log(permissions);
        try {
            console.log(await Camera.checkPermissions());
           // setCameraPermissions((await Camera.checkPermissions()).camera == 'granted' ? true : false);
            const photo = await Camera.getPhoto({
                quality: 90,
                allowEditing: true,
                resultType: CameraResultType.Uri
            });

            console.log('photo', photo);
            setImageUrl(photo.webPath || "");

            // image.webPath will contain a path that can be set as an image src.
            // You can access the original file using image.path, which can be
            // passed to the Filesystem API to read the raw data of the image,
            // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
            //var imageUrl = photo.webPath;
            //console.log('imageurl', imageUrl);
        } catch (e: any) {
            console.log(e);

        }


        // Can be set to the src of an image now

        
    }
    // async function fileUpload() {
    //     const url = process.env.REACT_APP_API + '/user/uploadDL?id=10';
    //     const formData = new FormData();
    //     let blob = await fetch(imageUrl).then(r => r.blob());
    //     formData.append('file',blob)
    //     const config = {
    //         headers: {
    //             'content-type': 'multipart/form-data'
    //         }
    //     }

    //     axios.post(url, formData, config).then(async (postMatchResponse: AxiosResponse) => {
    //         console.log(postMatchResponse);
            
    //     }).catch((rideMatchPostError: AxiosError) => {
    //         console.log(rideMatchPostError);
    //     })
    //   }

    return (
        <>
            <IonPage>
                <IonContent>
                    <IonCard className="ioncardinamodal">
                        <IonCardContent>
                            {
                                !isOtpFormVisible ? 
                                <IonInput 
                    className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                    type="email"
                    clearInput={true}
                    fill="solid"
                    label="Enter your work or school email id."
                    labelPlacement="floating"
                    errorText="Invalid email"
                    onIonInput={(event) => validate(event)}
                    onIonBlur={() => markTouched()}></IonInput>
                                : null
                            }
                    
                    <hr/>
                    {
                        !isOtpFormVisible && isValid ? <IonButton size="small" onClick={verifyEmail} color="tertiary">Send OTP</IonButton> : 
                        !isOtpFormVisible ? <IonButton size="small" onClick={verifyEmail} disabled color="tertiary">Send OTP</IonButton> : null
                    }
                    
                    {
                        isOtpFormVisible ? <> <IonInput fill="outline"  type="number" onIonInput={(event) => setOtp(event)}  placeholder='Enter the one time password sent to your email id'></IonInput> 
                        <hr/>
                        <IonItem><IonButton color="medium" onClick = {() => resetForm()} size="small" >Go Back</IonButton>
                        {
                            otp == '' ? <IonButton color="tertiary" disabled size="small" onClick= {verifyOtp} >Verify OTP</IonButton>
                            : <IonButton color="tertiary"  size="small" onClick= {verifyOtp} >Verify OTP </IonButton>
                        }
                        </IonItem></>
                        : null
                    }
                    {
                                    errorLogs != '' ? <IonItem className="errorLogs" text-wrap color="danger">{errorLogs}</IonItem> : null
                    }
                    {
                                    successLogs != '' ? <IonItem className="errorLogs" text-wrap color="success">{successLogs}</IonItem> : null
                    }

                            
                        </IonCardContent>
                    </IonCard>
                    {/* <IonButton color="tertiary" onClick={takePhoto}>Open camera</IonButton>
                    {
                        !permissions ? <IonButton color="danger" >permissions  denied</IonButton> : null
                        
                    }
                    {
                        imageUrl != "" ? <IonImg src={imageUrl}></IonImg> : null
                    }
                    <IonButton color="tertiary" onClick={fileUpload}>Upload</IonButton> */}
                </IonContent>
            </IonPage>
        </>
    );
};

export default VerifyUser;

