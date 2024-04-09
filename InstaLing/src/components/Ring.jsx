import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Animated} from 'react-native';

const SIZE = 90;
const COLOR = '#6E01EF';

const Ring = ({index}) => {
  const [opacity] = useState(new Animated.Value(0.7));
  const [scale] = useState(new Animated.Value(1));

  useEffect(() => {
    const animate = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0,
            duration: 1000, // Adjust the duration for opacity change
            useNativeDriver: false,
          }),
          Animated.timing(opacity, {
            toValue: 0.7,
            duration: 0,
            useNativeDriver: false,
          }),
          Animated.timing(scale, {
            toValue: 4,
            duration: 2000, // Keep the duration for scaling
            useNativeDriver: false,
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration: 1000, // Adjust the duration for scaling
            useNativeDriver: false,
          }),
        ]),
        {iterations: -1},
      ).start();
    };

    const timeout = setTimeout(animate, index * 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [index, opacity, scale]);

  const animatedStyle = {
    transform: [{scale}],
    opacity,
  };

  return <Animated.View style={[styles.dot, animatedStyle]} />;
};

const styles = StyleSheet.create({
  dot: {
    height: SIZE,
    width: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: COLOR,
    position: 'absolute',
  },
});

export default Ring;
