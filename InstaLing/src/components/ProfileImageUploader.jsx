import React, {useState, useEffect} from 'react';
import {View, Pressable, TouchableOpacity, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';

function ProfileImageUploader() {
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const [selectedBackgroundImage, setSelectedBackgroundImage] = useState(null);

  const pickProfileImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (!response.didCancel && response.assets.length > 0) {
        setSelectedProfileImage(response.assets[0].uri);
      }
    });
  };

  const pickBackgroundImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (!response.didCancel && response.assets.length > 0) {
        setSelectedBackgroundImage(response.assets[0].uri);
      }
    });
  };

  return (
    <View
      style={{
        alignItems: 'center',
        position: 'relative',
        marginTop: 10,
      }}>
      <Pressable onPress={pickBackgroundImage}>
        <View style={{marginBottom: 20}}>
          <Image
            source={{
              uri:
                selectedBackgroundImage ||
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmFvsTU3oFayIDR7Amtxqh-No6UhNpolgVCSFk2dl01g&s',
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
              uri:
                selectedProfileImage ||
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmVzc2lvbmFsJTIwcHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D',
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
  );
}

export default ProfileImageUploader;
