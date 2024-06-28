import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactHashRouter, IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import AppFeed from './pages/AppFeed';
import AppLandingPage from './pages/AppLandingPage';
import VerifyUser from './pages/VerifyUserComponent';
import ChatDetails from './pages/ChatDetails';
import GetRideFeedback from './pages/GetRideFeedback';
import GetStarted from './pages/GetStarted';
import MatchRequest from './pages/MatchRequest';
import Messaging from './pages/Messaging';
import Otp from './pages/GetAdditionalProfileDetails';
import UserMenu from './pages/UserMenu';
import GetAdditionalProfileDetails from './pages/GetAdditionalProfileDetails';
import axios from 'axios';
import ReactGA from 'react-ga4'
import TermsAndPolicy from './pages/TermsAndPolicy';
import Terms from './pages/Terms';
import PrivacyPolicy from './PrivacyPolicy';
import SelectCarpoolCategory from './pages/SelectCarpoolCategory';
import Work from './pages/Work';
import Events from './pages/Events';
import CarPoolingGuidelines from './pages/CarpoolingGuidelines';
import BlogHeadlines from './pages/BlogsHeadlines';
import Home from './pages/Home';

setupIonicReact();
axios.defaults.headers.common['X-API-KEY'] = import.meta.env.VITE_APP_API_KEY;
const TRACKING_ID = "G-VSL6PJ86E9";
ReactGA.initialize([
  {
    trackingId: TRACKING_ID,

  }
]);
// ReactGA.pageview(window.location.pathname + window.location.search);
//ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search, title: window.location.pathname + window.location.search });

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/getstarted" component={GetStarted} />
        <Route path="/getAdditionalProfileDetails" component={GetAdditionalProfileDetails} />
        <Route path="/app" component={AppLandingPage} />
        {/* <Route path="/appFeed" component={AppFeed} /> */}
        {/* <Route path="/pendingRequests" component={MatchRequest} /> */}
        <Route path="/carpoolForEvents" component={Events} />
        <Route path="/carpoolForWork" component={Work} />
        {/* <Route path="/messaging" component={Messaging} /> */}
        <Route path="/chatdetails" component={ChatDetails} />
        <Route path="/userActivity" component={AppLandingPage} />
        <Route path="/messaging" component={AppLandingPage} />
        <Route path="/carpoolForEvents" component={AppLandingPage} />
        <Route path="/carpoolForWork" component={AppLandingPage} />
        <Route path="/carpoolForAirport" component={AppLandingPage} />
        <Route path="/scc" component={AppLandingPage} />
        <Route path="/pendingRequests" component={AppLandingPage} />
        <Route path="/pendingRequests" component={AppLandingPage} />
        <Route path="/terms" component={Terms} />
        <Route path="/community-guidelines" component={CarPoolingGuidelines} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        {/* <Route exact path="/menu" component={UserMenu} /> */}
        <Route exact path="/getRideFeedback" component={GetRideFeedback} />
        <Route exact path="/camera" component={VerifyUser} />
        <Route exact path="/blogs" component={AppLandingPage} />
        <Route exact path="/blogDetail/:id" component={AppLandingPage} />
        <Route exact path="/home" component={AppLandingPage} />
        <Redirect exact from="/" to="/scc" />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
