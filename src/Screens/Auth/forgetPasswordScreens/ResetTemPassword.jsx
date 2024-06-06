import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState, useContext} from 'react';
import Colors from '../../../Theme/Colors';
import images from '../../../Theme/Images';
import {
  responsiveFontSize,
  responsivePadding,
} from '../../../Compenents/Responsive';
import AuthScreenTitle from '../../../Compenents/AuthScreenTitle';
import {useNavigation} from '@react-navigation/native';
import AuthButton from '../../../Compenents/Buttons/AuthButton';
import {resetTempPassword} from '../../../API_Services/auth_API';
import {AuthContext} from '../../../Constant/Context';

const ResetTemPassword = ({route}) => {
  const {response,password} = route.params;
  // console.log(password,"Line 26")
  const navigation = useNavigation();
  const {signOut} = useContext(AuthContext);
  const [tempPassword, setTempPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showNewPasswordError, setShowNewPasswordError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState('');
  const [uuid, setUuid] = useState(response?.member?.uuid);
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const updatePassword = async () => {
    if(newPassword.trim()=== ''){
      setShowNewPasswordError(true);
      setNewPasswordError('Enter new password!');
      return ;
    }
    const data = {
      uuid: uuid,
      currentPassword: password,
      newPassword: newPassword,
    };
    console.log(data, 'Line 36');
    const response = await resetTempPassword(data);
    if (response.success) {
      signOut();
      setNewPassword('');
      setTempPassword('');
      setShowErrorMessage(false);
      navigation.push('Login');
    } else {
      setErrorMessage(response?.errorMessage);
      setShowErrorMessage(true);
    }
    // console.log(response, 'Line 37');
  };
  return (
    <>
      <SafeAreaView style={{backgroundColor: Colors.white}} />
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      <ScrollView style={styles.main}>
        <View style={styles.imageHolder}>
          <Image source={images.app_logo_blue} style={styles.imageStyle} />
        </View>
        <View style={styles.titleHolder}>
          <AuthScreenTitle
            title={'Reset Temporary Password'}
            subTitle={'Enter new password to reset temporary password'}
          />
        </View>
        <View style={styles.inputBoxHolder}>
          <TextInput
            style={styles.textInputBox}
            placeholder="Current password"
            keyboardType="default"
            placeholderTextColor={Colors.text_grey}
            onChangeText={text => setTempPassword(text)}
            value={password}
            editable={false}
          />
          <TextInput
            style={styles.textInputBox}
            placeholder="New password"
            keyboardType="default"
            placeholderTextColor={Colors.text_grey}
            onChangeText={text => setNewPassword(text)}
            value={newPassword}
          />
           {showNewPasswordError && <Text style={styles.errorText1}>{newPasswordError}</Text>}
        </View>
        <View style={styles.buttonHolder}>
          {showErrorMessage && (
            <Text style={styles.errorText}>{errorMessage}</Text>
          )}
          <AuthButton title={'Update Password'} handleAction={updatePassword} />
        </View>
      </ScrollView>
    </>
  );
};

export default ResetTemPassword;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  imageStyle: {
    height: responsivePadding(150),
    width: responsivePadding(150),
  },
  imageHolder: {
    marginTop: responsivePadding(75),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleHolder: {
    marginVertical: responsivePadding(40),
  },
  inputBoxHolder: {
    width: '95%',
    alignSelf: 'center',
    gap: 20,
    // padding:20,
  },
  textInputBox: {
    borderWidth: 2,
    padding: responsivePadding(20),
    borderColor: Colors.border_grey,
    fontSize: responsiveFontSize(16),
    fontWeight: '500',
    color: Colors.black,
    borderRadius: responsivePadding(5),
  },
  buttonHolder: {
    marginVertical: responsivePadding(20),
  },
  errorText: {
    fontSize: responsiveFontSize(18),
    color: Colors.red,
    textAlign: 'center',
    marginVertical: responsivePadding(10),
  },
  errorText1: {
    fontSize: responsiveFontSize(16),
    color: Colors.red,
    fontWeight: '500',
    marginHorizontal: responsivePadding(5),
  },
});
