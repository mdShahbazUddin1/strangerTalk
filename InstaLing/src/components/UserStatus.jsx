import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
function UserStatus({user, index}) {
  return (
    <View style={{position: 'relative'}}>
      <View
        style={{
          borderColor: index !== 0 ? '#15ABFFFF' : 'transparent', // Only set border color if index is not 0
          borderWidth: 3,
          margin: 5,
          marginTop: 10,
          borderRadius: 50,
        }}>
        <TouchableOpacity
          key={index}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            margin: 3,
          }}>
          <Image
            width={60}
            height={60}
            borderRadius={50}
            source={{uri: user?.img}}
          />
        </TouchableOpacity>
        {index === 0 ? (
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
        ) : (
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
            <Feather name="video" size={12} color="white" />
          </TouchableOpacity>
        )}
      </View>

      <Text
        style={{
          textAlign: 'center',
          fontFamily: 'sans-serif',
          fontWeight: '400',
          fontSize: 12,
        }}>
        {user.name}
      </Text>
    </View>
  );
}

export default UserStatus;
