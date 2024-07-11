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
  IonBadge,
  useIonViewDidEnter,
  IonPage,
  IonSpinner,
} from '@ionic/react';
import { IonReactHashRouter, IonReactRouter } from '@ionic/react-router';
import { addCircle, settings, home, search, information, informationCircleOutline, chatbox, maleFemaleSharp, personCircle, notifications, camera, settingsSharp, carOutline, car, homeOutline, homeSharp } from 'ionicons/icons';
import { Redirect, Route } from 'react-router';
import App from '../App';
import AppFeed from './AppFeed';
import Messaging from './Messaging';
import { useLocation, useHistory, HashRouter } from 'react-router-dom';
import UserSettings from './UserActivity';
import UserActivity from './UserActivity';
import MatchRequest from './MatchRequest';
import axios, { AxiosError, AxiosResponse } from 'axios';
import SelectCarpoolCategory from './SelectCarpoolCategory';
import Events from './Events';
import Work from './Work';
import GetRideFeedback from './GetRideFeedback';
import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import ReactGA from 'react-ga4';
import BlogHeadlines from './BlogsHeadlines';
import BlogDetails from './BlogsDetails';
import Airport from './Airport';
import Home from './Home';
import About from './About';
import WhyWagonCarpool from './WhyWagonCarpool';
import SupportDetails from './SupportDetails';
import Careers from './Careers';

function InternalRouter() {

    function init() {
        if (localStorage.getItem("session") === null) {
            console.log("Session doesn't exist");
            window.location.replace('/home');
            //localStorage.setItem("redirected_from", 'App');
            return;
          }
          let globalSessionObj = JSON.parse(localStorage.getItem('session') || "");
          if (globalSessionObj == undefined || globalSessionObj.wagon_token == null || globalSessionObj.wagon_token == '') {
            window.location.replace('/home');
            return;
          }
          axios.get(import.meta.env.VITE_APP_API_V2 + '/user', { headers: { 'Authorization': globalSessionObj.wagon_token } })
            .then(async (axiosResponse: AxiosResponse) => {
                window.location.replace('/scc');
            })
            .catch((reason: AxiosError) => {
                window.location.replace('/home');
    
            })
    }

  useIonViewDidEnter(() => {
    init();
  });

  useEffect(() => {
    init();
  }, []);


  return (
    <IonPage>
        <IonContent>
        <IonLabel className="centerLabel">
        <IonSpinner color="success"></IonSpinner>
        </IonLabel>
        </IonContent>
    </IonPage>

  );
}
export default InternalRouter;
