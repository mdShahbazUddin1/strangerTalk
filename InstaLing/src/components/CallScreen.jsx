import React, {useEffect, useState} from 'react';
import {
  View,
  Button,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import io from 'socket.io-client';
import {RTCPeerConnection, RTCView, mediaDevices} from 'react-native-webrtc';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import {disconnectCall, saveCallHistory} from '../utils/api';
import {updateCallDuration} from '../redux/actions';
import {useDispatch, useSelector} from 'react-redux';

const socket = io('http://192.168.1.7:8080');

const CallScreen = ({pairedData}) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [roomName, setRoomName] = useState('');
  const [localUser, setLocalUser] = useState(null);
  const [remoteUser, setRemoteUser] = useState(null);
  const {width, height} = useWindowDimensions();
  const [callDuration, setCallDuration] = useState(0);
  const dispatch = useDispatch();
  const globalCallDuration = useSelector(state => state.callDuration);

  const navigation = useNavigation();

  const [selectedButtons, setSelectedButtons] = useState({
    microphone: false,
    camera: false,
    hangup: false,
    video: false,
    unmute: false,
  });

  const toggleButton = buttonName => {
    setSelectedButtons(prevState => ({
      ...prevState,
      [buttonName]: !prevState[buttonName],
    }));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prevDuration => prevDuration + 1);
      dispatch(updateCallDuration(callDuration + 1)); // Update Redux store
    }, 1000);
    return () => clearInterval(timer);
  }, [dispatch, callDuration]);

  useEffect(() => {
    const initializeStreams = async () => {
      const stream = await mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setLocalStream(stream);
    };

    initializeStreams();

    return () => {
      if (localStream) {
        localStream.release();
      }
    };
  }, []);

  useEffect(() => {
    if (pairedData.length > 0) {
      setLocalUser(pairedData[0]);
    }
    if (pairedData.length > 1) {
      setRemoteUser(pairedData[1]);
    }
  }, [pairedData]);

  useEffect(() => {
    const randomRoomName = 'room_123';
    setRoomName(randomRoomName);
    socket.emit('join', randomRoomName);
    console.log('Joining room:', randomRoomName);
  }, []);

  useEffect(() => {
    if (roomName && localStream) {
      createPeerConnection();
    }
  }, [roomName, localStream]);

  useEffect(() => {
    const handleOffer = async offer => {
      console.log('Received offer:', offer);
      await peerConnection.setRemoteDescription(offer);
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      socket.emit('answer', answer, roomName);
      console.log('Sending answer:', answer);
    };

    socket.on('offer', handleOffer);

    return () => {
      socket.off('offer', handleOffer);
    };
  }, [peerConnection, roomName]);

  useEffect(() => {
    const handleAnswer = async answer => {
      console.log('Received answer:', answer);
      await peerConnection.setRemoteDescription(answer);
    };

    socket.on('answer', handleAnswer);

    return () => {
      socket.off('answer', handleAnswer);
    };
  }, [peerConnection]);

  useEffect(() => {
    const handleCandidate = async candidate => {
      try {
        await peerConnection.addIceCandidate(candidate);
      } catch (err) {
        console.error('Error adding ice candidate:', err);
      }
    };

    socket.on('candidate', handleCandidate);

    return () => {
      socket.off('candidate', handleCandidate);
    };
  }, [peerConnection]);

  const createPeerConnection = async () => {
    const configuration = {
      iceServers: [{urls: 'stun:stun.l.google.com:19302'}],
    };
    const pc = new RTCPeerConnection(configuration);

    if (localStream) {
      localStream.getTracks().forEach(track => pc.addTrack(track, localStream));
    }

    pc.ontrack = event => {
      console.log('Remote stream received:', event.streams[0]);
      setRemoteStream(event.streams[0]);
    };

    pc.onicecandidate = event => {
      if (event.candidate) {
        socket.emit('candidate', event.candidate, roomName);
        console.log('Sending candidate:', event.candidate);
      }
    };

    setPeerConnection(pc);

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    socket.emit('offer', offer, roomName);
    console.log('Sending offer:', offer);
  };

  const handleHangUp = async () => {
    // Close the peer connection
    if (peerConnection) {
      peerConnection.close();
    }

    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(null);
    }

    // Release the remote stream
    setRemoteStream(null);

    // Disconnecting and saving history
    disconnectCall();

    // Navigate back to the feedback screen
    const formattedDuration = formatTime(globalCallDuration);
    const currentRandomUser = pairedData[1];

    if (currentRandomUser) {
      try {
        const response = await saveCallHistory(
          currentRandomUser._id,
          formattedDuration,
        );
        console.log(response);
      } catch (error) {
        console.error(error);
      }
      // Navigate to feedback screen when returning from background
      navigation.replace('Feedback', {
        userId: currentRandomUser._id,
        username: currentRandomUser.username,
        profileImage: currentRandomUser.profileImage,
      });
    }

    // Emit hangup event to inform the other user
    socket.emit('hangup', roomName);
  };

  useEffect(() => {
    const handleHangup = async () => {
      // Close the peer connection if it exists
      if (peerConnection) {
        peerConnection.close();
      }

      // Release the local stream if it exists
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
        setLocalStream(null);
      }

      // Release the remote stream if it exists
      setRemoteStream(null);

      // Disconnect
      disconnectCall();

      const currentRandomUser = pairedData[1];
      if (currentRandomUser) {
        let formattedDuration;
        if (callDuration > 0) {
          // If call duration is greater than 0, use call duration from Redux
          formattedDuration = formatTime(globalCallDuration);
        } else {
          // Otherwise, use call duration from state
          formattedDuration = formatTime(callDuration);
        }

        try {
          const response = await saveCallHistory(
            currentRandomUser._id,
            formattedDuration,
          );
          console.log(response);
        } catch (error) {
          console.error(error);
        }

        // Navigate to feedback screen when returning from background
        navigation.replace('Feedback', {
          userId: currentRandomUser._id,
          username: currentRandomUser.username,
          profileImage: currentRandomUser.profileImage,
        });
      }
    };

    socket.on('hangup', handleHangup);

    return () => {
      socket.off('hangup', handleHangup);
    };
  }, [
    peerConnection,
    localStream,
    pairedData,
    callDuration,
    globalCallDuration,
    navigation,
  ]);

  const formatTime = time => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: remoteStream ? 'transparent' : '#454545'},
      ]}>
      {remoteStream ? (
        <View>
          <RTCView
            streamURL={remoteStream.toURL()}
            style={{width: width, height: height, marginTop: -45}}
            mirror={true}
          />
          <Text
            style={{
              position: 'absolute',
              bottom: 50,
              right: 5,
              color: 'white',
              backgroundColor: 'gray',
              paddingHorizontal: 5,
              borderRadius: 5,
              fontSize: 12,
              paddingVertical: 2,
            }}>
            {remoteUser?.username}
          </Text>
        </View>
      ) : (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: width,
            height: height,
          }}>
          <Image
            source={{uri: remoteUser?.profileImage}} // Assuming profileImage is the URI of the remote user's profile image
            style={{width: 100, height: 100, borderRadius: 50}}
          />
          <Text style={{color: 'white', marginTop: 10}}>
            {remoteUser?.username}
          </Text>
        </View>
      )}
      {localStream && (
        <View
          style={[
            styles.myStreamWrapper,
            {
              height: height * 0.2,
              width: width * 0.3,
              right: remoteStream ? undefined : 250,
              left: remoteStream ? 250 : undefined,
            },
          ]}>
          <RTCView
            style={styles.myStream}
            objectFit="cover"
            streamURL={localStream.toURL()}
            mirror={true}
            zOrder={1}
          />
          <Text style={{position: 'absolute', bottom: 5, right: 5}}>
            {localUser?.username}
          </Text>
        </View>
      )}

      <Text
        style={{
          position: 'absolute',
          top: height * 0.01,
          alignSelf: 'center',
          color: 'gray',
          fontWeight: 'bold',
          fontFamily: 'sans-serif',
          padding: 5,
        }}>
        {formatTime(callDuration)}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          width: '90%',
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
          left: remoteStream ? 20 : (width - 320) / 2,
          bottom: 50,
        }}>
        <TouchableOpacity
          onPress={() => toggleButton('video')}
          style={[
            styles.button,
            selectedButtons.video && styles.selectedButton,
            {backgroundColor: selectedButtons.video ? '#ffffff' : '#454545'},
          ]}>
          <Feather
            name={!selectedButtons.video ? 'video-off' : 'video'}
            size={22}
            color={selectedButtons.video ? 'black' : 'white'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => toggleButton('camera')}
          style={[
            styles.button,
            selectedButtons.camera && styles.selectedButton,
            {backgroundColor: selectedButtons.camera ? '#ffffff' : '#454545'},
          ]}>
          <Ionicons
            name="camera-reverse-outline"
            size={24}
            color={selectedButtons.camera ? 'black' : 'white'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleHangUp}
          style={{
            padding: 10,
            backgroundColor: 'red',
            paddingHorizontal: 11,
            borderRadius: 50,
          }}>
          <MaterialCommunityIcons
            name="phone-hangup"
            size={24}
            color={'white'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toggleButton('microphone')}
          style={[
            styles.button,
            selectedButtons.microphone && styles.selectedButton,
            {
              paddingHorizontal: 15,
              paddingVertical: 11,
              backgroundColor: selectedButtons.microphone
                ? '#ffffff'
                : '#454545',
            },
          ]}>
          <FontAwesome
            name="microphone"
            size={21}
            color={selectedButtons.microphone ? 'black' : 'white'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => toggleButton('unmute')}
          style={[
            styles.button,
            selectedButtons.unmute && styles.selectedButton,
            {
              backgroundColor: selectedButtons.unmute ? '#ffffff' : '#454545',
              paddingHorizontal: 11,
            },
          ]}>
          <Octicons
            name="unmute"
            size={22}
            color={selectedButtons.unmute ? 'black' : 'white'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CallScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#454545',
  },
  myStream: {
    height: '100%', // Fill the container height
    width: '100%', // Fill the container width
  },
  myStreamWrapper: {
    position: 'absolute',
    top: 10,
    backgroundColor: '#333',
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  remoteStreamWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  remoteStream: {
    // position: 'absolute',
    // top: -10,
    // left: 0,
    width: '100%', // Fill the container width
    height: '100%', // Fill the container height
  },
  button: {
    padding: 10,
    backgroundColor: '#454545',
    borderRadius: 50,
  },
  selectedButton: {
    backgroundColor: '#fffff',
    borderRadius: 50,
  },
});
