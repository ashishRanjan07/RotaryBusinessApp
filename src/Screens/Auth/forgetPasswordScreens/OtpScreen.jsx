import React, {useState, useEffect, useRef} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Colors from '../../../Theme/Colors';
import AuthScreenTitle from '../../../Compenents/AuthScreenTitle';
import {
  responsiveFontSize,
  responsivePadding,
} from '../../../Compenents/Responsive';
import AuthButton from '../../../Compenents/Buttons/AuthButton';
import {serverAddress} from '../../../API_Services/API_service';
import {verifyOtp} from '../../../API_Services/auth_API';
import images from '../../../Theme/Images';

const OtpScreen = ({route, navigation}) => {
  const {email} = route.params;
  const otpLength = 6;
  const [otpArray, setOtpArray] = useState(Array(otpLength).fill(''));
  const [remainingTime, setRemainingTime] = useState(30);
  const [showResendButton, setShowResendButton] = useState(false);

  const onSubmit = async () => {
    const otp = otpArray.join('');
    if (
      otp.length === otpLength &&
      otpArray.every(element => element.trim() !== '')
    ) {
      try {
        const formData = {
          otp: otp,
          email_address: email,
        };
        const response = await verifyOtp(formData);
        if (response.success) {
          Alert.alert('Success', response.message);
          navigation.replace('NewPassword', {email});
          setOtpArray(Array(otpLength).fill(''));
        } else {
          Alert.alert(
            'Error',
            response.message || 'Failed to verify OTP. Please try again.',
          );
        }
      } catch (error) {
        Alert.alert('Error', 'Something went wrong. Please try again later.');
      }
    } else {
      Alert.alert('Invalid OTP', 'Please enter a valid 6-digit OTP.');
    }
  };

  const resendOtp = async () => {
    try {
      const response = await fetch(`${serverAddress}/member/forgot/password`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email_address: email}),
      });

      const responseData = await response.json();
      if (response.ok && responseData.success) {
        Alert.alert('Success', 'OTP resend successfully');
        setRemainingTime(30);
        setShowResendButton(false);
        setOtpArray(Array(otpLength).fill(''));
        if (refArray.current[0] && refArray.current[0].current) {
          refArray.current[0].current.focus();
        }
      } else {
        Alert.alert('Error', responseData.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong, please try again.');
    }
  };

  useEffect(() => {
    if (remainingTime <= 0) {
      setShowResendButton(true);
      return;
    }

    const interval = setInterval(() => {
      setRemainingTime(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingTime]);

  const refArray = useRef(otpArray.map(() => React.createRef()));

  const handleOtpChange = (index, value) => {
    const otpCopy = [...otpArray];
    otpCopy[index] = value;
    setOtpArray(otpCopy);

    if (value && index < otpLength - 1) {
      refArray.current[index + 1].current.focus();
    }
  };

  const handleKeyPress = (index, key) => {
    if (key === 'Backspace' && !otpArray[index] && index > 0) {
      refArray.current[index - 1].current.focus();
    }
  };

  const renderInputs = () => {
    return otpArray.map((item, index) => (
      <TextInput
        key={index}
        style={styles.otpBox}
        keyboardType="number-pad"
        maxLength={1}
        onChangeText={text => handleOtpChange(index, text)}
        onKeyPress={({nativeEvent}) => handleKeyPress(index, nativeEvent.key)}
        ref={refArray.current[index]}
        value={otpArray[index]}
      />
    ));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : '100'}
      style={styles.container}>
      {/* Header Images */}
      <View>
        <Image
          source={images.app_logo_blue}
          style={styles.imageStyle}
          resizeMode="contain"
        />
      </View>
      {/* Title and Descriptions */}
      <AuthScreenTitle title="OTP" subTitle="Please enter 6 digit email Otp!" />
      <View style={styles.inputContainer}>
        <View style={styles.otpContainer}>{renderInputs()}</View>
        <View style={{marginVertical: responsivePadding(20)}}>
          {showResendButton ? (
            <TouchableOpacity onPress={resendOtp} style={styles.resendButton}>
              <Text style={styles.resendButtonText}>Resend OTP</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.timerText}>
              Resend OTP in {remainingTime} sec
            </Text>
          )}
        </View>
        <AuthButton title="Verify OTP" handleAction={onSubmit} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default OtpScreen;

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
  inputContainer: {
    marginVertical: responsivePadding(10),
    marginHorizontal: responsivePadding(20),
    width: '95%',
  },
  otpText: {
    fontSize: responsiveFontSize(19),
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.black,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: responsivePadding(20),
  },
  otpBox: {
    width: responsivePadding(40),
    height: responsivePadding(40),
    borderBottomWidth: responsivePadding(1),
    textAlign: 'center',
    fontSize: responsiveFontSize(18),
    color: Colors.black,
  },
  timerText: {
    textAlign: 'center',
    color: Colors.black,
    fontSize: responsiveFontSize(16),
  },
  resendButton: {
    backgroundColor: Colors.border_grey,
    padding: responsivePadding(15),
    borderRadius: responsivePadding(10),
    width: '90%',
    alignSelf: 'center',
  },
  resendButtonText: {
    color: Colors.iconColor,
    textAlign: 'center',
    fontSize: responsiveFontSize(16),
    fontWeight: '600',
  },
});
