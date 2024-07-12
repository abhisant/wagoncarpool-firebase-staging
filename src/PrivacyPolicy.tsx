import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import HeaderBackBar from './pages/HeaderBackBar';

function PrivacyPolicy() {
    return (
        <IonPage>
            {/* <IonHeader>
                <IonToolbar>
                    <IonTitle>Guidelines for a Carpooler</IonTitle>
                </IonToolbar>
            </IonHeader> */}
            <IonContent>
            <HeaderBackBar></HeaderBackBar>
                <h1>Wagon Carpool Privacy Policy</h1>
                <IonList>
                    <h2 className="carpoolingguidelinesmargin">EFFECTIVE OCTOBER 23, 2023</h2>
                    <IonItem className="item-text-wrap">
                        <ul><li>As a part of facilitating a great Wagon carpool user, we need to collect and share your information. In this privacy policy, we tell you what information we collect, use, and share, and how we use it to create and connect our community.</li>
                            <li>
                                As a reminder, your use of Wagon Carpool’s website, products, services, and applications (the “Services”) is at all times subject to the Terms of Use, which incorporates this Privacy Policy. By using or accessing Wagon carpool’s Services in any manner, you acknowledge that you accept the practices and policies outlined in this Privacy Policy, and you hereby consent that we will collect, use, and share your information as described herein. Any terms we use in this Policy without defining them have the definitions given to them in the Terms of Use.
                            </li>
                            <li>By using or accessing Wagon carpool’s Services in any manner, you acknowledge that you accept the practices and policies outlined in this Privacy Policy, and you hereby consent that we will collect, use, and share your information as described herein.</li>
                        </ul>
                    </IonItem>

                    <h2 className="carpoolingguidelinesmargin">What does this Privacy Policy cover?</h2>
                    <IonItem className="item-text-wrap">
                        <ul><li>This Privacy Policy covers our treatment of information, including personally identifiable information, that we gather when you are accessing or using our Services and from our Affiliated Partners (explained below) to facilitate a great workplace planner or commute experience. This Privacy Policy does not cover the practices of companies we don’t own or control, or people that we do not manage.
                        </li>
                        </ul>
                    </IonItem>

                    <h2 className="carpoolingguidelinesmargin">Will Wagon Carpool ever change this Privacy Policy?</h2>
                    <IonItem className="item-text-wrap">

                        <ul><li>The App is a platform that enables users to offer and find carpooling opportunities. Users can create carpooling offers or request to join existing carpooling trips. The App does not guarantee the availability, safety, or reliability of any carpooling opportunities. Users are responsible for their interactions with other users.
                        </li>
                        </ul>

                    </IonItem>
                    <h2 className="carpoolingguidelinesmargin">Safety:</h2>

                    <IonItem className="item-text-wrap">

                        <ul><li>We are constantly improving our Services, and in doing so, may need to change this Privacy Policy from time to time. We will alert you to changes by sending you an email and/or by some other means. If you use the Services after any changes to the Privacy Policy have been posted or otherwise communicated, that means you agree to all of the changes.
                        </li>
                        </ul>

                    </IonItem>
                    <h2 className="carpoolingguidelinesmargin">Modification and Termination:</h2>
                    <IonItem className="item-text-wrap">                        <ul>
                        <li>We reserve the right to modify, suspend, or terminate the App, user accounts, or any features at any time without prior notice.
                        </li>
                    </ul>

                    </IonItem>

                    <h2 className="carpoolingguidelinesmargin">Personal Data</h2>
                    <h3 className="carpoolingguidelinesmargin">Examples of Personal Data We Collect</h3>
                    <IonItem className="item-text-wrap">                        <ul>
                        <li>First and last name</li>
                        <li>Email address</li>
                        <li>Work email addresss</li>
                    </ul>
                    </IonItem>

                    <h2 className="carpoolingguidelinesmargin">Categories of Third Parties With Whom We Share the Personal Data‍</h2>

                    <IonItem className="item-text-wrap">

                        <ul>
                            <li>Service Providers</li>
                            <li>Analytics Partners</li>
                        </ul>

                    </IonItem>

                    <h2 className="carpoolingguidelinesmargin">Online Identifiers</h2>

                    <IonItem className="item-text-wrap">

                        <ul><li>Unique identifiers such as account name and passwords
                        </li>
                            <li>Analytics Partners</li>
                        </ul>

                    </IonItem>
                    <h2 className="carpoolingguidelinesmargin">Identifiers</h2>

                    <IonItem className="item-text-wrap">

                        <ul><li>Drivers license number </li>
                            <li>Motor Vehicle History (MVH) Check Partners (for commute drivers)</li>
                        </ul>
                    </IonItem>
                    <h2 className="carpoolingguidelinesmargin">Web Analytics</h2>

                    <IonItem className="item-text-wrap">

                        <ul>
                            <li>Web page interactions (including with ads)</li>
                            <li>Analytics Partners</li>
                        </ul>

                    </IonItem>
                    <h2 className="carpoolingguidelinesmargin">Other Identifying Information that You Voluntarily Choose to Provide</h2>

                    <IonItem className="item-text-wrap">

                        <ul>
                            <li>When you provide such information directly to us.</li>
                            <li>When you create an account or use our interactive tools and Services.</li>
                            <li>When you voluntarily provide information in free-form text boxes through the Services or through responses to surveys or questionnaires.</li>
                            <li>When you send us an email or otherwise contact us.</li>
                            <li>When you use the Services and such information is collected automatically.</li>
                        </ul>

                    </IonItem>
                    <h3 className="carpoolingguidelinesmargin">Through cookies</h3>

                    <IonItem className="item-text-wrap">

                        <ul>
                            <li>If you use a location-enabled browser, we may receive information about your location.</li>
                            <li>If you download and install certain applications and software we make available, we may receive and collect information transmitted from your computing device for the purpose of providing you the relevant Services, such as information regarding when you are logged on and available to receive updates or alert notices.</li>
                        </ul>

                    </IonItem>

                    <h3 className="carpoolingguidelinesmargin">Third Parties</h3>

                    <IonItem className="item-text-wrap">

                        <ul>
                            <li>Vendors</li>
                            <li>We may use analytics providers to analyze how you interact and engage with the Services, or third parties may help us provide you with customer support.</li>
                        </ul>

                    </IonItem>

                    <h2 className="carpoolingguidelinesmargin">Combination of Information</h2>

                    <IonItem className="item-text-wrap">

                        <ul><li>We may combine the information we receive from you and about you, including information you provide to us and information we automatically collect through the Services, as well as information collected across other computers or devices that you may use, from other online or offline sources, from Affiliated Partners and their service providers, and from third party sources. This combined information may be used as detailed in this Privacy Policy.</li>
                        </ul>

                    </IonItem>
                    <h2 className="carpoolingguidelinesmargin">Our Commercial or Business Purposes for Collecting or Disclosing Personal Data</h2>
                    <h3 className="carpoolingguidelinesmargin">We use the information we collect from users for a variety of reasons, including, but not limited to, the following:</h3>

                    <IonItem className="item-text-wrap">

                        <ul><li>Provide the Services (such as to connect Riders with Drivers and to communicate with one another)</li>
                            <li>Provide you with user support.</li>
                            <li>Analyze how the Wagon carpool community uses the Services for research and development and building the community.</li>
                            <li>Communicate with you via email, push notification, direct mail or SMS/text, either directly or through one of our partners, including for informational, marketing, and promotional purposes*</li>
                            <li>Personalize the Wagon carpool experience for you, your friends, and your contacts.</li>
                            <li>Facilitate services and programs with Affiliated Partners (defined below).</li>
                            <li>Calculate prices and facilitate payments.</li>
                            <li>Maintain the security and safety of the Wagon carpool community and the Services (such as through authenticating users; verifying that Drivers meet eligibility requirements; encouraging safe driving behavior; finding and preventing fraud; and blocking and removing unsafe or fraudulent users from the Services).</li>
                            <li>And to meet legal requirements and enforce legal terms.</li>
                            <li>*If you do not wish to receive digital marketing or promotional communications from us, you can unsubscribe from emails via the link on our last communication to you, and unsubscribe from SMS/text by replying “STOP” to the last SMS text message you received.</li>
                        </ul>
                    </IonItem>

                    <h2 className="carpoolingguidelinesmargin">Sharing Between Users</h2>

                    <IonItem className="item-text-wrap">

                        <ul><li>We want to provide you with a great commuting experience and introduce you to our community. To facilitate this experience, certain information is available to Wagon carpool and other users on your profile, such as your name, photo and statistics about your usage. Additionally, after being matched with other Wagon carpool users, we share more of your information with them, such as your location, pick-up and drop off addresses, your contact information and other preferences in your profile to facilitate a meaningful and easy commute.</li>
                        </ul>
                    </IonItem>

                    <h2 className="carpoolingguidelinesmargin">Sharing Between Wagon carpool and Third Parties</h2>
                    <h3 className="carpoolingguidelinesmargin">Service Providers</h3>

                    <IonItem className="item-text-wrap">

                        <ul><li>We employ and partner with other companies and people to perform tasks on our behalf and need to share your information with them to provide the Services to you; for example, we use a payment processing company to receive and process your credit card transactions for us, and a third party company to verify motor vehicle history requirements. Unless we tell you differently (or unless stated otherwise in a third party privacy policy), our agents do not have any right to use the personally identifiable information we share with them beyond what is necessary to assist us. By using our Services, you agree to be bound by the applicable privacy policies for the third party services. For example, for some of our Services, we use Google’s Maps API(s) and share your information in doing so; by using the Services, you agree to Google’s Privacy Policy as amended by Google from time to time, the current version of which is incorporated herein by reference and available here.</li>
                        </ul>
                    </IonItem>

                    <h2 className="carpoolingguidelinesmargin">Third Party Services</h2>

                    <IonItem className="item-text-wrap">

                        <ul><li>The Services may allow you to connect with other websites, products, or services to enhance your experience, such as allowing you to connect to alternative transportation solutions. If you use these services, we will provide the third party with information about you to allow them to provide the service to you. We can’t speak to the privacy practices of these third parties, and we encourage you to read their privacy policies before deciding whether to use their services.</li>
                        </ul>
                    </IonItem>

                    <h2 className="carpoolingguidelinesmargin">Other Sharing</h2>
                    <h3 className="carpoolingguidelinesmargin">We may share your information with third parties in the following cases:</h3>

                    <IonItem className="item-text-wrap">
                        <ul><li>While negotiating or in relation to a change of corporate control such as a restructuring, merger or sale of our assets; for example if Wagoncarpool (or its assets) are acquired or if Wagon Carpool goes out of business, enters bankruptcy, or undergoes some other change of control, your information may be one of the assets transferred or acquired by a third party</li>
                            <li>If a government authority requests information and we think disclosure is required or appropriate in order to comply with laws, regulations, or a legal process.</li>
                            <li>With law enforcement officials, government authorities, or third parties if we think doing so is necessary to protect the rights, property, or safety of the Wagon carpool community, or the public.</li>
                            <li>To provide information about the use of Wagon carpool to potential business partners in aggregated or de-identified form that can’t reasonably be used to identify you and whenever you consent to the sharing.</li>
                        </ul>
                    </IonItem>

                    <h2 className="carpoolingguidelinesmargin">What choices do I have about my information?</h2>

                    <IonItem className="item-text-wrap">
                        <ul><li>Our Services require certain information to be shared with other users and third parties in order to facilitate the Services. There is information which we receive that isn’t required, and you can opt not to disclose that information to us, but keep in mind this information may be needed to take advantage of some of our features. In certain cases, you may also be able to add, update, or remove information on your public profile. Wagon Carpool retains user profile, transaction, and other personal data for as long as necessary to provide the Services to you and our other users, and as long as you maintain your Wagon carpool account. You may request deactivation or deletion of your account by emailing support@wagoncarpool.com. If you request account deletion, we may be unable to delete it if there is an issue with your account related to trust, safety, or fraud. When we delete your account, we may retain certain information for legitimate business purposes or to comply with legal or regulatory obligations. For example, if Wagon Carpool deactivates a user’s account because of unsafe behavior or security incidents, Wagon Carpool may retain certain information about that account to prevent that user from opening a new Wagon Carpool account in the future. Upon resolution of any issue preventing deletion, Wagon Carpool will delete the account as described above.</li>
                        </ul>
                    </IonItem>

                    <h2 className="carpoolingguidelinesmargin">Your California privacy rights:</h2>

                    <IonItem className="item-text-wrap">
                        <ul><li>California law permits residents of California to request certain details about how their personal information is shared with third parties or affiliated companies. If you are a California resident and would like to make such a request, please contact us through your account in the Wagon carpool app or by emailing us at: support@wagonc arpool.com. You must put the statement “Your California Privacy Rights” in the subject field. We are not responsible for notices that are not properly labeled or sent, or do not have complete information.</li>
                        </ul>
                    </IonItem>

                    <h2 className="carpoolingguidelinesmargin">California residents may also take advantage of the following rights:</h2>

                    <IonItem className="item-text-wrap">
                        <ul><li>Right to Know: You may request, up to two times each year, that we disclose to you the categories and specific pieces of personal information that we have collected about you in the last 12 months, the categories of sources from which your personal information is collected, the business or commercial purpose for collecting this personal information, the categories of personal information that we disclosed for a business purpose, the categories of third parties with whom we have shared your personal information, and the business or commercial purpose for sharing your personal information.</li>
                            <li>Right to Delete: You may request that we delete personal information that we have collected from or about you. Note that there are some reasons we will not be able to fully address your request, such as for unresolved transactions or disputes, safety, security, fraud prevention, to comply with legal obligations, or to make other internal and lawful uses of the information that are compatible with the context in which you provided it.</li>
                        </ul>
                    </IonItem>


                    <h2 className="carpoolingguidelinesmargin">For purposes of compliance with the California Consumer Privacy Act, in addition to the further details as described throughout this Privacy Policy, we make the following disclosures:</h2>

                    <IonItem className="item-text-wrap">
                        <ul><li>We collect the following categories of personal information: contact information (such as name and address), personal identification numbers (such as credit card and driver’s license numbers), personal characteristics (such as profile pictures and gender), transactional information (such as usage of the Services), employment information, Internet or other electronic network activity information, geolocation, sensory data and inferences drawn from the above.</li>
                            <li>We may disclose the following categories of personal information for a business purpose: contact information (such as name and address), personal characteristics (such as profile pictures and gender), transactional information (such as usage of the Services), employment information, Internet or other electronic network activity information, geolocation, sensory data and inferences drawn from the above.</li>
                            <li>
                            Under California Civil Code Sections 1798.83-1798.84, California residents are entitled to ask us for a notice identifying the categories of personally identifiable information which we share with our affiliates and/or third parties for marketing purposes, and providing contact information for such affiliates and/or third parties.
If you are a California resident and would like to take advantage of any of these rights, and given that we are a purely online business, please contact us at support@wagoncarpool.com. We will require confirmation of your identity via email address verification. We value your privacy and will not discriminate in response to your exercise of your privacy rights. We will respond to your request within 45 days of receipt of your request, after proper verification, unless we need additional time, in which case we will let you know.
                            </li>
                        </ul>
                    </IonItem>

                    <h2 className="carpoolingguidelinesmargin">Anything else?</h2>

                    <IonItem className="item-text-wrap">
                        <ul><li>We endeavor to protect the privacy of your account and personally identifiable information we hold in our records, but unfortunately we cannot guarantee complete security. Unauthorized entry or use, hardware or software failure, and other factors, may compromise the security of user information at any time.
As noted in the Terms of Use, we do not knowingly collect or solicit personal information from anyone under the age of 13. If you are under 13, please do not attempt to register for the Services or send any personal information about yourself to us.
                            </li>
                        </ul>
                    </IonItem>

                    <h2 className="carpoolingguidelinesmargin">European Union and United Kingdom Data Subject Rights</h2>
                    <h3 className="carpoolingguidelinesmargin">EU and UK Residents</h3>

                    <IonItem className="item-text-wrap">
                        <ul><li>If you are a resident of the European Union (“EU”), United Kingdom (“UK”), Lichtenstein, Norway, or Iceland, you may have additional rights under the EU or UK General Data Protection Regulation (the “GDPR”) with respect to your Personal Data, as outlined below.  
For this section, we use the terms “Personal Data” and “processing” as they are defined in the GDPR, but “Personal Data” generally means information that can be used to individually identify a person, and “processing” generally covers actions that can be performed in connection with data such as collection, use, storage, and disclosure. Wagon carpool will be the controller of your Personal Data processed in connection with the Services.
If there are any conflicts between this section and any other provision of this Privacy Policy, the policy or portion that is more protective of Personal Data shall control to the extent of such conflict. If you have any questions about this section or whether any of the following applies to you, please contact us at support@wagoncarpool.com. Note that we may also process Personal Data of our customers’ end users or employees in connection with our provision of certain services to customers, in which case we are the processor of Personal Data. If we are the processor of your Personal Data (i.e., not the controller), please contact the controller party in the first instance to address your rights with respect to such data.
                            </li>
                        </ul>
                    </IonItem>

                    <h2 className="carpoolingguidelinesmargin">Personal Data We Collect</h2>

                    <IonItem className="item-text-wrap">
                        <ul><li>The “Categories of Personal Data We Collect” section above details the Personal Data that we collect from you.
                            </li>
                        </ul>
                    </IonItem>

                    <h2 className="carpoolingguidelinesmargin">Personal Data Use and Processing Grounds</h2>

                    <IonItem className="item-text-wrap">
                        <ul><li>The “Our Commercial or Business Purposes for Collecting Personal Data” section above explains how we use your Personal Data.
We will only process your Personal Data if we have a lawful basis for doing so. Lawful bases for processing include consent, contractual necessity and our “legitimate interests” or the legitimate interest of others, as further described below.
Contractual Necessity:  We process the following categories of Personal Data as a matter of “contractual necessity”, meaning that we need to process the data to perform under our Terms of Use with you, which enables us to provide you with the Services. When we process data due to contractual necessity, failure to provide such Personal Data will result in your inability to use some or all portions of the Services that require such data. 
                            </li>

                            <li>Profile or Contact Data (First and last name, email address, phone number) </li>
                            <li>Identifiers (Driver’s license number)  </li>
                            <li>Legitimate Interest: We process the following categories of Personal Data when we believe it furthers the legitimate interest of us or third parties:</li>
                            <li>Web Analytics (Web page interactions) ‍</li>
                            <li>Other Identifying Information that You Voluntarily Choose to Provide (identifying information contained in emails or letters you share with Wagon Carpool, or in connected calendar events)</li>
                            <li>We may also de-identify or anonymize Personal Data to further our legitimate interests. </li>

                        </ul>
                    </IonItem>


                    <h2 className="carpoolingguidelinesmargin">Examples of these legitimate interests include (as described in more detail above):</h2>

<IonItem className="item-text-wrap">
    <ul><li>Providing, customizing, and improving the Services.</li>
<li>Marketing the Services.</li>
<li>Corresponding with you.</li>
<li>Meeting legal requirements and enforcing legal terms.</li>
<li>Completing corporate transactions. </li>
<li>Consent:  In some cases, we process Personal Data based on the consent you expressly grant to us at the time we collect such data. When we process Personal Data based on your consent, it will be expressly indicated to you at the point and time of collection. </li>
<li>Other Processing Grounds:  From time to time we may also need to process Personal Data to comply with a legal obligation, if it is necessary to protect the vital interests of you or other data subjects, or if it is necessary for a task carried out in the public interest.
</li>

    </ul>
</IonItem>

<h2 className="carpoolingguidelinesmargin">Transfers of Personal Data</h2>
<IonItem className="item-text-wrap">
    <ul><li>The Services are hosted and operated in the United States (“U.S.”) through Wagon carpool and its service providers, and if you do not reside in the U.S., laws in the U.S. may differ from the laws where you reside. By using the Services, you acknowledge that any Personal Data about you, regardless of whether provided by you or obtained from a third party, is being provided to Wagon carpool in the U.S. and will be hosted on U.S. servers, and you authorize Wagon carpool to transfer, store, and process your information to and in the U.S., and possibly other countries. In some circumstances, your Personal Data may be transferred to the U.S. pursuant to a data processing agreement incorporating standard data protection clauses. 
</li></ul>
</IonItem>

<h2 className="carpoolingguidelinesmargin">Contact Information:</h2>
<IonItem className="item-text-wrap">
    <ul><li>If you have any questions or comments about this Privacy Policy, the ways in which we collect and use your Personal Data, or your choices and rights regarding such collection and use, please do not hesitate to contact us at: support@wagoncarpool.com.
</li></ul>
</IonItem>


                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default PrivacyPolicy;
