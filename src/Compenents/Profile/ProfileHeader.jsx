import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Colors from '../../Theme/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {responsiveFontSize, responsivePadding} from '../Responsive';
import {useNavigation} from '@react-navigation/native';
const ProfileHeader = ({ memberData, getData }) => {
  const navigation = useNavigation();

  const handleEditProfile = () => {
    navigation.navigate('Edit Profile Screen', { memberData: memberData, onRefresh: getData });
  }

  return (
    <View style={styles.main}>
      <TouchableOpacity onPress={() => navigation.push('TabStack')}>
        <Ionicons
          name="chevron-back"
          size={responsiveFontSize(30)}
          color={Colors.white}
        />
      </TouchableOpacity>
     <TouchableOpacity onPress={handleEditProfile}>
    <Feather name="edit" size={responsiveFontSize(30)} color={Colors.white}/>
</TouchableOpacity>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.blue,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: responsivePadding(20),
  },
});
