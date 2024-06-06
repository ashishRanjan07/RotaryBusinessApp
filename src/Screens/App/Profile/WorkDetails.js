import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {EDIT_BUSINESS_DETAILS} from '../../../API_Services/API_service';

import ProfileDetailsOptions from '../../../Compenents/ProfileDetailsOptions';
import images from '../../../Theme/Images';
import Colors from '../../../Theme/Colors';
import Fonts, {FontSize} from '../../../Theme/Fonts';

export default function WorkDetails({data}) {
  // console.log(data, "Line 9")
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [isvisible, setIsVisible] = useState(false);
  const [visibleText, setVisibleText] = useState('');
  const [errorText, setErrorText] = useState('');
  const [isError, setIsError] = useState(false);

  const [businessName, setBusinessName] = useState();
  const [businessCategory, setBusinessCategory] = useState();
  const [businessAddress, setBusinessAddress] = useState();
  const [businessCity, setBusinessCity] = useState();
  const [businessState, setBusinessState] = useState();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const updateWorkDetails = async () => {
    const updatedData = {
      id: data?.business[0]?.id,
      business_name: businessName,
      business_category: parseInt(businessCategory),
      business_address: businessAddress,
      city_id: parseInt(businessCity),
      state_id: parseInt(businessState),
    };
    console.log(
      data?.business[0]?.id,
      businessName,
      businessAddress,
      businessCategory,
      businessCity,
      businessState,
      'Line 22',
    );
    console.log(updatedData, 'Line 36');
    const editWorkDetailsResponse = await EDIT_BUSINESS_DETAILS(updatedData);
    console.log(editWorkDetailsResponse, 'Line 38');
    if (editWorkDetailsResponse.success) {
      setIsButtonDisabled(true);
      setIsVisible(!isvisible);
      setVisibleText(editWorkDetailsResponse.business_details);
    } else {
      setIsVisible(true);
      setIsVisible(!isvisible);
      setErrorText(editWorkDetailsResponse.errorMessage);
      setIsError(true);
    }
  };

  const handleEditToggle = value => {
    setEdit(value);
    if (open) {
      setOpen(!value);
    }
  };

  const handleOpenToggle = value => {
    setOpen(value);
    if (edit) {
      setEdit(!value);
    }
  };

  return (
    <View>
      <ProfileDetailsOptions
        icon={images.workDetails}
        title="Work Details"
        subTitle="All about your Corporate Status"
        edit={edit}
        setEdit={handleEditToggle}
        open={open}
        setOpen={handleOpenToggle}
        route="DistrictProfiles"
      />

      {open ? (
        <>
          {data?.business.map((item, index) => {
            return (
              <View style={styles.container} key={item}>
                <View style={styles.detailsContainer}>
                  <Text style={styles.header}>Business Name</Text>
                  <Text style={styles.content}>{item?.business_name}</Text>
                </View>
                <View style={styles.detailsContainer}>
                  <Text style={styles.header}>Business Category</Text>
                  <Text style={styles.content}>{item?.business_category}</Text>
                </View>
                <View style={styles.detailsContainer}>
                  <Text style={styles.header}>Business Address</Text>
                  <Text style={styles.content}>{item?.business_address}</Text>
                </View>
              </View>
            );
          })}
          {data?.city.map((item, index) => {
            return (
              <View style={styles.container} key={item}>
                <View style={styles.detailsContainer}>
                  <Text style={styles.header}>Business City</Text>
                  <Text style={styles.content}>{item?.name}</Text>
                </View>
                {/* <View style={styles.detailsContainer}>
                                            <Text style={styles.header}>Business State</Text>
                                            <Text style={styles.content}>{item?.business_state}</Text>
                                        </View> */}
                <View style={styles.SepraterLine} />
              </View>
            );
          })}
        </>
      ) : null}
      {edit ? (
        <>
          {data.business?.map((item, index) => {
            return (
              <View style={styles.container} key={item}>
                <View style={styles.EditdetailsContainer}>
                  <Text style={styles.header}>Business Name</Text>
                  <TextInput
                    style={styles.content2}
                    placeholder={item?.business_name}
                    onChangeText={text => setBusinessName(text)}
                  />
                </View>
                <View style={styles.EditdetailsContainer}>
                  <Text style={styles.header}>Business Category</Text>
                  <TextInput
                    style={styles.content2}
                    placeholder={`${item?.business_category}`}
                    onChangeText={text => setBusinessCategory(text)}
                  />
                </View>
                <View style={styles.EditdetailsContainer}>
                  <Text style={styles.header}>Business Address</Text>
                  <TextInput
                    style={styles.content2}
                    placeholder={`${item?.business_address}`}
                    onChangeText={text => setBusinessAddress(text)}
                  />
                </View>
                <View style={styles.EditdetailsContainer}>
                  <Text style={styles.header}>Business City</Text>
                  <TextInput
                    style={styles.content2}
                    placeholder={`${item?.city_id || 'Business City'}`}
                    onChangeText={text => setBusinessCity(text)}
                  />
                </View>
                <View style={styles.EditdetailsContainer}>
                  <Text style={styles.header}>Business State</Text>
                  <TextInput
                    style={styles.content2}
                    placeholder={`${item?.state_id || 'Business State'}`}
                    onChangeText={text => setBusinessState(text)}
                  />
                </View>
                {isvisible === false ? (
                  <TouchableOpacity
                    onPress={updateWorkDetails}
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
                      color: isError ? Colors.red : Colors.green,
                      fontWeight: '500',
                      textAlign: 'center',
                      marginVertical: 10,
                    }}>
                    {isError ? errorText : visibleText}
                  </Text>
                )}
                {/* <TouchableOpacity style={[styles.button, isButtonDisabled && { backgroundColor: 'gray' }]}
                                    disabled={isButtonDisabled} onPress={updateWorkDetails}>
                                            <Text style={[styles.header, styles.text]}>Update</Text>
                                        </TouchableOpacity>
                                        {isButtonDisabled &&(
                                            <Text>Updted</Text>
                                        )} */}
                <View style={styles.SepraterLine} />
              </View>
            );
          })}
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
  SepraterLine: {
    backgroundColor: Colors.border_grey,
    height: 0.7,
  },
  header: {
    width: Dimensions.get('screen').width * 0.35,
    color: Colors.black,
    fontWeight: '500',
  },
  content: {
    width: Dimensions.get('screen').width * 0.45,
  },
  EditdetailsContainer: {
    marginVertical: 5,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
});
