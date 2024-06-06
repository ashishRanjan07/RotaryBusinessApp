import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  AppState,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../Constant/Context';
import images from '../../Theme/Images';
import AuthScreenTitle from '../../Compenents/AuthScreenTitle';
import Colors from '../../Theme/Colors';
import {FontSize} from '../../Theme/Fonts';
import AuthButton from '../../Compenents/Buttons/AuthButton';
import {validateLogin} from '../../API_Services/auth_API';
import Octicons from 'react-native-vector-icons/Octicons';
import {
  responsiveFontSize,
  responsivePadding,
} from '../../Compenents/Responsive';

export default function Login({navigation}) {
  const {signIn} = React.useContext(AuthContext);
  const {fcmToken} = React.useContext(AuthContext);
  useEffect(() => {
    console.log('FCM Token in Login:', fcmToken);
  }, [fcmToken]);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneValidationText, setPhoneValidationText] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordValidationText, setPasswordValidationText] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        // App has come to the foreground, reset fields here
        setPhoneNumber('');
        setPassword('');
        setPhoneError(false);
        setPasswordError(false);
        setLoginFailed(false);
      }
      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, [appState]);

  useEffect(() => {
    if (phoneNumber.length === 0) {
      setPhoneValidationText('');
      setPhoneError(false);
    }
    if (phoneNumber.length === 10) {
      setPhoneError(false);
      setLoginFailed(false);
      setPhoneValidationText('');
    } else if (phoneNumber.length > 0) {
      setPhoneError(true);
      setLoginFailed(false);
      setPhoneValidationText('Please enter 10 digit mobile number');
    }
  }, [phoneNumber]);
  useEffect(() => {
    if (password.length === 0) {
      setPasswordValidationText('');
      setPasswordError(false);
    }
    if (password.length > 0) {
      setPasswordError(false);
      setPasswordValidationText('');
      setLoginFailed(false);
    }
  }, [password]);

  const handleLogin = async () => {
    await AsyncStorage.setItem('firebaseToken', fcmToken);
    await AsyncStorage.setItem('phone_number', phoneNumber);
    let hasError = false;
    if (phoneNumber.trim() === '') {
      setPhoneError(true);
      setLoginFailed(false);
      setPhoneValidationText('Phone number required');
      hasError = true;
    } else if (phoneNumber.length !== 10) {
      setPhoneError(true);
      setLoginFailed(false);
      setPhoneValidationText('Please enter 10 digit mobile number');
      hasError = true;
    }
    if (password.trim() === '') {
      setPasswordError(true);
      setLoginFailed(false);
      setPasswordValidationText('Password Required');
      hasError = true;
    }
    if (hasError) return;

    setLoading(true);

    const userDetail = {
      phone_number: phoneNumber,
      password: password,
      firebase_token: fcmToken,
    };
    if (password.length >= 1) {
      setPasswordError(false);
      setLoginFailed(false);
      setPasswordValidationText('');
    }

    try {
      const response = await validateLogin(userDetail);

      if (response?.success) {
        // console.log(response,"Line 130")
        const token = response?.token;
        const details = response?.member;
        console.log(details, 'line 80');
        AsyncStorage.setItem('userBasicLoginDetails', JSON.stringify(details));
        AsyncStorage.setItem('token', token);
        AsyncStorage.setItem('uuid', details.uuid);
        AsyncStorage.setItem('memberId', JSON.stringify(response?.member?.id));
        // signIn(token, details);
        if(response?.member?.is_login==true) 
        {
          signIn(token, details);
        }
        else {
          navigation.navigate('TempPassword',{response,password});
        }
       
      } else {
        setLoginFailed(true);
      }
    } catch (error) {
      // console.error('Login Error:', error);
      setLoginFailed(true);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigation.push('ForgotPassword');
  };

  const handlePasswordChange = text => {
    // Filter out non-ASCII characters
    const filteredText = text.replace(/[^\x00-\x7F]/g, '');
    setPassword(filteredText);
  };

  const handlePaste = (e) => {
    e.preventDefault();
  };

  const handleCopy = (e) => {
    e.preventDefault();
  };


  return (
    <KeyboardAvoidingView
      style={styles.main}
      behavior={Platform.OS == 'ios' ? 'padding' : '100'}>
      {/* Image view */}
      <View>
        <Image
          source={images.app_logo_blue}
          style={styles.imageStyle}
          resizeMode="cover"
        />
      </View>
      <AuthScreenTitle
        title="Welcome Back!"
        subTitle="Please Login to your account and enjoy the unlimited Connecting experience."
      />
      {/* Mobile Number Input Filed */}
      <View>
        <View
          style={[
            styles.inputContainer,
            {
              borderColor: phoneError ? 'red' : Colors.border_grey,
              width: '100%',
            },
          ]}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Phone Number"
            onChangeText={text => setPhoneNumber(text.replace(/[^0-9]/g, ''))}
            keyboardType={'number-pad'}
            maxLength={10}
            value={phoneNumber}
            placeholderTextColor={Colors.text_grey}
          />
        </View>
        {phoneError && (
          <View style={styles.errorView}>
            <Text style={{color: 'red'}}>{phoneValidationText}</Text>
          </View>
        )}
      </View>
      {/* Password Text Input Field */}
      <View>
        <View
          style={[
            styles.inputContainer,
            {borderColor: passwordError ? 'red' : Colors.border_grey},
          ]}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Password"
            secureTextEntry={!showPassword}
            onChangeText={handlePasswordChange}
            placeholderTextColor={Colors.text_grey}
            value={password}
            contextMenuHidden={true}
            keyboardType={
              Platform.OS === 'android'
                ? showPassword
                  ? 'visible-password'
                  : 'default'
                : 'ascii-capable'
            }
            onPaste={handlePaste}
            onCopy={handleCopy}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Octicons
              name={showPassword ? 'eye' : 'eye-closed'}
              size={responsiveFontSize(24)}
              color="black"
              style={styles.iconStyle}
            />
          </TouchableOpacity>
        </View>
        {passwordError && (
          <View style={styles.errorView}>
            <Text style={{color: 'red'}}>{passwordValidationText}</Text>
          </View>
        )}
      </View>
      {/* Forget Password View */}
      <View
        style={{
          alignSelf: 'flex-end',
          marginHorizontal: responsivePadding(20),
        }}>
        <Text
          style={styles.forgotPassword}
          onPress={() => handleForgotPassword()}>
          Forgot Password?
        </Text>
      </View>
      {/* Login Failed Issue */}
      {loginFailed && (
        <View style={{width: '85%'}}>
          <Text style={{color: 'red'}}>Incorrect username or password</Text>
        </View>
      )}
      {/* Loading Options */}
      {loading && (
        <View style={styles.loaderContainer}>
          <Image
            source={require('../../Assets/Images/logo_blue.png')}
            style={styles.customLoaderImage}
          />
          <Text style={styles.loadingText}>Logging please wait...</Text>
        </View>
      )}
      {/* Button View */}
      <View style={{width: '100%'}}>
        <AuthButton title="Log in" handleAction={() => handleLogin()} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  imageStyle: {
    alignSelf: 'center',
    height: responsivePadding(150),
    width: responsivePadding(150),
  },
  iconStyle: {
    marginRight: responsivePadding(10),
  },
  forgotPassword: {
    marginVertical: responsivePadding(10),
    marginHorizontal: responsivePadding(20),
    textAlign: 'right',
    color: Colors.black,
    fontSize: responsiveFontSize(16),
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  inputContainer: {
    marginVertical: responsivePadding(10),
    marginHorizontal: responsivePadding(20),
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backGround_grey,
    borderRadius: responsivePadding(10),
    borderWidth: responsivePadding(1.5),
    borderColor: Colors.border_grey,
    fontWeight: '500',
    justifyContent: 'space-between',
  },
  inputStyle: {
    width: '90%',
    letterSpacing: 0.7,
    padding:
      Platform.OS === 'ios' ? responsivePadding(20) : responsivePadding(15),
    borderRadius: responsivePadding(10),
    borderColor: Colors.border_grey,
    fontWeight: '500',
    color: Colors.black,
    fontSize: responsiveFontSize(16),
  },
  loaderContainer: {
    position: 'absolute',
    flex: 1,
    top: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    zIndex: 1,
    borderWidth: responsivePadding(2),
    height: '20%',
    width: '90%',
    alignSelf: 'center',
    borderRadius: responsivePadding(10),
    borderColor: 'white',
    elevation: responsivePadding(25),
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: responsivePadding(2),
    },
  },
  customLoaderImage: {
    width: responsivePadding(50),
    height: responsivePadding(50),
  },
  loadingText: {
    fontSize: FontSize.fontSize18,
    fontWeight: '500',
    marginTop: responsivePadding(10),
    color: Colors.black,
  },
  errorView: {
    width: '90%',
    marginHorizontal: responsivePadding(25),
  },
});
