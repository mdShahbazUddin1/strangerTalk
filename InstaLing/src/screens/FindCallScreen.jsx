import React, {useState, useEffect} from 'react';
import {
  ZegoUIKitPrebuiltCall, // Check if this import is correct
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import {StyleSheet, View, Image} from 'react-native';

export default function CallScreen(props) {
  const [imageSource, setImageSource] = useState(null);

  useEffect(() => {
    // Logic to set the image source when two users get connected
    // For example:
    if (props.usersConnected === 2) {
      // Set the image source here
      setImageSource(require('./path_to_your_image.jpg'));
    }
  }, [props.usersConnected]); // Include props that trigger the effect

  return (
    <View style={styles.container}>
      <ZegoUIKitPrebuiltCall
        appID={256539217}
        appSign={
          '920385abe4c02ddc0f93a1458839ed61845768d4ed4fcd776ca5ea5efff10925'
        }
        userID={'121212'}
        userName={'user_123'}
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
      {imageSource && <Image source={imageSource} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});
