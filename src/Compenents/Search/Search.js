import {View, TextInput, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../../Theme/Colors';
import {responsiveFontSize, responsivePadding} from '../Responsive';
import { useNavigation } from '@react-navigation/native';

export default function Search({search}) {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');

  const handleChange = text => {
    setSearchText(text);
    search(text);
  };

  useEffect(() => {
    // Reset search text when navigation state changes (user changes tabs)
    const unsubscribe = navigation.addListener('tabPress', () => {
      // console.log("hii")
      setSearchText('');
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.searchContainer}>
      <View style={styles.iconHolder}>
        <FontAwesome
          name="search"
          size={responsiveFontSize(25)}
          color={Colors.text_grey}
        />
      </View>

      <TextInput
        onChangeText={handleChange}
        style={styles.inputTextArea}
        placeholder={'Search'}
        value={searchText}
        placeholderTextColor={Colors.text_grey}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    borderWidth: responsivePadding(2),
    borderRadius: responsivePadding(5),
    borderColor: Colors.border_grey,
    height: responsivePadding(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    alignItems: 'center',
    width: '95%',
    alignSelf: 'center',
    paddingHorizontal: responsivePadding(10),
    gap: responsivePadding(10),
  },
  inputTextArea: {
    width: '85%',
    color: Colors.black,
    fontSize: responsiveFontSize(18),
    fontWeight: '400',
  },
  iconHolder: {
    width: '10%',
    alignItems: 'center',
  },
});
