import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  EDIT_WORK_DETAILS,
  GET_USER_DETAILS,
} from '../../../API_Services/API_service';

import ProfileDetailsOptions from '../../../Compenents/ProfileDetailsOptions';
import images from '../../../Theme/Images';
import Colors from '../../../Theme/Colors';
import Fonts, {FontSize} from '../../../Theme/Fonts';
import ProfileDetailsWithEdit from './ProfileDetailsWithEdit';

export default function PersonalDetails({data}) {
  // console.log(data, "Line 10")
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [isvisible, setIsVisible] = useState(false);
  const [visibleText, setVisibleText] = useState('');

  // Const for update
  const [phoneNumber, setPhoneNumber] = useState(data?.phone_number);
  const [email, setEmail] = useState(data?.email_address);
  const [gender, setGender] = useState(data?.gender);
  const [dob, setDob] = useState(data?.date_of_birth);
  const [maritalStatus, setMaritalStatus] = useState(data?.marital_status);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleEditToggle = value => {
    // console.log(value,"Line 15")
    setEdit(value);
    if (open) {
      setOpen(!value);
    }
  };

  const handleOpenToggle = value => {
    // console.log(value,"Line 20")
    setOpen(value);
    if (edit) {
      setEdit(!value);
    }
  };

  const updateCLick = async () => {
    const updatedData = {
      phone_number: phoneNumber,
      email_address: email,
      gender: gender,
      date_of_birth: dob,
      marital_status: maritalStatus,
    };
    console.log(phoneNumber, email, gender, dob, maritalStatus, 'Line 39');
    const editPersonalDetailsResponse = await EDIT_WORK_DETAILS(
      data.uuid,
      updatedData,
    );
    console.log(editPersonalDetailsResponse, 'Line 50');
    if (editPersonalDetailsResponse.success) {
      setIsButtonDisabled(true);
      // console.log('hii');
      setIsVisible(!isvisible);
      setVisibleText('Profile Details Updated Successfully');
      console.log(isvisible, visibleText);
    }
  };

  return (
    <View>
      <ProfileDetailsOptions
        icon={images.clubDetails}
        title="Personal Details"
        subTitle="Learn more about who you are"
        edit={edit}
        setEdit={handleEditToggle}
        open={open}
        setOpen={handleOpenToggle}
        route="DistrictProfiles"
      />
      {open ? (
        <View style={styles.container}>
          <View style={styles.detailsContainer}>
            <Text style={styles.header}>Phone Number</Text>
            <Text style={styles.content}>{data?.phone_number}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.header}>Email</Text>
            <Text style={styles.content}>{data?.email_address}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.header}>Gander</Text>
            <Text style={styles.content}>{data?.gender}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.header}>D.O.B</Text>
            <Text style={styles.content}>{data?.date_of_birth}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.header}>Marital Status</Text>
            <Text style={styles.content}>{data?.marital_status}</Text>
          </View>
          <View style={styles.SepraterLine} />
        </View>
      ) : null}

      {edit ? (
        <>
          <View style={styles.container}>
            <View style={styles.EditdetailsContainer}>
              <Text style={styles.header}>Phone Number</Text>
              <TextInput
                style={styles.content2}
                placeholder={data?.phone_number}
                onChangeText={text => setPhoneNumber(text)}
              />
            </View>
            <View style={styles.EditdetailsContainer}>
              <Text style={styles.header}>Email</Text>
              <TextInput
                style={styles.content2}
                onChangeText={text => setEmail(text)}
                placeholder={data?.email_address}
              />
            </View>
            <View style={styles.EditdetailsContainer}>
              <Text style={styles.header}>Gander</Text>
              <TextInput
                style={styles.content2}
                onChangeText={text => setGender(text)}
                placeholder={data?.gender}
              />
            </View>
            <View style={styles.EditdetailsContainer}>
              <Text style={styles.header}>D.O.B</Text>
              <TextInput
                style={styles.content2}
                onChangeText={text => setDob(text)}
                placeholder={data?.date_of_birth}
              />
            </View>
            <View style={styles.EditdetailsContainer}>
              <Text style={styles.header}>Marital Status</Text>
              <TextInput
                style={styles.content2}
                onChangeText={text => setMaritalStatus(text)}
                placeholder={data?.marital_status}
              />
            </View>
            {isvisible === false ? (
              <TouchableOpacity
                onPress={updateCLick}
                style={[
                  styles.button,
                  isButtonDisabled && {backgroundColor: 'gray'},
                ]}
                disabled={isButtonDisabled}>
                <Text style={[styles.header, styles.text]}>Update</Text>
              </TouchableOpacity>
            ) : (
              <Text
                style={{
                  fontSize: Fonts.FontSize.fontSize16,
                  color: Colors.green,
                  fontWeight: '500',
                  textAlign: 'center',
                  marginVertical: 10,
                }}>
                {visibleText}
              </Text>
            )}
            <View style={styles.SepraterLine} />
          </View>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backGround_grey,
  },
  detailsContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  EditdetailsContainer: {
    marginVertical: 5,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  SepraterLine: {
    backgroundColor: Colors.border_grey,
    height: 0.7,
  },
  header: {
    width: Dimensions.get('screen').width * 0.3,
    color: Colors.black,
    fontWeight: '500',
  },
  content: {
    width: Dimensions.get('screen').width * 0.5,
    color:Colors.black
  },
  button: {
    padding: 10,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    marginVertical: 10,
  },
  text: {
    textAlign: 'center',
    fontSize: FontSize.fontSize16,
    fontWeight: 700,
  },
  content2: {
    borderWidth: 3,
    borderColor: Colors.border_grey,
    width: Dimensions.get('screen').width * 0.5,
    padding: 5,
    borderRadius: 5,
    fontSize: FontSize.fontSize16,
    fontWeight: '500',
  },
});
