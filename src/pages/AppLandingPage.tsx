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
} from '@ionic/react';
import { IonReactHashRouter, IonReactRouter } from '@ionic/react-router';
import { addCircle, settings, home, search, information, informationCircleOutline, chatbox, maleFemaleSharp, personCircle, notifications, camera, settingsSharp, carOutline, car, homeOutline, homeSharp, carSportOutline, cash, cashOutline, cashSharp } from 'ionicons/icons';
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
import Drive from './Drive';

function AppLandingPage() {
  let history = useHistory();
  let userData = useLocation();
  const [session, setSession] = useState<any>({});
  console.log("In App component");
  console.log(userData);
  const [notificationCount, setNotificationCount] = useState<any>({});

  async function loadFeed(id: any) {
    // console.log(userData.state.data.session.userId);
    const getResponse = await axios.get(import.meta.env.VITE_APP_API_V2 + '/notifications', {headers: { 'Authorization': id.wagon_token } });
    // if (getResponse != null && getResponse.data !== null && getResponse.data.length > 0) {
      setNotificationCount(getResponse.data);
    // }
  }

  useIonViewDidEnter(() => {
    console.log('ionViewDidEnter event fired');
    if (localStorage.getItem("session") === null) {
      console.log("Session doesn't exist");
      //localStorage.setItem("redirected_from", 'App');
      return;
    }
    let globalSessionObj = JSON.parse(localStorage.getItem('session') || "");
    if (globalSessionObj == undefined || globalSessionObj.wagon_token == null || globalSessionObj.wagon_token == '') {
      // window.location.replace('/home');
      return;
    }
    axios.get(import.meta.env.VITE_APP_API_V2 + '/user', { headers: { 'Authorization': globalSessionObj.wagon_token } })
      .then(async (axiosResponse: AxiosResponse) => {
        loadFeed(globalSessionObj);
      })
      .catch((reason: AxiosError) => {
        // window.location.replace('/home');
        // if (reason.response?.status === 401 || reason.response?.status === undefined) {
        //   setSessionExists(false);
        //   return;
        // }
      })

   
  });
  // const [loadingStatus, setLoadingStatus] = useState(".");

  async function addListeners() {
    
    await PushNotifications.addListener('registration', token => {
      console.info('Registration token: ', token.value);
      console.log('Platform', Capacitor.getPlatform());
      if (localStorage.getItem('session') == null) {
        return;
      }
      let globalSessionObj = JSON.parse(localStorage.getItem('session') || "");
      if (globalSessionObj == undefined || globalSessionObj.wagon_token == null || globalSessionObj.wagon_token == '') {
        return;
      }
      console.log('WagonToken', globalSessionObj.wagon_token);
      let  url = import.meta.env.VITE_APP_API_V2 + '/user/fb_token?deviceType=' + Capacitor.getPlatform() + '&fcmToken=' + token.value;
      
      axios.post(url, {} , {headers: { 'Authorization': globalSessionObj.wagon_token } })
            .then((axiosResponse: AxiosResponse) => {
                ReactGA.event({
                    category: "fcm_token_registration",
                    action: "fcm_token_registration",
                });
                console.log('fcm_token_registration success');
            })
            .catch((reason: AxiosError) => {
              console.log('fcm_token_registration failed', reason.response?.status);
                ReactGA.event({
                    category: "fcm_token_registration_failed",
                    action: "fcm_token_registration_failed",
                });
            })
    });
  
    await PushNotifications.addListener('registrationError', err => {
      console.error('Registration error: ', err.error);
    });
  
    await PushNotifications.addListener('pushNotificationReceived', notification => {
      
      console.log('Push notification received: ', notification);
    });
  
    await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
      console.log('NOTIFICATION TAP', notification.notification.data);
      if (notification.notification.data.type == 'REQUEST') {
        //history.push('/pendingRequests');
        window.location.replace('/pendingRequests');

      } else if (notification.notification.data.type == 'RIDES') {
        //history.push('/App');
        window.location.replace('/App');

      } else if (notification.notification.data.type == 'INBOX') {
        //history.push('/messaging');
        window.location.replace('/messaging');
        
      } else if (notification.notification.data.type == 'SETTINGS') {
        //history.push('/userActivity');
        window.location.replace('/userActivity');
      } 
      console.log('Push notification action performed', notification.actionId, notification.inputValue);
    });
  }

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      addListeners();
    }
  }, []);


  function clearNotifications() {
    console.log("Clear Notifications");
    setNotificationCount(0);
  }

  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/App" to="/AppFeed" />
        
          <Route path="/App" render={() => <AppFeed />} />
          <Route path="/carpoolForEvents" render={() => <Events />} exact={true} />
          <Route path="/getRideFeedback" render={() => <GetRideFeedback />} exact={true} />
          <Route path="/carpoolForWork" render={() => <Work />} exact={true} />
          <Route path="/carpoolForAirport" render={() => <Airport />} exact={true} />
          <Route path="/carpoolForEvents?type=event" component={Events} exact={true}/>
          <Route path="/scc" render={() => <SelectCarpoolCategory />} exact={true} />
          <Route path="/messaging" render={() => <Messaging />} exact={true} />
          <Route path="/pendingRequests" render={() => <MatchRequest />} exact={true} />
          <Route path="/userActivity" render={() => <UserActivity />} exact={true} />
          <Route path="/blogs" render={() => <BlogHeadlines />} exact={true} />
          <Route path="/home" render={() => <Home />} exact={true} />
          <Route path="/about" render={() => <About />} exact={true} />
          <Route path="/careers" render={() => <Careers />} exact={true} />
          <Route path="/why-wagon-carpool" render={() => <WhyWagonCarpool />} exact={true} />
          <Route path="/support" render={() => <SupportDetails />} exact={true} />
          <Route path="/drive" render={() => <Drive />} exact={true} />
          <Route path="/blogDetail/:id" render={() => <BlogDetails />} />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
        {/* <IonTabButton tab="home" href="/home">
            <IonIcon size="small" icon={homeSharp} />
            <IonLabel  class="tablabel">Home</IonLabel>
          </IonTabButton> */}
          <IonTabButton tab="rides" href="/App">
            <IonIcon size="small" icon={car} />
            <IonLabel  class="tablabel">Rides</IonLabel>
          </IonTabButton>
          <IonTabButton tab="drive" href="/drive">
            <IonIcon size="small" icon={cash} />
            <IonLabel  class="tablabel">Drive</IonLabel>
          </IonTabButton>

          <IonTabButton tab="pendingRequests" href="/pendingRequests">
            <IonIcon size="small" icon={notifications} onClick={clearNotifications} />
            {
              notificationCount.pendingApprovalsCount > 0 ? <IonBadge color="danger">{notificationCount.pendingApprovalsCount}</IonBadge> : null
            }
            <IonLabel class="tablabel">Requests</IonLabel>
          </IonTabButton>

          <IonTabButton tab="carpoolcategory" href="/scc">
            <IonIcon size="small" icon={addCircle} />
            <IonLabel class="tablabel">New Ride</IonLabel>
          </IonTabButton>

          <IonTabButton tab="messaging" href="/messaging">
            <IonIcon size="small" icon={chatbox} />
            {
              notificationCount.unreadMessageCount > 0 ? <IonBadge color="danger">{notificationCount.unreadMessageCount}</IonBadge> : null
            }
            <IonLabel class="tablabel">inbox</IonLabel>
          </IonTabButton>

          <IonTabButton tab="userActivity" href="/userActivity">
            {/* {
              session?.imageUrl == null || session?.imageUrl == ""? <IonIcon icon={personCircle} /> : 
              <><IonAvatar class="tabImage"><img src={session?.imageUrl} referrerPolicy='no-referrer' /></IonAvatar></>
            } */}
            <IonIcon size="small" icon={settingsSharp} />
            
            <IonLabel class="tablabel">Settings</IonLabel>
          </IonTabButton>

        </IonTabBar>
      </IonTabs>
    </IonReactRouter>

  );
}
export default AppLandingPage;
