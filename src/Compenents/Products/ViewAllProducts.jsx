import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, ScrollView, Linking } from 'react-native';
import React from 'react';
import Header from '../Header';
import Colors from '../../Theme/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { responsiveFontSize, responsivePadding } from '../Responsive';

const ViewAllProducts = ({ route }) => {
  const { data } = route.params;

  const handleWhatsappOpen = (phone_number, productName, productPrice) => {
    const Ph=`+91${phone_number}`
    let message = encodeURIComponent(
      `Hi there! I'm interested in your products.\n Specifically, I'm interested in the product name : -  ${productName} (₹${productPrice} / Unit).`
    );

    const url = `whatsapp://send?phone=${Ph}&text=${message}`;
    Linking.openURL(url)
      .catch(err => console.error('Error opening WhatsApp:', err));
  }

  return (
    <View style={{ backgroundColor: Colors.white, flex: 1 }}>
      <Header title={"Products"} />
      <ScrollView contentContainerStyle={styles.container}>
        {data.map(business => (
          <View key={business.id}>
            <Text style={styles.heading}>{business.business_name}</Text>
            <View style={styles.listContainer}>
              {business.products.length > 0 ? (
                business.products.map(product => (
                  <View key={product.id} style={styles.productContainer}>
                    <Image source={{ uri: product.image }} style={styles.imageContainer} />
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productPrice}>₹{product.price} / Unit</Text>
                    <TouchableOpacity
                      style={styles.buttonHolder}
                      onPress={() => handleWhatsappOpen(data?.member?.phone_number, product.name, product.price)}>
                      <Ionicons name="logo-whatsapp" size={styles.buttonText.fontSize} color={styles.buttonText.color} />
                      <Text style={styles.buttonText}>Enquire now</Text>
                    </TouchableOpacity>
                  </View>
                ))
              ) : (
                <Text style={styles.noProductText}>No products found</Text>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
export default ViewAllProducts;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: responsivePadding(10),
    paddingBottom: responsivePadding(20), // Add paddingBottom to ensure space for scrolling
  },
  heading: {
    color: Colors.black,
    fontSize: responsiveFontSize(18),
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    marginTop: responsivePadding(10),
    justifyContent: 'center',
  },
  productContainer: {
    width: Dimensions.get('screen').width * 0.42,
    margin: responsivePadding(5),
    backgroundColor: Colors.white,
    elevation: responsivePadding(5),
    borderRadius: responsivePadding(10),
    padding: responsivePadding(10),
    alignSelf: 'center',
  },
  imageContainer: {
    height: Dimensions.get('screen').width * 0.3,
    borderTopRightRadius: responsivePadding(10),
    borderTopLeftRadius: responsivePadding(10),
  },
  productName: {
    color: Colors.black,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: responsivePadding(3),
  },
  productPrice: {
    color: Colors.text_grey,
    textAlign: 'center',
    padding: responsivePadding(3),
  },
  buttonHolder: {
    borderWidth: responsivePadding(2),
    marginVertical: responsivePadding(10),
    borderColor: Colors.yellow,
    padding: responsivePadding(10),
    borderRadius: responsivePadding(5),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: responsivePadding(5),
  },
  buttonText:{
    color:Colors.yellow,
    fontSize:responsiveFontSize(18),
    fontWeight:'500'
  },
  noProductText: {
    color: Colors.text_grey,
    textAlign: 'center',
    fontSize: responsiveFontSize(18),
    marginTop: responsivePadding(10),
  },
});