import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../Theme/Colors';
import {responsiveFontSize, responsivePadding} from '../Responsive';
import {staticImageURL} from '../../API_Services/API_service';

const ClubImageComponents = ({memberData}) => {
  // console.log(memberData?.member_image_url, 'line 8');
  return (
    <View style={styles.detailsContainer}>
      {memberData?.member_image_url ? (
        <Image
          source={{uri: memberData?.member_image_url}}
          style={styles.imageContainer}
          resizeMode="cover"
        />
      ) : (
        <Image
          source={staticImageURL}
          style={styles.imageContainer}
          resizeMode="cover"
        />
      )}

      <Text style={styles.name}>
        {' '}
        {memberData?.first_name} {memberData?.middle_name}{' '}
        {memberData?.last_name}
      </Text>
      <Text style={[styles.name, {marginTop: 10, marginBottom: 30}]}>
        {memberData?.club?.name}
      </Text>
    </View>
  );
};

export default ClubImageComponents;

const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: Colors.blue,
    alignItems: 'center',
    marginBottom: responsivePadding(30),
  },
  imageContainer: {
    height: responsivePadding(150),
    width: responsivePadding(150),
    borderRadius: responsivePadding(75),
  },
  name: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(20),
    marginTop: responsivePadding(10),
  },
});
