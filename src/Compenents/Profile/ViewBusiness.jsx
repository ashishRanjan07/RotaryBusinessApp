import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import Colors from '../../Theme/Colors';
import {responsiveFontSize, responsivePadding} from '../Responsive';
import {GET_USER_DETAILS} from '../../API_Services/API_service';
import {memberFullDetail} from '../../API_Services/auth_API';
import {Alert} from 'react-native';
import Header from '../Header';

const ViewBusiness = () => {
  const [businessData, setBusinessData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const userData = await GET_USER_DETAILS();
    const id = userData?.uuid;
    const response = await memberFullDetail(id);
    if (response?.success) {
      setBusinessData(response?.member?.business);
    } else {
      Alert.alert('Member Full Details API Error', response?.errorMessage);
    }
    setLoading(false);
  };

  return (
    <View style={styles.main}>
      <Header title={'View Business'} />
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.text2}>Please Wait...</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          {businessData.length === 0 ? (
            <Text style={styles.noDataText}>No business found</Text>
          ) : (
            businessData.map((business, index) => (
              <View key={index} style={styles.view}>
                <Text style={styles.text1}>{business.business_name}</Text>
                <Text style={styles.text2}>{business.business_desc}</Text>
              </View>
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default ViewBusiness;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    padding: responsivePadding(10),
    gap: responsivePadding(10),
  },
  view: {
    borderWidth: 1,
    width: '95%',
    gap: 5,
    borderRadius: responsivePadding(10),
    padding: responsivePadding(10),
    borderColor: Colors.text_grey,
    alignSelf: 'center',
    marginVertical: responsivePadding(10),
  },
  text1: {
    fontSize: responsiveFontSize(18),
    fontWeight: 'bold',
    color: Colors.black,
  },
  text2: {
    fontSize: responsiveFontSize(16),
    fontWeight: '600',
    color: Colors.text_grey,
  },
  noDataText: {
    fontSize: responsiveFontSize(18),
    textAlign: 'center',
    marginTop: responsivePadding(20),
    color: Colors.text_grey,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
});
