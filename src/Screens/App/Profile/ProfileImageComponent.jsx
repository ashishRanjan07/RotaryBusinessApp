import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import Colors from '../../../Theme/Colors';
import {
  responsiveFontSize,
  responsivePadding,
} from '../../../Compenents/Responsive';
import Modal from 'react-native-modal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  GET_USER_TOKEN,
  serverAddress,
  staticImageURL,
} from '../../../API_Services/API_service';
import axios from 'axios';
import {FetchImageFromAWS} from '../../../Compenents/FetchImageFunction';
import Feather from 'react-native-vector-icons/Feather';
import {ColorSpace} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { removeProfilePicture } from '../../../API_Services/auth_API';
const ProfileImageComponent = ({memberData, uuid}) => {
  // console.log(uuid, 'Line 27');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  // Fetching profile Image
  useEffect(() => {
    FetchImageFromAWS({path: memberData?.member_image_url, setProfileImage});
    // setUuidForImageDelete(uuid);
    // fetchImage();
  }, [memberData?.member_image_url, setProfileImage]);

  // Gallery Opener
  const galleryOpen = async () => {
    try {
      const options = {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
      };

      launchImageLibrary(options, async response => {
        if (response.didCancel) {
          console.log('User Cancel Image Picker');
        } else if (response.error) {
          console.log('Image Picker Error:', response.error);
        } else {
          let imageUri = response.uri || response.assets[0]?.uri;
          setIsModalVisible(false);
          setProfileImage(imageUri);
          console.log(imageUri, 'Line 31');

          // Now send the image to the server
          await updateProfilePicture(imageUri);
        }
      });
    } catch (error) {
      console.log('Error in Open Image Picker:', error.message);
    }
  };
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs access to your camera.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission granted');
        return true;
      } else {
        console.log('Camera permission denied');
        return false;
      }
    } catch (error) {
      console.warn('Error requesting camera permission:', error);
      return false;
    }
  };

  const openCameraPlatform = () => {
    if (Platform.OS === 'ios') {
      openCameraIOS();
    } else {
      openCameraAndroid();
    }
  };

  const openCameraAndroid = async () => {
    console.log('Camera Opening');
    const permissionGranted = await requestCameraPermission();
    if (permissionGranted) {
      openCamera();
    } else {
      console.log('Camera permission denied, cannot open camera.');
    }
  };

  // Function to open camera (iOS)
  const openCameraIOS = () => {
    openCamera();
  };

  // Generic function to open camera
  const openCamera = () => {
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
          setProfileImage(imageUri);

          await updateProfilePicture(imageUri);
        }
      });
    } catch (error) {
      console.log('Error in Opening camera', error.message);
    }
  };

  // Updating Profile Picture
  const updateProfilePicture = async imageUri => {
    try {
      const token = await GET_USER_TOKEN();
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      };
      const formData = new FormData();
      formData.append('uuid', uuid);
      formData.append('file', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'profileImage.jpg',
      });
      console.log(`${serverAddress}/member/edit/details`, 'Line 216');
      const response = await axios.post(
        `${serverAddress}/member/edit/details`,
        formData,
        {headers},
      );
      if (response.data.success) {
        console.log('Profile picture updated successfully');
      } else {
        console.log(
          'Failed to update profile picture:',
          response.data.errorMessage,
        );
      }
    } catch (error) {
      console.log(error, 'Line 55');
    }
  };

  const removeProfilePictureFunction = async () => {
    const uuid = await AsyncStorage.getItem('uuid');
    try {
      const response = await removeProfilePicture(uuid);
      if (response.success) {
        setProfileImage('');
        setIsModalVisible(false);
        Alert.alert('Success', 'Your profile picture removed.');
      } else {
        setIsModalVisible(false);
        Alert.alert('Error', 'Something went wrong.');
        
      }
    } catch (error) {
      console.log(error);
      setIsModalVisible(false);
      Alert.alert('Error', 'Something went wrong.');
    }
  };

  const handleModal = () => setIsModalVisible(() => !isModalVisible);
  return (
    <View style={styles.detailsContainer}>
      {profileImage ? (
        <Image
          source={{
            uri: profileImage,
          }}
          style={styles.imageContainer}
          resizeMode="cover"
        />
      ) : (
        <Image
          source={staticImageURL}
          style={styles.imageContainer}
          resizeMode="cover"
        />
      )}

      <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <View style={styles.icon}>
          <Feather
            name="camera"
            size={responsiveFontSize(25)}
            color={Colors.black}
          />
        </View>
      </TouchableOpacity>
      <Text style={styles.name}>
        {memberData?.first_name} {memberData?.middle_name}{' '}
        {memberData?.last_name}
      </Text>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Update Profile Picture</Text>
          <TouchableOpacity
            onPress={galleryOpen}
            style={styles.touchableOpacityView}>
            <Text style={styles.modalButtonText}>Open Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={openCameraPlatform}
            style={styles.touchableOpacityView}>
            <Text style={styles.modalButtonText}>Open Camera</Text>
          </TouchableOpacity>
          {profileImage && (
            <TouchableOpacity
              onPress={removeProfilePictureFunction}
              style={styles.touchableOpacityView}>
              <Text style={styles.modalButtonText}>Remove Picture</Text>
            </TouchableOpacity>
          )}
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
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: Colors.blue,
    alignItems: 'center',
    marginBottom: responsivePadding(15),
  },
  imageContainer: {
    height: Dimensions.get('screen').width * 0.3,
    width: Dimensions.get('screen').width * 0.3,
    borderRadius: responsivePadding(100),
  },
  profileImageEdit: {
    marginTop: -Dimensions.get('screen').width * 0.07,
    marginLeft: Dimensions.get('screen').width * 0.19,
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
  modalButtonText: {
    fontSize: responsiveFontSize(18),
    fontWeight: '500',
    color: Colors.black,
  },
  name: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(20),
    marginVertical: responsivePadding(20),
  },
  icon: {
    position: 'absolute',
    backgroundColor: Colors.white,
    borderWidth: 2,
    width: responsivePadding(50),
    height: responsivePadding(50),
    borderRadius: responsivePadding(30),
    borderColor: Colors.blue,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -Dimensions.get('screen').width * 0.09,
    // marginLeft: Dimensions.get('screen').width * 0.1,
  },
});

export default ProfileImageComponent;
