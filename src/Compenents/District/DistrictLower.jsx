import { Linking, StyleSheet, Text, View,Alert } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsivePadding } from '../Responsive';
import Colors from '../../Theme/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const DistrictLower = ({memberData,id}) => {
    // console.log(memberData?.uuid, 'Line 7');
    // console.log(id,"Line 12")
    const navigation = useNavigation();
    const handleCall = () => {
      if (memberData?.phone_number) {
        Linking.openURL(`tel:+91${memberData.phone_number}`);
      } else {
        Alert.alert('No Number Found', 'Phone number is not available.');
      }
    };
    
    const openBussiness = () => {
        if (id) {
          console.log(id, 'Line 64');
          navigation.navigate('Bussiness Details', {id: id,uuid:memberData?.uuid});
        } else {
          Alert.alert('No Business Found', 'Business details are not available.');
        }
      };

  return (
    <View style={styles.main}>
    <View style={styles.view}>
      <View style={styles.contentHolder}>
        <Text style={styles.text}>Email </Text>
        <Text style={styles.text2}>{memberData?.email_address}</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.contentHolder}>
        <Text style={styles.text}>DOB </Text>
        <Text style={styles.text2}>{memberData?.date_of_birth}</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.contentHolder}>
        <Text style={styles.text}>Gender </Text>
        <Text style={styles.text2}>{memberData?.gender}</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.contentHolder}>
        <Text style={styles.text}>Phone </Text>
        <Text style={styles.text2}>{memberData?.phone_number}</Text>
      </View>
      <View style={styles.separator} />
    </View>
    <View style={styles.buttonHolder}>
      <TouchableOpacity style={[styles.button,{width:'80%'}]} 
      onPress={handleCall}
      >
          <Feather name="phone-call" size={responsiveFontSize(28)} color={Colors.blue} />
        <Text style={styles.buttonText}>Call</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button,{backgroundColor:Colors.blue,gap:5}]}   onPress={openBussiness}>
      <Ionicons name="person" size={responsiveFontSize(28)} color={Colors.white} />
        <Text style={[styles.buttonText,{fontSize:responsiveFontSize(17),color:Colors.white}]}>View Business</Text>
      </TouchableOpacity>
    </View>
  </View>
)
  
}

export default DistrictLower

const styles = StyleSheet.create({main: {
    backgroundColor: Colors.backGround,
    borderWidth: 2,
    padding: responsivePadding(10),
    borderTopLeftRadius: responsivePadding(20),
    borderTopRightRadius: responsivePadding(20),
    borderColor: Colors.white,
    flex: 1,
  },
  view: {
    padding: responsivePadding(10),
    borderWidth: responsivePadding(2),
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
    marginVertical: responsivePadding(20),
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    // width: '45%',
    borderWidth: 2,
    borderColor:Colors.blue,
    padding: responsivePadding(10),
    borderRadius:responsivePadding(5),
    gap:10,
    height:responsivePadding(50)
  },
  buttonText:{
    fontSize:responsiveFontSize(18),
    color:Colors.black,
    fontWeight:'600'
  }
});