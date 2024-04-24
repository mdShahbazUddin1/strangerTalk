import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image, ActivityIndicator, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {getUserProfile, getCallHistory} from '../utils/api';

const WelcomeBack = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userProfile, callHistory] = await Promise.all([
          getUserProfile(),
          getCallHistory(),
        ]);
        setIsLoading(false);
        navigation.replace('Main');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.loginContainer}>
          <Image
            style={styles.mainIcon}
            source={require('../../assets/mainIcon.png')}
          />
          <View style={styles.textBox}>
            <Text style={styles.greet}>Hello Again!</Text>
          </View>
          {/* Show loader if isLoading is true */}
          {isLoading && (
            <ActivityIndicator
              style={{marginTop: 40}}
              size="large"
              color="#6D31EDFF"
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 25,
    lineHeight: 48,
    fontWeight: '700',
    color: '#171A1FFF',
  },
});

export default WelcomeBack;
