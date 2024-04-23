import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  ZegoUIKitPrebuiltCall,
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';

import {ZegoLayoutMode, ZegoViewPosition} from '@zegocloud/zego-uikit-rn';
import {AppState, StyleSheet, View, Image} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {hangUpCall} from '../redux/actions';
import {disconnectCall, saveCallHistory} from '../utils/api';

export default function CallScreen({pairedData}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const callActive = useSelector(state => state.callActive);
  const isFocused = useIsFocused();
  const [callDuration, setCallDuration] = useState(0);
  const [randomUser, setRandomUser] = useState(null);
  const [reversedData, setReversedData] = useState([]);

  useEffect(() => {
    setReversedData([...pairedData].reverse());
  }, [pairedData]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prevDuration => prevDuration + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  const handleAppStateChange = async nextAppState => {
    if (nextAppState === 'background' || nextAppState === 'inactive') {
      disconnectCall();
      const formattedDuration = formatTime(callDuration);
      const randomUser = pairedData[1];

      if (randomUser) {
        try {
          const response = await saveCallHistory(
            randomUser._id,
            formattedDuration,
          );
          console.log('Call history saved:', response);
        } catch (error) {
          console.error('Error saving call history:', error);
        }
      }
      AppState.removeEventListener('change', handleAppStateChange);
    }
  };

  useEffect(() => {
    if (!callActive && isFocused && randomUser) {
      navigation.replace('Feedback', {
        userId: randomUser._id,
        username: randomUser.username,
        profileImage: randomUser.profileImage,
      });
    }
  }, [callActive, isFocused, navigation, randomUser]);

  const formatTime = time => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleHangUp = async () => {
    disconnectCall();
    const formattedDuration = formatTime(callDuration);
    const randomUser = reversedData[0];

    if (randomUser) {
      setRandomUser(randomUser);
      try {
        const response = await saveCallHistory(
          randomUser._id,
          formattedDuration,
        );
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
    dispatch(hangUpCall());
  };

  useEffect(() => {
    if (!callActive && isFocused) {
      dispatch({type: 'SET_CALL_ACTIVE', payload: true});
    }
  }, [dispatch, callActive, isFocused]);

  return (
    <View style={styles.container}>
      {reversedData.map((user, index) => (
        <ZegoUIKitPrebuiltCall
          key={user._id}
          style={styles.mirroredVideo}
          appID={256539217}
          appSign="920385abe4c02ddc0f93a1458839ed61845768d4ed4fcd776ca5ea5efff10925"
          userID={user._id}
          userName={user.username}
          callID="group123"
          config={{
            ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
            onHangUp: handleHangUp,
            turnOnCameraWhenJoining: false,
            turnOnMicrophoneWhenJoining: false,
            useSpeakerWhenJoining: false,
            avatarBuilder: () => (
              <View style={{width: '100%', height: '100%'}}>
                {user.profileImage && (
                  <Image
                    style={{width: '100%', height: '100%'}}
                    resizeMode="cover"
                    source={{uri: user.profileImage}}
                  />
                )}
              </View>
            ),
            layout: {
              mode: ZegoLayoutMode.pictureInPicture,
              config: {
                switchLargeOrSmallViewByClick: true,
                smallViewBorderRadius: 10,
                smallViewPosition: ZegoViewPosition.topRight,
                smallViewSize: {width: 85, height: 151},
              },
            },
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mirroredVideo: {
    transform: [{scaleX: -1}],
  },
});
