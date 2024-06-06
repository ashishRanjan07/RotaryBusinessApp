import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    // console.log('Authorization status:', authStatus);
    getFcmToken()
  }
}

const getFcmToken = async() => {
    let checkToken  = await AsyncStorage.getItem('fcmToken');
    console.log("the old token", checkToken);
    if(!checkToken){
        try{
            const fcmToken = await messaging().getToken()
            if(!!fcmToken){
                console.log("Fcm token generated",fcmToken);
                await AsyncStorage.setItem('fcmToken',fcmToken)
            }
            console.log('Fcm token generate Data',fcmToken)
    
        }catch (error) {
            console.log('Error in fcm Token',error);
            Alert.alert(error?.message)
        }
    }
   
}