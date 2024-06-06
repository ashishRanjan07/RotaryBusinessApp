import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Colors from '../../../Theme/Colors';
import {
  responsiveFontSize,
  responsivePadding,
} from '../../../Compenents/Responsive';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {addProduct, memberFullDetail} from '../../../API_Services/auth_API';
import Modal from 'react-native-modal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddProducts = ({data}) => {
  const [name, setname] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [isvisible, setIsVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [businesses, setBusinesses] = useState([]);
  const [isBusinessModalVisible, setIsBusinessModalVisible] = useState(false);

  useEffect(() => {
    fetchMemberBusinessList();
  }, []);

  const fetchMemberBusinessList = async () => {
    const uuid = await AsyncStorage.getItem('uuid');
    const response = await memberFullDetail(uuid);
    // console.log(response?.member?.business, 'Line 44');
    if (response?.member?.business) {
      setBusinesses(response.member.business);
      setSelectedBusiness(response.member.business[0]?.id); // Selecting the first business by default
    }
  };

  const handleModal = () => setIsModalVisible(!isModalVisible);

  const updatePersonalDetails = async () => {
    try {
      setLoading(true);

      if (name.trim() === '') {
        Alert.alert('Name error', 'Please enter the name of the product');
        return;
      }
      if (description.trim() === '') {
        Alert.alert(
          'Description error',
          'Please enter the description of the products',
        );
        return;
      }
      if (price.trim() === '') {
        Alert.alert('Price error', 'Please enter the price of the product');
        return;
      }
      if (!selectedBusiness) {
        Alert.alert('Business error', 'Please select a business');
        return;
      }

      const productData2 = new FormData();
      productData2.append('name', name);
      productData2.append('description', description);
      productData2.append('price', price);
      productData2.append('member_business_id', selectedBusiness);

      if (selectedImage) {
        productData2.append('file', {
          uri: selectedImage,
          type: 'image/jpeg',
          name: 'product.jpg',
        });
      }
      // console.log(productData2,"Line 91")
      const response = await addProduct(productData2);
      const responseJson = await response.json();

      if (responseJson.success) {
        Alert.alert('Success', 'Product added successfully');
        setname('');
        setDescription('');
        setPrice('');
        setSelectedImage('');
      } else {
        Alert.alert('Error', responseJson?.errorMessage);
        setname('');
        setDescription('');
        setPrice('');
        setSelectedImage('');
      }
    } finally {
      setLoading(false);
    }
  };

  const galleryOpen = async () => {
    console.log('Gallery Opening');
    try {
      const options = {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
      };
      launchImageLibrary(options, async response => {
        if (response.didCancel) {
          console.log('User cancel image picker');
        } else if (response.error) {
          console.log('Image Picker Error:', response.error);
        } else {
          let imageUri = response.uri || response.assets[0]?.uri;
          setIsModalVisible(false);
          setSelectedImage(imageUri);
          console.log(imageUri, 'Line 89');
        }
      });
    } catch (error) {
      console.log('Error in Open Image Picker:', error.message);
    }
  };

  const cameraOpen = () => {
    console.log('Camera Opening');
    try {
      const options = {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
        cameraType: 'front',
        saveToPhotos: true,
        quality: 0.7,
      };
      launchCamera(options, async response => {
        if (response.didCancel) {
          console.log('User cancel Camera');
        } else if (response.error) {
          console.log('Camera Error:', response.error);
        } else {
          let imageUri = response.uri || response.assets[0]?.uri;
          setIsModalVisible(false);
          setSelectedImage(imageUri);
          console.log(imageUri, 'Line 121');
        }
      });
    } catch (error) {
      console.log('Error in opening camera', error.message);
    }
  };

  const toggleBusinessModal = () => {
    setIsBusinessModalVisible(!isBusinessModalVisible);
  };

  const handleBusinessSelection = businessId => {
    setSelectedBusiness(businessId);
    toggleBusinessModal();
  };

  return (
    <View style={styles.main}>
      <TouchableOpacity
        style={styles.conatiner}
        onPress={() => setIsVisible(!isvisible)}>
        <Entypo
          name="add-to-list"
          size={responsiveFontSize(28)}
          color={Colors.orange}
          style={{marginLeft: 10}}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Add Products</Text>
          <Text style={{color: Colors.black}}>
            Add by providing product details
          </Text>
        </View>
        <MaterialIcons
          name="add-circle-outline"
          size={responsiveFontSize(30)}
          color={Colors.text_grey}
          style={{marginRight: 20}}
        />
      </TouchableOpacity>
      {isvisible && (
        <View style={styles.editContainer}>
          {/* Name */}
          <View style={styles.EditdetailsContainer}>
            <Text style={styles.text}>Name</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="default"
              placeholder="Product name"
              onChangeText={text => setname(text)}
              placeholderTextColor={Colors.text_grey}
              value={name}
            />
          </View>
          {/* Description */}
          <View style={styles.EditdetailsContainer}>
            <Text style={styles.text}>Description</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="default"
              placeholder="Product Description"
              onChangeText={text => setDescription(text)}
              placeholderTextColor={Colors.text_grey}
              value={description}
            />
          </View>
          {/* Business */}
          <View style={styles.EditdetailsContainer}>
            <Text style={styles.text}>Select Business</Text>
            <TouchableOpacity
              onPress={toggleBusinessModal}
              style={styles.businessButton}>
              <Text style={styles.businessButtonText}>
                {selectedBusiness
                  ? `Business ID: ${selectedBusiness}`
                  : 'Select Business'}
              </Text>
            </TouchableOpacity>
            <Modal isVisible={isBusinessModalVisible}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Select Business</Text>
                <ScrollView style={{maxHeight: 200}}>
                  {businesses.map(business => (
                    <TouchableOpacity
                      key={business.id}
                      onPress={() => handleBusinessSelection(business.id)}
                      style={styles.businessItem}>
                      <Text style={styles.businessItemText}>
                        {business.business_name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <TouchableOpacity
                  onPress={toggleBusinessModal}
                  style={styles.touchableOpacityView}>
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>
          {/* Price */}
          <View style={styles.EditdetailsContainer}>
            <Text style={styles.text}>Price</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="number-pad"
              placeholder="Product price"
              onChangeText={text => setPrice(text)}
              placeholderTextColor={Colors.text_grey}
              value={price}
            />
          </View>
          {/* Image */}
          <View style={styles.editContainer}>
            <View style={styles.directionView}>
              <Text style={styles.productImageText}>Product Images</Text>
              <TouchableOpacity
                style={[styles.button, {width: 'auto'}]}
                onPress={() => setIsModalVisible(true)}>
                <Text style={styles.productImageText}>Add Images</Text>
              </TouchableOpacity>
            </View>
            {/* Shown Images */}
            <View style={styles.textInputImage}>
              {selectedImage ? (
                <Image
                  source={{uri: selectedImage}}
                  style={{width: '50%', height: '100%', borderRadius: 20}}
                  resizeMode="cover"
                />
              ) : null}
            </View>
          </View>

          {/* Button  */}
          {loading ? (
            <View style={[styles.button, {flexDirection: 'row', gap: 5}]}>
              <ActivityIndicator size="large" color={Colors.white} />
              <Text style={styles.loaderText}>
                wait while product adding...
              </Text>
            </View>
          ) : (
            <TouchableOpacity
              onPress={updatePersonalDetails}
              style={[styles.button, {opacity: loading ? 0.7 : 1}]}
              disabled={loading}>
              <Text style={[styles.buttonText]}>Add product</Text>
            </TouchableOpacity>
          )}
          {/* Modal Popup for the Add Product Images */}
          <Modal isVisible={isModalVisible}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Add product images</Text>
              <TouchableOpacity
                onPress={galleryOpen}
                style={styles.touchableOpacityView}>
                <Text style={styles.modalButtonText}>Open Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={cameraOpen}
                style={styles.touchableOpacityView}>
                <Text style={styles.modalButtonText}>Open Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleModal}
                style={[
                  styles.touchableOpacityView,
                  {marginBottom: responsivePadding(25)},
                ]}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      )}
    </View>
  );
};

export default AddProducts;

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.white,
    padding: responsivePadding(5),
  },
  conatiner: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  detailsContainer: {
    marginLeft: responsivePadding(8),
    width: Dimensions.get('screen').width * 0.75,
  },
  title: {
    color: Colors.black,
    fontWeight: '500',
    fontSize: responsiveFontSize(16),
  },
  container: {
    backgroundColor: Colors.backGround_grey,
  },
  editContainer: {
    backgroundColor: Colors.backGround_grey,
    marginTop: 20,
  },
  EditdetailsContainer: {
    marginVertical: responsivePadding(5),
    marginHorizontal: responsivePadding(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    borderWidth: responsivePadding(3),
    borderColor: Colors.border_grey,
    width: Dimensions.get('screen').width * 0.5,
    padding: responsivePadding(5),
    borderRadius: responsivePadding(5),
    fontSize: responsiveFontSize(16),
    fontWeight: '500',
    color: Colors.black,
    marginTop: responsivePadding(10),
  },
  text: {
    color: Colors.black,
    fontSize: responsiveFontSize(16),
  },
  button: {
    padding: responsivePadding(10),
    alignSelf: 'center',
    backgroundColor: Colors.yellow,
    borderRadius: responsivePadding(15),
    marginVertical: responsivePadding(10),
    width: '75%',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: responsiveFontSize(18),
    fontWeight: 700,
    color: Colors.white,
  },
  productImageText: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: responsiveFontSize(18),
    color: Colors.black,
  },
  textInputImage: {
    borderWidth: 1,
    marginVertical: 20,
    height: 200,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 20,
  },
  directionView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
  },
  modalView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backGround,
    borderRadius: responsivePadding(15),
  },
  modalText: {
    color: Colors.black,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(20),
    marginVertical: responsivePadding(15),
  },
  modalButtonText: {
    fontSize: responsiveFontSize(18),
    fontWeight: '500',
    color: Colors.black,
  },
  touchableOpacityView: {
    borderWidth: responsivePadding(2),
    borderColor: Colors.orange,
    backgroundColor: Colors.orange,
    padding: responsivePadding(10),
    width: Dimensions.get('screen').width * 0.5,
    borderRadius: responsivePadding(10),
    marginVertical: responsivePadding(10),
    alignSelf: 'center',
    alignItems: 'center',
  },
  loaderText: {
    fontSize: responsiveFontSize(18),
    fontWeight: '600',
    color: Colors.white,
    padding: 5,
  },
  businessButton: {
    borderWidth: responsivePadding(3),
    borderColor: Colors.border_grey,
    width: Dimensions.get('screen').width * 0.5,
    padding: responsivePadding(5),
    borderRadius: responsivePadding(5),
    fontSize: responsiveFontSize(16),
    fontWeight: '500',
    color: Colors.black,
    marginTop: responsivePadding(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  businessButtonText: {
    color: Colors.text_grey,
  },
  businessItem: {
    padding: responsivePadding(10),
    borderBottomWidth: responsivePadding(2),
    borderBottomColor: Colors.border_grey,
  },
  businessItemText: {
    fontSize: responsiveFontSize(16),
  },
});
