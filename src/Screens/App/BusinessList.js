import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Linking,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import Colors from '../../Theme/Colors';
import {GET_USER_DETAILS, staticImageURL} from '../../API_Services/API_service';
import Feather from 'react-native-vector-icons/Feather';
import Search from '../../Compenents/Search/Search';
import {
  responsiveFontSize,
  responsivePadding,
} from '../../Compenents/Responsive';
import {fetchImage, viewContact, viewProfile} from '../../API_Services/auth_API';

export default function BusinessList({list,showIcon}) {
  // console.log(list,"Line 27")
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(list);
  const [isLoading, setIsLoading] = useState(true);
  const [uuid, setUuid] = useState();
  const [imageUrls, setImageUrls] = useState({});

  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleCall = async(item) => {
    const userData = await GET_USER_DETAILS();
    // console.log(userData,"Line 41")
    setUuid(userData?.uuid);
    const data = {
      profileUuid:item?.member?.uuid,
      viewerUuid: userData?.uuid,
    };
    // console.log(data,"Line 49")
    const response = await viewContact(data)
    console.log(response,"Line 50")
    Linking.openURL(`tel:+91${item?.member?.phone_number}`)
  }

  const OpenNextScreen = async item => {
    // console.log(item,"Line 42")
    const id = item?.id;
    const uuid=item?.member?.uuid
    const userData = await GET_USER_DETAILS();
    // console.log(userData,"Line 41")
    setUuid(userData?.uuid);
    const data = {
      profileUuid:item?.member?.uuid,
      viewerUuid: userData?.uuid,
    };
    const response = await viewProfile(data);
    console.log(response,"Line 50")
    navigation.navigate('Bussiness Details', {id, item,uuid,showIcon});

    // console.log(response,"Line 47")
  };

  useEffect(() => {
    const filteredList = list.filter(item => {
      const businessName = item.business_name.toLowerCase();
      const memberName =
        `${item.member.first_name} ${item.member.last_name}`.toLowerCase();
      const clubName = item.member.club.name.toLowerCase();
      const businessAddress = item.business_address.toLowerCase();
      return (
        businessName.includes(searchText.toLowerCase()) ||
        memberName.includes(searchText.toLowerCase()) ||
        clubName.includes(searchText.toLowerCase()) ||
        businessAddress.includes(searchText.toLowerCase())
      );
    });
    const sortedList = filteredList.sort((a, b) =>
      a.business_name.localeCompare(b.business_name),
    );

    setFilteredData(sortedList);
    const blurListener = navigation.addListener('blur', () => {
      setSearchText('');
    });

    const focusListener = navigation.addListener('focus', () => {
      setSearchText('');
    });

    // Cleanup the listeners
    return () => {
      blurListener();
      focusListener();
    };
  }, [searchText, list, navigation]);

  useEffect(() => {
    // Fetch and store image URLs
    const fetchImageUrls = async () => {
      const urls = {};
      for (const item of list) {
        if (item.business_logo) {
          try {
            const imageUrl = await fetchImage(item.business_logo);
            urls[item.id] = imageUrl;
          } catch (error) {
            console.error('Error fetching image:', error);
            // Set a fallback image URL in case of error
            urls[item.id] = 'Fallback or error image URL';
          }
        }
      }
      setImageUrls(urls);
    };

    fetchImageUrls();
  }, [list]);


  const renderItem = ({item}) => {
    return (
      <View style={styles.listContainer}>
         {imageUrls[item.id] ? (
          <Image
            source={{ uri: imageUrls[item.id] }}
            style={styles.imageContainer}
          />
        ) : (
          <Image source={staticImageURL} style={styles.imageContainer} />
        )}

        <View style={styles.detailContainer}>
          <Text style={styles.detailTitle}>{item?.business_name}</Text>
          <View style={{paddingVertical: responsivePadding(10)}}>
            <View style={styles.detailList}>
              <Ionicons
                name="person"
                size={responsiveFontSize(15)}
                color={Colors.text_grey}
                style={styles.iconStyle}
              />
              <Text style={{color: Colors.black}}>
                {item?.member?.first_name} {item?.member?.last_name}
              </Text>
            </View>
            <View style={styles.detailList}>
              <Entypo
                name="home"
                size={responsiveFontSize(15)}
                color={Colors.text_grey}
                style={styles.iconStyle}
              />
              <Text style={{color: Colors.black}}>
                {item?.member?.club?.name}
              </Text>
            </View>
            <View style={[styles.detailList, {overflow: 'hidden'}]}>
              <Ionicons
                name="location-sharp"
                size={responsiveFontSize(15)}
                color={Colors.text_grey}
                style={styles.iconStyle}
              />
              <Text style={{color: Colors.black}}>
                {item?.business_address}
              </Text>
            </View>
          </View>

          <View style={styles.buttonView}>
            <TouchableOpacity
              style={styles.container}
              onPress={() => OpenNextScreen(item)}>
              <Text style={styles.textStyle}>View Details</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.container}
              onPress={()=> handleCall(item)}
              // onPress={() =>
              //   Linking.openURL(`tel:+91${item?.member?.phone_number}`)
              // }
              >
              <Feather
                name="phone-call"
                size={responsiveFontSize(22)}
                color={Colors.white}
                style={styles.iconStyle}
              />
              <Text style={styles.textStyle}>Call</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.SepraterLine} />
      </View>
    );
  };

  const handleSearch = text => {
    setSearchText(text);
  };

  return (
    <View style={{backgroundColor: Colors.white, height: '100%'}}>
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          marginVertical: responsivePadding(5),
        }}>
        <Search search={handleSearch} />
      </View>
      <View style={{flex: 1}}>
        {isLoading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator
              size="large"
              color={Colors.primary}
              style={styles.indicator}
            />
            <Text
              style={{
                marginVertical: responsivePadding(10),
                fontSize: responsiveFontSize(16),
                color: Colors.black,
              }}>
              Loading Business List...
            </Text>
          </View>
        ) : (
          <View style={{}}>
            {filteredData.length === 0 ? (
              <View style={styles.noContainer}>
                <Text style={styles.noResultText}>No business available.</Text>
              </View>
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                style={{marginBottom: Dimensions.get('screen').width * 0.25}}
              />
            )}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  SepraterLine: {
    backgroundColor: Colors.border_grey,
    height: responsivePadding(0.7),
    marginVertical: responsivePadding(15),
  },
  listContainer: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    marginHorizontal: responsivePadding(10),
    marginTop: responsivePadding(15),
    width: Dimensions.get('screen').width * 0.95,
    borderRadius: responsivePadding(10),
    alignItems: 'center',
    elevation: responsivePadding(10),
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: responsivePadding(2),
    },
  },
  imageContainer: {
    backgroundColor: Colors.border_grey,
    height: Dimensions.get('screen').width * 0.34,
    width: '28%',
    marginHorizontal: responsivePadding(5),
    borderRadius: responsivePadding(10),
  },
  detailContainer: {
    marginHorizontal: responsivePadding(5),
    width: '66%',
  },
  detailList: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailTitle: {
    color: Colors.black,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(18),
    maxHeight: responsivePadding(48),
    paddingLeft: responsivePadding(5),
    paddingTop:responsivePadding(10)
  },
  iconStyle: {
    paddingVertical: responsivePadding(5),
    paddingRight: responsivePadding(10),
  },
  container: {
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
    fontSize: responsiveFontSize(17),
  },
  iconStyle: {
    paddingHorizontal: responsivePadding(7),
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  loaderContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    padding: responsivePadding(12),
    backgroundColor: '#555',
    borderRadius: responsivePadding(12),
  },
  noResultText: {
    textAlign: 'center',
    fontSize: responsiveFontSize(16),
    color: Colors.black,
  },
  noContainer: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
