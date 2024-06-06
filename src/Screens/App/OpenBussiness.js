import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, Alert, SafeAreaView, ActivityIndicator, Text } from 'react-native';
import Colors from '../../Theme/Colors';
import { getFullBusinessDetails } from '../../API_Services/auth_API';
import Products from '../../Compenents/Products';
import BusinessDetail from '../../Compenents/BusinessDetail';
import Header from '../../Compenents/Header';
import { responsivePadding } from '../../Compenents/Responsive';

export default function OpenBusiness({ route }) {
  const [loading, setLoading] = useState(true);
  const { item, id,uuid ,showIcon} = route?.params;
  // console.log(item,"Line 13")
  // console.log(uuid,"Line 14")
  // console.log(showIcon,"Line 15")
  // console.log(id,"Line 16")
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFullBusinessDetails(id);
        if (response?.success) {
          setData(response?.business_details);
          // console.log(response?.business_details,"Line 25")
        } else {
          Alert.alert('Get Full Business Details API Error', response?.errorMessage);
        }
      } catch (error) {
        console.warn(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleProductDelete = productId => {
    setData(prevData => ({
      ...prevData,
      products: prevData.products.filter(product => product.id !== productId),
    }));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <Header title={"Business Details"} />
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadertext}>Business Details is loading...</Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <BusinessDetail data={data} userData={item} uuid={uuid} showIcon={showIcon} />
          <View style={styles.separatorLine} />
          <Products data={data} onProductDelete={handleProductDelete} showIcon={showIcon} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingVertical: responsivePadding(15),
  },
  separatorLine: {
    backgroundColor: Colors.border_grey,
    height: 1,
    marginVertical: responsivePadding(15),
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: Colors.white,
  },
  loadertext: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
  },
});
