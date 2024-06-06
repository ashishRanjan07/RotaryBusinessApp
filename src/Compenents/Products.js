import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Linking,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';

import Colors from '../Theme/Colors';
import {FontSize} from '../Theme/Fonts';
import {responsiveFontSize, responsivePadding} from './Responsive';
import {FetchImageFromAWS} from './FetchImageFunction';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Modal from 'react-native-modal';
import {deleteProduct} from '../API_Services/auth_API';
import {useNavigation} from '@react-navigation/native';
import {staticImageURL} from '../API_Services/API_service';

export default function Products({data, onProductDelete, showIcon}) {
  // console.log(showIcon,"Line 26")
  const navigation = useNavigation();
  const products = data.products || [];
  const [productImages, setProductImages] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleWhatsappOpen = (phone_number, productName, productPrice) => {
    const Ph = `+91${phone_number}`;
    let message = encodeURIComponent(
      `Hi there!\n I'm interested in your products.\n Specifically, I'm interested in the product name : ${productName} (₹${productPrice} / Unit).\n How can I learn more or make an inquiry?`,
    );

    const url = `whatsapp://send?phone=${Ph}&text=${message}`;
    Linking.openURL(url).catch(err =>
      console.error('Error opening WhatsApp:', err),
    );
  };

  const handleProductEdit = productId => {
    // Logic to update the product list after editing
    console.log('Product edited with ID:', productId);
    // For example, you can refetch the product list from the server after editing
  };

  const handleEdit = async (selectedProduct, image) => {
    console.log('image', image);
    navigation.push('Edit Product', {
      selectedProduct: selectedProduct,
      image: image,
      onProductEdit: handleProductEdit,
    });
    setShowOptions(false);
  };

  const handleDelete = async selectedProduct => {
    Alert.alert(
      'Delete Product',
      'Are you sure you want to delete this product?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            console.log('Delete', selectedProduct);
            const response = await deleteProduct(selectedProduct?.id);
            console.log(response);
            setShowOptions(false);
            if (response.success) {
              // Call the onProductDelete function to update the product list
              onProductDelete(selectedProduct.id);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  const toggleModal = product => {
    setSelectedProduct(product);
    setShowOptions(!showOptions);
  };

  useEffect(() => {
    const fetchAllImages = async () => {
      let images = {};
      for (const product of products) {
        const imagePaths = product.images;

        if (imagePaths && imagePaths.length > 0) {
          await FetchImageFromAWS({
            path: imagePaths[0],
            setProfileImage: url => {
              images[product.id] = url;
            },
          });
        }
      }
      setProductImages(images);
      setIsLoading(false);
    };

    if (products.length > 0) {
      fetchAllImages();
    } else {
      setIsLoading(false);
    }
  }, [products]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Products</Text>
      {products.length === 0 ? (
        <View style={{marginBottom: 10}}>
          <Text style={styles.noProductText}>No products listed</Text>
        </View>
      ) : (
        <View style={styles.listContainer}>
          {products.map(product => (
            <View key={product.id} style={styles.productContainer}>
              <View>
                {productImages[product.id] ? (
                  <View style={{}}>
                    <Image
                      source={{uri: productImages[product.id]}}
                      style={styles.imageContainer}
                      resizeMode="cover"
                    />
                  </View>
                ) : (
                  <View style={{}}>
                    <Image
                      source={staticImageURL}
                      style={styles.imageContainer}
                      resizeMode="cover"
                    />
                  </View>
                )}
              </View>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>₹{product.price} / Unit</Text>
              {showIcon ? (
                <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                  <TouchableOpacity
                  style={styles.buttonHolder}
                  onPress={() => handleEdit(product, productImages[product.id])}
                  // onPress={() =>
                  //   handleWhatsappOpen(
                  //     data?.member?.phone_number,
                  //     product.name,
                  //     product.price,
                  //   )
                  // }
                  >
                  <Feather
                    name="edit"
                    size={responsiveFontSize(25)}
                    color={Colors.yellow}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonHolder}
                  onPress={() => handleDelete(product)}
                  >
                  <AntDesign
                    name="delete"
                    size={responsiveFontSize(25)}
                    color={Colors.yellow}
                  />
                </TouchableOpacity>
                  </View>
                
              ) : (
                <TouchableOpacity
                  style={styles.buttonHolder}
                  onPress={() =>
                    handleWhatsappOpen(
                      data?.member?.phone_number,
                      product.name,
                      product.price,
                    )
                  }>
                  <Ionicons
                    name="logo-whatsapp"
                    size={responsiveFontSize(25)}
                    color={Colors.yellow}
                  />
                  <Text style={styles.buttonText}>Enquire now</Text>
                </TouchableOpacity>
              )}
              {/* <TouchableOpacity
                style={styles.buttonHolder}
                onPress={() =>
                  handleWhatsappOpen(
                    data?.member?.phone_number,
                    product.name,
                    product.price,
                  )
                }>
                <Ionicons
                  name="logo-whatsapp"
                  size={responsiveFontSize(25)}
                  color={Colors.yellow}
                />
                <Text style={styles.buttonText}>Enquire now</Text>
              </TouchableOpacity> */}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: responsivePadding(10),
  },
  heading: {
    color: Colors.black,
    fontSize: FontSize.fontSize18,
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
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: responsivePadding(2),
    },
  },
  imageContainer: {
    height: responsivePadding(100),
    width: '100%',
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noProductText: {
    color: Colors.text_grey,
    textAlign: 'center',
    fontSize: responsiveFontSize(18),
    marginTop: responsivePadding(10),
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
  buttonText: {
    color: Colors.yellow,
    fontSize: responsiveFontSize(18),
    fontWeight: '500',
  },
  icon: {
    position: 'absolute',
    zIndex: 1,
    right: 5,
    top: 5,
    bottom: 0,
    borderColor: Colors.backGround_grey,
    borderWidth: 2,
    height: '30%',
    borderRadius: 5,
    backgroundColor: Colors.backGround_grey,
    elevation: responsivePadding(5),
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: responsivePadding(2),
    },
  },
  modalContainer: {
    backgroundColor: Colors.white,
    padding: responsivePadding(20),
    borderRadius: responsivePadding(10),
    alignItems: 'center',
  },
  modalOption: {
    fontSize: FontSize.fontSize18,
    color: Colors.black,
    marginVertical: responsivePadding(10),
  },
});
