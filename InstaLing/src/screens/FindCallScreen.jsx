import React, {useState, useEffect} from 'react';
import {Platform, Text, SafeAreaView, AppState} from 'react-native';
import WavyCallIndicator from '../components/WavyCallIndicator';
import CallScreen from '../components/CallScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PermissionsAndroid} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {setAppBackground} from '../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {disconnectCall} from '../utils/api';

function FindCallScreen() {
  const [showCallScreen, setShowCallScreen] = useState(false);
  const [audioPermission, setAudioPermission] = useState(null);
  const [videoPermission, setVideoPermission] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pairedData, setPairedData] = useState([]);
  const [isAppActive, setIsAppActive] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs access to your camera',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };

  const requestMicrophonePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Microphone Permission',
            message: 'App needs access to your microphone',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  const handleAppStateChange = async nextAppState => {
    if (nextAppState === 'background' || nextAppState === 'inactive') {
      disconnectCall();
      dispatch(setAppBackground(true));
      setIsAppActive(false); // Update app state
      setIsMinimized(true); // Set minimized state
    } else if (nextAppState === 'active') {
      disconnectCall();
      dispatch(setAppBackground(false));
      if (isMinimized) {
        setIsMinimized(false); // Reset minimized state
        navigation.replace('Main'); // Navigate to main screen only if the app was minimized
      }
    }
  };

  const handleEndCall = () => {
    setShowCallScreen(false);
  };

  useEffect(() => {
    const checkPermissions = async () => {
      const audioStatus = await requestMicrophonePermission();
      const videoStatus = await requestCameraPermission();
      setAudioPermission(audioStatus);
      setVideoPermission(videoStatus);
    };

    checkPermissions();
    if (isAppActive && !isMinimized) {
      getUser(); // Call getUser only if the app is active and not minimized
    }
  }, [isAppActive, isMinimized]);

  const getUser = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        navigation.navigate('Login');
        return;
      }

      const response = await fetch(
        `https://stranger-backend.onrender.com/auth/getrandom`,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      const data = await response.json();

      if (data.message === 'Successfully paired') {
        setPairedData(data.users);
        // console.log(data.users);
        setIsLoading(false);
        setShowCallScreen(true);
        // console.log('paired', pairedData);
      } else {
        setTimeout(getUser, 1000);
        console.log('Waiting for a match...');
      }
    } catch (error) {
      console.error('Error getting random users:', error);
      setIsLoading(false); // Stop loading indicator on error
    }
  };

  if (audioPermission !== true || videoPermission !== true) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#ffffff',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>
          {Platform.OS === 'ios'
            ? 'Please allow access to audio and camera in Settings'
            : 'Please allow access to audio and camera'}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {isLoading ? (
        <WavyCallIndicator />
      ) : showCallScreen ? (
        <CallScreen pairedData={pairedData} onEndCall={handleEndCall} />
      ) : null}
    </SafeAreaView>
  );
}

export default FindCallScreen;
