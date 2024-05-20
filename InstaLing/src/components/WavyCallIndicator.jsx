import React, {useEffect, useState} from 'react';
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
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';

const _color = '#6E01EF';
const _size = 90;

const WavyCallIndicator = () => {
  const navigation = useNavigation();
  const [timerKey, setTimerKey] = useState(0); // Key for resetting CountdownCircleTimer
  const [remainingTime, setRemainingTime] = useState(60);

  const handleEndCall = async () => {
    await disconnectCall();
    navigation.replace('Main');
  };

  useEffect(() => {
    // Reset the timer when it completes
    if (remainingTime === 0) {
      setTimerKey(prevKey => prevKey + 1);
      setRemainingTime(60); // Reset the timer duration
    }
  }, [remainingTime]);

  return (
    <>
      <LinearGradient colors={['#e66465', '#9198e5']} style={styles.container}>
        <Text
          style={{
            color: 'white',
            position: 'absolute',
            top: 40,
            fontSize: 25,
            fontWeight: '700',
            width: '55%',
            textAlign: 'center',
            lineHeight: 40,
          }}>
          Waiting for Partner to join...
        </Text>
        <View style={[styles.dot, styles.center]}>
          {[...Array(3).keys()].map(index => (
            <Ring key={index} index={index} />
          ))}
          <CountdownCircleTimer
            key={timerKey}
            isPlaying
            duration={60}
            colors={['#2196F3', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}
            onComplete={() => setRemainingTime(0)}>
            {({remainingTime}) => (
              <Text style={{fontSize: 23, color: 'white', fontWeight: '700'}}>
                {Math.floor(remainingTime / 60)}:
                {remainingTime % 60 < 10 ? '0' : ''}
                {remainingTime % 60}
              </Text>
            )}
          </CountdownCircleTimer>
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
    </>
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
