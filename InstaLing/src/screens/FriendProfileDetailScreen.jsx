import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getRandomAllFeedBack} from '../utils/api';

const FriendProfileDetailScreen = ({route}) => {
  const {
    userId,
    username,
    backgroundImage,
    profileImage,
    followers,
    following,
  } = route.params;
  const [feedback, setFeedBack] = useState([]);

  const getAllFeedBack = async () => {
    try {
      const userFeedback = await getRandomAllFeedBack(userId);

      setFeedBack(userFeedback);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllFeedBack();
  }, []);

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
                        {followers.length} followers
                      </Text>
                    </View>
                  </View>
                  <View>
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
                        {following.length} followings
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
            }}>
            <Text
              style={{
                fontSize: 13,
                lineHeight: 18,
                fontFamily: 'sans-serif',
                textAlign: 'center',
                color: '#6D31EDFF',
              }}>
              Friends
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 1, margin: 15}}>
        <View style={{margin: 0}}>
          <TouchableOpacity>
            <Text style={styles.commentOption}>Received</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={{flex: 1, marginTop: 10}}>
          {feedback.length === 0 ? (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
              }}>
              <Text
                style={{
                  color: 'black',
                }}>
                No Feedback available !
              </Text>
            </View>
          ) : (
            feedback.map(feedbackItem => (
              <View
                key={feedbackItem._id}
                style={{
                  marginTop: 0,
                  marginBottom: 5,
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: '700',
                    fontFamily: 'sans-serif',
                  }}>
                  {feedbackItem.caller_user_id.username}
                </Text>
                {/* Render options */}
                {feedbackItem.feedbackContent.options.map(option => (
                  <Text
                    key={option} // Ensure each option has a unique key
                    style={{
                      color: 'black',
                      marginTop: 5,
                      fontFamily: 'sans-serif',
                      fontSize: 13,
                      padding: 7,
                      backgroundColor: '#F5F5F5',
                    }}>
                    {option}
                  </Text>
                ))}
                {/* Render comment */}
                <Text
                  style={{
                    color: 'black',
                    marginTop: 5,
                    fontFamily: 'sans-serif',
                    fontSize: 13,
                    padding: 7,
                    backgroundColor: '#F5F5F5',
                  }}>
                  {feedbackItem.feedbackContent.comment}
                </Text>
              </View>
            ))
          )}
        </ScrollView>
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
    flex: 0.8, // Reduce height
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
    marginTop: 1,
    fontSize: 16,
    color: 'black',
  },
});

export default FriendProfileDetailScreen;
