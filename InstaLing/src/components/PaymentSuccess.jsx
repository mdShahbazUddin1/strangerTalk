import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

const PaymentSuccess = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{alignItems: 'center', justifyContent: 'center', margin: 50}}>
      <View
        style={{
          marginTop: 20,
          alignItems: 'center',
        }}>
        <AntDesign name="checkcircle" size={85} color={'green'} />
        <View style={{marginTop: 15}}>
          <Text
            style={{
              color: '#6D31EDFF',
              fontFamily: 'sans-serif',
              fontWeight: '700',
              fontSize: 20,
            }}>
            Order placed successfully
          </Text>
        </View>
        <View
          style={{
            backgroundColor: '#EEEEEE',
            width: 300,
            marginTop: 40,
            padding: 5,
          }}>
          <View
            style={{
              padding: 5,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{color: 'gray'}}>Subtotal</Text>
            <Text style={{color: '#757575', fontWeight: '700'}}>₹ 99</Text>
          </View>
          <View
            style={{
              padding: 5,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text style={{color: 'gray'}}>{`Tax (10%)`}</Text>
            <Text style={{color: '#757575', fontWeight: '700'}}>₹ 12</Text>
          </View>
          <View
            style={{
              padding: 5,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text style={{color: 'gray'}}>{`Fees`}</Text>
            <Text style={{color: '#757575', fontWeight: '700'}}>₹ 0</Text>
          </View>
          <View
            style={{
              padding: 5,
              paddingVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTopColor: 'gray',
              borderBottomColor: 'gray',
              borderTopWidth: 1,
              borderBottomWidth: 1,
              marginTop: 10,
            }}>
            <Text style={{color: 'gray'}}>{`Payment method`}</Text>
            <Text style={{color: '#6D31EDFF', fontWeight: '700'}}>
              PhonePay
            </Text>
          </View>
          <View
            style={{
              padding: 5,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text style={{color: 'gray'}}>{`Total`}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 40,
              }}>
              <Text
                style={{
                  color: 'green',
                  fontWeight: '500',
                  backgroundColor: '#A5D6A7',
                  padding: 4,
                  borderRadius: 7,
                  fontSize: 11,
                }}>
                Success
              </Text>
              <Text style={{color: 'green', fontWeight: '700'}}>₹ 99</Text>
            </View>
          </View>
        </View>
        <View style={{marginTop: 80}}>
          <Text
            style={{color: 'black', fontFamily: 'sans-serif', fontSize: 18}}>
            How was your experience ?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
              gap: 10,
            }}>
            <AntDesign name="star" size={24} color={'#FFCA28'} />
            <AntDesign name="star" size={24} color={'#FFCA28'} />
            <AntDesign name="star" size={24} color={'#FFCA28'} />
            <AntDesign name="star" size={24} color={'#FFCA28'} />
            <AntDesign name="star" size={24} color={'#FFCA28'} />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={{
            backgroundColor: '#6D31EDFF',
            marginTop: 60,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            width: 300,
            padding: 10,
          }}>
          <AntDesign name="home" size={24} color={'#ffffff'} />
          <Text style={{fontSize: 15, color: '#ffffff'}}>Back to home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PaymentSuccess;
