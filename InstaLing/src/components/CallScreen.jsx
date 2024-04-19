import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  ZegoUIKitPrebuiltCall,
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';

import {StyleSheet, View, Image} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {hangUpCall} from '../redux/actions';
import {disconnectCall, saveCallHistory} from '../utils/api';

export default function CallScreen({pairedData}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const callActive = useSelector(state => state.callActive);
  const isFocused = useIsFocused();
  const [callDuration, setCallDuration] = useState(0);

  let timer;

  useEffect(() => {
    timer = setInterval(() => {
      setCallDuration(prevDuration => prevDuration + 1); // Increment call duration every second
    }, 1000);

    return () => clearInterval(timer); // Cleanup the interval on unmount
  }, []);

  useEffect(() => {
    if (!callActive && isFocused) {
      navigation.replace('Feedback');
    }
  }, [callActive, isFocused, navigation]);

  const formatTime = time => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleHangUp = async () => {
    dispatch(hangUpCall());
    disconnectCall();
    clearInterval(timer);
    const formattedDuration = formatTime(callDuration);
    const randomUser = pairedData[1];

    if (randomUser) {
      try {
        // Send call duration to the backend
        const response = await saveCallHistory(
          randomUser._id,
          formattedDuration,
        );
        console.log(response); // Log the response from the backend
      } catch (error) {
        console.error(error); // Log any errors
      }
    }
  };

  useEffect(() => {
    if (!callActive && isFocused) {
      dispatch({type: 'SET_CALL_ACTIVE', payload: true}); // Set callActive to true when component mounts or becomes focused
    }
  }, [dispatch, callActive, isFocused]);

  return (
    <View style={styles.container}>
      {pairedData.map((user, index) => (
        <ZegoUIKitPrebuiltCall
          key={user._id}
          style={styles.mirroredVideo}
          appID={256539217}
          appSign={
            '920385abe4c02ddc0f93a1458839ed61845768d4ed4fcd776ca5ea5efff10925'
          }
          userID={user._id}
          userName={`${user.username}`}
          callID={'group123'}
          config={{
            ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
            onHangUp: handleHangUp,
            turnOnCameraWhenJoining: false,
            turnOnMicrophoneWhenJoining: false,
            useSpeakerWhenJoining: true,

            avatarBuilder: ({userInfo}) => (
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
