import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {notificaton, memberFullDetail,fetchImage} from '../../API_Services/auth_API';
import {
  responsiveFontSize,
  responsivePadding,
} from '../../Compenents/Responsive';
import Colors from '../../Theme/Colors';
import {staticImageURL} from '../../API_Services/API_service';
import moment from 'moment';
import Header from '../../Compenents/Header';

export default function Notification({navigation}) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotificationDetails();
  }, []);

  const fetchNotificationDetails = async () => {
    try {
      const uuid = await AsyncStorage.getItem('memberId');
      // console.log(uuid,"Line 34")
      if (!uuid) {
        throw new Error('UUID not found');
      }
      const response = await notificaton(uuid);
      // console.log(response,"line 39")
      if (!response || !response.data || !Array.isArray(response.data)) {
        throw new Error('Invalid response data');
      }
      const notificationData = response.data;
      // console.log(notificationData,"Line 44")

      // Filter out notifications with visited_by as null or empty array
      const filteredNotifications = notificationData.filter(
        notification =>
          notification.visited_by !== null &&
          notification.visited_by.length > 0,
      );

      if (filteredNotifications.length === 0) {
        setNotifications([]);
      } else {
        const membersData = await Promise.all(
          filteredNotifications.map(async notification => {
            const visitedBy = JSON.parse(notification.visited_by);
            const memberDetails = await Promise.all(
              visitedBy.map(async memberId => {
                const memberResponse = await memberFullDetail(memberId);
                // console.log(memberResponse?.member?.member,"Line 63");
                 const imageUrl = await fetchImage(memberResponse?.member?.member?.member_image_url);
                //  console.log(imageUrl,"Line 65")
                const updatedMember = { ...memberResponse?.member?.member, member_image_url: imageUrl };
                return updatedMember;
              }),
            );
            return memberDetails;
          }),
        );

        // Update state with fetched member details
        setNotifications(membersData);
      }
      setLoading(false);
    } catch (error) {
      // console.error('Error fetching notification details:', error);
      showErrorAlert();
    }
  };

  const showErrorAlert = () => {
    Alert.alert(
      'Error',
      'Something went wrong.',
      [
        {
          text: 'Go Back',
          onPress: () => navigation.goBack(),
          style: 'cancel',
        },
        {text: 'Refresh', onPress: () => fetchNotificationDetails()},
      ],
      {cancelable: false},
    );
  };

  const capitalizeWords = str =>
    str
      .split(' ')
      .filter(s => s) // Filter out empty strings
      .map(s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
      .join(' ');

  const profileView = id => {
    // console.log(id, 'Line 87');
    navigation.navigate('Club Member Profile', {i: {uuid: id}});
  };

  

  const renderNotification = ({ item }) => {
    return item.map((member, index) => (
      <TouchableOpacity
        key={index}
        style={styles.notificationContainer}
        onPress={() => profileView(member?.uuid)}
      >
        <View style={styles.userInfoContainer}>
          {member?.member_image_url ? (
            <Image
              source={{ uri: member?.member_image_url }}
              style={styles.userImage}
              resizeMode="cover"
            />
          ) : (
            <Image
              source={staticImageURL}
              style={styles.userImage}
              resizeMode="cover"
            />
          )}
  
          <View style={styles.userInfo}>
            <Text style={styles.userName}>
              {`${capitalizeWords(member?.first_name || '')} ${capitalizeWords(member?.middle_name || '')} ${capitalizeWords(member?.last_name || '')}`}
            </Text>
            <Text style={styles.notificationText}>viewed your profile</Text>
          </View>
        </View>
        <Text style={styles.timeText}>
          {moment(member.updated_at).format('h:mm A')}
        </Text>
      </TouchableOpacity>
    ));
  };
  
  
  

  const renderNoNotifications = () => (
    <View style={styles.noNotificationsContainer}>
      <Text style={styles.loaderText}>No notifications found</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title={'Notification'} />
      {loading ? (
        <View style={styles.loader}>
           <ActivityIndicator size="large" color={Colors.primary} />
           <Text style={styles.loaderText}>Please wait...</Text>
          </View>
       
      ) : notifications.length > 0 ? (
        <FlatList
          data={notifications}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderNotification}
        />
      ) : (
        renderNoNotifications()
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  notificationContainer: {
    flexDirection: 'row',
    padding: responsivePadding(10),
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    height: responsivePadding(50),
    width: responsivePadding(50),
    borderRadius: responsivePadding(25),
    backgroundColor: Colors.lightGray,
  },
  userInfo: {
    marginLeft: responsivePadding(10),
  },
  userName: {
    color: Colors.black,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(16),
  },
  notificationText: {
    color: Colors.black,
  },
  timeText: {
    color: Colors.black,
  },
  noNotificationsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    gap:10
  },
  loaderText:{
    fontSize:responsiveFontSize(18),
    fontWeight:'600',
    color:Colors.blue
  }
});
