import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

function UserGames() {
  const navigation = useNavigation();

  const handlePress = url => {
    navigation.navigate('GameWebView', {url});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Games</Text>
      <View style={styles.gamesContainer}>
        <TouchableOpacity
          style={styles.gameButton}
          onPress={() => handlePress('https://3110.play.quizzop.com/')}>
          <MaterialCommunityIcons
            name="message-flash-outline"
            size={24}
            color="#15ABFFFF"
          />
          <Text style={styles.gameButtonText}>Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.gameButton}
          onPress={() => handlePress('https://3110.play.quizzop.com/')}>
          <FontAwesome name="font" size={18} color="#15ABFFFF" />
          <Text style={styles.gameButtonText}>Words of Wonders</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginTop: 15,
    flex: 1,
    flexWrap: 'wrap',
  },
  heading: {
    color: '#171A1FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  gamesContainer: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 10,
  },
  gameButton: {
    width: 80,
    height: 80,
    backgroundColor: '#F8F9FAFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameButtonText: {
    color: '#323743FF',
    fontWeight: '700',
    fontSize: 11,
  },
});

export default UserGames;
