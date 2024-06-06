import {View, Dimensions, StyleSheet, Alert} from 'react-native';
import React, {useState, useEffect,useContext} from 'react';

import Colors from '../../Theme/Colors';
import BusinessList from './BusinessList';
import SearchOptionFilter from '../../Compenents/Search/SearchOptionFilter';
import MemberList from '../../Compenents/MemberList';
import {allBusinessList, businessMemberList} from '../../API_Services/auth_API';
import {responsivePadding} from '../../Compenents/Responsive';
import { AuthContext } from '../../Constant/Context';

export default function Listing() {
  const [view, setView] = useState('Business');
  const [memberData, setMemberData] = useState([]);
  const [businessData, setBusinessData] = useState([]);
  const [selectedState, setSelectedState] = useState([]); // Add selectedState state
  const [selectedCity, setSelectedCity] = useState([]); // Add selectedCity state
  const [selectedClubs, setSelectedClubs] = useState([]);
  const {signOut} = useContext(AuthContext); 

  useEffect(() => {
    getAllBusiness();
    getAllBusinessMemberList();
    
  }, []);

  const getAllBusiness = async () => {
    try {
      const response = await allBusinessList();
      if (response?.success) {
        if (response.business !== null) {
          // console.log(response?.business?.[0].member,"Line 30")
          setBusinessData(response.business);
        } else {
          Alert.alert('Business', 'No business data available.');
        }
      } else {
        signOut();
        // Alert.alert('Business List API Error', response?.errorMessage);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  

  const getAllBusinessMemberList = async () => {
    try {
      const response = await businessMemberList();
      // console.log(response,"Line 39")
      if (response?.success) {
        setMemberData(response?.members);
      } else {
        signOut();
        // Alert.alert('Business List API Error', response?.errorMessage);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const updateBusinessData = data => {
    setBusinessData(data);
  };

  const updatedMemberData = data => {
    setMemberData(data);
  };
  return (
    <View
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <SearchOptionFilter
        value={view}
        handleValue={e => setView(e)}
        updateBusinessData={updateBusinessData}
        updatedMemberData={updatedMemberData}
        selectedState={selectedState} // Pass selectedState as prop
        selectedCity={selectedCity} // Pass selectedCity as prop
        selectedClubs={selectedClubs} // Pass selectedClubs as prop
      />
      {view === 'Member' ? (
        <MemberList list={memberData} />
      ) : view === 'Business' ? (
        <BusinessList list={businessData} showIcon={false}  />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    minHeight: Dimensions.get('screen').height,
  },
  SepraterLine: {
    backgroundColor: Colors.border_grey,
    height: responsivePadding(0.7),
    marginVertical: responsivePadding(15),
  },
  SearchContainer: {
    padding: responsivePadding(10),
  },
});
