import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {getUserProfile} from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

function UserStatus() {
  const navigation = useNavigation();
  const [user, setUser] = useState({});

  const myProfile = async () => {
    const userProfile = await getUserProfile();
    setUser(userProfile);
  };

  useEffect(() => {
    myProfile();
  }, []);

  const handleProfile = async () => {
    navigation.navigate('ProfileStatusScreen', {
      userId: user._id,
      username: user.username,
      email: user.email,
      profileImage: user.profileImage,
      backgroundImage: user.backgroundImage,
      followers: user.followers,
      following: user.following,
    });
  };
  return (
    <View style={{position: 'relative'}}>
      <View
        style={{
          borderColor: 'transparent',
          borderWidth: 3,
          margin: 5,
          marginTop: 10,
          borderRadius: 50,
        }}>
        <TouchableOpacity
          key={user._id}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            margin: 3,
          }}
          onPress={handleProfile}>
          <Image
            width={60}
            height={60}
            borderRadius={50}
            source={{uri: user?.profileImage}}
          />
        </TouchableOpacity>

        <TouchableOpacity
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
          <AntDesign name="plus" size={12} color="white" />
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
        {user?.username}
      </Text>
    </View>
  );
}

export default UserStatus;
