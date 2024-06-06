import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MyClub from '../Screens/App/MyClub';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import TabStack from './TabStack';
import images from '../Theme/Images';
import {responsiveFontSize, responsivePadding} from '../Compenents/Responsive';
import Colors from '../Theme/Colors';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Drawer = createDrawerNavigator();

const DrawerContent = () => {
  const navigation = useNavigation();
  // console.log(navigation, 'Line 23');

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            // Perform logout action here
            navigation.navigate('Login'); // Navigate to Login screen after logout
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={styles.container}>
      {/* User Profile Section */}
      <View style={styles.profileSection}>
        <Image source={images.app_logo_white} style={styles.profileImage} />
        <Text style={styles.username}>Ashish Ranjan</Text>
        <Text style={styles.clubName}>Club Name</Text>
      </View>

      {/* Navigation Section */}
      <View style={styles.navigationSection}>
        <TouchableOpacity
          style={styles.ItemHolderContainer}
          onPress={() => navigation.navigate('Profile')}>
          <View style={styles.ItemHolder}>
            <Feather
              name="user"
              size={responsiveFontSize(30)}
              color={Colors.yellow}
            />
            <Text style={styles.text}>View my profile</Text>
          </View>
          <Feather
            name="chevron-right"
            size={responsiveFontSize(25)}
            color={Colors.black}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.ItemHolderContainer}>
          <View style={styles.ItemHolder}>
            <Ionicons
              name="bag-outline"
              size={responsiveFontSize(30)}
              color={Colors.yellow}
            />
            <Text style={styles.text}>View my business</Text>
          </View>
          <Feather
            name="chevron-right"
            size={responsiveFontSize(25)}
            color={Colors.black}
          />
        </TouchableOpacity>
      </View>

      {/* Logout Section */}
      <View style={{borderWidth: 1, borderColor: Colors.text_grey}} />
      <View style={styles.logoutSection} onPress={handleLogout}>
        <TouchableOpacity
          style={[styles.ItemHolder, {padding: 20}]}
          onPress={handleLogout}>
          <Feather
            name="power"
            size={responsiveFontSize(30)}
            color={Colors.red}
          />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const DrawerNavigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={DrawerContent}
        initialRouteName="My Club">
        <Drawer.Screen
          name="My Club"
          component={TabStack}
          options={{headerShown: false}}
        />
        {/* Add more screens as needed */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: responsivePadding(40),
    backgroundColor: Colors.blue,
  },
  profileSection: {
    marginTop: 30,
    flexDirection: 'column',
    width: '100%',
    height: responsivePadding(200),
    marginHorizontal: responsivePadding(20),
    gap: 10,
  },
  profileImage: {
    width: responsivePadding(100),
    height: responsivePadding(100),
    borderRadius: 25,
  },
  username: {
    fontSize: responsiveFontSize(18),
    fontWeight: '500',
    color: Colors.white,
    marginVertical: 5,
  },
  clubName: {
    fontSize: responsiveFontSize(16),
    color: Colors.white,
    fontWeight: '400',
  },
  navigationSection: {
    backgroundColor: Colors.white,
    gap: 10,
    paddingBottom: 10,
  },
  drawerItem: {
    fontSize: 16,
    marginBottom: 10,
  },
  logout: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
  ItemHolderContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ItemHolder: {
    flexDirection: 'row',
    padding: 10,
    gap: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: responsiveFontSize(18),
    color: Colors.black,
    fontWeight: '500',
  },
  logoutSection: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  logoutText: {
    color: Colors.red,
    fontSize: responsiveFontSize(18),
    fontWeight: '500',
  },
});
