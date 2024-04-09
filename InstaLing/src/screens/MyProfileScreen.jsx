import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileImageUploader from '../components/ProfileImageUploader';
import {useNavigation} from '@react-navigation/native';

function MyProfileScreen() {
  const navigation = useNavigation();
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
        <TouchableOpacity style={{padding: 5}}>
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
          {/* ProfileImagerUploader */}
          <ProfileImageUploader />

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
                Name
              </Text>
              <TextInput
                style={{
                  backgroundColor: '#F3F4F6FF',
                  lineHeight: 32,
                  padding: 5,
                  marginTop: 5,
                }}
                placeholder="Emelie"
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
                }}
                placeholder="996237891"
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
                Email
              </Text>
              <TextInput
                style={{
                  backgroundColor: '#F3F4F6FF',
                  lineHeight: 32,
                  padding: 5,
                  marginTop: 5,
                }}
                placeholder="example@gmail.com"
                placeholderTextColor="#9095A1FF"
              />
            </View>

            <Pressable
              style={{
                alignItems: 'center',
                marginTop: 30,
                backgroundColor: '#6D31EDFF',
                padding: 10,
              }}>
              <Text style={{color: '#ffffff'}}>Save Changes</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default MyProfileScreen;
