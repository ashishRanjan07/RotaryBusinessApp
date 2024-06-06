import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../../Theme/Colors';
import Header from '../Header';
import {TextInput} from 'react-native-paper';
import {responsiveFontSize, responsivePadding} from '../Responsive';
import {EDIT_WORK_DETAILS} from '../../API_Services/API_service';
import {useNavigation} from '@react-navigation/native';
import ModalSelector from 'react-native-modal-selector';
import moment from 'moment';
import Modal from 'react-native-modal';
import CalendarPicker from 'react-native-calendar-picker';

const EditProfileScreen = ({route}) => {
  const navigation = useNavigation();
  const {memberData, onRefresh} = route.params;
  // console.log(memberData,"Line 18")
  const [email, setEmail] = useState(
    memberData?.email_address ? memberData?.email_address : '',
  );
  const [dob, setDob] = useState(
    memberData?.date_of_birth ? memberData?.date_of_birth : '',
  );
  const [gender, setGender] = useState(
    memberData?.gender ? memberData?.gender : '',
  );
  const [phoneNo, setPhoneNo] = useState(
    memberData?.phone_number ? memberData?.phone_number : '',
  );
  const [emailError, setEmailError] = useState('');
  const [showEmailError, setShowEmailError] = useState(false);
  const [dobError, setDobError] = useState('');
  const [showDobError, setShowDobError] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [showPhoneError, setShowPhoneError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [showGenderError, setShowGenderError] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isGenderModalVisible, setIsGenderModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const handleModal = () => setIsModalVisible(!isModalVisible);
  const [selectedGenderStatus, setSelectedGenderStatus] = useState(
    memberData?.gender ? memberData?.gender : '',
  );

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const toggleGender = () => {
    setIsGenderModalVisible(!isGenderModalVisible);
  };
  const toggleGenderModal = () =>
    setIsGenderModalVisible(!isGenderModalVisible);
  const handleDateChange = date => {
    setDob(moment(date).format('DD-MM-YYYY'));
    toggleModal();
  };

  const emailRegex =
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;

  const handleSubmit = async () => {
    if (!emailRegex.test(email)) {
      setShowEmailError(true);
      setEmailError('Enter a valid email');
      return;
    }
    if (email.trim() === '') {
      setShowEmailError(true);
      setEmailError('Enter email id');
      return;
    }
    if (dob.trim() === '') {
      setShowDobError(true);
      setDobError('Enter DOB ');
      return;
    }
    if (gender.trim() === '') {
      setShowGenderError(true);
      setGenderError('Enter gender');
      return;
    }
    if (phoneNo.trim() === '') {
      setShowPhoneError(true);
      setPhoneError('Enter phone No');
      return;
    }
    if (phoneNo.length !== 10) {
      setShowPhoneError(true);
      setPhoneError('Enter 10 digit phone No');
      return;
    }
    const updatedData = {
      phone_number: phoneNo,
      email_address: email,
      gender: selectedGenderStatus,
      date_of_birth: dob,
    };
    // console.log(updatedData,"Line 89")
    const editPersonalDetailsResponse = await EDIT_WORK_DETAILS(
      memberData?.uuid,
      updatedData,
    );
    if (editPersonalDetailsResponse.success) {
      // console.log(editPersonalDetailsResponse.success,"Line 96")
      navigation.navigate('Profile');
      onRefresh();
    }
  };
  return (
    <>
      <SafeAreaView style={styles.safeAreaView} />
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <View style={styles.main}>
        <Header title={'Edit Profile'} />
      </View>
      <ScrollView
        style={styles.contentBox}
        showsVerticalScrollIndicator={false}>
        {/* Email id */}
        <View style={styles.textInputHolder}>
          <TextInput
            keyboardType="email-address"
            label={'Email*'}
            mode="outlined"
            style={{backgroundColor:Colors.white,color:Colors.black,fontSize:responsiveFontSize(18)}}
            placeholderTextColor={Colors.text_grey}
            onChangeText={text => setEmail(text)}
            placeholder="Email Id"
            value={email}
          />
          {showEmailError && <Text style={styles.error}>{emailError}</Text>}
        </View>
        {/* DOB  */}
        <View style={styles.textInputHolder}>
          <TextInput
            label={'D.O.B*'}
            mode="outlined"
            style={styles.textInputBox}
            placeholderTextColor={Colors.text_grey}
            placeholder="D.O.B"
            value={
              dob
                ? moment(dob, 'DD-MM-YYYY').format('DD-MM-YYYY')
                : 'Select date'
            }
            editable={false}
            right={
              <TextInput.Icon
                onPress={toggleModal}
                icon={'calendar'}
                iconColor={Colors.text_grey}
                style={{marginTop: responsivePadding(15)}}
                size={responsiveFontSize(30)}
              />
            }
          />
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={toggleModal}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <CalendarPicker
                selectedStartDate={
                  dob ? moment(dob, 'DD-MM-YYYY').toDate() : null
                }
                onDateChange={handleDateChange}
                previousTitleStyle={{color: 'black'}}
                nextTitleStyle={{color: 'black'}}
              />
              <TouchableOpacity
                onPress={toggleModal}
                style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* Gender */}
        <View style={styles.textInputHolder}>
          <TextInput
            label={'Gender*'}
            mode="outlined"
            style={styles.textInputBox}
            placeholderTextColor={Colors.text_grey}
            placeholder="Gender"
            value={selectedGenderStatus || 'Select Gender'}
            editable={false}
            right={
              <TextInput.Icon
                onPress={toggleGender}
                icon={'human-male-female'}
                iconColor={Colors.text_grey}
                style={{marginTop: responsivePadding(15)}}
                size={responsiveFontSize(30)}
              />
            }
          />
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isGenderModalVisible}
          onRequestClose={toggleGenderModal}>
          <View style={styles.centeredView2}>
            <View style={[styles.modalView, {gap: 10}]}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedGenderStatus('Male');
                  toggleGenderModal();
                }}
                style={styles.genderOption}>
                <Text style={styles.genderOptionText}>Male</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectedGenderStatus('Female');
                  toggleGenderModal();
                }}
                style={styles.genderOption}>
                <Text style={styles.genderOptionText}>Female</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectedGenderStatus('Other');
                  toggleGenderModal();
                }}
                style={styles.genderOption}>
                <Text style={styles.genderOptionText}>Other</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={toggleGender}
                style={styles.genderOption}>
                <Text style={styles.genderOptionText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>


        {/* Phone Number */}
        <View style={styles.textInputHolder}>
          <TextInput
            keyboardType="number-pad"
            label={'Phone No *'}
            mode="outlined"
            style={{backgroundColor:Colors.white,color:Colors.black,fontSize:responsiveFontSize(18)}}
            placeholderTextColor={Colors.text_grey}
            onChangeText={text => setPhoneNo(text)}
            placeholder="Phone Number"
            value={phoneNo}
            maxLength={10}
          />
          {showPhoneError && <Text style={styles.error}>{phoneError}</Text>}
        </View>
        <TouchableOpacity style={styles.touch} onPress={handleSubmit}>
          <Text style={[styles.text, {color: Colors.white, fontWeight: '600'}]}>
            Save Profile
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: Colors.white,
  },
  main: {
    // flex: 1,
    backgroundColor: Colors.white,
  },
  contentBox: {
    flex: 1,
    backgroundColor: Colors.white,
    height: '100%',
  },
  textInputHolder: {
    width: '95%',
    // overflow:'hidden',
    borderRadius: responsivePadding(5),
    alignSelf: 'center',
    marginVertical: responsivePadding(10),
  },
  textInputBox: {
    height: responsivePadding(50),
    backgroundColor: Colors.white,
    borderRadius: responsivePadding(5),
    borderBottomEndRadius: responsivePadding(5),
    borderBottomStartRadius: responsivePadding(5),
    color: Colors.black,
    fontSize: responsiveFontSize(18),
    fontWeight: '500',
  },
  touch: {
    borderWidth: responsivePadding(2),
    padding: responsivePadding(10),
    borderRadius: responsivePadding(10),
    width: '95%',
    alignSelf: 'center',
    marginVertical: responsivePadding(20),
    alignItems: 'center',
    backgroundColor: '#F7A81B',
    borderColor: '#F7A81B',
    marginBottom: 25,
    height: responsivePadding(50),
    justifyContent: 'center',
  },
  error: {
    marginVertical: responsivePadding(10),
    color: Colors.red,
    fontSize: responsiveFontSize(16),
  },
  text: {
    fontSize: responsiveFontSize(18),
    color: Colors.black,
  },
  genderHolder: {
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textInput: {
    borderWidth: responsivePadding(1),
    marginVertical: responsivePadding(10),
    padding: responsivePadding(15),
    borderRadius: responsivePadding(5),
    fontSize: responsiveFontSize(16),
    fontWeight: '500',
    color: Colors.black,
  },
  label: {
    fontSize: responsiveFontSize(16),
    fontWeight: '600',
    color: Colors.text_grey,
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: responsivePadding(20),
    padding: responsivePadding(35),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: responsivePadding(5),
    elevation: responsivePadding(10),
  },
  closeButton: {
    backgroundColor: Colors.orange,
    padding: responsivePadding(10),
    borderRadius: responsivePadding(10),
    marginTop: responsivePadding(10),
    paddingHorizontal: responsivePadding(40),
    alignSelf: 'center',
  },
  closeButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: responsiveFontSize(18),
  },
  genderOption: {
    padding: 10,
    borderWidth: 1,
    borderRadius: responsivePadding(5),
    borderBottomColor: Colors.light_gray,
  },
  genderOptionText: {
    fontSize: responsiveFontSize(18),
    color: Colors.black,
    textAlign: 'center',
  },
  centeredView2: {
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center',
  },
});
