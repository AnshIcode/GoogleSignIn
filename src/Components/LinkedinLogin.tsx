import React, {useEffect, useRef} from 'react';
import {View, Button} from 'react-native';
import LinkedInModal from '@symhomendra21/react-native-linkedin';

const LinkedInLogin = () => {
  const linkedRef = useRef(null);

  const fetchUserData = async (access_token: string) => {
    console.log('access_token inside func', access_token);
    try {
      // Fetch LinkedIn user info from OpenID Connect endpoint
      const userinfoRes = await fetch('https://api.linkedin.com/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const userinfo = await userinfoRes.json();
      console.log('LinkedIn User Info:', userinfo);
    } catch (error) {
      console.error('Error fetching LinkedIn user info:', error);
    }
  };
  return (
    <View>
      <LinkedInModal
        ref={linkedRef}
        clientID="868n45vyzefmzg"
        clientSecret={'WPL_AP1.aC5eYzo1bjmRnuW5.zRdLPA=='}
        redirectUri="https://socialauth"
        onSuccess={({access_token}) => {
          console.log('Access Token:', access_token);
          // Use the access token to fetch user data
          if (access_token) {
            fetchUserData(access_token);
          }
        }}
        onError={error => {
          console.error('LinkedIn Login Error:', error);
        }}
        permissions={['openid', 'profile', 'email']}
      />
    </View>
  );
};

export default LinkedInLogin;
