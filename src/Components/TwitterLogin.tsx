import React from 'react';
import {Button, Alert} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {v4 as uuidv4} from 'uuid';
import queryString from 'query-string';

const TWITTER_CLIENT_ID = 'enJtb3R5Mnc0RHJIRmt1MDZGZHI6MTpjaQ';
const TWITTER_REDIRECT_URI = 'socialauth://oauth';
const TWITTER_SCOPE = 'tweet.read users.read offline.access';
const TWITTER_CLIENT_SECRET =
  'OLPw5eEhZ64dqmwvKE8wHWUC45RkvJzkrY4admmC7AGshbhcmN';

const TwitterLogin: React.FC = () => {
  const loginWithTwitter = async (): Promise<void> => {
    const state = uuidv4();
    const codeVerifier = uuidv4();
    const codeChallenge = codeVerifier;

    const authUrl = `https://twitter.com/i/oauth2/authorize?${queryString.stringify(
      {
        response_type: 'code',
        client_id: TWITTER_CLIENT_ID,
        redirect_uri: TWITTER_REDIRECT_URI,
        scope: TWITTER_SCOPE,
        state,
        code_challenge: codeChallenge,
        code_challenge_method: 'plain',
      },
    )}`;

    try {
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.openAuth(
          authUrl,
          TWITTER_REDIRECT_URI,
          {},
        );
        console.log('result', result);

        if (result.type === 'success' && result.url) {
          const {code} = queryString.parseUrl(result.url).query as Record<
            string,
            string
          >;
          console.log('code', code);

          try {
            const tokenResponse = await exchangeCodeForToken(
              code,
              codeVerifier,
            );
            console.log('tokenResponse', tokenResponse);
            await fetchTwitterUser(tokenResponse.access_token);
          } catch (err) {
            console.log('err>>>>>>>>>>>', err);
          }
        }
      } else {
        Alert.alert('Error', 'InAppBrowser is not available');
      }
    } catch (error) {
      console.log('error>>>>>>>>>', error);
    }
  };

  const exchangeCodeForToken = async (
    code: string,
    codeVerifier: string,
  ): Promise<any> => {
    const basicAuth = btoa(`${TWITTER_CLIENT_ID}:${TWITTER_CLIENT_SECRET}`);

    try {
      const response = await fetch('https://api.twitter.com/2/oauth2/token', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${basicAuth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: TWITTER_REDIRECT_URI,
          code_verifier: codeVerifier,
        }).toString(),
      });

      const data = await response.json();
      if (data.access_token) {
        return data;
      } else {
        throw new Error(`Token exchange failed: ${JSON.stringify(data)}`);
      }
    } catch (err) {
      console.error('Token exchange error:', err);
      throw err;
    }
  };

  const fetchTwitterUser = async (accessToken: string): Promise<any> => {
    try {
      const res = await fetch(
        'https://api.twitter.com/2/users/me?user.fields=profile_image_url,description,public_metrics,created_at,verified',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const data = await res.json();
      console.log('Full Twitter user data:', data);
      return data;
    } catch (error) {
      console.error('Failed to fetch Twitter user:', error);
      throw error;
    }
  };

  return <Button title="Login with Twitter" onPress={loginWithTwitter} />;
};

export default TwitterLogin;
