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
import {
  EDIT_BUSINESS_DETAILS,
  EDIT_WORK_DETAILS,
} from '../../../API_Services/API_service';

const ProfileWorkDetails = ({workData, onRefresh}) => {
  // console.log(workData?.business[0]?.id, 'Line 26');
  const [workOpen, setWorkOpen] = useState(false);
  const [workEdit, setWorkEdit] = useState(false);
  const [workVisibleText, setWorkVisibleText] = useState('');
  const [isWorkButtonDisabled, setIsWorkButtonDisabled] = useState(false);
  const [businessName, setBusinessName] = useState();
  const [businessAddress, setBusinessAddress] = useState();

  const handleWorkEditToggle = () => {
    setWorkEdit(!workEdit);
    setWorkOpen(false);
    if (workEdit) {
      setWorkOpen(!workEdit);
    }
  };

  const hadleWorkOpenToggle = () => {
    setWorkOpen(!workOpen);
    setWorkEdit(false);
    if (workOpen) {
      setWorkEdit(!workOpen);
    }
  };

  const updateWorkDetails = async () => {
    let nameWarning = '';
    let addressWarning = '';

    if (!businessName && !businessAddress) {
      nameWarning = 'Business name is required.';
      addressWarning = 'Business address is required.';
      setWorkVisibleText('');
    } else if (!businessName) {
      nameWarning = 'Business name is required.';
      setWorkVisibleText('');
    } else if (!businessAddress) {
      addressWarning = 'Business address is required.';
      setWorkVisibleText('');
    } else {
      setWorkVisibleText('Please wait...');
      setIsWorkButtonDisabled(true);
    }

    setWorkVisibleText(`${nameWarning} ${addressWarning}`);

    if (businessName && businessAddress) {
      const updatedData = {
        id: workData?.business[0]?.id,
        business_name: businessName,
        business_category: 1,
        business_address: businessAddress,
      };
      const editWorkDetailsResponse = await EDIT_BUSINESS_DETAILS(updatedData);
      if (editWorkDetailsResponse.success) {
        setWorkVisibleText(editWorkDetailsResponse.business_details);
        onRefresh();
        // Reset fields after successful update
        setBusinessName('');
        setBusinessAddress('');
        setIsWorkButtonDisabled(false);
      } else {
        setWorkVisibleText(editWorkDetailsResponse.errorMessage);
        setIsWorkButtonDisabled(false);
      }
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Image
            source={images.workDetails}
            style={{
              height: responsivePadding(20),
              width: responsivePadding(20),
            }}
          />
          <View style={styles.detailsContainer}>
            <Text style={styles.text}>Work Details</Text>
            <Text style={{color: Colors.black}}>
              All about your Corporate Status
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleWorkEditToggle}>
          <FontAwesome5
            name="edit"
            size={responsiveFontSize(26)}
            color={Colors.text_grey}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={hadleWorkOpenToggle}>
          <Entypo
            name={workOpen ? 'chevron-up' : 'chevron-down'}
            size={responsiveFontSize(30)}
            color={Colors.text_grey}
          />
        </TouchableOpacity>
      </View>
      {workOpen ? (
        <View style={{backgroundColor: Colors.backGround_grey}}>
          <View style={styles.textView}>
            <Text style={styles.header}>Business Name</Text>
            <Text style={styles.textAPI}>
              {workData?.business?.[0]?.business_name}
            </Text>
          </View>
          <View style={styles.textView}>
            <Text style={styles.header}>Business Category</Text>
            <Text style={styles.textAPI}>
              {workData?.business?.[0]?.business_category}
            </Text>
          </View>
          <View style={styles.textView}>
            <Text style={styles.header}>Business Address</Text>
            <Text style={styles.textAPI}>
              {workData?.business?.[0]?.business_address}
            </Text>
          </View>

          <View style={styles.SepraterLine} />
        </View>
      ) : null}
      {workEdit ? (
        <>
          <View style={{backgroundColor: Colors.backGround_grey}}>
            <View style={styles.EditdetailsContainer}>
              <Text style={styles.header}>Business Name</Text>
              <TextInput
                style={styles.textInput}
                placeholder={workData?.business[0]?.business_name}
                onChangeText={text => setBusinessName(text)}
                placeholderTextColor={Colors.text_grey}
              />
            </View>
            <View style={styles.EditdetailsContainer}>
              <Text style={styles.header}>Business Address</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={text => setBusinessAddress(text)}
                placeholder={`${workData?.business[0]?.business_address}`}
                placeholderTextColor={Colors.text_grey}
              />
            </View>
            <TouchableOpacity onPress={updateWorkDetails} style={styles.touch}>
              <Text style={styles.buttonText}>
                {isWorkButtonDisabled
                  ? 'Please wait...'
                  : 'Update Work Details'}
              </Text>
            </TouchableOpacity>
            {workVisibleText && (
              <Text style={styles.messageText}>{workVisibleText}</Text>
            )}
            <View style={styles.SepraterLine} />
          </View>
        </>
      ) : null}
    </View>
  );
};

export default ProfileWorkDetails;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: responsivePadding(15),
  },
  innerContainer: {
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsContainer: {
    marginLeft: responsivePadding(15),
    width: Dimensions.get('screen').width * 0.75,
  },
  text: {
    color: Colors.black,
    fontWeight: '500',
    fontSize: responsiveFontSize(16),
  },
  textView: {
    marginVertical: responsivePadding(10),
    marginHorizontal: responsivePadding(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textAPI: {
    color: Colors.black,
  },
  EditdetailsContainer: {
    marginVertical: responsivePadding(5),
    marginHorizontal: responsivePadding(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    color: Colors.black,
    fontSize: responsiveFontSize(16),
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
    fontSize: responsiveFontSize(16),
    fontWeight: '700',
    color: Colors.black,
  },
  touch: {
    borderWidth: 2,
    padding: 10,
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: Colors.yellow,
    borderColor: Colors.yellow,
  },
  messageText: {
    fontSize: responsiveFontSize(16),
    color: Colors.green,
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: responsivePadding(10),
  },
});
