import React from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import Ring from './Ring';
import {useNavigation} from '@react-navigation/native';
import {disconnectCall} from '../utils/api';

const _color = '#6E01EF';
const _size = 90;

const WavyCallIndicator = () => {
  const navigation = useNavigation();

  const handleEndCall = () => {
    disconnectCall();
    navigation.replace('Main');
  };
  return (
    <LinearGradient colors={['#e66465', '#9198e5']} style={styles.container}>
      <View style={[styles.dot, styles.center]}>
        {[...Array(3).keys()].map(index => (
          <Ring key={index} index={index} />
        ))}
        <Feather name="phone-outgoing" size={32} color={'#ffffff'} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={{
            backgroundColor: 'red',
            width: 120,
            padding: 10,
            borderRadius: 10,
          }}
          onPress={handleEndCall}>
          <Text style={styles.buttonText}>End Call</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: _size,
    width: _size,
    borderRadius: _size / 2,
    backgroundColor: _color,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
  },
  buttonText: {
    fontFamily: 'sans-serif',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
});

export default WavyCallIndicator;
