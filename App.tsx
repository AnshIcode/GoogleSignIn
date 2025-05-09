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

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    googleConfigure();
    Settings.setAppID('1427982301978416');
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
        <Text onPress={handleSnapchatLogin}>sigin up</Text>
      </View>
    </>
  );
}

export default App;
