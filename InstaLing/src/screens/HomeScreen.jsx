import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import UserStatus from '../components/UserStatus';
import ResendCall from '../components/ResendCall';
import UserGames from '../components/UserGames';

import {
  fetchNotifications,
  getCallHistory,
  markNotificationSeen,
} from '../utils/api';
import FriendsProfile from '../components/FriendsProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

function HomeScreen() {
  const [recentCall, setRecentCall] = useState([]);
  const [getNotification, setNotification] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    // Display the activity indicator
    setIsLoading(true);

    // Fetch call history asynchronously after a small delay
    setTimeout(async () => {
      try {
        const callHistory = await getCallHistory();
        setRecentCall(callHistory);
        setIsLoading(false);
      } catch (error) {
        console.log('Error fetching call history:', error);
      } finally {
        // Hide the activity indicator after fetching data
        setIsLoading(false);
      }
    }, 100); // 100 milliseconds delay
  }, []);

  useEffect(() => {
    const fetchAndSetNotifications = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const data = await fetchNotifications();
          setNotification(data.notifications);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    const interval = setInterval(fetchAndSetNotifications, 5000);

    // Fetch notifications immediately when the component mounts
    fetchAndSetNotifications();

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10,
            borderBottomColor: '#D3D3D3',
            borderBottomWidth: 1,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>
              <Image
                style={{width: 30, height: 30}}
                source={require('../../assets/logo.png')}
              />
            </View>
            <Text
              style={{
                marginLeft: 10,
                fontFamily: 'sans-serif',
                fontSize: 16,
                fontWeight: '700',
                color: '#171A1FFF',
                lineHeight: 26,
              }}>
              Instalingual
            </Text>
          </View>
          <Pressable
            onPress={() =>
              navigation.navigate('Notification', {
                getNotification,
              })
            }
            style={{position: 'relative'}}>
            <Ionicons name="notifications-outline" size={24} color="gray" />
            {getNotification?.length > 0 ? (
              <View
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 1,
                  width: 13,
                  height: 13,
                  borderRadius: 10,
                  backgroundColor: 'red',
                  zIndex: 2,
                }}>
                <View
                  style={{
                    position: 'absolute',
                    top: 1,
                    left: getNotification.length > 9 ? 2 : 4,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      fontSize: 8,
                    }}>
                    {getNotification.length}
                  </Text>
                </View>
              </View>
            ) : null}
          </Pressable>
        </View>
        {/* status */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <UserStatus />
          <FriendsProfile />
        </ScrollView>

        {/* Recent Call */}
        {isLoading ? (
          <ActivityIndicator
            style={{marginTop: 40}}
            size="large"
            color="#6D31EDFF"
          />
        ) : (
          <ResendCall resendUser={recentCall} />
        )}

        {/* Games */}
        {/* <UserGames /> */}
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;
