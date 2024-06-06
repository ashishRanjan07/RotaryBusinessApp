import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '../../../Theme/Colors';
import BusinessHeader from '../../../Compenents/Business/BusinessHeader';
import DistrictHeader from '../../../Compenents/District/DistrictHeader';
import ProfileImageComponent from './ProfileImageComponent';
import DistrictImageComponent from '../../../Compenents/District/DistrictImageComponent';
import { fetchImage, memberFullDetail } from '../../../API_Services/auth_API';
import { staticImageURL } from '../../../API_Services/API_service';
import DistrictLower from '../../../Compenents/District/DistrictLower';

const ClubMemberProfile = ({route, navigation}) => {
  const {i} = route.params;
  // console.log(i,"Line 15")
  const [memberData, setMemberData] = useState();
  const [businessData, setBusinessData] = useState([]);
  const [clubData, setClubData] = useState([]);
  const [id, setId] = useState();
  const [image, setImage] = useState(memberData?.member_image_url || staticImageURL);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchImage(memberData?.member_image_url);
      if (response) {
        setImage(response);
      }
    };
    fetchData();
  }, [memberData?.member_image_url]);
  
  useEffect(() => {
    getData(i?.uuid);
  }, []);

  const getData = async id => {
    const response = await memberFullDetail(id);
    if (response?.success) {
      setClubData(response?.member?.member?.club);
      setMemberData(response?.member?.member);
      const imageUrl = await fetchImage(response?.member?.member?.member_image_url);
      setImage(imageUrl)
      setBusinessData(response?.member?.business[0]);
      setId(response?.member?.business[0]?.id);
    } else {
      Alert.alert('Member Full Details API Error', response?.errorMessage);
    }
  };
  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.safeAreaView} />
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.blue} />
      <DistrictHeader/>
      <DistrictImageComponent image={image} memberData={memberData} />
      <DistrictLower memberData={memberData} id={id}  />
    </View>
  );
};

export default ClubMemberProfile;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.blue,
  },
});
