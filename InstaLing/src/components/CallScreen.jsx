import React, {useState, useEffect, useRef} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {
  RTCView,
  mediaDevices,
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
} from 'react-native-webrtc';
import io from 'socket.io-client';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const socket = io('http://192.168.1.5:3000');

const CallScreen = ({onEndCall}) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const peerConnection = useRef(null);
  const [speakerSelected, setSpeakerSelected] = useState(false);
  const [videoSelected, setVideoSelected] = useState(false);
  const [microphoneSelected, setMicrophoneSelected] = useState(false);

  useEffect(() => {
    const initCall = async () => {
      const stream = await mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setLocalStream(stream);

      socket.emit('joinRoom', 'room1');

      socket.on('offer', async offer => {
        await handleOffer(offer);
      });

      socket.on('answer', async answer => {
        await handleAnswer(answer);
      });

      socket.on('iceCandidate', async iceCandidate => {
        await handleIceCandidate(iceCandidate);
      });
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
    if (!peerConnection.current) {
      createPeerConnection();
    }

    await peerConnection.current.setRemoteDescription(
      new RTCSessionDescription(offer),
    );
    const answer = await peerConnection.current.createAnswer();
    await peerConnection.current.setLocalDescription(answer);
    socket.emit('answer', {room: 'room1', answer});
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
    const pc = new RTCPeerConnection();

    pc.onicecandidate = event => {
      if (event.candidate) {
        socket.emit('iceCandidate', {
          room: 'room1',
          iceCandidate: event.candidate,
        });
      }
    };

    pc.ontrack = event => {
      setRemoteStream(event.streams[0]);
    };

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
            {/* This is for the user to whom I'm talking */}
            <Image
              style={{width: 360, height: 640}}
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmFvsTU3oFayIDR7Amtxqh-No6UhNpolgVCSFk2dl01g&s',
              }}
            />
          </View>
          <View style={{position: 'absolute', zIndex: 9, top: 10, left: 260}}>
            {/* My video box in which my video will be shown */}
            {localStream && (
              <RTCView
                streamURL={localStream.toURL()}
                style={{width: 100, height: 150}}
                audio={true} // Add audio attribute
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
