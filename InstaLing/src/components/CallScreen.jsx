import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  ZegoUIKitPrebuiltCall,
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';

import {StyleSheet, View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {hangUpCall} from '../redux/actions';

export default function CallScreen({pairedData}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const callActive = useSelector(state => state.callActive);

  useEffect(() => {
    if (!callActive) {
      navigation.replace('Feedback');
    }
  }, [callActive, navigation]);

  const handleHangUp = () => {
    dispatch(hangUpCall());
  };

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
