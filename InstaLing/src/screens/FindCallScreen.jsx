import React, {useState, useEffect} from 'react';
import {Platform, Text, View, PermissionsAndroid} from 'react-native';
import WavyCallIndicator from '../components/WavyCallIndicator';
import CallScreen from '../components/CallScreen';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

function FindCallScreen() {
  const [showCallScreen, setShowCallScreen] = useState(false);
  const [audioPermission, setAudioPermission] = useState(null);
  const [videoPermission, setVideoPermission] = useState(null);
  const navigation = useNavigation();

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
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return 'granted';
        } else {
          return 'denied';
        }
      } catch (err) {
        console.warn(err);
        return 'denied';
      }
    } else {
      // For iOS, camera permission is handled through Info.plist configuration
      // Return granted assuming the permission is configured in Info.plist
      return 'granted';
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
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return 'granted';
        } else {
          return 'denied';
        }
      } catch (err) {
        console.warn(err);
        return 'denied';
      }
    } else {
      // For iOS, microphone permission is handled through Info.plist configuration
      // Return granted assuming the permission is configured in Info.plist
      return 'granted';
    }
  };

  useEffect(() => {
    const checkPermissions = async () => {
      const audioStatus = await requestMicrophonePermission();
      const videoStatus = await requestCameraPermission();

      setAudioPermission(audioStatus);
      setVideoPermission(videoStatus);
    };

    checkPermissions();
  }, []);

  useEffect(() => {
    setShowCallScreen(false); // Reset showCallScreen state to false each time component mounts
    const timer = setTimeout(() => {
      setShowCallScreen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      setShowCallScreen(false);
      const timer = setTimeout(() => {
        setShowCallScreen(true);
      }, 3000);
      return () => clearTimeout(timer);
    });
    return () => focusListener();
  }, [navigation]);

  const handleEndCall = () => {
    setShowCallScreen(false);
    // Navigate to Feedback screen after ending the call
  };

  if (audioPermission !== 'granted' || videoPermission !== 'granted') {
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
      {showCallScreen ? (
        <CallScreen onEndCall={handleEndCall} />
      ) : (
        <WavyCallIndicator />
      )}
    </SafeAreaView>
  );
}

export default FindCallScreen;
