import React, { useEffect, useState } from 'react'
import messaging from '@react-native-firebase/messaging';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Routes from './src/Routes/Routes';
import { requestUserPermission } from './src/helper/notificationServices';

const App = () => {
  const [token,setToken]= useState('');

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  const getToken  = async () => {
    const token = await messaging().getToken();
    setToken(token);
    console.log(token, "Line 18")
  }
  useEffect(() => {
    requestUserPermission();
    getToken()
  },)
  // useEffect(() => {
  //   requestUserPermission()
  // },[])
  return (
    <SafeAreaProvider>
      <Routes fcmToken={token} />
    </SafeAreaProvider>
  )
}

export default App