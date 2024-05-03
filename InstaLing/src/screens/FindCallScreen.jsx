import React, {useState, useEffect} from 'react';
import {Platform, Text, SafeAreaView, AppState} from 'react-native';
import WavyCallIndicator from '../components/WavyCallIndicator';
import CallScreen from '../components/CallScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PermissionsAndroid} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {setAppBackground} from '../redux/types';
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
  const [roomId, setRoomId] = useState(null);
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

    getUser();
  }, []);

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
        setRoomId(data.room);

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
  console.log('RoomId', roomId);
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
        <CallScreen pairedData={pairedData} roomId={roomId} />
      ) : null}
    </SafeAreaView>
  );
}

export default FindCallScreen;
