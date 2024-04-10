// CallScreen.js

import React, {useState, useEffect, useRef} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {
  RTCView,
  mediaDevices,
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
} from 'react-native-webrtc';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import io from 'socket.io-client';

const socket = io('http://192.168.1.16:3000');

const CallScreen = ({onEndCall}) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const peerConnection = useRef(null);
  const [speakerSelected, setSpeakerSelected] = useState(false);
  const [videoSelected, setVideoSelected] = useState(false);
  const [microphoneSelected, setMicrophoneSelected] = useState(false);

  useEffect(() => {
    const initCall = async () => {
      try {
        const stream = await mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        setLocalStream(stream);

        console.log('Socket connected:', socket.connected);

        socket.emit('joinRoom', 'room1');

        socket.on('offer', async offer => {
          console.log('Received offer:', offer);
          await handleOffer(offer);
        });

        socket.on('answer', async answer => {
          console.log('Received answer:', answer);
          await handleAnswer(answer);
        });

        socket.on('iceCandidate', async iceCandidate => {
          console.log('Received iceCandidate:', iceCandidate);
          await handleIceCandidate(iceCandidate);
        });
      } catch (error) {
        console.error('Error initializing call:', error);
      }
    };

    initCall();

    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
      if (remoteStream) {
        remoteStream.getTracks().forEach(track => track.stop());
      }
      socket.disconnect();
    };
  }, []);

  const handleOffer = async offer => {
    console.log('Received offer:', offer);
    if (!peerConnection.current) {
      console.log('Creating peer connection...');
      createPeerConnection();
    }

    try {
      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(offer),
      );
      console.log('Remote description set successfully.');
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
      console.log('Answer created and set as local description.');
      socket.emit('answer', {room: 'room1', answer});
    } catch (error) {
      console.error('Error handling offer:', error);
    }
  };

  const handleAnswer = async answer => {
    await peerConnection.current.setRemoteDescription(
      new RTCSessionDescription(answer),
    );
  };

  const handleIceCandidate = async iceCandidate => {
    await peerConnection.current.addIceCandidate(
      new RTCIceCandidate(iceCandidate),
    );
  };

  const createPeerConnection = () => {
    console.log('Creating peer connection...');
    const pc = new RTCPeerConnection();

    pc.onicecandidate = event => {
      if (event.candidate) {
        console.log('Sending ICE candidate:', event.candidate);
        socket.emit('iceCandidate', {
          room: 'room1',
          iceCandidate: event.candidate,
        });
      }
    };

    pc.ontrack = event => {
      console.log('Remote stream added:', event.streams[0]);
      setRemoteStream(event.streams[0]); // Update remote stream
    };

    // Additional logging for debugging
    console.log('Peer connection setup complete.');

    if (localStream) {
      localStream.getTracks().forEach(track => {
        pc.addTrack(track, localStream);
      });
    }

    peerConnection.current = pc;
  };

  const handleSpeakerPress = () => {
    setSpeakerSelected(!speakerSelected);
  };

  const handleVideoPress = () => {
    setVideoSelected(!videoSelected);
  };

  const handleMicrophonePress = () => {
    setMicrophoneSelected(!microphoneSelected);
  };

  const handleEndCall = () => {
    onEndCall(false);
    if (peerConnection.current) {
      peerConnection.current.close();
    }
    socket.emit('leaveRoom', 'room1');
  };

  return (
    <View style={{flex: 1}}>
      {!videoSelected && (
        <View style={{alignItems: 'center', marginTop: 100}}>
          <Text
            style={{
              color: '#171A1FFF',
              fontWeight: '700',
              lineHeight: 32,
              fontSize: 24,
              fontFamily: 'sans-serif',
              textAlign: 'center',
            }}>
            Syed
          </Text>
          <Text
            style={{
              color: '#9095A1FF',
              fontWeight: '400',
              fontSize: 16,
              lineHeight: 28,
              fontFamily: 'sans-serif',
              textAlign: 'center',
            }}>
            00:29
          </Text>
        </View>
      )}
      {!videoSelected && (
        <View style={{alignItems: 'center', marginTop: 30}}>
          <Image
            style={{width: 100, height: 100, borderRadius: 50}}
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmFvsTU3oFayIDR7Amtxqh-No6UhNpolgVCSFk2dl01g&s',
            }}
          />
        </View>
      )}

      {videoSelected && (
        <View style={{flex: 1, position: 'relative'}}>
          {/* Remote user's video */}
          <View>
            {/* Remote user's video box */}
            {console.log('remoteStream:', remoteStream)}
            {remoteStream && (
              <RTCView
                streamURL={remoteStream.toURL()}
                style={{width: '100%', height: '100%'}}
                audio={true} // Add audio attribute
                mirror={true}
              />
            )}
            {!remoteStream && <Text>No remote stream available</Text>}
          </View>
          {/* Your video */}
          <View style={{position: 'absolute', zIndex: 9, top: 10, left: 160}}>
            {/* Your video box */}
            {localStream && (
              <RTCView
                streamURL={localStream.toURL()}
                style={{width: 100, height: 150}}
                audio={true} // Add audio attribute
                mirror={true} // Add mirror prop if needed
              />
            )}
          </View>
        </View>
      )}

      <View style={{position: 'absolute', bottom: 10, alignSelf: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 40,
            marginTop: 80,
            gap: 10,
          }}>
          <TouchableOpacity
            onPress={handleSpeakerPress}
            style={{
              backgroundColor: speakerSelected ? '#333333' : '#F3F4F6FF',
              padding: 15,
              borderRadius: 50,
            }}>
            <Feather
              name="volume-2"
              size={28}
              color={speakerSelected ? '#FFFFFF' : '#565D6DFF'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSpeakerPress}
            style={{
              backgroundColor: speakerSelected ? '#333333' : '#F3F4F6FF',
              padding: 15,
              borderRadius: 50,
            }}>
            <Ionicons
              name="camera-reverse-outline"
              size={28}
              color={speakerSelected ? '#FFFFFF' : '#565D6DFF'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleVideoPress}
            style={{
              backgroundColor: videoSelected ? '#333333' : '#F3F4F6FF',
              padding: 15,
              borderRadius: 50,
            }}>
            <Feather
              name="video"
              size={28}
              color={videoSelected ? '#FFFFFF' : '#565D6DFF'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleMicrophonePress}
            style={{
              backgroundColor: microphoneSelected ? '#333333' : '#F3F4F6FF',
              padding: 15,
              borderRadius: 50,
              paddingHorizontal: 18,
            }}>
            <FontAwesome
              name="microphone-slash"
              size={28}
              color={microphoneSelected ? '#FFFFFF' : '#565D6DFF'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleEndCall}
            style={{
              backgroundColor: 'red',
              padding: 15,
              borderRadius: 50,
            }}>
            <MaterialIcons name="call-end" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CallScreen;
