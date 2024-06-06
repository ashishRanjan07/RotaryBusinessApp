import {StyleSheet, Text, TouchableOpacity, View, Linking} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../../Theme/Colors';
import {responsiveFontSize, responsivePadding} from '../Responsive';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {memberFullDetail} from '../../API_Services/auth_API';

const BusinessLowerView = ({data, userData, id}) => {
  const navigation = useNavigation();
  const [memberDetails, setMemberDetails] = useState(null);
  // console.log(id,"Line 11")
  const handleCall = () => {
    const phoneNumber = data?.member?.phone_number;
    if (phoneNumber) {
      Linking.openURL(`tel:+91${phoneNumber}`);
    }
  };
  useEffect(() => {
    getMemberFullDetails(id);
  }, [id]);
  const getMemberFullDetails = async uuid => {
    const response = await memberFullDetail(uuid);
    if (response?.success) {
      // console.log(response?.member?.member?.email_address,"Line 26");
      setMemberDetails(response.member.member);
    } else {
      Alert.alert('Something went wrong..');
    }
  };
  return (
    <View style={styles.main}>
      <View style={styles.view}>
        <View style={styles.contentHolder}>
          <Text style={styles.text}>Email </Text>
          <Text style={styles.text2}>{memberDetails?.email_address}</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.contentHolder}>
          <Text style={styles.text}>DOB </Text>
          <Text style={styles.text2}>{memberDetails?.date_of_birth}</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.contentHolder}>
          <Text style={styles.text}>Gender </Text>
          <Text style={styles.text2}>{memberDetails?.gender}</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.contentHolder}>
          <Text style={styles.text}>Phone </Text>
          <Text style={styles.text2}>{data?.member?.phone_number}</Text>
        </View>
        <View style={styles.separator} />
      </View>
      <View style={styles.buttonHolder}>
        <TouchableOpacity style={styles.button} onPress={handleCall}>
          <Feather
            name="phone-call"
            size={responsiveFontSize(28)}
            color={Colors.blue}
          />
          <Text style={styles.buttonText}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: Colors.blue, gap: 5}]}
          onPress={() => navigation.goBack()}>
          <Ionicons
            name="person"
            size={responsiveFontSize(28)}
            color={Colors.white}
          />
          <Text
            style={[
              styles.buttonText,
              {fontSize: responsiveFontSize(17), color: Colors.white},
            ]}>
            View Business
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BusinessLowerView;

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.backGround,
    borderWidth: 2,
    padding: responsivePadding(10),
    borderTopLeftRadius: responsivePadding(20),
    borderTopRightRadius: responsivePadding(20),
    borderColor: Colors.white,
    flex: 1,
  },
  view: {
    padding: 10,
    borderWidth: 2,
    alignSelf: 'center',
    width: '95%',
    backgroundColor: Colors.white,
    borderColor: Colors.white,
    borderRadius: responsivePadding(10),
  },
  contentHolder: {
    flexDirection: 'row',
    width: '95%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: responsivePadding(10),
  },
  separator: {
    borderWidth: 1.5,
    borderColor: Colors.border_grey,
    backgroundColor: Colors.border_grey,
  },
  text: {
    color: Colors.black,
    fontSize: responsiveFontSize(18),
    fontWeight: '500',
  },
  text2: {
    color: Colors.stroke,
    fontSize: responsiveFontSize(16),
    fontWeight: '600',
  },
  buttonHolder: {
    marginVertical: 20,
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    borderWidth: 2,
    borderColor: Colors.blue,
    padding: 10,
    borderRadius: 5,
    gap: 10,
    height: responsivePadding(50),
  },
  buttonText: {
    fontSize: responsiveFontSize(18),
    color: Colors.black,
    fontWeight: '600',
  },
});
