import React, {useEffect, useState} from 'react';
import {View, Button, Text, Image} from 'react-native';
import io from 'socket.io-client';
import {RTCPeerConnection, RTCView, mediaDevices} from 'react-native-webrtc';

const socket = io('http://192.168.1.9:8080');

const CallScreen = ({pairedData}) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [roomName, setRoomName] = useState('');
  const [localUser, setLocalUser] = useState(null);
  const [remoteUser, setRemoteUser] = useState(null);

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
    // Implement logic to hang up the call
  };

  return (
    <View>
      <View>
        {localUser && (
          <View>
            <Text>{localUser.username}</Text>
            <Image
              source={{uri: localUser.profileImage}}
              style={{width: 50, height: 50}}
            />
          </View>
        )}
        {localStream && (
          <RTCView
            streamURL={localStream.toURL()}
            style={{width: 200, height: 150}}
          />
        )}
      </View>
      <View>
        {remoteUser && (
          <View>
            <Text>{remoteUser.username}</Text>
            <Image
              source={{uri: remoteUser.profileImage}}
              style={{width: 50, height: 50}}
            />
          </View>
        )}
        {remoteStream && (
          <RTCView
            streamURL={remoteStream.toURL()}
            style={{width: 200, height: 150}}
          />
        )}
      </View>
      <Button title="Hang Up" onPress={handleHangUp} />
    </View>
  );
};

export default CallScreen;
