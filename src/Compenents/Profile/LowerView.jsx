import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../Theme/Colors';
import {responsiveFontSize, responsivePadding} from '../Responsive';

const LowerView = ({memberData, getData}) => {
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
    </View>
  );
};

export default LowerView;

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
});
