import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import Colors from '../Theme/Colors';
import {FontSize} from '../Theme/Fonts';
import CircleCallButton from './Buttons/CircleCallButton';
import {responsiveFontSize, responsivePadding} from './Responsive';
import {staticImageURL} from '../API_Services/API_service';
const AboutBusinessOwner = ({data}) => {
  const Capitalize = str => {
    return str?.charAt(0).toUpperCase() + str?.slice(1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.textHolder}>
        <Text style={styles.headerText}>About the Owner</Text>
      </View>
      <View
        style={styles.upperView}>
          <Image source={staticImageURL} style={styles.imageContainer} />
          <Text style={styles.title}>
            {Capitalize(
              data?.member?.first_name ? data.member?.first_name : '',
            )}{' '}
            {Capitalize(
              data?.member?.middle_name ? data?.member?.middle_name : '',
            )}{' '}
            {Capitalize(data?.member?.last_name ? data?.member?.last_name : '')}
          </Text>
        <CircleCallButton data={data} />
      </View>
      <View style={{padding:10,width:'90%',alignSelf:'center'}}>
      <View style={styles.detailList}>
                <Ionicons
                  name="person"
                  size={responsiveFontSize(26)}
                  color={Colors.text_grey}
                  style={styles.iconStyle}
                />
                <Text style={styles.text}>{data?.member?.club?.name}</Text>
              </View>
              <View style={styles.detailList}>
                <Entypo
                  name="home"
                  size={responsiveFontSize(26)}
                  color={Colors.text_grey}
                  style={styles.iconStyle}
                />
                <Text style={styles.text}>{data?.business_name}</Text>
              </View>
              <View style={[styles.detailList]}>
                <Ionicons
                  name="location-sharp"
                  size={responsiveFontSize(26)}
                  color={Colors.text_grey}
                  style={styles.iconStyle}
                />
                <Text style={styles.text}>{data?.business_address}</Text>
              </View>
      </View>
    </View>
  );
};

export default AboutBusinessOwner;

const styles = StyleSheet.create({
  container: {
    borderWidth: responsivePadding(1),
    borderRadius: responsivePadding(10),
    borderColor: Colors.text_grey,
    backgroundColor: Colors.white,
    elevation: 3,
  },
  textHolder: {
    alignItems: 'center',
    padding: responsivePadding(10),
  },
  headerText: {
    color: Colors.black,
    textAlign: 'center',
    fontWeight: '800',
    fontSize: responsiveFontSize(18),
  },
  imageContainer: {
    backgroundColor: Colors.border_grey,
    height: Dimensions.get('screen').width * 0.15,
    width: Dimensions.get('screen').width * 0.15,
    borderRadius: responsivePadding(100),
  },
  title: {
    color: Colors.black,
    fontWeight: '700',
    fontSize: FontSize.fontSize18,
  },
  upperView:{
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    alignItems:'center',
  },
  detailList: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    paddingVertical: responsivePadding(5),
    paddingRight: responsivePadding(10),
  },
  text: {
    color: Colors.black,
    fontSize: responsiveFontSize(14),
    width:'90%'
  },
});
