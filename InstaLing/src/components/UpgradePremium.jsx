import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

function UpgradePremium() {
  return (
    <View
      style={{
        backgroundColor: '#6D31EDFF',
        flex: 1,
        alignItems: 'center',
        margin: 20,
        padding: 15,
        borderRadius: 10,
      }}>
      <View style={{marginTop: 2}}>
        <Text
          style={{
            textAlign: 'center',
            color: '#ffffff',
            lineHeight: 22,
            fontWeight: '700',
            fontSize: 16,
            fontFamily: 'sans-serif',
          }}>
          Upgrade to premium
        </Text>
        <View style={{marginTop: 10}}>
          <Text
            style={{
              color: '#ffffff',
              lineHeight: 18,
              fontSize: 14,
              fontWeight: '400',
              fontFamily: 'sans-serif',
              textAlign: 'center',
            }}>
            Unlock exclusive video call and more time and supercharge your
            experience
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', gap: 5, marginTop: 10}}>
        <TouchableOpacity
          style={{
            marginTop: 15,
            backgroundColor: '#ffffff',
            padding: 10,
            borderRadius: 20,
          }}>
          <Text
            style={{
              fontSize: 11,
              color: '#323743FF',
              fontWeight: '700',
              fontFamily: 'sans-serif',
            }}>
            Upgrade from ₹ 99 / month
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginTop: 15,
            backgroundColor: '#ffffff',
            padding: 8,
            borderRadius: 20,
          }}>
          <Text
            style={{
              fontSize: 11,
              color: '#323743FF',
              fontWeight: '700',
              fontFamily: 'sans-serif',
            }}>
            Upgrade from ₹ 599 / year
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default UpgradePremium;
