import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import HeaderBackBar from './HeaderBackBar';

function TermsAndPolicy() {
    return (
        <IonPage>
            {/* <IonHeader>
                <IonToolbar>
                    <IonTitle>Guidelines for a Carpooler</IonTitle>
                </IonToolbar>
            </IonHeader> */}
            <IonContent>
            
                <h1>Terms of Service</h1>
                <IonList>
                    <h2 className="carpoolingguidelinesmargin">Eligibility:</h2>
                    <IonItem className="item-text-wrap">
                        <ul><li>You must be at least 18 years old to use the App or have permission from a legal guardian.</li><li>By using the App, you represent that you meet this eligibility requirement.</li>
                        </ul>
                    </IonItem>

                    <h2 className="carpoolingguidelinesmargin">User Account:</h2>
                    <IonItem className="item-text-wrap">
                        <ul><li>To use the App, you may need to create a user account. You are responsible for providing accurate and up-to-date information during the registration process. You are also responsible for maintaining the confidentiality of your account credentials and are liable for all activities that occur under your account.
                            
                        </li>
                        </ul>
                    </IonItem>

                    <h2 className="carpoolingguidelinesmargin">Carpooling Service:</h2>
                    <IonItem className="item-text-wrap">

                        <ul><li>The App is a platform that enables users to offer and find carpooling opportunities. Users can create carpooling offers or request to join existing carpooling trips. The App does not guarantee the availability, safety, or reliability of any carpooling opportunities. Users are responsible for their interactions with other users.
                        </li>
                        </ul>

                    </IonItem>
                    <h2 className="carpoolingguidelinesmargin">Safety:</h2>

                    <IonItem className="item-text-wrap">

                        <ul><li>Users are encouraged to use common sense and caution while using the App. It is the responsibility of users to assess the suitability and safety of any carpooling opportunity. Users agree to follow local traffic laws and regulations during their carpooling trips.
                        </li>
                        </ul>

                    </IonItem>
                    <h2 className="carpoolingguidelinesmargin">Modification and Termination:</h2>
                    <IonItem className="item-text-wrap">                        <ul>
                        <li>We reserve the right to modify, suspend, or terminate the App, user accounts, or any features at any time without prior notice.

                        </li>
                    </ul>

                    </IonItem>

                    <h2 className="carpoolingguidelinesmargin">Data Collection:</h2>
                    <IonItem className="item-text-wrap">                        <ul>
                        <li>The App may collect personal information from users, including but not limited to names, email addresses, and location data. We will only collect and use this information as described in our Privacy Policy.
                            .</li>
                    </ul>

                    </IonItem>

                    <h2 className="carpoolingguidelinesmargin">Data Usage:</h2>

                    <IonItem className="item-text-wrap">

                        <ul><li>The personal information collected by the App will be used to provide carpooling services, improve the App's functionality, and communicate with users. We will not sell, trade, or rent users' personal information to third parties without consent.
                        </li>
                        </ul>

                    </IonItem>

                    <h2 className="carpoolingguidelinesmargin">Cookies and Tracking Technologies:</h2>

                    <IonItem className="item-text-wrap">

                        <ul><li>The App may use cookies and tracking technologies to enhance user experience and collect usage data. Users can manage their preferences for cookies through their browser settings.
                        </li>
                        </ul>

                    </IonItem>
                    <h2 className="carpoolingguidelinesmargin">Data Security:</h2>

                    <IonItem className="item-text-wrap">

                        <ul><li>The personal information collected by the App will be used to provide carpooling services, improve the App's functionality, and communicate with users. We will not sell, trade, or rent users' personal information to third parties without consent.
                        </li>
                        </ul>

                    </IonItem>
                    <h2 className="carpoolingguidelinesmargin">Third-Party Services:</h2>

                    <IonItem className="item-text-wrap">

                        <ul><li>The App may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these third-party services.</li>
                        </ul>

                    </IonItem>
                    <h2 className="carpoolingguidelinesmargin">Compliance:</h2>

                    <IonItem className="item-text-wrap">

                        <ul><li>We will comply with applicable data protection and privacy laws concerning the collection, use, and storage of users' personal information.</li>
                        </ul>

                    </IonItem>
                    <h2 className="carpoolingguidelinesmargin">Disclaimer:</h2>

                    <IonItem className="item-text-wrap">

                        <ul><li>The App and its services are provided "as is" without any warranties, either express or implied. We do not guarantee the accuracy, availability, or reliability of the App or its content. Users agree to use the App at their own risk.</li>
                        </ul>

                    </IonItem>

                    <h2 className="carpoolingguidelinesmargin">Governing Law:</h2>

                    <IonItem className="item-text-wrap">

                        <ul><li>These Terms and Privacy Policy shall be governed by and construed in accordance with the laws of United States Of America.</li>
                        </ul>

                    </IonItem>
                    <h2 className="carpoolingguidelinesmargin">Contact Information:</h2>

                    <IonItem className="item-text-wrap">

                        <ul><li>If you have any questions or concerns regarding these Terms and Privacy Policy, you can contact us at support@wagoncarpool.com.</li>
                        </ul>

                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default TermsAndPolicy;
