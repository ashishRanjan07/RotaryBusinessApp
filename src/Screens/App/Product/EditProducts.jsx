import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../../../Theme/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {
  responsiveFontSize,
  responsivePadding,
} from '../../../Compenents/Responsive';
import {TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  addProduct,
  getFullBusinessDetails,
  memberFullDetail,
  updateProduct,
} from '../../../API_Services/auth_API';
import ImagePicker from 'react-native-image-crop-picker';
import Feather from 'react-native-vector-icons/Feather';

const EditProducts = ({route,onProductEdit}) => {
  const {selectedProduct, image} = route.params;
  console.log(selectedProduct, 'Line 445');
  const navigation = useNavigation();
  const [name, setName] = useState(
    selectedProduct?.name ? selectedProduct?.name : '',
  );
  const [nameError, setNameError] = useState('');
  const [showNameError, setShowNameError] = useState(false);
  const [description, setDescription] = useState(
    selectedProduct?.description ? selectedProduct?.description : '',
  );
  const [descriptionError, setDescriptionError] = useState('');
  const [showDescriptionError, setShowDescriptionError] = useState(false);
  const [price, setPrice] = useState(
    selectedProduct?.price ? (selectedProduct?.price).toString() : '',
  );
  const [priceError, setPriceError] = useState('');
  const [showPriceError, setShowPriceError] = useState(false);
  const [showBusinessDropdown, setShowBusinessDropdown] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(
    selectedProduct?.member_business_id
      ? selectedProduct?.member_business_id
      : '',
  );
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusinessId, setSelectedBusinessId] = useState('');
  const [secondaryImage, SetSecondaryImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(image || '');
  const [businessName, setBusinessName] = useState('');

  useEffect(() => {
    //   fetchMemberBusinessList();
    fetchFullBusinessDetails();
  }, []);

  const fetchMemberBusinessList = async () => {
    const uuid = await AsyncStorage.getItem('uuid');
    const response = await memberFullDetail(uuid);
    console.log(response?.member?.business, 'Line 481');
    if (response?.member?.business) {
      setBusinesses(response.member.business);
    }
  };
  const fetchFullBusinessDetails = async () => {
    const id = selectedProduct?.member_business_id;
    const response = await getFullBusinessDetails(id);
    if (response?.success) {
      console.log(response?.business_details?.business_name, 'Line 489');
      setBusinessName(response?.business_details?.business_name);
    }
  };

  // const handleBusinessSelection = (business) => {
  //   setSelectedBusiness(business.business_name);
  //   setSelectedBusinessId(business.id);
  //   setShowBusinessDropdown(false);
  // };

  const galleryOpen = async setImage => {
    try {
      const images = await ImagePicker.openPicker({
        multiple: true,
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
      });

      if (images && images.length > 0) {
        const imageUris = images.map(image => image.path);
        setSelectedImage(imageUris[0]);
        SetSecondaryImage(imageUris);
      } else {
        console.log('User Cancelled Image Picker');
      }
    } catch (error) {
      console.log('Image Picker Error:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (name.trim() === '') {
        setShowNameError(true);
        setNameError('Enter product name');
        return;
      }
      if (description.trim() === '') {
        setShowDescriptionError(true);
        setDescriptionError('Enter product description');
        return;
      }
      if (price.trim() === '') {
        setShowPriceError(true);
        setPriceError('Enter product price');
        return;
      }

      const productData = new FormData();
      productData.append('name', name);
      productData.append('description', description);
      productData.append('price', price);
      productData.append('member_business_id', selectedProduct?.member_business_id);

      // Append multiple images
      if (selectedImage) {
        productData.append('file', {
          uri: selectedImage,
          type: 'image/png',
          name: 'product.jpg',
        });
      }
console.log(selectedProduct?.id,"Line 571")
      const response = await updateProduct(productData,selectedProduct?.id);
      const responseJson = await response.json();

      if (responseJson.success) {
        Alert.alert('Edit Product', 'Product Edited successfully',[
          {
            text:'Ok',
            onPress: navigation.push('TabStack')
          }
        ]);
        setName('');
        setDescription('');
        setPrice('');
        SetSecondaryImage('');
        setSelectedBusiness(null);
        onProductEdit(selectedProduct.id);
        navigation.goBack()
      } else {
        Alert.alert('Error', responseJson?.errorMessage);
        setName('');
        setDescription('');
        setPrice('');
        SetSecondaryImage('');
      }
    } catch (error) {
      console.log('Error in handling submit:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SafeAreaView style={{backgroundColor: Colors.white}} />
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      {/* Header */}
      <View style={styles.main}>
        <TouchableOpacity
          style={styles.iconHolder}
          onPress={() => navigation.push('TabStack')}>
          <AntDesign
            name="arrowleft"
            size={responsiveFontSize(30)}
            color={Colors.black}
          />
        </TouchableOpacity>
        <View style={{width: '60%'}}>
          <Text style={styles.text}>Edit Product</Text>
        </View>
      </View>
      <ScrollView style={styles.scrollView}>
        {/* Product Name */}
        <View style={styles.textInputHolder}>
          <TextInput
            keyboardType="default"
            label={'Name*'}
            mode="outlined"
            style={styles.textInputBox}
            placeholderTextColor={Colors.text_grey}
            onChangeText={text => setName(text)}
            placeholder="Product Name"
            value={name}
          />
          {showNameError && <Text style={styles.error}>{nameError}</Text>}
        </View>
        {/* Product Descriptions */}
        <View style={styles.textInputHolder}>
          <TextInput
            keyboardType="default"
            label={'Description*'}
            mode="outlined"
            style={styles.textInputBox}
            placeholderTextColor={Colors.text_grey}
            onChangeText={text => setDescription(text)}
            placeholder="Product Description"
            value={description}
          />
          {showDescriptionError && (
            <Text style={styles.error}>{descriptionError}</Text>
          )}
        </View>
        {/* Product Price */}
        <View style={styles.textInputHolder}>
          <TextInput
            keyboardType="number-pad"
            label={'Price*'}
            mode="outlined"
            style={styles.textInputBox}
            placeholderTextColor={Colors.text_grey}
            onChangeText={text => setPrice(text)}
            placeholder="Product Price"
            value={price}
            right={
              <TextInput.Icon
                icon={'currency-inr'}
                iconColor={Colors.text_grey}
                style={{marginTop: responsivePadding(15)}}
                size={responsiveFontSize(30)}
              />
            }
          />
          {showPriceError && <Text style={styles.error}>{priceError}</Text>}
        </View>
        {/* Show Selected Business */}
        <View style={styles.viewHolder}>
          <Text style={styles.text2}>Select Business</Text>
          <View style={styles.dropdown}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.text2}>{businessName}</Text>
            </View>
          </View>
        </View>
        {/* Upload Product Image */}
        <TouchableOpacity
          style={styles.buttonHolder}
          onPress={() => galleryOpen(SetSecondaryImage)}>
          <Feather
            name="upload"
            size={responsiveFontSize(20)}
            color={Colors.black}
          />
          <Text style={styles.buttonText}>Upload Product Image</Text>
        </TouchableOpacity>
        {selectedImage !== '' && !secondaryImage && (
          <Image source={{uri: selectedImage}} style={styles.image} />
        )}
        {secondaryImage !== '' && (
          <View style={styles.imageContainer}>
            {secondaryImage.map((uri, index) => (
              <Image key={index} source={{uri: uri}} style={styles.image} />
            ))}
          </View>
        )}
        <TouchableOpacity style={styles.touch} onPress={handleSubmit}>
          <Text style={[styles.text, {color: Colors.white, fontWeight: '600'}]}>
            {loading ? 'wait while product editing...' : 'Edit Product'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

export default EditProducts;

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.white,
    borderColor: Colors.black,
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsivePadding(10),
    paddingVertical: responsivePadding(10),
  },
  text: {
    fontSize: responsiveFontSize(18),
    fontWeight: '600',
    color: Colors.black,
    textAlign: 'center',
  },
  iconHolder: {
    marginHorizontal: responsivePadding(20),
  },
  scrollView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  textInputHolder: {
    width: '95%',
    borderRadius: responsivePadding(5),
    alignSelf: 'center',
    height: responsivePadding(51),
    marginVertical: responsivePadding(10),
  },
  textInputBox: {
    // height: responsivePadding(50),
    backgroundColor: Colors.white,
    borderRadius: responsivePadding(5),
    borderBottomEndRadius: responsivePadding(5),
    borderBottomStartRadius: responsivePadding(5),
    color: Colors.black,
    fontSize: responsiveFontSize(18),
    fontWeight: '500',
  },
  viewHolder: {
    width: '95%',
    alignSelf: 'center',
    marginVertical: responsivePadding(10),
    gap: responsivePadding(10),
  },
  dropdown: {
    borderWidth: 1.5,
    borderColor: Colors.text_grey,
    fontSize: responsiveFontSize(18),
    fontWeight: '500',
    color: Colors.black,
    borderRadius: responsivePadding(5),
    paddingLeft: responsivePadding(10),
    paddingTop: 10,
    paddingBottom: 10,
    height: responsivePadding(50),
    justifyContent: 'center',
    width: '100%',
  },
  dropdownContent: {
    marginVertical: responsivePadding(10),
    width: '100%',
    backgroundColor: '#fff',
    borderColor: Colors.text_grey,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
    gap: 10,
  },
  text2: {
    fontSize: responsiveFontSize(18),
    color: Colors.black,
  },
  buttonHolder: {
    flexDirection: 'row',
    marginVertical: responsivePadding(20),
    height: responsivePadding(50),
    alignItems: 'center',
    justifyContent: 'center',
    gap: responsivePadding(20),
    borderWidth: 2,
    width: '95%',
    alignSelf: 'center',
    borderRadius: responsivePadding(5),
    borderColor: Colors.stroke,
    backgroundColor: Colors.buttonBackground,
  },
  buttonText: {
    fontSize: responsiveFontSize(18),
    fontWeight: '400',
    color: Colors.black,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  image: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
    borderRadius: 10,
    alignSelf: 'center',
  },
  touch: {
    borderWidth: responsivePadding(2),
    padding: responsivePadding(10),
    borderRadius: responsivePadding(10),
    width: '95%',
    alignSelf: 'center',
    marginVertical: responsivePadding(20),
    alignItems: 'center',
    backgroundColor: '#F7A81B',
    borderColor: '#F7A81B',
    marginBottom: 25,
    height: responsivePadding(50),
    justifyContent: 'center',
  },
  error: {
    color: Colors.red,
    fontSize: responsiveFontSize(16),
    fontWeight: '600',
    marginTop: 10,
  },
});
