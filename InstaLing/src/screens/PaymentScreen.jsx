import {View, Text} from 'react-native';
import React from 'react';
import PaymentSuccess from '../components/PaymentSuccess';
import {SafeAreaView} from 'react-native-safe-area-context';

const PaymentScreen = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <PaymentSuccess />
    </SafeAreaView>
  );
};

export default PaymentScreen;
