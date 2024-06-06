import React, {useState, useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import Colors from '../../../Theme/Colors';
import AuthScreenTitle from '../../../Compenents/AuthScreenTitle';
import {
  responsiveFontSize,
  responsivePadding,
} from '../../../Compenents/Responsive';
import Toast from 'react-native-toast-message';
import AuthButton from '../../../Compenents/Buttons/AuthButton';
import {resetPassword} from '../../../API_Services/auth_API';
import images from '../../../Theme/Images';

const NewPasswordScreen = ({route, navigation}) => {
  // Access email passed through navigation
  const {email} = route.params;
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const showToast = ({type, text1, text2}) => {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
      visibilityTime: 5000,
      autoHide: true,
      topOffset: 50,
    });
  };

  const handleSubmit = async () => {
    try {
      if (newPassword.trim() === '' && confirmPassword.trim() === '') {
        showToast({
          type: 'error',
          text1: 'Missing fields',
          text2: 'New and confirm Password required',
        });
        return;
      }
      if(newPassword.trim() ===''){
        showToast({
          type: 'error',
          text1: 'Missing field',
          text2: 'Please fill new password',
        });
        return;
      }
      if(confirmPassword.trim() ===''){
        showToast({
          type: 'error',
          text1: 'Missing field',
          text2: 'Please fill confirm password',
        });
        return;
      }

      if (newPassword !== confirmPassword) {
        showToast({
          type: 'error',
          text1: 'Password Mismatch',
          text2: 'New and Confirm password do not match.',
        });
        return;
      }
      const formData = {
        email_address: email,
        new_password: newPassword,
        confirm_password: confirmPassword,
      };
      const response = await resetPassword(formData);
      if (response.success) {
        showToast({
          type: 'success',
          text1: 'Success',
          text2: response.message || 'Password reset successfully',
        });
        Alert.alert('Success', 'Password change sucessfully');
        navigation.navigate('Login');
      } else {
        showToast({
          type: 'error',
          text1: 'Failed',
          text2:
            response.message || 'Failed to reset password. Please try again.',
        });
      }
    } catch (error) {
      showToast({
        type: 'error',
        text1: 'Error',
        text2: 'An unexpected error occurred. Please try again later.',
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : '100'}
      style={styles.container}>
        <StatusBar backgroundColor={Colors.white} />
        <SafeAreaView />
        <Image
          source={images.app_logo_blue}
          style={styles.imageStyle}
          resizeMode="cover"
        />
        <AuthScreenTitle
          title="Update Password"
          subTitle="Don't Worry we will help you out!"
        />
        <View style={{width:'95%',alignSelf:'center'}}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputStyle}
              keyboardType="default"
              onChangeText={text => setNewPassword(text)}
              placeholder="New password"
              placeholderTextColor={Colors.text_grey}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputStyle}
              keyboardType="default"
              onChangeText={text => setConfirmPassword(text)}
              placeholder="Confirm password"
              placeholderTextColor={Colors.text_grey}
            />
          </View>
          <AuthButton title="Update" handleAction={() => handleSubmit()} />
        </View>
        <Toast />
    </KeyboardAvoidingView>
  );
};

export default NewPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  imageStyle: {
    height: responsivePadding(200),
    width: responsivePadding(200),
  },
  resendButtonText: {
    color: Colors.black,
    textAlign: 'center',
    fontSize: responsiveFontSize(16),
  },
  inputContainer: {
    marginVertical: responsivePadding(10),
    marginHorizontal: responsivePadding(20),
  },
  inputStyle: {
    letterSpacing: 0.7,
    backgroundColor: Colors.backGround_grey,
    padding:
      Platform.OS === 'ios' ? responsivePadding(20) : responsivePadding(15),
    borderRadius: responsivePadding(10),
    borderWidth: responsivePadding(1.5),
    borderColor: Colors.border_grey,
    fontWeight: '500',
    color: Colors.black,
  },
  otpText: {
    fontSize: 19,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.black,
  },
});
