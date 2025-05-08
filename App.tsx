/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {StatusBar, StyleSheet, Text, useColorScheme, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import { googleConfigure } from './src/helpers/configFile';
import { deleteSubCollectionFromFirestore } from './src/helpers/helper';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    googleConfigure();
  }, []);

  const aaa = async () => {
    // const res = await deleteFirebaseCollectionDoc({
    //     collectionName: 'users',
    //     docId: 'random',
    //   });
    //   console.log('res', res)

    // const ggg = await createSubCollectionInFirestore({
    //   docId: 'random',
    //   mainCollectionName: 'users',
    //   subCollectionName: 'subUser',
    //   data: {
    //     aja: 'ppl',
    //   },
    //   subDocId: 'randomSubId',
    // });

    // const ggg = await updateSubCollectionInFirestore({
    //   data:{
    //     aja:"ssss",
    //     okkk:"ssss"
    //   },
    //   docId: 'random',
    //   mainCollectionName: 'users',
    //   subCollectionName: 'subUser',
    //   subDocId: 'randomSubId',
    // })

    const ggg = await deleteSubCollectionFromFirestore({
      docId:'random',
      mainCollectionName:'users',
      subCollectionName:'subUser',
      subDocId:'randomSubId'
    })
    console.log('ggg', ggg);
  };
  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={{flex: 1, marginTop: 100}}>
        {/* <GoogleSigninButton onPress={handleGoogleSiginIn} size={400} color="dark" /> */}
        <Text onPress={aaa}>sigin up</Text>
      </View>
    </>
  );
}

export default App;
