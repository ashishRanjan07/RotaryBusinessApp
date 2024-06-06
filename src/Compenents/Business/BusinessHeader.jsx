import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {responsiveFontSize, responsivePadding} from '../Responsive';
import Colors from '../../Theme/Colors';
import {useNavigation} from '@react-navigation/native';
const BusinessHeader = () => {
  const navigation = useNavigation();
  const handleShare = async () => {};
  return (
    <View style={styles.main}>
      <TouchableOpacity onPress={() => navigation.push('TabStack')}>
        <Ionicons
          name="chevron-back"
          size={responsiveFontSize(30)}
          color={Colors.white}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleShare}>
        <Entypo
          name="share"
          size={responsiveFontSize(30)}
          color={Colors.white}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BusinessHeader;

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.blue,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: responsivePadding(20),
  },
});
