import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

import {
  getFriendsList,
  getUserProfile,
  sendCallNotification,
} from '../utils/api';

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

  const handleFriendlist = async () => {
    const friendList = await getFriendsList();
    if (friendList) {
      setFriends(friendList);
    }
  };

  useEffect(() => {
    handleFriendlist();
  }, []);

  const handleFriendScreen = async friendDet => {
    navigation.navigate('FriendProfileDetailScreen', {
      userId: friendDet._id,
      username: friendDet.username,
      backgroundImage: friendDet.backgroundImage,
      profileImage: friendDet.profileImage,
      followers: friendDet.followers,
      following: friendDet.following,
      online: friendDet.online,
      friendDet,
      refreshFriendList: handleFriendlist,
    });
  };

  const handleFriendCall = async friend => {
    try {
      const sendNotification = await sendCallNotification(friend._id);
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
                  onPress={() => handleFriendScreen(friend)}>
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
