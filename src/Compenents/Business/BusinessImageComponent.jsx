import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../../Theme/Colors';
import {staticImageURL} from '../../API_Services/API_service';
import {responsiveFontSize, responsivePadding} from '../Responsive';
import {fetchImage, memberFullDetail} from '../../API_Services/auth_API';

const BusinessImageComponent = ({data, image,uuid}) => {
  // console.log(data,"Line 8")
  const [profileImage, SetProfileImage] = useState(null);
  const [memberDetails,setMemberDetails] = useState(null);
  console.log(image, 'Line 9');
  console.log(uuid,"Line 12")


  useEffect(() => {
    getMemberFullDetails(uuid);
  }, [uuid]);
  const getMemberFullDetails = async uuid => {
    const response = await memberFullDetail(uuid);
    console.log(response?.success,"Line 21")
    if (response?.success) {
      // console.log(response?.member,"Line 26");
      setMemberDetails(response.member.member);
        const response2 = await fetchImage(response?.member?.member?.member_image_url);
        if (response2) {
          SetProfileImage(response2);
          console.log(response2,"Line 27")
        }
     
    } else {
      Alert.alert('Something went wrong..');
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetchImage(image);
  //     if (response) {
  //       SetProfileImage(response);
  //     }
  //   };
  //   fetchData();
  // }, [image]);

  return (
    <View style={styles.main}>
      <View style={styles.imageHolder}>
        {profileImage ? (
          <Image
            source={{uri:profileImage}}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <Image
            source={require('../../Assets/Images/logo_white.png')}
            style={styles.image}
            resizeMode="cover"
          />
        )}

        <Text style={styles.nameText}>
          {data?.member?.first_name} {data?.member?.last_name}
        </Text>
        <Text style={styles.businessText}>{data?.business_name}</Text>
      </View>
    </View>
  );
};

export default BusinessImageComponent;

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.blue,
  },
  image: {
    width: responsivePadding(150),
    height: responsivePadding(150),
    borderRadius:responsivePadding(75)
  },
  imageHolder: {
    alignItems: 'center',
    padding: 10,
    gap: 10,
    marginBottom: 10,
  },
  nameText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: responsiveFontSize(25),
  },
  businessText: {
    color: Colors.white,
    fontSize: responsiveFontSize(18),
    fontWeight: '400',
  },
});
