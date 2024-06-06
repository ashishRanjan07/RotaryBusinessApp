import {View, StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../../Constant/Context';
import Colors from '../../../Theme/Colors';
import {GET_USER_DETAILS} from '../../../API_Services/API_service';
import {
  getAllCityList,
  getAllStateList,
  memberFullDetail,
} from '../../../API_Services/auth_API';
import {responsivePadding} from '../../../Compenents/Responsive';
import ProfileImageComponent from './ProfileImageComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import ProfileHeader from '../../../Compenents/Profile/ProfileHeader';
import LowerView from '../../../Compenents/Profile/LowerView';

const Profile = () => {
  const navigation = useNavigation();
  const [memberData, setMemberData] = useState(null);
  const [businessData, setBusinessData] = useState([]);
  const [clubData, setClubData] = useState([]);
  const [uuid, setUuid] = useState();
  const [id, setId] = useState();
  const [userId, setUserId] = useState();
  const [city, setCity] = useState();
  const {signOut} = useContext(AuthContext);

  useEffect(() => {
    getData();
    getAllStateListData();
    getAllCityListData();
  }, []);

  const getAllStateListData = async () => {
    const response = await getAllStateList();
    // console.log(response,"Line 51");
  };
  const getAllCityListData = async () => {
    const uuid = JSON.parse(await AsyncStorage.getItem('memberId'));
    setUserId(uuid);
    const response = await getAllCityList();
    setCity(response);
  };

  const getData = async () => {
    const userData = await GET_USER_DETAILS();
    // console.log(userData,"Line 319")
    const id = userData?.uuid;
    const response = await memberFullDetail(id);
    if (response?.success) {
      setId(response?.member?.business[0]?.id);
      // console.log(response?.member, "Line 35**********--------------");
      setUuid(response?.member?.member?.uuid);
      setMemberData(response?.member?.member);
      setClubData(response?.member?.member.club);
      setBusinessData(response?.member);
      // console.log(response?.member, 'Line 79');
    } else {
      signOut();
      // Alert.alert('Member Full Details API Error', response?.errorMessage);
    }
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <SafeAreaView style={styles.safeAreaView} />
        <StatusBar barStyle={'dark-content'} backgroundColor={Colors.blue} />
        <ProfileHeader memberData={memberData} getData={getData} />
        <ProfileImageComponent uuid={uuid} memberData={memberData} />
        <LowerView memberData={memberData} getData={getData} />
      </View>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: Colors.blue,
  },
  main: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.blue,
  },
  container: {
    backgroundColor: Colors.white,
  },
  separatorLine: {
    backgroundColor: Colors.border_grey,
    height: responsivePadding(0.7),
  },
});
