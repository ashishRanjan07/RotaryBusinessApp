import {View, StatusBar, Image, StyleSheet, Dimensions} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AuthContext} from '../Constant/Context';
import Colors from '../Theme/Colors';
import images from '../Theme/Images';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { logout } from '../API_Services/auth_API';

export default function Routes({ fcmToken }) {
  const initialLoginState = {
    isLoading: true,
    details: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          details: action.details,  
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (token, details) => {
        const userToken = token;
        const userName = JSON.stringify(details);
        try {
          await AsyncStorage.setItem('userToken', userToken);
          await AsyncStorage.setItem('details', userName);
          dispatch({ type: 'LOGIN', id: userName, token: userToken });
        } catch (e) {
          console.log(e);
        }
      },
      signOut: async () => {
        try {
          const phone_number = await AsyncStorage.getItem('phone_number');
          const data = {
            phone_number: phone_number,
            firebase_token: fcmToken,
          };
          // console.log(data,"Line 70")
          await AsyncStorage.removeItem('userToken');
          await AsyncStorage.removeItem('details');
          const response = await logout(data);
          // console.log(response,"Line 72")
          if (response.success) {
            // console.log("Hii")
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('details');
          } else {
            console.log('Logout API Error:', response.errorMessage);
          }
        } catch (error) {
          console.log('Logout Error:', error);
        } finally {
          dispatch({ type: 'LOGOUT' });
        }
      },
      fcmToken,
    }),
    [fcmToken],
  );

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token !== null) {
          const details = JSON.parse(await AsyncStorage.getItem('details'));
          dispatch({ type: 'RETRIEVE_TOKEN', token: token, details: details });
        } else {
          dispatch({ type: 'LOGOUT' });
        }
      } catch (e) {
        console.log(e);
      }
    };

    setTimeout(retrieveData, 3000);
  }, []);

  if (loginState.isLoading) {
    return (
      <>
        <StatusBar backgroundColor={Colors.blue} barStyle="light-content" />
        <View style={styles.splashContainer}>
          <Image source={images.app_logo_white} style={styles.splashImage} />
        </View>
      </>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      {loginState.userToken !== null ? <AppStack /> : <AuthStack />}
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.blue,
  },
  splashImage: {
    height: Dimensions.get('screen').width * 0.49,
    width: Dimensions.get('screen').width * 0.5,
  },
});
