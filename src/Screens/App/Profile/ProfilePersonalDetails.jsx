import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import images from '../../../Theme/Images';
import {
  responsiveFontSize,
  responsivePadding,
} from '../../../Compenents/Responsive';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Colors from '../../../Theme/Colors';
import Fonts, {FontSize} from '../../../Theme/Fonts';
import ModalSelector from 'react-native-modal-selector';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Modal from 'react-native-modal';
import {EDIT_WORK_DETAILS} from '../../../API_Services/API_service';
import CalendarPicker from 'react-native-calendar-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const ProfilePersonalDetails = ({memberData, onRefresh}) => {
  const [personalOpen, setPersonalOpen] = useState(false);
  const [personalEdit, setPersonalEdit] = useState(false);
  const [isvisible, setIsVisible] = useState(false);
  const [visibleText, setVisibleText] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [phoneNo, setPhoneNo] = useState(memberData?.phone_number);
  const [email, setEmail] = useState(memberData?.email_address);
  const [maritalStatus, setMaritalStatus] = useState(
    memberData?.marital_status,
  );
  const [selectedGenderStatus, setSelectedGenderStatus] = useState(
    memberData?.gender,
  );
  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState(
    memberData?.marital_status,
  );
  const [dob, setDob] = useState(memberData?.date_of_birth);
  const [gender, setGender] = useState(memberData?.gender);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const handleModal = () => setIsModalVisible(!isModalVisible);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleDateChange = date => {
    setDob(moment(date).format('DD-MM-YYYY'));
    toggleModal();
  };

  const handlePersonalOpenToggle = () => {
    setPersonalOpen(!personalOpen);
    setPersonalEdit(false);
    // console.log(personalOpen);
    if (personalOpen) {
      setPersonalEdit(!personalOpen);
    }
  };
  const handlePersonalEditToggle = () => {
    setPersonalEdit(!personalEdit);
    setPersonalOpen(false);
    // console.log(personalEdit);
    if (personalEdit) {
      setPersonalOpen(!personalEdit);
    }
  };
  const updatePersonalDetails = async () => {
    const updatedData = {
      phone_number: phoneNo,
      email_address: email,
      gender: selectedGenderStatus,
      date_of_birth: dob,
      marital_status: selectedMaritalStatus,
    };
    // console.log(phoneNo, email, gender, dob, maritalStatus, 'Line 68....');
    const editPersonalDetailsResponse = await EDIT_WORK_DETAILS(
      memberData?.uuid,
      updatedData,
    );
    // console.log(editPersonalDetailsResponse, 'Line 71');
    if (editPersonalDetailsResponse.success) {
      setIsButtonDisabled(true);
      setIsVisible(!isvisible);
      setVisibleText('Profile details updated successfully');
      // console.log(isvisible, visibleText);
      onRefresh();
    }
  };
  return (
    <View>
      <View style={styles.mainContainer}>
        <View style={styles.listContainer}>
          <Image
            source={images.clubDetails}
            style={{
              height: responsivePadding(20),
              width: responsivePadding(20),
            }}
          />
          <View style={styles.detailsContainer}>
            <Text style={styles.title}>Personal Details</Text>
            <Text style={{color: Colors.black}}>
              Learn more about who you are
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={handlePersonalEditToggle}>
          <FontAwesome5
            name="edit"
            size={Fonts.FontSize.fontSize26}
            color={Colors.text_grey}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={handlePersonalOpenToggle}>
          <Entypo
            name={personalOpen ? 'chevron-up' : 'chevron-down'}
            size={Fonts.FontSize.fontSize30}
            color={Colors.text_grey}
          />
        </TouchableOpacity>
      </View>
      {/* Personal View Section */}
      {personalOpen ? (
        <View>
          <View style={styles.container}>
            <View style={styles.innerDetailsContainer}>
              <Text style={styles.text}>Phone Number</Text>
              <Text style={styles.textAPI}>{memberData?.phone_number}</Text>
            </View>
            <View style={styles.innerDetailsContainer}>
              <Text style={styles.text}>Email</Text>
              <Text style={styles.textAPI}>{memberData?.email_address}</Text>
            </View>
            <View style={styles.innerDetailsContainer}>
              <Text style={styles.text}>Gender</Text>
              <Text style={styles.textAPI}>{memberData?.gender}</Text>
            </View>
            <View style={styles.innerDetailsContainer}>
              <Text style={styles.text}>D.O.B</Text>
              <Text style={styles.textAPI}>{memberData?.date_of_birth}</Text>
            </View>
            <View style={styles.innerDetailsContainer}>
              <Text style={styles.text}>Marital Status</Text>
              <Text style={styles.textAPI}>{memberData?.marital_status}</Text>
            </View>
            <View style={styles.SepraterLine} />
          </View>
        </View>
      ) : null}
      {/* Personal Edit Section */}
      {personalEdit ? (
        <View style={styles.editContainer}>
          {/* Phone Number */}
          <View style={styles.EditDetailsContainer}>
            <Text style={styles.text}>Phone Number</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="number-pad"
              placeholder={memberData?.phone_number}
              onChangeText={text => setPhoneNo(text)}
              placeholderTextColor={Colors.black}
            />
          </View>
          {/* Email */}
          <View style={styles.EditDetailsContainer}>
            <Text style={styles.text}>Email</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="email-address"
              onChangeText={text => setEmail(text)}
              placeholder={memberData?.email_address}
              placeholderTextColor={Colors.black}
            />
          </View>
          {/* Gender Selector */}
          <View style={styles.EditDetailsContainer}>
            <Text style={styles.text}>Gender</Text>
            {isvisible === false ? (
              <ModalSelector
                data={[
                  {key: 0, label: 'Male'},
                  {key: 1, label: 'Female'},
                ]}
                initValue={selectedGenderStatus}
                onChange={option => setSelectedGenderStatus(option.label)}>
                <TextInput
                  style={styles.textInput}
                  editable={false}
                  placeholder="Select Gender"
                  value={selectedGenderStatus}
                  placeholderTextColor={'#000000'}
                />
              </ModalSelector>
            ) : (
              <TextInput
                style={styles.textInput}
                editable={false}
                placeholder="Select Gender"
                value={selectedGenderStatus}
                placeholderTextColor={Colors.black}
              />
            )}
          </View>
          {/* DOB */}
          <View style={styles.container}>
            <View style={styles.innerDetailsContainer}>
              <Text style={styles.text}>D.O.B</Text>
              <TouchableOpacity onPress={toggleModal}>
                <Text style={styles.textInput}>
                  {dob
                    ? moment(dob, 'DD-MM-YYYY').format('DD-MM-YYYY')
                    : 'Select date'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={toggleModal}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <CalendarPicker
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
          {/* Marital Status */}
          <View style={styles.EditDetailsContainer}>
            <Text style={styles.text}>Marital Status</Text>
            {isvisible === false ? (
              <ModalSelector
                data={[
                  {key: 0, label: 'Single'},
                  {key: 1, label: 'Married'},
                  {key: 2, label: 'Others'},
                ]}
                initValue={selectedMaritalStatus}
                onChange={option => setSelectedMaritalStatus(option.label)}>
                <TextInput
                  style={styles.textInput}
                  editable={false}
                  placeholder="Marital Status"
                  value={selectedMaritalStatus}
                  placeholderTextColor={'#000000'}
                />
              </ModalSelector>
            ) : (
              <TextInput
                style={styles.textInput}
                editable={false}
                placeholder="Marital Status"
                value={selectedMaritalStatus}
                placeholderTextColor={'#000000'}
              />
            )}
          </View>
          {/* Button */}
          {isvisible === false ? (
            <TouchableOpacity
              onPress={updatePersonalDetails}
              style={[
                styles.button,
                isButtonDisabled && {backgroundColor: 'gray'},
              ]}
              disabled={isButtonDisabled}>
              <Text style={[styles.text, styles.buttonText]}>Update</Text>
            </TouchableOpacity>
          ) : (
            <Text
              style={{
                fontSize: responsiveFontSize(16),
                color: Colors.green,
                fontWeight: '500',
                textAlign: 'center',
                marginVertical: responsivePadding(10),
              }}>
              {visibleText}
            </Text>
          )}
          <View style={styles.SepraterLine} />
        </View>
      ) : null}
    </View>
  );
};

