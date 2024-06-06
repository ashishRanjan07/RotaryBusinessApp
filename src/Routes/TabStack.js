import React, {useState} from 'react';
import {Image, TouchableOpacity, View, StyleSheet, Platform} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import District from '../Screens/App/District';
import MyClub from '../Screens/App/MyClub';
import Profile from '../Screens/App/Profile/Profile';
import Colors from '../Theme/Colors';
import images from '../Theme/Images';
import Listing from '../Screens/App/Listing';
import Feather from 'react-native-vector-icons/Feather';
import {responsiveFontSize, responsivePadding} from '../Compenents/Responsive';
import CustomModal from './CustomModal';

export default function TabStack({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{flex: 1}}>
      <Tab.Navigator
        initialRouteName="MyClub"
        screenOptions={({route}) => ({
          headerTitleAlign: 'center',
          tabBarActiveTintColor: Colors.white,
          headerTitleStyle: {
            fontWeight: '700',
          },
          // tabBarBackground:Colors.blue,
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('Notification')}>
                <View>
                  <Image
                    source={images.notification}
                    resizeMode="contain"
                    style={style.imageStyle}
                  />
                </View>
              </TouchableOpacity>
            );
          },
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Feather
                  name="menu"
                  size={responsiveFontSize(25)}
                  color={Colors.black}
                  style={style.icon}
                />
              </TouchableOpacity>
            );
          },
          tabBarIcon: ({focused}) => {
            let iconName;

            if (route.name === 'District') {
              iconName = focused ? images.tab1high : images.tab1;
            } else if (route.name === 'Listing') {
              iconName = focused ? images.tab2high : images.tab2;
            } else if (route.name === 'MyClub') {
              iconName = focused ? images.tab3high : images.tab3;
            } else {
              iconName = focused ? images.tab4high : images.tab4;
            }

            return <Image source={iconName} style={style.tabIcon} />;
          },
          tabBarStyle: {
            backgroundColor: Colors.blue,
            // borderTopLeftRadius:responsivePadding(10),
            // borderTopRightRadius:responsivePadding(10),
            alignItems:'center',
            paddingTop:responsivePadding(10),
            height:Platform.OS==='android' ? responsivePadding(70) :responsivePadding(100)
          },
          tabBarLabelStyle:{
            marginTop:-responsivePadding(5),
            marginBottom:Platform.OS ==='android'? responsivePadding(10):0
          }
        })}>
        <Tab.Screen
          name="District"
          component={District}
          options={{
            title: 'District List',
          }}
        />
        <Tab.Screen
          name="Listing"
          component={Listing}
          options={{
            title: 'Business',
          }}
        />
        <Tab.Screen
          name="MyClub"
          component={MyClub}
          options={{
            title: 'My Club',
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
          }}
        />
      </Tab.Navigator>
      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const style = StyleSheet.create({
  imageStyle: {
    height: responsivePadding(25),
    width: responsivePadding(25),
    marginRight: responsivePadding(15),
  },
  icon: {
    height: responsivePadding(25),
    width: responsivePadding(20),
    marginLeft: responsivePadding(15),
  },
  tabIcon: {
    height: responsivePadding(25),
    width: responsivePadding(25),
  },
});
