import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View, Image, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import UserStatus from '../components/UserStatus';
import ResendCall from '../components/ResendCall';
import UserGames from '../components/UserGames';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getCallHistory} from '../utils/api';
import FriendsProfile from '../components/FriendsProfile';

function HomeScreen() {
  const [recentCall, setRecentCall] = useState([]);

  useEffect(() => {
    fetchCallHistory();
  }, []);

  const fetchCallHistory = async () => {
    try {
      const callHistory = await getCallHistory();
      setRecentCall(callHistory);
    } catch (error) {
      console.log('Error fetching call history:', error);
    }
  };

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
              Insta-ling
            </Text>
          </View>
          <Pressable>
            <Ionicons name="notifications-outline" size={24} color="gray" />
          </Pressable>
        </View>
        {/* status */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <UserStatus />
          <FriendsProfile />
        </ScrollView>

        {/* Recent Call */}
        <ResendCall resendUser={recentCall} />

        {/* Games */}
        <UserGames />
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;
