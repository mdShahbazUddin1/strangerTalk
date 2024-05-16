import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainScreen = () => {
  const navigation = useNavigation();

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
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginContainer}>
        <Image
          style={styles.mainIcon}
          source={require('../../assets/mainIcon.png')}
        />
        <Text
          style={{
            color: 'black',
            fontSize: 23,
            fontFamily: 'sans-serif',
            fontWeight: '700',
          }}>
          Instalingual
        </Text>

        <Text
          style={{
            color: 'black',
            fontSize: 18,
            fontFamily: 'sans-serif',
            fontWeight: '700',
            marginTop: 100,
          }}>
          New user
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('Register');
          }}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        <Text
          style={{
            color: 'black',
            fontSize: 18,
            fontFamily: 'sans-serif',
            fontWeight: '700',
            marginTop: 50,
          }}>
          Already have an account
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  loginContainer: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  mainIcon: {
    width: 74,
    height: 72,
    marginBottom: 20, // Add some space between the image and buttons
  },
  button: {
    width: '80%',
    padding: 13,
    backgroundColor: '#6D31EDFF',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 6,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
