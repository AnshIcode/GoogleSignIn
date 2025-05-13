// GitHubLogin.tsx
import auth from '@react-native-firebase/auth';
import React from 'react';
import {Alert, Button} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';

const CLIENT_ID = 'aaa';
const CLIENT_SECRET = 'bb'; // ⚠️ For development only

export default function GitHubLogin() {
  const handleLogin = async () => {
    // Construct the GitHub OAuth URL
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=read:user%20user:email`;

    try {
      // Open GitHub OAuth page in the system browser
      const result = await InAppBrowser.openAuth(authUrl, '', {
        showTitle: true,
        enableUrlBarHiding: true,
        enableDefaultShare: false,
      });

      // Get the URL after the authentication, which will contain the code
      const {url} = result;
      console.log('URL after auth:', url);

      // Extract the 'code' from the URL if it exists
      const match = url.match(/code=([^&]+)/);
      if (match) {
        const code = match[1];
        console.log('GitHub OAuth code:', code);
        fetchGitHubAccessToken(code); // Exchange the code for a token
      } else {
        Alert.alert('Error', 'No code in the response URL');
      }
    } catch (err: any) {
      console.error('Error opening InAppBrowser:', err);
      Alert.alert('Error', 'Could not open GitHub OAuth');
    }
  };

  const fetchGitHubAccessToken = async (code: string) => {
    try {
      const response = await fetch(
        'https://github.com/login/oauth/access_token',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code,
          }),
        },
      );

      const data = await response.json();
      console.log('GitHub OAuth Access Token:', data);

      if (data.access_token) {
        const gitCred = auth.GithubAuthProvider.credential(data.access_token);
        const response = await auth().signInWithCredential(gitCred);
        console.log('response', response);
        fetchGitHubUser(data.access_token); // Fetch user info
      } else {
        Alert.alert('Error', 'No access token received');
      }
    } catch (err: any) {
      console.error('Error fetching GitHub access token:', err);
      Alert.alert('Error', 'Failed to fetch access token');
    }
  };

  const fetchGitHubUser = async (accessToken: string) => {
    try {
      const userRes = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const user = await userRes.json();
      console.log('GitHub User:', user);
      Alert.alert('Welcome', `Logged in as ${user.login}`);
    } catch (err: any) {
      console.error('Error fetching GitHub user data:', err);
      Alert.alert('Error', 'Failed to fetch user data');
    }
  };

  return <Button title="Login with GitHub" onPress={handleLogin} />;
}
