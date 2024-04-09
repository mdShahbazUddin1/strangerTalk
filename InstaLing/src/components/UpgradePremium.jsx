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
            fontSize: 14,
            fontFamily: 'sans-serif',
          }}>
          Upgrade to premium
        </Text>
        <View style={{marginTop: 6}}>
          <Text
            style={{
              color: '#ffffff',
              lineHeight: 18,
              fontSize: 12,
              fontWeight: '400',
              fontFamily: 'sans-serif',
              textAlign: 'center',
            }}>
            Unlock exclusive video call and more time and supercharge your
            experience
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          marginTop: 15,
          backgroundColor: '#ffffff',
          padding: 8,
          borderRadius: 20,
        }}>
        <Text style={{fontSize: 11, color: '#323743FF'}}>
          Upgrade from ₹ 99
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default UpgradePremium;
