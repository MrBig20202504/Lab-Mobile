/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';



function App(): React.JSX.Element {
  const [userToken,setUserToken] = useState('');
  GoogleSignin.configure({
    webClientId: '758775804161-4jmui97mki3gubon3gjjorn740g2c1hr.apps.googleusercontent.com',
  });
  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    } catch {
      Alert.alert("Error login google");
    }
    // Get the users ID token
  
    const { idToken } = await GoogleSignin.signIn();
    
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    console.log((await auth().signInWithCredential(googleCredential)).user);
    setUserToken((await GoogleSignin.getTokens()).accessToken);
    return auth().signInWithCredential(googleCredential);
  }
  async function fetchData()
  {
   
   console.log(userToken);
     await fetch('https://aao.eiu.edu.vn/api/auth/login', {
        method: 'post',
        body: new URLSearchParams({ username: 'user@gw', password: userToken, grant_type: 'password' }).toString(),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
        .then((response) => console.log(response))
        .catch((err) => console.log("Error"));
   
  }
  const handleSignOut = async () => {
    try {
      // Sign out the user
      await auth().signOut();
      // Set the user state to null
//      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView>
      <Button title='Login' onPress={onGoogleButtonPress}></Button>
      <Button title='SignOut' onPress={handleSignOut}></Button>
      <Button title='Load data' onPress={fetchData}></Button>
    </SafeAreaView>
  );
}


export default App;
