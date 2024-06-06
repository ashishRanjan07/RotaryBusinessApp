import {StatusBar} from 'react-native';
import React from 'react';

import Colors from '../Theme/Colors';
import TabStack from './TabStack';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Notification from '../Screens/App/Notification';
import FilterScreen from '../Compenents/FilterScreen';
import OpenBussiness from '../Screens/App/OpenBussiness';
import ClubList from '../Screens/App/ClubList';
import ClubMemberList from '../Screens/App/ClubMemberList';
import ClubMemberProfile from '../Screens/App/Profile/ClubMemberProfile';
import EditProfile from '../Screens/App/Profile/EditProfile';
import MemberListProfile from '../Screens/App/MemberListProfile';
import ViewProducts from '../Screens/App/Profile/ViewProducts';
import OtpScreen from '../Screens/Auth/forgetPasswordScreens/OtpScreen';
import AddBusiness from '../Screens/App/Profile/AddBusiness';
import ViewBusiness from '../Compenents/Profile/ViewBusiness';
import AddProducts from '../Screens/App/Profile/AddProducts';
import AddProductScreen from '../Screens/App/Product/AddProductScreen';
import EditProfileScreen from '../Compenents/Profile/EditProfileScreen';
import ViewOwner from '../Compenents/Business/ViewOwner';
import ViewAllProducts from '../Compenents/Products/ViewAllProducts';
import EditProducts from '../Screens/App/Product/EditProducts';
import EditBusiness from '../Screens/App/Business/EditBusiness';

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: {
              borderBottomColor: Colors.border_grey,
              borderBottomWidth: 1,
            },
          }}>
          <Stack.Screen
            name="TabStack"
            component={TabStack}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Notification"
            component={Notification}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Club List"
            component={ClubList}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Club Member List"
            component={ClubMemberList}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Club Member Profile"
            component={ClubMemberProfile}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Member Profile"
            component={MemberListProfile}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Bussiness Details"
            component={OpenBussiness}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="FilterScreen"
            component={FilterScreen}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen name="Edit Profile" component={EditProfile} />
          <Stack.Screen
            name="Product"
            component={ViewProducts}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Add Business"
            component={AddBusiness}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="View Business"
            component={ViewBusiness}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Add Products"
            component={AddProductScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Edit Profile Screen"
            component={EditProfileScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="View Owner"
            component={ViewOwner}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="View All Products"
            component={ViewAllProducts}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="Edit Product"
            component={EditProducts}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="Edit Business"
            component={EditBusiness}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
