
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {fetchImage, memberFullDetail} from '../../../API_Services/auth_API';
import Colors from '../../../Theme/Colors';
import {
  responsiveFontSize,
  responsivePadding,
} from '../../../Compenents/Responsive';
import Header from '../../../Compenents/Header';
import { GET_USER_DETAILS } from '../../../API_Services/API_service';
const staticImageURL = 'https://picsum.photos/300';
const ViewProducts = ({route}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const {data} = route.params;
  // console.log(data,"Line 26")

  useEffect(() => {
    fetchProductsAndImages();
    getData();
  }, []);

  const getData = async () => {
    const userData = await GET_USER_DETAILS();
    const id = userData?.uuid;
    const response = await memberFullDetail(id);
    if (response?.success) {
      return response?.member?.business?.map(business => business.business_name);
    } else {
      Alert.alert('Member Full Details API Error', response?.errorMessage);
      return [];
    }
  };

  const fetchProductsAndImages = async () => {
    setLoading(true);
    const businessNames = await getData();
    const productsWithImages = await Promise.all(
      businessNames.map(async businessName => {
        const response = await memberFullDetail(data?.member?.uuid);
        if (response?.success) {
          const fetchedProducts = response?.member?.business.find(business => business.business_name === businessName)?.products;
          if (fetchedProducts) {
            const productsWithImages = await Promise.all(
              fetchedProducts.map(async product => {
                if (product.images && product.images !== '[]') {
                  const imagesArray = product.images;
                  const imageUrls = await Promise.all(
                    imagesArray.map(async imagePath => {
                      const imageUrl = await fetchImage(imagePath);
                      return imageUrl;
                    }),
                  );
                  return { ...product, fetchedImages: imageUrls };
                }
                return { ...product, fetchedImages: [staticImageURL] };
              }),
            );
            return productsWithImages;
          }
        }
        return [];
      }),
    );

    setLoading(false);
    // Flatten the array of arrays into a single array of products
    setProducts(productsWithImages.flat());
  };
  

  const renderItem = ({item}) => {
    const imageUrl = item.fetchedImages?.[0] || staticImageURL;
    return (
      <View key={item.id} style={styles.productCard}>
        <Image source={{uri: imageUrl}} style={styles.productImage} />
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <Text style={styles.productPrice}>Rs.{item.price}</Text>
      </View>
    );
  };

  return (
    <View style={{backgroundColor: Colors.white,flex:1}}>
      <Header title={"Products"}/>
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={{color:Colors.black,fontSize:responsiveFontSize(18)}}>Please Wait..</Text>
        </View>
      ) : products.length === 0 ? (
        <View style={styles.noProducts}>
          <Text>No products found</Text>
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          data={products}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
        />
      )}
    </View>
  );
};

export default ViewProducts;

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: responsivePadding(10),
    // flex:1,
    backgroundColor:Colors.white,
    // marginVertical:10,
    
  },
  productCard: {
    width: Dimensions.get('window').width / 2 - 20,
    borderWidth: responsivePadding(2),
    borderColor: '#ddd',
    borderRadius: responsivePadding(8),
    padding: responsivePadding(10),
    marginBottom: responsivePadding(10),
    alignItems: 'center',
    marginHorizontal: responsivePadding(5),
  },
  productName: {
    fontSize: responsiveFontSize(14),
    fontWeight: 'bold',
    textAlign: 'center',
    color:Colors.black,
  },
  productDescription: {
    fontSize: responsiveFontSize(14),
    color: Colors.text_grey,
    textAlign: 'center',
    fontWeight:'600'
  },
  productPrice: {
    fontSize: responsiveFontSize(16),
    fontWeight: 'bold',
    marginTop: responsivePadding(5),
    textAlign: 'center',
    color:Colors.black
  },
  productImage: {
    width: '100%',
    height: responsivePadding(80),
    borderRadius: responsivePadding(8),
    marginBottom: responsivePadding(5),
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap:10
  },
  noProducts: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

