import React, {useState} from 'react';
import {
  View,
  Pressable,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';
import {Text} from 'react-native-paper';

function ProfileImageUploader({
  profileImage,
  bgImage,
  setProfileImage,
  setBackgroundImage,
}) {
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const [selectedBackgroundImage, setSelectedBackgroundImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const pickProfileImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (!response.didCancel && response.assets.length > 0) {
        const uri = response.assets[0].uri;

        setSelectedProfileImage(uri);
        setProfileImage(uri); // Update parent component state
      }
    });
  };

  const pickBackgroundImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (!response.didCancel && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        setSelectedBackgroundImage(uri);

        setBackgroundImage(uri); // Update parent component state
      }
    });
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {(bgImage === '' || profileImage === '') && (
        <ActivityIndicator color="#6D31EDFF" size="large" />
      )}
      {bgImage !== '' && profileImage !== '' && (
        <View style={{alignItems: 'center'}}>
          <Pressable onPress={pickBackgroundImage}>
            <View style={{marginBottom: 20}}>
              <Image
                source={{
                  uri: selectedBackgroundImage || bgImage,
                }}
                style={{
                  width: 330,
                  height: 180,
                  borderRadius: 10,
                  resizeMode: 'cover',
                }}
              />
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  backgroundColor: '#6D31EDFF',
                  padding: 5,
                  borderRadius: 10,
                }}
                onPress={pickBackgroundImage}>
                <Ionicons name="pencil" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          </Pressable>
          <Pressable
            style={{position: 'absolute', bottom: -30}}
            onPress={pickProfileImage}>
            <View>
              <Image
                source={{
                  uri: selectedProfileImage || profileImage,
                }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  resizeMode: 'cover',
                  borderWidth: 3,
                  borderColor: '#ffffff',
                }}
              />
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: 2,
                  right: 4,
                  backgroundColor: '#6D31EDFF',
                  padding: 5,
                  borderRadius: 10,
                }}
                onPress={pickProfileImage}>
                <Ionicons name="pencil" size={12} color="#fff" />
              </TouchableOpacity>
            </View>
          </Pressable>
        </View>
      )}
    </View>
  );
}

export default ProfileImageUploader;
