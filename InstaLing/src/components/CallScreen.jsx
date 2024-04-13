import React from 'react';
import {
  ZegoUIKitPrebuiltCall,
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import {ZegoLayoutMode, ZegoViewPosition} from '@zegocloud/zego-uikit-rn';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import {StyleSheet, View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function CallScreen(props) {
  const navigation = useNavigation();
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
            // props.navigation.navigate('Feedback');
          },
          onHangUp: () => {
            navigation.navigate('Feedback');
          },
          layout: {
            mode: ZegoLayoutMode.pictureInPicture,
            config: {
              switchLargeOrSmallViewByClick: true,
              smallViewPosition: ZegoViewPosition.topRight,
              smallViewSize: {width: 100, height: 100}, // Adjust size as needed
            },
          },
          avatarBuilder: ({userInfo}) => {
            if (userInfo) {
              return (
                <View
                  style={{
                    width: '100%',
                    height: '100%',
                    transform: [{scaleX: -1}],
                  }}>
                  <Image
                    style={{
                      width: '100%',
                      height: '100%',
                      transform: [{scaleX: -1}],
                    }}
                    resizeMode="cover"
                    source={{
                      uri: `https://robohash.org/${userInfo.userId}.png`,
                    }}
                  />
                </View>
              );
            } else {
              return null; // Handle the case when userInfo is null
            }
          },
        }}
        zimInstance={ZIM} // Pass ZIM instance
        zpnsInstance={ZPNs} // Pass ZPNs instance
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
