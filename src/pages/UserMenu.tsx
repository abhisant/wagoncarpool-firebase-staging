import { IonAccordion, IonAccordionGroup, IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonModal, IonNavLink, IonPage, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import { bug, car, carSportOutline, handLeft, help, home, logOut, star, trailSignOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { HashRouter, useHistory } from 'react-router-dom';
import ExploreContainer from '../components/ExploreContainer';
import { Redirect, Route, Switch } from 'react-router';
import GetStarted from './GetStarted';
import CarPoolingGuidelines from './CarpoolingGuidelines';
import SafetyGuidelines from './SafetyGuidelines';
import SupportDetails from './SupportDetails';
import App from '../App';
import AppLandingPage from './AppLandingPage';
import { IonReactRouter } from '@ionic/react-router';

function UserMenu() {
  const history = useHistory();
  

  const [doSignout, setSignout] = React.useState(false);
  const [goToHome, setGoToHome] = React.useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [showCarpoolDetails, setShowCarPoolGuidelinesDetails] = React.useState(false);
  const [showSupportDetails, setShowSupportDetails] = React.useState(false);

  const [showSafetyDetails, setShowSafetyDetails] = React.useState(false);


  useEffect(() => {
  }, []);

  function goback() {
    setGoToHome(true);
  }

  function logoutUser() {
    console.log("signout");
    localStorage.removeItem('session');
    localStorage.removeItem('redirected_from');
    localStorage.removeItem('temp_session');
    // history.push('/getstarted');
    setSignout(true);
  }

  window.addEventListener('ionModalDidDismiss', (event) => {
    setIsOpen(false);
  });

  function openSafetyGuidelines() {
    setShowCarPoolGuidelinesDetails(false);
    setShowSupportDetails(false);
    setShowSafetyDetails(true);


    setIsOpen(true);
  }

  function openModelCarPoolingGuidelines() {
    setShowSafetyDetails(false);
    setShowSupportDetails(false);
    setShowCarPoolGuidelinesDetails(true);
    setIsOpen(true);
  }

  function openModelSupportDetails() {
    setShowSafetyDetails(false);
    setShowCarPoolGuidelinesDetails(false);
    setShowSupportDetails(true);
    setIsOpen(true);
  }

  useIonViewDidEnter(() => {
    setGoToHome(false);
});



  return (
    <IonPage>
      {
        doSignout ? <><IonReactRouter><Switch><Redirect exact to={{ pathname: '/getstarted' }} /><Route path="/getstarted" component={GetStarted} /></Switch></IonReactRouter></> : null
      }
      {
        goToHome ? <><IonReactRouter><Switch><Redirect exact to={{ pathname: '/App' }} /><Route path="/App" component={AppLandingPage} /></Switch></IonReactRouter></> : null
      }
      <IonContent>
        <IonHeader>
          <IonToolbar>
            {/* <IonButtons slot="start">
              <IonBackButton color="dark" defaultHref='/App'></IonBackButton>
            </IonButtons> */}
          </IonToolbar></IonHeader>
        <IonContent className="ion-padding">

          <IonCard className="ioncardinamodal">
            {/* <IonCardContent>
              <IonButton color="primary" fill="outline"  onClick={goback}>
                <IonIcon size="small" slot="start" icon={home}></IonIcon>
                Back to Home
              </IonButton>
            </IonCardContent> */}

            <IonCardContent>
              <IonButton color="primary" fill="outline"  onClick={openSafetyGuidelines}>
                <IonIcon size="small" slot="start" icon={handLeft}></IonIcon>
                Safety
              </IonButton>
            </IonCardContent>

            <IonCardContent>
              <IonButton color="primary" fill="outline"  onClick={openModelCarPoolingGuidelines} >
                <IonIcon size="small" slot="start" icon={car}></IonIcon>
                Community Guidelines
              </IonButton>
            </IonCardContent>

            <IonCardContent>
              <IonButton color="primary" fill="outline"  onClick={openModelSupportDetails}>
                <IonIcon size="small" slot="start" icon={help}></IonIcon>
                Get Help
              </IonButton>
            </IonCardContent>

            {/* <IonCardContent>
              <IonButton color="light"   >
                <IonIcon color="dark" size="small" slot="start" icon={bug}></IonIcon>
                Report bug
              </IonButton>
            </IonCardContent> */}

            {/* <IonCardContent>
              <IonButton color="danger"  onClick={() => logoutUser()}>
                <IonIcon  size="small" slot="start" icon={logOut} ></IonIcon>
                Signout
              </IonButton>
            </IonCardContent> */}
          </IonCard></IonContent>

        <IonModal id="example-modal" isOpen={isOpen}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>
                {
                  showSafetyDetails ? <>Safety Tips For Carpooling</> : null
                }
                {
                  showCarpoolDetails ? <>Guidelines for a Carpooler</> : null
                }
                {
                  showSupportDetails ? <>Get Support</> : null
                }
              </IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent overflow-scroll>
            {
              showSafetyDetails ? <SafetyGuidelines></SafetyGuidelines> : null
            }
            {
              showCarpoolDetails ? <CarPoolingGuidelines></CarPoolingGuidelines> : null
            }
            {
              showSupportDetails ? <SupportDetails></SupportDetails> : null
            }

          </IonContent>
        </IonModal>

      </IonContent></IonPage>);
};

export default UserMenu;
