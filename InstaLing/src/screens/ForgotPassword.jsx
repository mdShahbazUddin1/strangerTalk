import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {sendPassOtp} from '../utils/api';
import {LanguageContext} from '../context/LanguageContext';
import strings from '../locales/LocalizedString';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const {selectedLanguage, changeLanguage} = useContext(LanguageContext);

  useEffect(() => {
    fetchSelectedLanguage();
  }, [selectedLanguage]);

  const fetchSelectedLanguage = async () => {
    strings.setLanguage(selectedLanguage);
  };

  const handlePassOtp = async () => {
    try {
      setLoading(true);
      const response = await sendPassOtp(email);
      if (response.message === 'OTP sent successfully') {
        navigation.navigate('PasswordOtp', {email});
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      if (error.message == 'Email is not registered') {
        Alert.alert('Error', 'Email is not registered');
      } else {
        Alert.alert('Error', 'Failed to send OTP. Please try again later.');
      }
    } finally {
      setLoading(false); // Hide loader after response
    }
  };

  return (
    <KeyboardAvoidingView behavior="position" style={styles.mainCon}>
      <View style={{padding: 20, paddingLeft: 10}}>
        <Pressable style={{padding: 5}} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#9095A1FF" />
        </Pressable>
      </View>
      <View style={{position: 'relative', marginTop: 60, bottom: 30}}>
        <View style={styles.container}>
          <View style={styles.loginLblCon}>
            <Text style={styles.loginLbl}>{strings.forgot}</Text>
          </View>
          <View style={styles.forgotDes}>
            <Text style={styles.forgotDesLbl}>{strings.forgotGreet}</Text>
          </View>
          <View style={styles.formCon}>
            <View style={styles.textBoxCon}>
              <View style={styles.textCon}>
                <TextInput
                  style={styles.textInput}
                  placeholder={'Email ID'}
                  placeholderTextColor={'#aaa'}
                  value={email}
                  onChangeText={text => setEmail(text)}
                />
              </View>
            </View>
          </View>

          <View style={[styles.loginIcon, {marginTop: 40}]}>
            <Pressable style={styles.LoginBtn} onPress={handlePassOtp}>
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.loginBtnLbl}>
                  {strings.accountDetails.submit}
                </Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainCon: {
    backgroundColor: '#fff',
    flex: 1,
  },
  loginIcon: {
    alignSelf: 'center',
  },
  formCon: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  container: {
    paddingHorizontal: 20,
    marginTop: 100,
  },
  loginLblCon: {
    position: 'relative',
    bottom: 40,
  },
  loginLbl: {
    color: '#000',
    fontSize: 40,
    fontWeight: '700',
    fontFamily: 'sans-serif',
  },

  textBoxCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textCon: {
    width: '90%',
  },

  textInput: {
    borderBottomColor: '#aaa',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    color: '#000',
    fontSize: 16,
    // fontFamily: Fonts.type.NotoSansMedium,
    height: 40,
  },

  LoginBtn: {
    backgroundColor: '#6D31EDFF',
    borderRadius: 20,
    paddingHorizontal: 80,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  loginBtnLbl: {
    textAlign: 'center',
    fontSize: 16,
    // fontFamily: Fonts.type.NotoSansBlack,
    color: '#fff',
    paddingVertical: 10,
  },

  forgotDes: {
    position: 'relative',
    bottom: 35,
  },
  forgotDesLbl: {
    color: '#000',
    // fontFamily: Fonts.type.NotoSansRegular,
  },
});

export default ForgotPasswordScreen;
