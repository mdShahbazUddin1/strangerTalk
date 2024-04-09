import React from 'react';
import {View, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function UserGames() {
  return (
    <View style={{margin: 10, marginTop: 15, flex: 1, flexWrap: 'wrap'}}>
      <Text style={{color: '#171A1FFF', fontSize: 16, fontWeight: '700'}}>
        Games
      </Text>
      <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
          gap: 10,
        }}>
        <View
          style={{
            width: 80,
            height: 80,
            backgroundColor: '#F8F9FAFF',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <MaterialCommunityIcons
            name="message-flash-outline"
            size={24}
            color="#15ABFFFF"
          />
          <Text style={{color: '#323743FF', fontWeight: '700', fontSize: 11}}>
            Quiz
          </Text>
        </View>
        <View
          style={{
            width: 80,
            height: 80,
            backgroundColor: '#F8F9FAFF',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <FontAwesome name="font" size={18} color="#15ABFFFF" />
          <Text style={{color: '#323743FF', fontWeight: '700', fontSize: 11}}>
            Words of Wonders
          </Text>
        </View>
      </View>
    </View>
  );
}

export default UserGames;
