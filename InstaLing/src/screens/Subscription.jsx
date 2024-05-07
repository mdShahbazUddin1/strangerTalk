import {View, Text, Pressable, TouchableOpacity} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UpgradePremium from '../components/UpgradePremium';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const Subscription = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          margin: 10,
          marginTop: 20,
          flexDirection: 'row',
          alignItems: 'center',
          // justifyContent: 'space-between',
          gap: 70,
        }}>
        <Pressable style={{padding: 5}} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#9095A1FF" />
        </Pressable>
        <View>
          <Text
            style={{
              color: '#171A1FFF',
              fontSize: 18,
              fontWeight: '700',
              fontFamily: 'sans-serif',
            }}>
            Subscription
          </Text>
        </View>
      </View>

      <View style={{height: 200}}>
        <UpgradePremium />
      </View>

      <View style={{margin: 20}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text
              style={{
                color: 'black',
                fontFamily: 'sans-serif',
                fontWeight: 'bold',
                fontSize: 15,
              }}>
              What's include
            </Text>
          </View>
          <View
            style={{
              width: 150,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <Text
              style={{
                color: 'black',
                fontFamily: 'sans-serif',
                fontWeight: 'bold',
                fontSize: 15,
              }}>
              Free
            </Text>
            <Text
              style={{
                color: 'black',
                fontFamily: 'sans-serif',
                fontWeight: 'bold',
                fontSize: 15,
              }}>
              Premium
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <View>
            <Text style={{color: 'black'}}>Unlimited swipes</Text>
          </View>
          <View
            style={{
              width: 160,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <AntDesign name="checksquare" size={18} color="#6D31EDFF" />
            <AntDesign name="checksquare" size={18} color="#6D31EDFF" />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <View>
            <Text style={{color: 'black'}}>Advanced filters</Text>
          </View>
          <View
            style={{
              width: 160,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <AntDesign name="checksquare" size={18} color="#6D31EDFF" />
            <AntDesign name="checksquare" size={18} color="#6D31EDFF" />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <View>
            <Text style={{color: 'black'}}>Remove ads</Text>
          </View>
          <View
            style={{
              width: 160,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <AntDesign name="closesquare" size={18} color="gray" />
            <AntDesign name="checksquare" size={18} color="#6D31EDFF" />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <View style={{width: 150}}>
            <Text style={{color: 'black'}}>Undo accidental left swipes</Text>
          </View>
          <View
            style={{
              width: 160,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <AntDesign name="closesquare" size={18} color="gray" />
            <AntDesign name="checksquare" size={18} color="#6D31EDFF" />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <View style={{width: 150}}>
            <Text style={{color: 'black'}}>
              Push your profile to more viewers
            </Text>
          </View>
          <View
            style={{
              width: 160,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <AntDesign name="closesquare" size={18} color="gray" />
            <AntDesign name="checksquare" size={18} color="#6D31EDFF" />
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={{
          backgroundColor: '#6D31EDFF',
          position: 'absolute',
          bottom: 30,
          left: 29,
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
    </SafeAreaView>
  );
};

export default Subscription;
