import React from 'react';
import {
  ZegoUIKitPrebuiltCall,
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import {StyleSheet, View} from 'react-native';

export default function CallScreen(props) {
  const userId = String(Math.floor(Math.random() * 100000));
  return (
    <View style={styles.container}>
      <ZegoUIKitPrebuiltCall
        style={styles.mirroredVideo}
        appID={256539217}
        appSign={
          '920385abe4c02ddc0f93a1458839ed61845768d4ed4fcd776ca5ea5efff10925'
        }
        userID={userId}
        userName={`user_${userId}`}
        callID={'group123'}
        config={{
          ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
          onOnlySelfInRoom: () => {
            // props.navigation.navigate('HomePage');
          },
          onHangUp: () => {
            // props.navigation.navigate('HomePage');
          },
        }}
      />
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
