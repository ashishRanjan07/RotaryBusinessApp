import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Linking,
  Image,
  Share,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../Theme/Colors';
import {FontSize} from '../Theme/Fonts';
import BGYButton from './Buttons/BGYButton';
import Feather from 'react-native-vector-icons/Feather';
import {responsiveFontSize, responsivePadding} from './Responsive';
import {deleteBusiness, fetchImage} from '../API_Services/auth_API';

export default function BusinessDetail({data, userData, uuid, showIcon}) {
  // console.log(showIcon, 'Line 23');
  // console.log(data?.business_logo, 'Line 26');
  // console.log(userData,"Line 27");
  // console.log(data,"Line 28")
  const navigation = useNavigation();
  const [showOption, setShowOption] = useState(false);
  const [images, setImages] = useState([]);
  const [logoImage, setLogoImage] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      // Fetch the image URLs from the API
      const imageUrls = [];

      if (data.business_image_one) {
        const imageUrlOne = await fetchImage(data.business_image_one);
        imageUrls.push(imageUrlOne);
      }

      if (data.business_image_two) {
        const imageUrlTwo = await fetchImage(data.business_image_two);
        imageUrls.push(imageUrlTwo);
      }

      if (data?.business_logo) {
        const logo = await fetchImage(data?.business_logo);
        setLogoImage(logo);
      }

      // If both URLs are not available, use the static images
      if (imageUrls.length === 0) {
        imageUrls.push('https://picsum.photos/300');
        imageUrls.push('https://picsum.photos/300');
      }

      // Set the images state with the fetched URLs or static images
      setImages(imageUrls);
    };
    fetchImages();
  }, [data.business_image_one, data.business_image_two]);

  const handleDelete = async () => {
    const response = await deleteBusiness(data?.id);
    console.log(response, 'Line 49');
    if (response.success) {
      Alert.alert('Success', 'Business Deleted Successfully');
      navigation.push('TabStack');
    }
    setShowOption(false);
    // console.log("Delete Pressed");
  };

  const handleEdit = async () => {
    // console.log(userData, 'Line 63');
    navigation.push('Edit Business', {
      businessData: data,
      businessImage: images,
      businessLogo: logoImage,
    });
    setShowOption(false);
    console.log('Edit Pressed');
  };

  const handleShare = async () => {
    console.log(data, 'Line 70');
    try {
      const shareOptions = {
        message:
          `Check out ${data.business_name} in ${data.city.name}!\n\n` +
          `Description: ${data.business_desc}\n\n` +
          `Owner: ${data.member.first_name} ${data.member.last_name}\n` +
          `Club: ${data.member.club.name}\n` +
          `Phone: ${data.member.phone_number}`,
      };
      await Share.share(shareOptions);
    } catch (error) {
      console.error(error.message);
    }
    setShowOption(false);
  };
  return (
    <View>
      <Swiper
        style={styles.swiperContainer}
        showsButtons={false}
        showsPagination={false}
        autoplay={true}
        autoplayTimeout={2}>
        {images.map((imageUrl, index) => (
          <Image
            key={index}
            source={{uri: imageUrl}}
            style={styles.swiperImage}
          />
        ))}
      </Swiper>
      {showIcon && (
        <View style={styles.dotHolder}>
          <TouchableOpacity
            onPress={() => setShowOption(!showOption)}
            style={{
              borderWidth: 2,
              borderColor: Colors.border_grey,
              backgroundColor: Colors.backGround_grey,
              borderRadius: responsivePadding(5),
              padding: responsivePadding(5),
            }}>
            <Entypo
              name="dots-three-vertical"
              size={responsiveFontSize(30)}
              color={Colors.black}
            />
          </TouchableOpacity>
          {showOption && (
            <View style={styles.optionList}>
              {/* <TouchableOpacity onPress={handleEdit}>
                <Text style={styles.optionItem}>Edit</Text>
              </TouchableOpacity> */}
              <TouchableOpacity onPress={handleDelete}>
                <Text style={styles.optionItem}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleShare}>
                <Text style={styles.optionItem}>Share</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowOption(!showOption)}>
                <Text style={styles.optionItem}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
      <View style={styles.detailContainer}>
        <Text style={styles.title}>{data?.business_name}</Text>

        <View style={styles.detailListContainer}>
          <View style={styles.detailList}>
            <Ionicons
              name="person"
              size={responsiveFontSize(20)}
              color={Colors.yellow}
              style={styles.iconStyle}
            />
            <Text style={styles.text}>{data?.member?.club?.name}</Text>
          </View>
          <View style={styles.detailList}>
            <Ionicons
              name="location-sharp"
              size={responsiveFontSize(20)}
              color={Colors.yellow}
              style={styles.iconStyle}
            />
            <Text style={styles.text}>{data?.business_address}</Text>
          </View>
        </View>

        <Text style={[styles.text, {width: '100%'}]}>
          {data?.business_desc}
        </Text>

        <View style={styles.buttonContainer}>
          {showIcon ? (
            <TouchableOpacity
              style={styles.container3}
              onPress={handleEdit}
              >
              <Feather
                name="edit"
                size={responsiveFontSize(22)}
                color={Colors.white}
                style={styles.iconStyle}
              />
              <Text style={styles.textStyle}>EDIT</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.container3}
              onPress={() =>
                Linking.openURL(`tel:+91${data?.member?.phone_number}`)
              }>
              <Feather
                name="phone-call"
                size={responsiveFontSize(22)}
                color={Colors.white}
                style={styles.iconStyle}
              />
              <Text style={styles.textStyle}>Call</Text>
            </TouchableOpacity>
          )}

          <BGYButton
            icon="person"
            title={'View Owner'}
            handleAction={() =>
              navigation.navigate('View Owner', {data, userData, uuid})
            }
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    height: Dimensions.get('screen').width * 0.5,
    width: Dimensions.get('screen').width,
  },
  headerIconContainer: {
    position: 'absolute',
    padding: responsivePadding(10),
  },
  detailContainer: {
    margin: responsivePadding(10),
  },
  title: {
    color: Colors.black,
    fontSize: FontSize.fontSize20,
    fontWeight: 'bold',
  },
  detailListContainer: {
    marginVertical: responsivePadding(10),
  },
  detailList: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    paddingVertical: responsivePadding(5),
    paddingRight: responsivePadding(10),
  },
  buttonContainer: {
    marginTop: responsivePadding(10),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  container3: {
    width: '40%',
    gap: responsivePadding(4),
    marginVertical: responsivePadding(10),
    padding: responsivePadding(10),
    borderRadius: responsivePadding(10),
    backgroundColor: Colors.yellow,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: Colors.white,
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 0.5,
    fontSize: FontSize.fontSize17,
  },
  swiperContainer: {
    height: Dimensions.get('screen').width * 0.5,
  },
  swiperImage: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').width * 0.5,
  },
  text: {
    color: Colors.black,
    width: '90%',
    fontSize: responsiveFontSize(15),
  },
  dotHolder: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 1,
  },
  optionList: {
    position: 'absolute',
    top: responsivePadding(40),
    right: responsivePadding(5),
    backgroundColor: Colors.white,
    borderRadius: responsivePadding(5),
    elevation: responsivePadding(3),
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: responsivePadding(2),
    },
    padding: responsivePadding(10),
    width: 150,
    flexDirection: 'column',
    gap: 10,
  },
  optionItem: {
    color: Colors.black,
    fontSize: responsiveFontSize(18),
    fontWeight: '500',
    textAlign: 'center',
    padding: 10,
    borderColor: Colors.black,
  },
});
