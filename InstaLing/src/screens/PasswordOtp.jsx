import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {sendPassOtp, verifyOtp} from '../utils/api';
import {useNavigation} from '@react-navigation/native';

const PasswordOtp = ({route}) => {
  const {email} = route.params;
  const navigation = useNavigation();

  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(120); // Timer in seconds
  const intervalRef = useRef(null); // Use ref to store interval

  useEffect(() => {
    startTimer();

    return () => clearInterval(intervalRef.current); // Clear interval when component unmounts
  }, []);

  const startTimer = () => {
    clearInterval(intervalRef.current); // Clear any existing interval
    intervalRef.current = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          clearInterval(intervalRef.current);
          return 0;
        }
      });
    }, 1000);
  };

  const handleOtpChange = (text, index) => {
    const newOtp = otp.split('');
    newOtp[index] = text;
    setOtp(newOtp.join(''));

    if (text !== '' && index < 5) {
      this[`otpInput${index + 1}`].focus();
    }
  };

  const handleVerify = async () => {
    try {
      const response = await verifyOtp(otp); // Call verifyOtp function

      if (response.message == 'OTP verified successfully') {
        navigation.navigate('ChangePass', {email});
        try {
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      // Handle verification error
      Alert.alert('Error', error.message);
    }
  };

  const handleResendOTP = async () => {
    try {
      await sendPassOtp(email);
      Alert.alert('OTP send', 'Please check your email for otp.', [
        {text: 'OK'},
      ]);
      setOtp(''); // Clear OTP input
      setTimer(120); // Reset timer
      startTimer(); // Restart timer
    } catch (error) {
      console.error('Error sending OTP:', error);
      Alert.alert('Error', 'Failed to send OTP. Please try again later.');
    }
  };

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <View style={styles.container}>
      <View>
        <Text
          style={{
            color: 'black',
            fontSize: 25,
            fontFamily: 'sans-serif',
            fontWeight: '600',
          }}>
          Instalingual
        </Text>
      </View>
      <View style={{marginTop: 50, alignItems: 'center'}}>
        <Text style={{color: 'black', fontSize: 18}}>Verify your email</Text>
        <Text style={{color: 'black', marginTop: 2, fontSize: 14}}>
          Enter 6 digit code received on your email
        </Text>
      </View>
      <Text style={styles.header}>Enter OTP</Text>
      <View style={styles.otpContainer}>
        {[0, 1, 2, 3, 4, 5].map(index => (
          <TextInput
            key={index}
            ref={ref => (this[`otpInput${index}`] = ref)}
            style={styles.otpInput}
            onChangeText={text => handleOtpChange(text, index)}
            value={otp[index] || ''}
            maxLength={1}
            keyboardType="numeric"
          />
        ))}
      </View>
      {timer > 0 && (
        <Text style={styles.timer}>
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds} min
        </Text>
      )}

      <TouchableOpacity
        style={styles.verifyButton}
        onPress={handleVerify}
        disabled={otp.length !== 6}>
        <Text style={styles.verifyButtonText}>Verify</Text>
      </TouchableOpacity>

      {timer === 0 && (
        <TouchableOpacity
          style={[styles.resendButton]}
          onPress={handleResendOTP}>
          <Text style={styles.resendButtonText}>Resend OTP</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 30,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 24,
    marginTop: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
    marginBottom: 20,
    color: 'black',
  },
  otpInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    width: 40,
    height: 40,
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
  },
  timer: {
    fontSize: 16,
    marginBottom: 20,
    color: 'black',
  },
  resendButton: {
    // backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  resendButtonText: {
    alignItems: 'flex-end',
    color: 'gray',
    fontSize: 16,
  },
  verifyButton: {
    backgroundColor: '#6D31EDFF',
    paddingVertical: 10,
    paddingHorizontal: 80,
    borderRadius: 10,
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default PasswordOtp;
