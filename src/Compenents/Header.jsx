import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Colors from '../Theme/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {responsiveFontSize, responsivePadding} from './Responsive';
import {useNavigation} from '@react-navigation/native';

const Header = ({title}) => {
  const navigation = useNavigation();
  return (
    <>
      <SafeAreaView style={{backgroundColor: Colors.white}} />
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <View style={styles.main}>
        <TouchableOpacity
          style={styles.iconHolder}
          onPress={() => navigation.goBack()}>
          <AntDesign
            name="arrowleft"
            size={responsiveFontSize(30)}
            color={Colors.black}
          />
        </TouchableOpacity>
        <View style={{width: '60%'}}>
          <Text style={styles.text}>{title}</Text>
        </View>
      </View>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.white,
    borderColor: Colors.black,
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsivePadding(10),
    paddingVertical:responsivePadding(10)
  },
  text: {
    fontSize: responsiveFontSize(18),
    fontWeight: '600',
    color: Colors.black,
    textAlign: 'center',
  },
  iconHolder: {
    marginHorizontal: responsivePadding(20),
  },
  separateLine: {
    borderWidth: 0.5,
    borderColor: Colors.black,
    backgroundColor: Colors.black,
    marginVertical: responsivePadding(5),
  },
});
