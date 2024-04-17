import React from 'react';
import {
  ZegoUIKitPrebuiltCall,
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import {ZegoLayoutMode, ZegoViewPosition} from '@zegocloud/zego-uikit-rn';
import {StyleSheet, View, Image, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function CallScreen({pairedData}, props) {
  const navigation = useNavigation();
  const userId = String(Math.floor(Math.random() * 100000));

  return (
    <View style={styles.container}>
      {pairedData.map((user, index) => (
        <ZegoUIKitPrebuiltCall
          style={styles.mirroredVideo}
          appID={256539217}
          appSign={
            '920385abe4c02ddc0f93a1458839ed61845768d4ed4fcd776ca5ea5efff10925'
          }
          userID={userId}
          userName={`${user.username}`}
          callID={'group123'}
          config={{
            ...ONE_ON_ONE_VIDEO_CALL_CONFIG,

            onHangUp: () => {
              props.navigation.navigate('Feedback');
            },
            turnOnCameraWhenJoining: true,
            turnOnMicrophoneWhenJoining: false,
            useSpeakerWhenJoining: true,
            avatarBuilder: ({userInfo}) => {
              return (
                <View style={{width: '100%', height: '100%'}}>
                  <Image
                    style={{width: '100%', height: '100%'}}
                    resizeMode="cover"
                    source={{
                      uri: `${user.profileImage}`,
                    }}
                  />
                </View>
              );
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
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  mirroredVideo: {
    transform: [{scaleX: -1}],
  },
});
