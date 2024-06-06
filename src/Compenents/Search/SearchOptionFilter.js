import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';

import Colors from '../../Theme/Colors';
import {FontSize} from '../../Theme/Fonts';
import {responsiveFontSize, responsivePadding} from '../Responsive';

export default function SearchOptionFilter({
  value,
  handleValue,
  updateBusinessData,
  updatedMemberData,
  selectedState,
  selectedCity,
  selectedClubs,
}) {
  // console.log(value, "Line 12")

  const navigation = useNavigation();

  const [isModalVisible, setModalVisible] = useState(false);
  const [listValue, setListValue] = useState(value);

  const handleAction = e => {
    setListValue(e.title);
    handleValue(e.title);
    setModalVisible(false);
  };

  const list = [
    {id: '1', title: 'Member'},
    {id: '2', title: 'Business'},
  ];

  return (
    <View style={styles.searchcontainer}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.listContainer}>
        <Text style={{color: Colors.black}}>{listValue}</Text>
        <FontAwesome
          name="sort"
          size={responsiveFontSize(20)}
          color={Colors.text_grey}
          style={styles.iconMargin}
        />
      </TouchableOpacity>

      {value === 'Business' && (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('FilterScreen', {
              updateBusinessData,
              selectedState,
              selectedCity,
            })
          }>
          <Ionicons
            name="filter-outline"
            size={responsiveFontSize(25)}
            color={Colors.text_grey}
            style={styles.iconMargin}
          />
        </TouchableOpacity>
      )}
      {value === 'Member' && (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('FilterScreen', {
              updatedMemberData,
              selectedState,
              selectedCity,
              selectedClubs,
            })
          }>
          <Ionicons
            name="filter-outline"
            size={responsiveFontSize(25)}
            color={Colors.text_grey}
            style={styles.iconMargin}
          />
        </TouchableOpacity>
      )}
      <Modal
        isVisible={isModalVisible}
        backdropOpacity={0.8}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}>
        <View style={styles.modelContainer}>
          {list.map(e => (
            <TouchableOpacity
              style={styles.modalHolder}
              key={e.id}
              onPress={
                () => handleAction(e)
                // Pass the callback function to FilterScreen
              }>
              <Text style={styles.modelText}>{e.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  searchcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    justifyContent: 'space-around',
    borderColor: Colors.border_grey,
    paddingHorizontal: responsivePadding(10),
    backgroundColor: Colors.white,
  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconMargin: {
    margin: responsivePadding(10),
  },
  modelContainer: {
    backgroundColor: Colors.white,
    padding: responsivePadding(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsivePadding(5),
  },
  modelText: {
    padding: responsivePadding(10),
    fontSize: responsiveFontSize(18),
    color: Colors.black,
    fontWeight: '600',
  },
  modalHolder: {marginVertical: 5, width: '100%', alignItems: 'center'},
});
