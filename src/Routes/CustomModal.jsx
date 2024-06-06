import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Colors from '../Theme/Colors';
import Feather from 'react-native-vector-icons/Feather';
import {responsiveFontSize, responsivePadding} from '../Compenents/Responsive';
import {AuthContext} from '../Constant/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FetchImageFromAWS} from '../Compenents/FetchImageFunction';
import {GET_USER_DETAILS, staticImageURL} from '../API_Services/API_service';
import {
  fetchImage,
  getAllCityList,
  getAllStateList,
  memberFullDetail,
  viewProfile,
} from '../API_Services/auth_API';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const CustomModal = ({visible, onClose}) => {
  const navigation = useNavigation();
  const {signOut} = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [businessData, setBusinessData] = useState([]);
  const [clubData, setClubData] = useState([]);
  const [userId, setUserId] = useState();
  const [city, setCity] = useState();
  const [viewBusiness, setViewBusiness] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    // Perform logout action here
    onClose();
    signOut();
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem(
          'userBasicLoginDetails',
        );
        const userData = JSON.parse(userDataString);
        setUserData(userData);
        // console.log(userData,"Line 58")
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    FetchImageFromAWS({path: userData?.member_image_url, setProfileImage});
  }, [userData?.member_image_url, userData?.uuid, setProfileImage]);

  useEffect(() => {
    getData();
    getAllStateListData();
    getAllCityListData();
  }, []);

  const getAllStateListData = async () => {
    const response = await getAllStateList();
    // console.log(response,"Line 51");
  };
  const getAllCityListData = async () => {
    const uuid = JSON.parse(await AsyncStorage.getItem('memberId'));
    setUserId(uuid);
    const response = await getAllCityList();
    setCity(response);
  };

  const getData = async () => {
    const userData = await GET_USER_DETAILS();
    const id = userData?.uuid;
    const response = await memberFullDetail(id);
    if (response?.success) {
      setBusinessData(response?.member?.business);
      // console.log(response?.member?.member?.member_image_url,"Line 93");
      setClubData(response?.member?.member.club);
      const response2 = await fetchImage(response?.member?.member?.member_image_url);
      // console.log(response2,"Line 97");
      setProfileImage(response2)
    } else {
      Alert.alert('Member Full Details API Error', response?.errorMessage);
    }
    setLoading(false);
  };

  const addBusiness = () => {
    onClose();
    navigation.navigate('Add Business', {
      cityData: city,
      userId: userId,
    });
  };

  const OpenNextScreen = async business => {
    onClose();
    const id = business?.id;
    const userData = await GET_USER_DETAILS();
    const data = {
      uuid: userData?.uuid,
    };
    const response = await viewProfile(data);
    navigation.push('Bussiness Details', {id, business,showIcon:true,uuid:userData?.uuid});
  };

  return (
    <Modal transparent visible={visible} animationType="none">
      <StatusBar backgroundColor={Colors.blue}/>
      <SafeAreaView style={{backgroundColor: Colors.blue}} />
      <View style={styles.container}>
        {/* User Profile Section */}
        <View style={styles.profileSection}>
          {profileImage ? (
            <Image
              source={{
                uri: profileImage,
              }}
              style={styles.profileImage}
              resizeMode="cover"
            />
          ) : (
            <Image
              source={staticImageURL}
              style={styles.profileImage}
              resizeMode="cover"
            />
          )}
          <Text style={styles.username}>
            {userData?.first_name} {userData?.last_name}
          </Text>
          <Text style={styles.clubName}>{clubData?.name}</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Navigation Section */}
          <View style={styles.navigationSection}>
            <TouchableOpacity
              style={styles.ItemHolderContainer}
              onPress={() => {
                onClose();
                navigation.navigate('Profile');
              }}>
              <View style={styles.ItemHolder}>
                <Feather
                  name="user"
                  size={responsiveFontSize(30)}
                  color={Colors.yellow}
                />
                <Text style={styles.text}>View my profile</Text>
              </View>
              <Feather
                name="chevron-right"
                size={responsiveFontSize(25)}
                color={Colors.black}
              />
            </TouchableOpacity>
            {/* Add Products */}
            <TouchableOpacity
              style={styles.ItemHolderContainer}
              onPress={() => {
                onClose();
                navigation.push('Add Products');
              }}>
              <View style={styles.ItemHolder}>
                <Feather
                  name="user"
                  size={responsiveFontSize(30)}
                  color={Colors.yellow}
                />
                <Text style={styles.text}>Add product</Text>
              </View>
              <Feather
                name="chevron-right"
                size={responsiveFontSize(25)}
                color={Colors.black}
              />
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={styles.ItemHolderContainer}
              onPress={() => {
                onClose();
                navigation.navigate('View All Products', {data: businessData});
              }}>
              <View style={styles.ItemHolder}>
                <FontAwesome
                  name="product-hunt"
                  size={responsiveFontSize(30)}
                  color={Colors.yellow}
                />
                <Text style={styles.text}>View all products</Text>
              </View>
              <Feather
                name="chevron-right"
                size={responsiveFontSize(25)}
                color={Colors.black}
              />
            </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.ItemHolderContainer}
              onPress={() => setViewBusiness(!viewBusiness)}>
              <View style={styles.ItemHolder}>
                <Feather
                  name="shopping-bag"
                  size={responsiveFontSize(30)}
                  color={Colors.yellow}
                />
                <Text style={styles.text}>View my business</Text>
              </View>
              <Feather
                name={!viewBusiness ? 'chevron-right' : 'chevron-down'}
                size={responsiveFontSize(25)}
                color={Colors.black}
              />
            </TouchableOpacity>

            {viewBusiness && (
              <View style={styles.businessHolder}>
                {loading ? (
                  <View style={styles.activityHolder}>
                    <ActivityIndicator size={'large'} color={Colors.blue} />
                    <Text style={styles.text}>Loading Business..</Text>
                  </View>
                ) : (
                  <ScrollView
                    style={styles.container2}
                    showsVerticalScrollIndicator={false}>
                    {businessData.length === 0 ? (
                      <Text style={styles.noDataText}>No business found</Text>
                    ) : (
                      businessData.map((business, index) => (
                        <View key={index}>
                          <TouchableOpacity
                            onPress={() => OpenNextScreen(business)}
                            style={styles.view}>
                            <Image
                              source={require('../Assets/Images/Tab/tab2high.png')}
                              style={{
                                height: responsivePadding(30),
                                width: responsivePadding(30),
                              }}
                            />
                            <Text style={styles.text1}>
                              {business.business_name}
                            </Text>
                          </TouchableOpacity>
                          <View
                            style={{
                              borderWidth: 1,
                              borderColor: Colors.border_grey,
                            }}
                          />
                        </View>
                      ))
                    )}
                    {viewBusiness && (
                      <TouchableOpacity
                        style={styles.buttonHolder}
                        onPress={addBusiness}>
                        <Ionicons
                          name="add-circle-outline"
                          size={responsiveFontSize(25)}
                          color={Colors.white}
                        />
                        <Text style={styles.buttonText}>Add Business</Text>
                      </TouchableOpacity>
                    )}
                  </ScrollView>
                )}
              </View>
            )}
          </View>

          {/* Logout Section */}
          <View style={{borderWidth: 1, borderColor: Colors.text_grey}} />
          <View style={styles.logoutSection} onPress={handleLogout}>
            <TouchableOpacity
              style={[styles.ItemHolder, {padding: 20}]}
              onPress={handleLogout}>
              <Feather
                name="power"
                size={responsiveFontSize(30)}
                color={Colors.red}
              />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {/* Close button */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Feather
            name="x"
            size={responsiveFontSize(30)}
            color={Colors.border_grey}
          />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '70%',
    // paddingTop: responsivePadding(40),
    backgroundColor: Colors.white,
  },
  profileSection: {
    flexDirection: 'column',
    width: '100%',
    height: responsivePadding(300),
    paddingHorizontal: responsivePadding(20),
    gap: 10,
    backgroundColor: Colors.blue,
    paddingVertical: responsivePadding(50),
  },
  profileImage: {
    width: responsivePadding(125),
    height: responsivePadding(125),
    borderRadius: responsivePadding(100),
  },
  username: {
    fontSize: responsiveFontSize(18),
    fontWeight: '500',
    color: Colors.white,
    marginVertical: 5,
  },
  clubName: {
    fontSize: responsiveFontSize(16),
    color: Colors.white,
    fontWeight: '400',
  },
  navigationSection: {
    backgroundColor: Colors.white,
    gap: 10,
    paddingBottom: 10,
  },
  ItemHolderContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ItemHolder: {
    flexDirection: 'row',
    padding: 10,
    gap: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: responsiveFontSize(18),
    color: Colors.black,
    fontWeight: '500',
  },
  logoutSection: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  logoutText: {
    color: Colors.red,
    fontSize: responsiveFontSize(18),
    fontWeight: '500',
  },
  closeButton: {
    borderWidth:responsivePadding(2),
    borderRadius:responsivePadding(5),
    marginTop:responsivePadding(20),
    position: 'absolute',
    right: responsivePadding(20),
    borderColor:Colors.border_grey
  },
  imageContainer: {
    height: Dimensions.get('screen').width * 0.3,
    width: Dimensions.get('screen').width * 0.3,
    borderRadius: responsivePadding(100),
  },
  text2: {
    fontSize: responsiveFontSize(16),
    fontWeight: '600',
    color: Colors.black,
  },
  loader: {
    flex: 1,
    marginTop: responsivePadding(20),
    justifyContent: 'center',
    alignItems: 'center',
    gap: responsivePadding(20),
    flexDirection: 'row',
    borderWidth: 2,
  },
  businessHolderView: {
    // borderWidth: 2,
    // width: '80%',
    // alignSelf: 'flex-end',
    // marginVertical: 10,
    // marginHorizontal: 20,
    width: '100%', // Ensure full width for proper scrolling
    alignSelf: 'flex-end',
  },
  activityHolder: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
  },
  businessHolder: {
    // borderWidth: 2,
    width: '90%',
    alignSelf: 'flex-end',
    // margin: 20,
  },
  text1: {
    width:'80%',
    fontSize: responsiveFontSize(18),
    fontWeight: 'bold',
    color: Colors.black,
  },
  container2: {
    flex: 1,
    padding: responsivePadding(10),
  },
  noDataText: {
    fontSize: responsiveFontSize(18),
    textAlign: 'center',
    color: Colors.text_grey,
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginVertical: 10,
  },
  buttonHolder: {
    borderWidth: 2,
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
    height: responsivePadding(50),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: Colors.yellow,
    borderColor: Colors.yellow,
  },
  buttonText: {
    color: Colors.white,
    fontSize: responsiveFontSize(20),
    fontWeight: '500',
  },
});

export default CustomModal;
