/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  DeviceEventEmitter,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  LoginKit,
  LoginState,
  UserDataScopes,
} from '@snapchat/snap-kit-react-native';
import {Settings} from 'react-native-fbsdk-next';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {googleConfigure} from './src/helpers/configFile';
import {useDeepLinking} from './src/helpers/hooks';
import { handleSnapchatLogin } from './src/helpers/helper';
import LinkedInLogin from './src/Components/LinkedinLogin';
import TwitterLogin from './src/Components/TwitterLogin';
// import GitHubLoginButton from './src/Components/GithubLogin';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    googleConfigure();
    // Settings.setAppID('APP_ID'); <--- Replace your app id here
    Settings.initializeSDK();
  }, []);

 

  



  useEffect(() => {
    const loginStarted = DeviceEventEmitter.addListener(
      LoginState.LOGIN_KIT_LOGIN_STARTED,
      () => console.log('Snapchat login started'),
    );

    const loginSuccess = DeviceEventEmitter.addListener(
      LoginState.LOGIN_KIT_LOGIN_SUCCEEDED,
      () => console.log('Snapchat login succeeded'),
    );

    const loginFailed = DeviceEventEmitter.addListener(
      LoginState.LOGIN_KIT_LOGIN_FAILED,
      () => console.log('Snapchat login failed'),
    );

    return () => {
      loginStarted.remove();
      loginSuccess.remove();
      loginFailed.remove();
    };
  }, []);

  // useDeepLinking();

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={{flex: 1, marginTop: 100}}>
        {/* <GoogleSigninButton onPress={handleGoogleSiginIn} size={400} color="dark" /> */}
        {/* <Text onPress={handleSnapchatLogin}>sigin up</Text> */}
        {/* <LinkedInLogin/> */}
        {/* <TwitterLogin/> */}
        {/* <GitHubLoginButton/> */}
      </View>
    </>
  );
}

export default App;
