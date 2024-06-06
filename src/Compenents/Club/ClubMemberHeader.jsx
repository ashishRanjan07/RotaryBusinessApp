import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Colors from '../../Theme/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import {responsiveFontSize, responsivePadding} from '../Responsive';
import {useNavigation} from '@react-navigation/native';
const ClubMemberHeader = ({memberData}) => {
  // console.log(memberData?.club?.name,"line 10")
  const navigation = useNavigation();

  return (
    <View style={styles.main}>
      <TouchableOpacity onPress={() => navigation.push('TabStack')}>
        <Ionicons
          name="chevron-back"
          size={responsiveFontSize(30)}
          color={Colors.white}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Entypo
          name="share"
          size={responsiveFontSize(30)}
          color={Colors.white}
        />
      </TouchableOpacity>
    </View>
  );
};
export default ClubMemberHeader;

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.blue,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: responsivePadding(20),
  },
});
