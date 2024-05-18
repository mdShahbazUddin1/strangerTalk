import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {fetchAllNotifications, markNotificationSeen} from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Notification = ({route}) => {
  const {getNotification} = route.params;
  const [isMounted, setIsMounted] = useState(false);
  const [allNotification, setAllNotification] = useState([]);

  const handleMarkNotification = async () => {
    try {
      // Check if there are notifications and it's the first mount
      if (!isMounted && getNotification?.length > 0) {
        await markNotificationSeen();
        // console.log('Notifications marked as seen successfully.');
        setIsMounted(true); // Set isMounted to true to prevent calling markNotificationSeen again
      }
    } catch (error) {
      console.error('Error marking notifications as seen:', error);
    }
  };

  useEffect(() => {
    handleAllNotification();
    handleMarkNotification();
  }, []);

  const handleAllNotification = async () => {
    try {
      const allNotification = await fetchAllNotifications();
      if (allNotification) {
        setAllNotification(allNotification.notifications);
        // Add logic to handle the notifications here
        // console.log(
        //   'Notifications fetched successfully:',
        //   allNotification.notifications,
        // );
      } else {
        console.log('No notifications found.');
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleDeleteNotification = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        console.error('Token not found');
        return;
      }
      const response = await fetch(
        `https://stranger-backend.onrender.com/notification/deletenoti`,
        {
          method: 'DELETE',
          headers: {
            Authorization: token,
          },
        },
      );
      if (response.ok) {
        handleAllNotification();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {allNotification?.length > 0 ? (
        <>
          <Text
            style={{
              color: 'black',
              textAlign: 'center',
              marginTop: 10,
              fontWeight: '700',
            }}>
            New Notification
          </Text>
          <View style={{width: '95%', alignItems: 'flex-end', marginTop: 10}}>
            <TouchableOpacity
              style={{
                backgroundColor: '#EEEEEE',
                paddingVertical: 5,
                paddingHorizontal: 8,
                borderRadius: 15,
              }}>
              <Text onPress={handleDeleteNotification} style={{color: 'black'}}>
                Clear
              </Text>
            </TouchableOpacity>
          </View>
          {allNotification.map(noti => (
            <View
              key={noti._id}
              style={{
                backgroundColor: '#F2F2F2', // Light gray background
                marginTop: 10,
                padding: 10,
              }}>
              <Text
                style={{
                  color: 'black',
                  // textAlign: 'start',
                }}>
                {noti.user.username} started following you
              </Text>
            </View>
          ))}
        </>
      ) : (
        <Text
          style={{
            color: 'black',
            textAlign: 'center',
            marginTop: 10,
            fontWeight: '700',
          }}>
          No new notifications
        </Text>
      )}
    </SafeAreaView>
  );
};

export default Notification;
