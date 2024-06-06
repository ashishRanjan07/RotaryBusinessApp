import {
  StyleSheet,
  Image,
  TextInput,
  View,
  Text,
  Platform,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AuthScreenTitle from '../../Compenents/AuthScreenTitle';
import {
  responsiveFontSize,
  responsivePadding,
} from '../../Compenents/Responsive';
import Colors from '../../Theme/Colors';
import AuthButton from '../../Compenents/Buttons/AuthButton';
import {sendOtp} from '../../API_Services/auth_API';
import images from '../../Theme/Images';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [errorText, setErrorText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = email => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  useEffect(() => {
    if(email.length===0) {
      setErrorText('')
    }
    if(validateEmail(email)){
      setErrorText('')
    }
  },[email])

  const handleSubmit = async () => {
    if(email.trim()===''){
      setErrorText("Email address is required");
      return;
    }
    if (validateEmail(email)) {
      setErrorText('');
      setIsLoading(true);
      try {
        const formData = {
          email_address: email,
        };
        // console.log(formData, 'Line 53');
        const response = await sendOtp(formData);
        // console.log(response, 'Line 51');
        setIsLoading(false);
        if (response.success) {
          navigation.replace('OTP', {email: email});
          // console.log('Otp Sent suceessfully Line 54');
        } else {
          setErrorText(response.errorMessage);
        }
      } catch (error) {
        setErrorText('An error occurred. Please try again.');
        // console.log('Error:', error);
      }
    } else {
      setErrorText('Please enter a valid email address');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : '100'}
      style={styles.main}>
      {/* Header Images */}
      <View>
        <Image
          source={images.app_logo_blue}
          style={styles.imageStyle}
          resizeMode="contain"
        />
      </View>
      {/* Title  */}
      <AuthScreenTitle
        title="Forgot Password"
        subTitle="Don't Worry we will help you out!"
      />
      {/* Email address textInput field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputStyle}
          keyboardType="email-address"
          onChangeText={text => setEmail(text)}
          placeholder="Registered email address"
          placeholderTextColor={Colors.text_grey}
        />
        {errorText && errorText.length > 0 && (
          <Text style={styles.errorText}>{errorText}</Text>
        )}
      </View>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text>Please wait...</Text>
        </View>
      ) : (
        <View style={{width: '100%'}}>
          <AuthButton title="Send OTP" handleAction={() => handleSubmit()} />
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  imageStyle: {
    alignSelf: 'center',
    height: responsivePadding(200),
    width: responsivePadding(200),
  },
  container: {
    // height: Dimensions.get('screen').height,
    backgroundColor: Colors.white,
  },
  inputContainer: {
    width: '90%',
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
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: responsivePadding(2),
    width: '90%',
    alignSelf: 'center',
    padding: responsivePadding(5),
    borderRadius: responsivePadding(10),
    gap: 15,
    backgroundColor: Colors.border_grey,
    borderColor: Colors.border_grey,
  },
  errorText: {
    color: 'red',
    marginTop: responsivePadding(5),
  },
  text: {
    color: Colors.iconColor,
    fontSize: responsiveFontSize(16),
    fontWeight: '500',
  },
});
