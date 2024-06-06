import { StatusBar } from 'react-native'
import React from 'react'

import Login from '../Screens/Auth/Login';
import ForgotPassword from '../Screens/Auth/ForgotPassword';
import Colors from '../Theme/Colors';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OtpScreen from '../Screens/Auth/forgetPasswordScreens/OtpScreen';
import NewPasswordScreen from '../Screens/Auth/forgetPasswordScreens/NewPasswordScreen';
import Notification from '../Screens/App/Notification';
import ResetTemPassword from '../Screens/Auth/forgetPasswordScreens/ResetTemPassword';
const Stack = createStackNavigator();


export default function AuthStack() {
    return (
        <>
            <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                >
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                    <Stack.Screen name ="OTP" component={OtpScreen} options={{headerShown:false}}/>
                    <Stack.Screen name='NewPassword' component={NewPasswordScreen} options={{headerShown:false}}/>
                    <Stack.Screen name='TempPassword' component={ResetTemPassword} options={{headerShown:false}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}