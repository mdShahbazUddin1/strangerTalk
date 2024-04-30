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

const socket = io('http://192.168.1.13:8080');

const CallScreen = ({pairedData}) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [roomName, setRoomName] = useState('');
  const [localUser, setLocalUser] = useState(null);
  const [remoteUser, setRemoteUser] = useState(null);
  const {width, height} = useWindowDimensions();

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

  const handleHangUp = () => {
    navigation.replace('Main');
  };
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: remoteStream ? 'transparent' : '#454545'},
      ]}>
      {remoteStream && (
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

      <View
        style={{
          flexDirection: 'row',
          width: '90%',
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
          left: remoteStream ? 20 : -160,
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
