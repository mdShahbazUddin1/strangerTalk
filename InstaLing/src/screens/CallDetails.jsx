import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CallDetails = ({route}) => {
  const {
    callId,
    username,
    email,
    backgroundImage,
    profileImage,
    call_duration,
    call_datetime,
  } = route.params;
  const [showGivenComments, setShowGivenComments] = useState(true);

  const [isFollowed, setIsFollowed] = useState(false);
  const formatCallTime = time => {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${amOrPm}`;
  };

  const checkFollowStatus = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await fetch(
        `https://stranger-backend.onrender.com/auth/checkfollow/${callId}`,
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

        setIsFollowed(data.followed);
      } else {
        setIsFollowed(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkFollowStatus();
  }, []);

  const handleFollowUser = async () => {
    const token = await AsyncStorage.getItem('token');

    try {
      const response = await fetch(
        `https://stranger-backend.onrender.com/auth/follow/${callId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application-json',
            Authorization: token,
          },
        },
      );
      if (response.status === 400) {
        console.log('User already followed');
      }
      if (response.status === 200) {
        setIsFollowed(true);
        checkFollowStatus();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: backgroundImage}} style={styles.backgroundImage} />
      <View style={styles.content}>
        <View style={styles.profileContainer}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'flex-end',
              gap: 30,
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
                  uri: profileImage,
                }}
              />
              <View style={{marginTop: 15}}>
                <Text style={{color: 'black'}}>{username}</Text>
              </View>
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
                    alignItems: 'flex-end',
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
                          color: '#ffffff',
                          lineHeight: 30,
                          textAlign: 'center',
                        }}>
                        {username}
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
                        1,634 followers
                      </Text>
                    </View>
                  </View>
                  <View>
                    <View
                      style={{backgroundColor: '#F5F1FEFF', borderRadius: 10}}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: 'sans-serif',
                          lineHeight: 11,
                          fontWeight: '700',
                          color: 'green',
                          padding: 4,
                          paddingHorizontal: 12,
                          marginTop: 5,
                        }}>
                        online
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 30,
          }}>
          <TouchableOpacity
            style={{
              width: 150,
              backgroundColor: '#6D31EDFF',
              padding: 8,
              borderRadius: 4,
              marginTop: 30,
            }}>
            <Text
              style={{
                fontSize: 13,
                lineHeight: 18,
                fontFamily: 'sans-serif',
                textAlign: 'center',
                color: '#ffffff',
              }}>
              Call
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 150,
              borderWidth: 1,
              borderColor: '#6D31EDFF',
              padding: 8,
              borderRadius: 4,
              marginTop: 30,
            }}
            onPress={handleFollowUser}
            disabled={isFollowed}>
            <Text
              style={{
                fontSize: 13,
                lineHeight: 18,
                fontFamily: 'sans-serif',
                textAlign: 'center',
                color: '#6D31EDFF',
              }}>
              {isFollowed ? 'Following' : 'Follow'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.callInfo}>
          <View style={styles.callDetails}>
            <AntDesign name="clockcircleo" size={18} color="white" />
            <Text style={styles.callText}>{formatCallTime(call_datetime)}</Text>
          </View>
          <View style={styles.callDetails}>
            <AntDesign name="clockcircleo" size={18} color="white" />
            <Text style={styles.callText}>{call_duration}</Text>
          </View>
        </View>

        <View style={styles.commentsContainer}>
          <TouchableOpacity onPress={() => setShowGivenComments(true)}>
            <Text
              style={[
                styles.commentOption,
                showGivenComments ? styles.activeOption : null,
              ]}>
              Given
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowGivenComments(false)}>
            <Text
              style={[
                styles.commentOption,
                !showGivenComments ? styles.activeOption : null,
              ]}>
              Received
            </Text>
          </TouchableOpacity>
          {/* Display given or received comments based on the state */}
          {showGivenComments ? (
            <Text style={styles.commentText}>Given comments here</Text>
          ) : (
            <Text style={styles.commentText}>Received comments here</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
  backgroundImage: {
    flex: 0.3, // Reduce height
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  content: {
    flex: 0.5, // Reduce height
    paddingHorizontal: 20,
    paddingTop: 50, // Adjust padding
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: -50,
    left: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 15,
    resizeMode: 'cover',
  },
  userInfo: {
    flex: 1,
    marginTop: 50,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  email: {
    fontSize: 14,
    color: 'black',
  },
  onlineIndicator: {
    marginTop: 50,
    color: 'green',
    fontFamily: 'sans-serif',
    fontWeight: '700',
  },
  callInfo: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  callDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  callText: {
    marginLeft: 5,
    fontSize: 13,
    fontFamily: 'sans-serif',
    color: 'black',
  },
  callButton: {
    backgroundColor: '#6D31EDFF', // Green color for call button
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  callButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  commentsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    marginTop: 20,
    borderRadius: 10,
    padding: 15,
  },
  commentOption: {
    fontSize: 16,
    marginRight: 10,
    color: '#6D31EDFF',
  },
  activeOption: {
    fontWeight: 'bold',
  },
  commentText: {
    marginTop: 10,
    fontSize: 16,
    color: 'black',
  },
});

export default CallDetails;
