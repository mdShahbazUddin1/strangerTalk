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
  ScrollView,
  Platform,
  Keyboard,
  Alert,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

function RegisterScreen() {
  const [isFocusedUsername, setIsFocusedUsername] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [isFocusedPhoneNumber, setIsFocusedPhoneNumber] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const navigation = useNavigation();

  const handleRegister = async values => {
    try {
      const response = await fetch(
        'https://stranger-backend.onrender.com/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        },
      );

      if (response.status === 409) {
        Alert.alert('Error', 'Email is already registered');
      }
      if (response.status === 200) {
        Alert.alert(
          'Registration successful',
          'You have successfully registered.',
          [{text: 'OK', onPress: () => navigation.navigate('Login')}],
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to register. Please try again later.');
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

    // Clean up listeners
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleFocusUsername = () => {
    setIsFocusedUsername(true);
    setIsFocusedEmail(false);
    setIsFocusedPassword(false);
    setIsFocusedPhoneNumber(false);
  };

  const handleFocusEmail = () => {
    setIsFocusedUsername(false);
    setIsFocusedEmail(true);
    setIsFocusedPassword(false);
    setIsFocusedPhoneNumber(false);
  };

  const handleFocusPassword = () => {
    setIsFocusedUsername(false);
    setIsFocusedEmail(false);
    setIsFocusedPassword(true);
    setIsFocusedPhoneNumber(false);
  };

  const handleFocusPhoneNumber = () => {
    setIsFocusedUsername(false);
    setIsFocusedEmail(false);
    setIsFocusedPassword(false);
    setIsFocusedPhoneNumber(true);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.contentContainer}>
        <ScrollView
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={{
            paddingBottom: keyboardOpen ? 60 : 0,
          }}>
          <View style={styles.registerContainer}>
            <Image
              style={styles.mainIcon}
              source={require('../../assets/mainIcon.png')}
            />
          </View>
          <Formik
            initialValues={{
              username: '',
              email: '',
              phone: '', // Changed from phoneNumber to phone
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleRegister}>
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
                  <Text style={styles.greet}>Nice to see you</Text>
                  <Text style={styles.text}>Create your account</Text>
                </View>
                <View style={styles.inputBox}>
                  <View
                    style={[
                      styles.textInputBox,
                      isFocusedUsername && styles.focused,
                      touched.username && errors.username && styles.errorInput,
                    ]}>
                    <Feather
                      style={styles.icon}
                      name="user"
                      size={18}
                      color="gray"
                    />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Enter your username"
                      placeholderTextColor="#9095A1FF"
                      onFocus={handleFocusUsername}
                      onBlur={handleBlur('username')}
                      onChangeText={handleChange('username')}
                      value={values.username}
                    />
                    {touched.username && !errors.username ? (
                      <FontAwesome
                        name="check-circle"
                        size={20}
                        color="green"
                      />
                    ) : touched.username ? (
                      <FontAwesome name="times-circle" size={20} color="red" />
                    ) : null}
                  </View>
                  {touched.username && errors.username && (
                    <Text style={styles.errorText}>{errors.username}</Text>
                  )}
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
                      onChangeText={handleChange('email')}
                      value={values.email}
                    />
                    {touched.email && !errors.email ? (
                      <FontAwesome
                        name="check-circle"
                        size={20}
                        color="green"
                      />
                    ) : touched.email ? (
                      <FontAwesome name="times-circle" size={20} color="red" />
                    ) : null}
                  </View>
                  {touched.email && errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                  <View
                    style={[
                      styles.textInputBox,
                      isFocusedPassword && styles.focused,
                      touched.password && errors.password && styles.errorInput,
                    ]}>
                    <EvilIcons name="lock" size={30} color="gray" />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Enter your password"
                      placeholderTextColor="#9095A1FF"
                      onFocus={handleFocusPassword}
                      onBlur={handleBlur('password')}
                      onChangeText={handleChange('password')}
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
                  {touched.password && errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                  <View
                    style={[
                      styles.textInputBox,
                      isFocusedPhoneNumber && styles.focused,
                      touched.phone && errors.phone && styles.errorInput,
                    ]}>
                    <Feather
                      style={styles.icon}
                      name="phone"
                      size={18}
                      color="gray"
                    />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Enter your phone number"
                      placeholderTextColor="#9095A1FF"
                      onFocus={handleFocusPhoneNumber}
                      onBlur={handleBlur('phone')}
                      onChangeText={handleChange('phone')}
                      value={values.phone}
                      keyboardType="numeric"
                    />
                    {touched.phone && !errors.phone ? (
                      <FontAwesome
                        name="check-circle"
                        size={20}
                        color="green"
                      />
                    ) : touched.phone ? (
                      <FontAwesome name="times-circle" size={20} color="red" />
                    ) : null}
                  </View>
                  {touched.phone && errors.phone && (
                    <Text style={styles.errorText}>{errors.phone}</Text>
                  )}
                </View>
                <Pressable
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
                    Register
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => navigation.navigate('Login')}
                  style={{margin: 10}}>
                  <Text
                    style={{
                      fontFamily: 'sans-serif',
                      fontSize: 14,
                      lineHeight: 22,
                      fontWeight: '400',
                      color: '#9095A1FF',
                      textAlign: 'center',
                      paddingBottom: 20,
                    }}>
                    Already have an account? Login
                  </Text>
                </Pressable>
              </>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  phone: Yup.string() // Changed from phoneNumber to phone
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  registerContainer: {
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
    marginTop: 20,
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
    marginTop: 20,
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

export default RegisterScreen;
