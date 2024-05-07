import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {markNotificationSeen} from '../utils/api';

const Notification = ({route}) => {
  const {getNotification} = route.params;
  const [isMounted, setIsMounted] = useState(false);

  const handleMarkNotification = async () => {
    try {
      // Check if there are notifications and it's the first mount
      if (!isMounted && getNotification?.length > 0) {
        await markNotificationSeen();
        console.log('Notifications marked as seen successfully.');
        setIsMounted(true); // Set isMounted to true to prevent calling markNotificationSeen again
      }
    } catch (error) {
      console.error('Error marking notifications as seen:', error);
    }
  };

  useEffect(() => {
    handleMarkNotification();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {getNotification?.length > 0 ? (
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
          {getNotification.map(noti => (
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
