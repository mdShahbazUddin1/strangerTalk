import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {getCallNotification, getUserProfile} from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Sound from 'react-native-sound';

const CallAlert = () => {
  const [recentCallNotifications, setRecentCallNotifications] = useState([]);
  const [lastAlertTimestamp, setLastAlertTimestamp] = useState(0);
  const [callerInfo, setCallerInfo] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [ringtone, setRingtone] = useState(null); // State to hold the ringtone instance
  const navigation = useNavigation();

  useEffect(() => {
    Sound.setCategory('Playback');

    // Load the ringtone when the component mounts
    const newRingtone = new Sound(
      'zego_incoming.mp3',
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        // Loaded successfully
        console.log('duration in seconds: ' + newRingtone.getDuration());
        setRingtone(newRingtone); // Store the ringtone instance in state
      },
    );

    return () => {
      // Stop and release the ringtone when component unmounts
      if (ringtone) {
        ringtone.stop();
        ringtone.release();
      }
    };
  }, []);

  useEffect(() => {
    const fetchRecentCalls = async () => {
      try {
        const callNotifications = await getCallNotification();
        setRecentCallNotifications(callNotifications);
        const notification = callNotifications[0];
        if (notification) {
          const user = notification.follow_target;
          const friend = notification.user;
          const userProfile = await getUserProfile(user._id);

          const currentTimestamp = Date.now();
          if (currentTimestamp - lastAlertTimestamp > 5000) {
            setCallerInfo({user, friend, userProfile});
            setIsModalVisible(true);
            console.log('Modal is visible:', true);
            setLastAlertTimestamp(currentTimestamp);

            // Play the ringtone
            if (ringtone) {
              ringtone.play();
            }
          }
        }
      } catch (error) {
        console.error('Error fetching recent call notifications:', error);
      }
    };

    const hasRecentCalls = recentCallNotifications.length > 0;
    const shouldFetchCalls = !hasRecentCalls && !isModalVisible;

    if (shouldFetchCalls) {
      const intervalId = setInterval(fetchRecentCalls, 5000);
      return () => clearInterval(intervalId);
    }
  }, [
    recentCallNotifications,
    navigation,
    lastAlertTimestamp,
    isModalVisible,
    ringtone,
  ]);

  const handleAnswer = async () => {
    // Stop and release the ringtone when answering the call
    if (ringtone) {
      ringtone.stop();
      ringtone.release();
    }

    navigation.navigate('FriendCalling', {
      pairedData: [callerInfo.user, callerInfo.friend],
      userProfile: callerInfo.userProfile,
    });
    setIsModalVisible(false);
  };

  const handleReject = () => {
    // Stop and release the ringtone when rejecting the call
    if (ringtone) {
      ringtone.stop();
      ringtone.release();
    }

    setIsModalVisible(false);
  };

  return (
    <View
      style={[
        styles.modalBackground,
        {display: isModalVisible ? 'flex' : 'none'},
      ]}>
      <View style={styles.modalContent}>
        <Text style={styles.callText}>Incoming Call</Text>
        <Text style={styles.callerName}>
          {callerInfo?.friend.username} is calling you
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.answerButton]}
            onPress={handleAnswer}>
            <Text style={styles.buttonText}>Answer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.rejectButton]}
            onPress={handleReject}>
            <Text style={styles.buttonText}>Reject</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  callText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  callerName: {
    fontSize: 16,
    marginBottom: 20,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  answerButton: {
    backgroundColor: 'green',
  },
  rejectButton: {
    backgroundColor: 'red',
  },
});

export default CallAlert;
