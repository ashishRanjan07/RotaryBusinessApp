import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {responsiveFontSize, responsivePadding} from '../Responsive';
import Colors from '../../Theme/Colors';
import {staticImageURL} from '../../API_Services/API_service';

const DistrictImageComponent = ({memberData, image}) => {
  return (
    <View style={styles.detailsContainer}>
      {image ? (
        <Image
          source={{uri: (image).toString()}}
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
        {memberData?.first_name} {memberData?.middle_name}{' '}
        {memberData?.last_name}
      </Text>
      <Text style={[styles.name, {marginTop: 20}]}>
        {memberData?.club?.name}
      </Text>
    </View>
  );
};

export default DistrictImageComponent;

const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: Colors.blue,
    alignItems: 'center',
    marginBottom: responsivePadding(15),
  },
  imageContainer: {
    height: Dimensions.get('screen').width * 0.3,
    width: Dimensions.get('screen').width * 0.3,
    borderRadius: responsivePadding(100),
  },
  name: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(20),
    marginTop: responsivePadding(10),
  },
});
