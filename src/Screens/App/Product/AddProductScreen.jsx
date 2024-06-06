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
  Platform,
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
import {addProduct, memberFullDetail} from '../../../API_Services/auth_API';
import ImagePicker from 'react-native-image-crop-picker';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const AddProductScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [showNameError, setShowNameError] = useState(false);
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [showDescriptionError, setShowDescriptionError] = useState(false);
  const [price, setPrice] = useState('');
  const [priceError, setPriceError] = useState('');
  const [showPriceError, setShowPriceError] = useState(false);
  const [showBusinessDropdown, setShowBusinessDropdown] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusinessId, setSelectedBusinessId] = useState('');
  const [secondaryImage, SetSecondaryImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedBusinessError, setSelectedBusinessError] = useState('');

  useEffect(() => {
    fetchMemberBusinessList();
  }, []);

  const fetchMemberBusinessList = async () => {
    const uuid = await AsyncStorage.getItem('uuid');
    const response = await memberFullDetail(uuid);
    if (response?.member?.business) {
      setBusinesses(response.member.business);
    }
  };

  const handleBusinessSelection = business => {
    setSelectedBusiness(business.business_name);
    setSelectedBusinessId(business.id);
    setShowBusinessDropdown(false);
  };

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
        // setPrimaryImage(imageUris[0]);
        // setSecondImage(imageUris[1]);
        setSelectedImage(imageUris[0]);
        SetSecondaryImage(imageUris);
      } else {
        console.log('User Cancelled Image Picker');
      }
    } catch (error) {
      console.log('Image Picker Error:', error);
    }
  };

  const validatePriceInput = text => {
    let newText = '';
    let numbers = '0123456789.';
    for (let i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        // allow only digits and dot
        if (text[i] === '.' && newText.indexOf('.') > -1) {
          // if dot already exists in newText, don't add it again
          continue;
        }
        newText += text[i];
      }
    }
    return newText;
  };

  useEffect(() => {
    if (name.length != 0) {
      setNameError('');
    }
    if (description.length != 0) {
      setDescriptionError('');
    }
    if (price.length != 0) {
      setPriceError('');
    }
    if (selectedBusiness) {
      setSelectedBusinessError('');
    }
  }, [name, description, price, selectedBusiness]);
  const handleSubmit = async () => {
    try {
      setLoading(true);
      let hasError = false;
      if (name.trim() === '') {
        // setShowNameError(true);
        hasError = true;
        setNameError('Enter product name');
        // return;
      }

      if (description.trim() === '') {
        // setShowDescriptionError(true);
        hasError = true;
        setDescriptionError('Enter product description');
        // return;
      }
      if (price.trim() === '') {
        // setShowPriceError(true);
        hasError = true;
        setPriceError('Enter product price');
        // return;
      }

      if (!selectedBusiness) {
        // Alert.alert('Error', 'Select business');
        hasError = true;
        setSelectedBusinessError('Select business');
      }

      if (hasError) return;

      const productData = new FormData();
      productData.append('name', name);
      productData.append('description', description);
      productData.append('price', price);
      productData.append('member_business_id', selectedBusinessId);

      // Append multiple images
      if (selectedImage) {
        productData.append('file', {
          uri: selectedImage,
          type: 'image/png',
          name: 'product.jpg',
        });
      }

      // Submit the form data
      // console.log(productData,"Line 120")
      const response = await addProduct(productData);
      const responseJson = await response.json();

      if (responseJson.success) {
        Alert.alert('Success', 'Product added successfully');
        setName('');
        setDescription('');
        setPrice('');
        SetSecondaryImage('');
        setSelectedBusiness(null);
        navigation.push('TabStack');
      } else {
        Alert.alert('Error', responseJson?.errorMessage);
        setName('');
        setDescription('');
        setPrice('');
        SetSecondaryImage('');
        setSelectedBusiness(null);
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
          <Text style={styles.text}>Add Product</Text>
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
        </View>
        {nameError !== '' && <Text style={styles.error}>{nameError}</Text>}
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
        </View>
        {descriptionError !== '' && (
          <Text style={styles.error}>{descriptionError}</Text>
        )}
        {/* Product Price */}
        <View style={styles.textInputHolder}>
          <TextInput
            keyboardType={
              Platform.OS === 'android' ? 'number-pad' : 'decimal-pad'
            }
            label={'Price*'}
            mode="outlined"
            style={styles.textInputBox}
            placeholderTextColor={Colors.text_grey}
            onChangeText={text => {
              const validatedText = validatePriceInput(text);
              if (validatedText !== text) {
                setPriceError('Enter digit only');
              } else {
                setPriceError('');
              }
              setPrice(validatedText);
            }}
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
        </View>
        {priceError !== '' && <Text style={styles.error}>{priceError}</Text>}
        <View style={styles.viewHolder}>
          <Text style={styles.text2}>Select Business</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowBusinessDropdown(!showBusinessDropdown)}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.text2}>
                {selectedBusiness ? selectedBusiness : 'Select Business'}
              </Text>
              <AntDesign
                name="caretdown"
                size={responsiveFontSize(20)}
                color={Colors.text_grey}
                style={{marginHorizontal: 10}}
              />
            </View>
          </TouchableOpacity>
          {showBusinessDropdown && (
            <View style={styles.dropdownContent}>
              {businesses.map(business => (
                <TouchableOpacity
                  key={business.id}
                  onPress={() => handleBusinessSelection(business)}
                  style={styles.businessItem}>
                  <Text style={styles.text2}>{business.business_name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        {selectedBusinessError !== '' && (
          <Text style={[styles.error, {marginTop: 0}]}>
            {selectedBusinessError}
          </Text>
        )}
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
        {secondaryImage !== '' && (
          <View style={styles.imageContainer}>
            {secondaryImage.map((uri, index) => (
              <Image key={index} source={{uri: uri}} style={styles.image} />
            ))}
          </View>
        )}
        <TouchableOpacity style={styles.touch} onPress={handleSubmit}>
          <Text style={[styles.text, {color: Colors.white, fontWeight: '600'}]}>
            {loading ? 'wait while product adding...' : 'Add Product'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

export default AddProductScreen;

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
    // height:responsivePadding(50)
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
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.text_grey,
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
    marginBottom: responsivePadding(25),
    height: responsivePadding(50),
    justifyContent: 'center',
  },
  error: {
    color: Colors.red,
    fontSize: responsiveFontSize(16),
    fontWeight: '400',
    marginTop: responsivePadding(5),
    marginHorizontal: responsivePadding(15),
  },
});
