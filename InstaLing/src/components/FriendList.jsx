import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity, View, Text, Pressable} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import UpgradePremium from './UpgradePremium';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {sendCallNotification, unfollowUser} from '../utils/api';

function FriendList() {
  const [friend, setFriend] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const getFriendList = async () => {
    const token = await AsyncStorage.getItem('token');

    try {
      const response = await fetch(
        'https://stranger-backend.onrender.com/auth/friendlist',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        },
      );

      if (response.status === 200) {
        const data = await response.json();
        setLoading(false);
        setFriend(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFriendList();
  }, []);

  const handleUnfollow = async userId => {
    const unFollowUser = await unfollowUser(userId);
    if (unFollowUser) {
      getFriendList();
    }
  };

  const handleFriendScreen = async friendDet => {
    navigation.navigate('FriendProfileDetailScreen', {
      userId: friendDet._id,
      username: friendDet.username,
      backgroundImage: friendDet.backgroundImage,
      profileImage: friendDet.profileImage,
      followers: friendDet.followers,
      following: friendDet.following,
      friendDet,
    });
  };

  return (
    <>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        />
      ) : friend.length === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{textAlign: 'center', color: 'black'}}>
            No friends, make a call
          </Text>
        </View>
      ) : (
        friend.map(user => {
          return (
            <TouchableOpacity onPress={() => handleFriendScreen(user)}>
              <View
                key={user._id}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  gap: 20,
                  borderWidth: 1,
                  borderColor: '#F8F9FAFF',
                  margin: 5,
                  paddingBottom: 12,
                  marginBottom: 10,
                }}>
                <View
                  style={{
                    paddingTop: 20,

                    marginLeft: 10,
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{width: 65, height: 65, borderRadius: 50}}
                    source={{
                      uri: `${user.profileImage}`,
                    }}
                  />
                  <View
                    style={{
                      paddingTop: 8,
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 0,
                    }}>
                    <AntDesign name="star" size={10} color="orange" />
                    <AntDesign name="star" size={10} color="orange" />
                    <AntDesign name="star" size={10} color="orange" />
                    <AntDesign name="star" size={10} color="orange" />
                    <AntDesign name="star" size={10} color="orange" />
                  </View>
                </View>
                <View>
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'start',
                        justifyContent: 'space-between',
                        gap: 65,
                      }}>
                      <View>
                        <View>
                          <Text
                            style={{
                              fontFamily: 'sans-serif',
                              fontSize: 14,
                              fontWeight: '700',
                              color: '#171A1FFF',
                              lineHeight: 30,
                            }}>
                            {user.username}
                          </Text>
                        </View>
                        <View
                          style={{
                            backgroundColor: '#F3F4F6FF',
                            padding: 4,
                            borderRadius: 5,
                          }}>
                          <Text
                            style={{
                              fontFamily: 'sans-serif',
                              fontSize: 11,
                              fontWeight: '700',
                              color: '#323743FF',
                            }}>
                            {user.followers.length} followers
                          </Text>
                        </View>
                      </View>
                      <View>
                        <View
                          style={{
                            backgroundColor: '#F5F1FEFF',
                            borderRadius: 10,
                          }}>
                          <Text
                            style={{
                              fontSize: 11,
                              fontFamily: 'sans-serif',
                              lineHeight: 11,
                              fontWeight: '400',
                              color: '#6D31EDFF',
                              padding: 6,
                              marginTop: 5,
                            }}>
                            Top Performer
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <TouchableOpacity
                        onPress={() => handleUnfollow(user._id)}
                        style={{
                          width: 104,
                          backgroundColor: '#6D31EDFF',
                          padding: 6,
                          borderRadius: 4,
                          marginTop: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 11,
                            lineHeight: 18,
                            fontFamily: 'sans-serif',
                            textAlign: 'center',
                            color: '#ffffff',
                          }}>
                          Unfollow
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          width: 104,
                          borderWidth: 1,
                          borderColor: '#6D31EDFF',
                          padding: 6,
                          borderRadius: 4,
                          marginTop: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 11,
                            lineHeight: 18,
                            fontFamily: 'sans-serif',
                            textAlign: 'center',
                            color: '#6D31EDFF',
                          }}>
                          Following
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })
      )}
    </>
  );
}

export default FriendList;
