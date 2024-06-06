import { StyleSheet, Text, TouchableOpacity, View,Share, } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { responsiveFontSize, responsivePadding } from '../Responsive';
import Colors from '../../Theme/Colors';
import { useNavigation } from '@react-navigation/native';
const DistrictHeader = () => {
const navigation = useNavigation();
const handleShare = async () => {
  try {
    const shareOptions = {
      message: 'Check out this business!',
    };
    await Share.share(shareOptions);
  } catch (error) {
    console.error(error.message);
  }
  // setShowOption(false);
}
  return (
    <View style={styles.main}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons
        name="chevron-back"
        size={responsiveFontSize(30)}
        color={Colors.white}
      />
    </TouchableOpacity>
    <TouchableOpacity 
    onPress={handleShare}
    >
      <Entypo
        name="share"
        size={responsiveFontSize(30)}
        color={Colors.white}
      />
    </TouchableOpacity>
  </View>
  )
}

export default DistrictHeader

const styles = StyleSheet.create({
    main: {
        backgroundColor: Colors.blue,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: responsivePadding(20),
      },
})