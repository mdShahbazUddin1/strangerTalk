import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {getCallNotification, getUserProfile} from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const CallAlert = () => {
  const [recentCallNotifications, setRecentCallNotifications] = useState([]);
  const [lastAlertTimestamp, setLastAlertTimestamp] = useState(0); // Timestamp of the last displayed alert
  const navigation = useNavigation();

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
            // Display alert only if it's been more than 5 seconds since the last one
            Alert.alert(
              'Incoming Call',
              `${friend.username} is calling you`,
              [
                {
                  text: 'Answer',
                  onPress: async () => {
                    const userProfile = await getUserProfile(user._id);
                    navigation.navigate('FriendCalling', {
                      pairedData: [user, friend],
                      userProfile: userProfile,
                    });
                  },
                },
                {
                  text: 'Reject',
                  onPress: () => {
                    // Handle rejecting the call
                  },
                  style: 'cancel',
                },
              ],
              {cancelable: false},
            );
            setLastAlertTimestamp(currentTimestamp); // Update last alert timestamp
          }
        }
      } catch (error) {
        console.error('Error fetching recent call notifications:', error);
      }
    };

    if (recentCallNotifications.length === 0) {
      const intervalId = setInterval(fetchRecentCalls, 5000);
      return () => clearInterval(intervalId);
    }
  }, [recentCallNotifications, navigation, lastAlertTimestamp]);

  return null; // This component doesn't render anything directly
};

export default CallAlert;
