import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import {
  ZegoUIKitPrebuiltCallService,
  ZegoSendCallInvitationButton,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import {getUserProfile} from '../utils/api';

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
        // console.log('friends', data);
        setFriends(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const initService = async () => {
    return ZegoUIKitPrebuiltCallService.init(
      256539217,
      '920385abe4c02ddc0f93a1458839ed61845768d4ed4fcd776ca5ea5efff10925',
      user._id,
      user.username,
      [ZIM, ZPNs],
      {
        ringtoneConfig: {
          incomingCallFileName: 'zego_incoming.mp3',
          outgoingCallFileName: 'zego_outgoing.mp3',
        },
        notifyWhenAppRunningInBackgroundOrQuit: true,
        androidNotificationConfig: {
          channelID: 'zego_video_call',
          channelName: 'zego_video_call',
        },
      },
    );
  };

  useEffect(() => {
    getFriendsList();
    initService();
  }, [user]);

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

                <View style={{position: 'absolute', bottom: -2, left: 40}}>
                  <ZegoSendCallInvitationButton
                    invitees={friends.map(friend => ({
                      userID: friend._id,
                      userName: friend.username,
                    }))}
                    isVideoCall={false}
                    resourceID={'zego_data'}
                    width={25}
                    height={25}
                  />
                </View>
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
