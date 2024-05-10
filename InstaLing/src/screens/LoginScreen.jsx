import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Pressable,
  Platform,
  ScrollView,
  Keyboard,
  Alert,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const navigation = useNavigation();

  const handleLogin = async values => {
    try {
      const response = await fetch(
        'https://stranger-backend.onrender.com/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        },
      );

      if (response.status === 403) {
        Alert.alert('Invalid Credentials', 'Email or password is incorrect');
      }

      if (response.status === 200) {
        const responseData = await response.json();
        console.log(responseData.user.userId);
        await AsyncStorage.setItem('isLoggedIn', 'true');
        await AsyncStorage.setItem('token', responseData.token);
        await AsyncStorage.setItem('userId', responseData.user.userId);
        await AsyncStorage.setItem('username', responseData.user.username);
        await AsyncStorage.setItem(
          'profileImage',
          responseData.user.profileImage,
        );
        Alert.alert('Login successful', 'You have successfully logged in.', [
          {text: 'OK', onPress: () => navigation.replace('WelComeBack')},
        ]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to login. Please try again later.');
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardOpen(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardOpen(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (isLoggedIn === 'true') {
        navigation.navigate('Main');
      }
    } catch (error) {
      console.error('Error reading login status:', error);
    }
  };

  const handleFocusEmail = () => {
    setIsFocusedEmail(true);
    setIsFocusedPassword(false);
  };

  const handleFocusPassword = () => {
    setIsFocusedPassword(true);
    setIsFocusedEmail(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const handleEmailChange = value => {
    setEmailValid(Yup.string().email().isValidSync(value));
  };

  const handlePasswordChange = value => {
    if (value.length < 6) {
      setPasswordError('Password must be at least 6 characters');
    } else {
      setPasswordError('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.contentContainer}>
        <ScrollView
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          bounces={false}>
          <View style={styles.loginContainer}>
            <Image
              style={styles.mainIcon}
              source={require('../../assets/mainIcon.png')}
            />
          </View>
          <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={validationSchema}
            onSubmit={handleLogin}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <View style={styles.textBox}>
                  <Text style={styles.greet}>Hello Again !</Text>
                  <Text style={styles.text}>Log into your account</Text>
                </View>
                <View style={styles.inputBox}>
                  <View
                    style={[
                      styles.textInputBox,
                      isFocusedEmail && styles.focused,
                      touched.email && errors.email && styles.errorInput,
                    ]}>
                    <EvilIcons
                      style={styles.icon}
                      name="envelope"
                      size={20}
                      color="gray"
                    />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Enter your email address"
                      placeholderTextColor="#9095A1FF"
                      onFocus={handleFocusEmail}
                      onBlur={handleBlur('email')}
                      onChangeText={value => {
                        handleChange('email')(value);
                        handleEmailChange(value);
                      }}
                      value={values.email}
                    />
                    {touched.email && emailValid ? (
                      <Feather name="check-circle" size={20} color="green" />
                    ) : touched.email ? (
                      <FontAwesome name="times-circle" size={20} color="red" />
                    ) : null}
                  </View>
                  {touched.email && errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                  <View style={{marginTop: 20}}>
                    <View
                      style={[
                        styles.textInputBox,
                        isFocusedPassword && styles.focused,
                        touched.password &&
                          errors.password &&
                          styles.errorInput,
                      ]}>
                      <EvilIcons name="lock" size={30} color="gray" />
                      <TextInput
                        style={styles.textInput}
                        placeholder="Enter your password"
                        placeholderTextColor="#9095A1FF"
                        onFocus={handleFocusPassword}
                        onBlur={handleBlur('password')}
                        onChangeText={value => {
                          handleChange('password')(value);
                          handlePasswordChange(value);
                        }}
                        value={values.password}
                        secureTextEntry={!showPassword}
                      />
                      <TouchableOpacity onPress={togglePasswordVisibility}>
                        <FontAwesome
                          name={showPassword ? 'eye-slash' : 'eye'}
                          size={16}
                          color="gray"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  {passwordError !== '' && (
                    <Text style={styles.errorText}>{passwordError}</Text>
                  )}
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    width: 320,
                    marginTop: 20,
                  }}>
                  <View>
                    <Pressable>
                      <Text
                        style={{
                          fontFamily: 'sans-serif',
                          fontSize: 14,
                          lineHeight: 22,
                          fontWeight: '400',
                          color: '#379AE6FF',
                        }}>
                        Forgot password?
                      </Text>
                    </Pressable>
                  </View>
                </View>
                <TouchableOpacity
                  style={{
                    width: '100%',
                    marginTop: 30,
                    backgroundColor: '#6D31EDFF',
                    paddingHorizontal: 130,
                    paddingVertical: 15,
                    borderRadius: 10,
                  }}
                  onPress={handleSubmit}>
                  <Text
                    style={{
                      color: '#ffffff',
                      fontSize: 16,
                      fontWeight: '400',
                      textAlign: 'center',
                    }}>
                    Login
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    marginTop: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'sans-serif',
                      fontSize: 15,
                      lineHeight: 22,
                      fontWeight: '400',
                      color: '#9095A1FF',
                      textAlign: 'center',
                      paddingBottom: 10,
                    }}>
                    Don't have an account ?
                  </Text>
                  <Pressable
                    style={{marginLeft: 5}}
                    onPress={() => navigation.navigate('Register')}>
                    <Text
                      style={{
                        fontFamily: 'sans-serif',
                        fontSize: 15,
                        lineHeight: 22,
                        fontWeight: '500',
                        color: '#6D31EDFF',
                        textAlign: 'center',
                        paddingBottom: 10,
                      }}>
                      Create an account
                    </Text>
                  </Pressable>
                </View>
              </>
            )}
          </Formik>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{width: 80, height: 2, backgroundColor: '#D3D3D3'}}></View>
            <Text style={{marginHorizontal: 10, color: 'gray'}}>Or</Text>
            <View
              style={{
                width: 80,
                borderWidth: 1,
                borderColor: '#D3D3D3',
              }}></View>
          </View>
          <View
            style={{
              width: 330,
              alignItems: 'center',
              marginTop: 20,
              paddingBottom: 30,
            }}>
            <Pressable
              style={{
                width: 40,
                height: 40,
                borderRadius: 50,
                borderWidth: 1,
                borderColor: 'red',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <AntDesign name="google" size={22} color="red" />
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 70,
  },
  mainIcon: {
    width: 74,
    height: 72,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBox: {
    marginTop: 20,
    alignItems: 'center',
  },
  greet: {
    fontFamily: 'sans-serif',
    fontSize: 32,
    lineHeight: 48,
    fontWeight: '700',
    color: '#171A1FFF',
  },
  text: {
    fontFamily: 'sans-serif',
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '400',
    color: '#9095A1FF',
  },
  inputBox: {
    marginTop: 50,
    alignItems: 'center',
  },
  textInputBox: {
    width: 334,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#9095A1FF',
    paddingHorizontal: 10,
  },
  focused: {
    borderWidth: 2,
    borderColor: '#4DD0E1',
    elevation: 2,
    backgroundColor: '#ffffff',
  },
  errorInput: {
    borderColor: 'red',
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    marginLeft: 5,
  },
  errorText: {
    width: 330,
    color: 'red',
    fontSize: 14,
    marginTop: 6,
    textAlign: 'left',
  },
});

export default LoginScreen;
