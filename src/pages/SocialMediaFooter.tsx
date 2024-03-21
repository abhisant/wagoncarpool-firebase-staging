import React, { useState, useEffect } from 'react';
import { IonCard, IonCardContent, IonIcon, IonLabel } from '@ionic/react';
import { logoFacebook, logoInstagram, logoLinkedin, logoTiktok, logoTwitter, logoYoutube } from 'ionicons/icons';

const SocialMediaFooter = () => {
    function redirectFb() {
        window.open("https://www.facebook.com/wagoncarpool");
    }
    function redirectLinkedIn() {
        window.open( "https://www.linkedin.com/company/wagon-carpool/");
        
    }
    function redirectYouTube() {
        window.open( "https://www.youtube.com/@WagonCarpool");
    }
    function redirectInstagram() {
        window.open("https://www.instagram.com/wagon_carpool/");
        
    }
    return (
        <>
            <IonCard >
                <IonCardContent className="socialMediaIconContent">
                    <IonIcon onClick={redirectFb} className="socialMediaIcons" icon={logoFacebook}></IonIcon>
                    <IonIcon onClick={redirectInstagram} className="socialMediaIcons"  icon={logoInstagram}></IonIcon>
                    <IonIcon onClick={redirectLinkedIn} className="socialMediaIcons"  icon={logoLinkedin}></IonIcon>
                    <IonIcon onClick={redirectYouTube} className="socialMediaIcons"  icon={logoYoutube}></IonIcon>
                </IonCardContent>
            </IonCard>
            

        </>
    );
};

export default SocialMediaFooter;

