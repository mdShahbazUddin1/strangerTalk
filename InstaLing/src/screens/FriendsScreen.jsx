import React from 'react';
import {Pressable, SafeAreaView, ScrollView, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FriendList from '../components/FriendList';
import {useNavigation} from '@react-navigation/native';

function FriendsScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <View
        style={{
          margin: 10,
          marginTop: 20,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 100,
        }}>
        <Pressable style={{padding: 5}} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#9095A1FF" />
        </Pressable>
        <View>
          <Text
            style={{
              color: '#171A1FFF',
              fontSize: 18,
              fontWeight: '700',
              fontFamily: 'sans-serif',
            }}>
            Friends list
          </Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FriendList />
      </ScrollView>
    </SafeAreaView>
  );
}

export default FriendsScreen;
