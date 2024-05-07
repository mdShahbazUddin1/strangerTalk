import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

import {getUserProfile, sendCallNotification} from '../utils/api';

const FriendsProfile = () => {
  const [friends, setFriends] = useState([]);
  const navigation = useNavigation();
  const [user, setUser] = useState({});

  const myProfile = async () => {
    const userProfile = await getUserProfile();
    setUser(userProfile);
  };

  useEffect(() => {
    myProfile();
  }, []);

  const getFriendsList = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await fetch(
        `https://stranger-backend.onrender.com/auth/friendlist`,
        {
          method: 'GET',
          headers: {
            Authorization: token,
          },
        },
      );
      if (response.status === 200) {
        const data = await response.json();
        setFriends(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFriendsList();
  }, []);

  const handleFriendScreen = async (
    userId,
    username,
    backgroundImage,
    profileImage,
    followers,
    following,
  ) => {
    navigation.navigate('FriendProfileDetailScreen', {
      userId: userId,
      username: username,
      backgroundImage: backgroundImage,
      profileImage: profileImage,
      followers: followers,
      following: following,
    });
  };

  const handleFriendCall = async friend => {
    try {
      const sendNotification = await sendCallNotification(friend._id);
      console.log(sendNotification);
      setPairedData([user, friend]);
      navigation.navigate('FriendCalling', {pairedData: [user, friend]});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {friends.length > 0
        ? friends.map((friend, index) => (
            <View style={{position: 'relative'}} key={friend._id}>
              <View
                style={{
                  borderColor: '#15ABFFFF',
                  borderWidth: 3,
                  margin: 5,
                  marginTop: 10,
                  borderRadius: 50,
                  position: 'relative',
                }}>
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 3,
                  }}
                  onPress={() =>
                    handleFriendScreen(
                      friend._id,
                      friend.username,
                      friend.backgroundImage,
                      friend.profileImage,
                      friend.followers,
                      friend.following,
                    )
                  }>
                  <Image
                    width={60}
                    height={60}
                    borderRadius={50}
                    source={{uri: friend?.profileImage}}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleFriendCall(friend)}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    backgroundColor: '#15ABFFFF',
                    padding: 5,
                    borderRadius: 50,
                    marginLeft: 10,
                    zIndex: 999,
                  }}>
                  <Feather name="phone" size={12} color="white" />
                </TouchableOpacity>
              </View>

              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'sans-serif',
                  fontWeight: '400',
                  fontSize: 12,
                  color: 'black',
                }}>
                {friend?.username}
              </Text>
            </View>
          ))
        : null}
    </>
  );
};

export default FriendsProfile;