export default ProfilePersonalDetails;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: responsivePadding(15),
  },
  listContainer: {
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsContainer: {
    marginLeft: responsivePadding(15),
    width: Dimensions.get('screen').width * 0.75,
  },
  title: {
    color: Colors.black,
    fontWeight: '500',
    fontSize: responsiveFontSize(16),
  },
  container: {
    backgroundColor: Colors.backGround_grey,
  },
  innerDetailsContainer: {
    marginVertical: responsivePadding(10),
    marginHorizontal: responsivePadding(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: Colors.black,
    fontSize: responsiveFontSize(16),
  },
  textAPI: {
    color: Colors.black,
  },
  editContainer: {
    backgroundColor: Colors.backGround_grey,
  },
  EditDetailsContainer: {
    marginVertical: responsivePadding(5),
    marginHorizontal: responsivePadding(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    borderWidth: responsivePadding(3),
    borderColor: Colors.border_grey,
    width: Dimensions.get('screen').width * 0.5,
    padding: responsivePadding(5),
    borderRadius: responsivePadding(5),
    fontSize: FontSize.fontSize16,
    fontWeight: '500',
    color: Colors.black,
  },
  button: {
    padding: responsivePadding(10),
    alignSelf: 'center',
    backgroundColor: 'gray',
    borderRadius: responsivePadding(15),
    marginVertical: responsivePadding(10),
    width: '75%',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: FontSize.fontSize16,
    fontWeight: 700,
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
});
