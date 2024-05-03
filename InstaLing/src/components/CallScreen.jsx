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
import InCallManager from 'react-native-incall-manager';

const socket = io('https://stranger-backend.onrender.com');

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
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [cameraState, setCameraState] = useState(true);
  const navigation = useNavigation();

  const [isMuted, setIsMuted] = useState(false);

  const [selectedButtons, setSelectedButtons] = useState({
    microphone: false,
    camera: false,
    hangup: false,
    video: false,
    unmute: true,
  });

  useEffect(() => {
    // Turn on the speakerphone when the component mounts
    toggleSpeaker();

    return () => {
      // Cleanup
      disconnectCall();
      socket.off('hangup', handleHangUp);
    };
  }, []);

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
      const isFront = true;
      const devices = await mediaDevices.enumerateDevices();
      const facing = isFront ? 'front' : 'environment';
      const videoSourceId = devices.find(
        device => device.kind === 'videoinput' && device.facing === facing,
      );

      const constraints = {
        audio: true,
        video: {
          mandatory: {
            minWidth: 500, // Provide your own width, height, and frame rate here
            minHeight: 300,
            minFrameRate: 30,
          },
          facingMode: isFront ? 'user' : 'environment',
          optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
        },
      };

      const stream = await mediaDevices.getUserMedia(constraints);
      setLocalStream(stream);
    };

    initializeStreams();

    return () => {
      if (localStream) {
        localStream.release();
      }
    };
  }, []);

  const switchCamera = () => {
    localStream.getVideoTracks().forEach(track => track._switchCamera());
  };
  const toggleSpeaker = async () => {
    try {
      if (isSpeakerOn) {
        // If speakerphone is currently on, turn it off
        await InCallManager.setForceSpeakerphoneOn(false);
        await InCallManager.setSpeakerphoneOn(false);
        console.log('Speakerphone turned off');
      } else {
        // If speakerphone is currently off, turn it on
        await InCallManager.start({media: 'audio'});
        await InCallManager.setForceSpeakerphoneOn(true);
        await InCallManager.setSpeakerphoneOn(true);

        console.log('Speakerphone turned on');
      }

      // Update the state to reflect the new speakerphone status
      setIsSpeakerOn(!isSpeakerOn);
    } catch (err) {
      console.error('Error toggling speakerphone:', err);
    }
  };

  const toggleCamera = () => {
    setCameraState(prevState => !prevState); // Toggle cameraState

    if (localStream) {
      localStream.getVideoTracks().forEach(track => {
        console.log('sc', track);
        track.enabled = cameraState; // Enable or disable the video track based on cameraState
      });
    }
  };

  useEffect(() => {
    if (pairedData.length > 0) {
      setLocalUser(pairedData[0]);
    }
    if (pairedData.length > 1) {
      const userIds = pairedData.map(user => user._id);
      const sortedUserIds = userIds.sort();
      const roomName = sortedUserIds.join('_');
      setRoomName(roomName);
      setRemoteUser(pairedData[1]);
    }
  }, [pairedData]);

  useEffect(() => {
    if (roomName) {
      socket.emit('join', roomName);
      console.log('Joining room:', roomName);
    }
  }, [roomName]);

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
      setRemoteStream(event.streams[0]); // Ensure that this line sets the remote stream state
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
    // Clear ICE candidates
    if (peerConnection) {
      peerConnection.onicecandidate = null;
    }

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

  const toggleMute = () => {
    if (!remoteStream) {
      return;
    }
    localStream.getAudioTracks().forEach(track => {
      console.log(track.enabled ? 'muting' : 'unmuting', ' local track', track);
      track.enabled = !track.enabled;
      setIsMuted(!track.enabled);
    });
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: remoteStream ? '#454545' : '#454545'},
      ]}>
      {remoteStream ? (
        <View>
          <RTCView
            streamURL={selectedButtons.video ? remoteStream.toURL() : null}
            style={{width: width, height: height, marginTop: -40}}
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
              left: remoteStream ? 250 : 250,
            },
          ]}>
          <RTCView
            style={[
              styles.myStream,
              {transform: [{scaleX: selectedButtons.camera ? -1 : 1}]}, // Mirror if back camera is selected
            ]}
            objectFit="cover"
            streamURL={selectedButtons.video ? localStream.toURL() : null}
            mirror={true}
            zOrder={1}
          />
          {selectedButtons.video ? null : (
            <View
              style={{
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
              }}>
              <Image
                source={{uri: localUser?.profileImage}} // Assuming profileImage is the URI of the local user's profile image
                style={{width: 100, height: 100, borderRadius: 50}}
              />
              <Text style={{position: 'absolute', bottom: 5, right: 5}}>
                {localUser?.username}
              </Text>
            </View>
          )}
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
          onPress={() => {
            toggleButton('video');
            toggleCamera();
          }}
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
          onPress={() => {
            toggleButton('camera');
            switchCamera();
          }}
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
          onPress={() => {
            toggleButton('microphone');
            toggleMute();
          }}
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
            name={isMuted ? 'microphone-slash' : 'microphone'}
            size={21}
            color={selectedButtons.microphone ? 'black' : 'white'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            toggleButton('unmute');
            toggleSpeaker();
          }}
          style={[
            styles.button,
            selectedButtons.unmute && styles.selectedButton,
            isSpeakerOn && styles.selectedButton,
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
