import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileImageUploader from '../components/ProfileImageUploader';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserProfile} from '../utils/api';

function MyProfileScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');

  const myProfile = async () => {
    try {
      const user = await getUserProfile();
      setUsername(user.username);
      setPhone(user.phone);
      setEmail(user.email);
      setProfileImage(user.profileImage);
      setBackgroundImage(user.backgroundImage);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    myProfile();
  }, []);

  const handleUpdateProfile = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!username || !phone || !email) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    const formData = new FormData();
    formData.append('username', username);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('profileImage', {
      uri: profileImage,
      name: 'profile.jpg',
      type: 'image/jpeg',
    });
    formData.append('backgroundImage', {
      uri: backgroundImage,
      name: 'background.jpg',
      type: 'image/jpeg',
    });
    try {
      const response = await fetch(
        `http://192.168.1.13:8080/auth/editprofile`,
        {
          method: 'PUT',
          headers: {
            Authorization: token,
          },
          body: formData,
        },
      );
      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Profile updated successfully');
        getUserProfile();
      } else {
        Alert.alert('Error', 'Failed to update profile');
        console.log('Failed to update profile:', response.statusText);
      }
    } catch (error) {
      Alert.alert('Error', 'Server Error');
      console.log('Server Error:', error.message);
    }
  };

  const handleLogout = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await fetch(
        'https://stranger-backend.onrender.com/auth/logout',
        {
          method: 'GET',
          headers: {
            Authorization: token,
          },
        },
      );

      if (response.ok) {
        await AsyncStorage.removeItem('isLoggedIn');
        await AsyncStorage.removeItem('token');
        navigation.replace('Login');
      } else {
        // Handle non-successful response (e.g., display an error message)
        console.error('Failed to logout:', response.statusText);
      }
    } catch (error) {
      // Handle fetch errors (e.g., network error)
      console.error('Error during logout:', error);
      // Optionally, display an error message to the user
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <View
        style={{
          margin: 10,
          marginTop: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
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
            Profile
          </Text>
        </View>
        <TouchableOpacity style={{padding: 5}} onPress={handleLogout}>
          <Text
            style={{
              color: '#9095A1FF',
              fontWeight: '400',
              fontSize: 12,
              fontFamily: 'sans-serif',
            }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {/* ProfileImageUploader */}
          <ProfileImageUploader
            profileImage={profileImage}
            bgImage={backgroundImage}
            setProfileImage={setProfileImage}
            setBackgroundImage={setBackgroundImage}
          />

          {/* Profile Update */}
          <View
            style={{
              position: 'relative',
              bottom: 1,
              margin: 20,
              marginTop: 45,
            }}>
            <View style={{marginBottom: 15}}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  fontFamily: 'sans-serif',
                  color: 'gray',
                }}>
                Username
              </Text>
              <TextInput
                style={{
                  backgroundColor: '#F3F4F6FF',
                  lineHeight: 32,
                  padding: 5,
                  marginTop: 5,
                  color: 'gray',
                }}
                value={username}
                onChangeText={setUsername}
                placeholder={username}
                placeholderTextColor="#9095A1FF"
              />
            </View>
            <View style={{marginBottom: 15}}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  fontFamily: 'sans-serif',
                  color: 'gray',
                }}>
                Phone
              </Text>
              <TextInput
                style={{
                  backgroundColor: '#F3F4F6FF',
                  lineHeight: 32,
                  padding: 5,
                  marginTop: 5,
                  color: 'gray',
                }}
                value={phone}
                onChangeText={setPhone}
                placeholder={phone}
              />
            </View>
            <View style={{marginBottom: 15}}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  fontFamily: 'sans-serif',
                  color: 'gray',
                }}>
                Email
              </Text>
              <TextInput
                style={{
                  backgroundColor: '#F3F4F6FF',
                  lineHeight: 32,
                  padding: 5,
                  marginTop: 5,
                  color: 'gray',
                }}
                value={email}
                onChangeText={setEmail}
                placeholder={email}
              />
            </View>

            <TouchableOpacity
              style={{
                alignItems: 'center',
                marginTop: 30,
                backgroundColor: '#6D31EDFF',
                padding: 10,
              }}
              onPress={handleUpdateProfile}>
              <Text style={{color: '#ffffff'}}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default MyProfileScreen;
