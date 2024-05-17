import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import * as OpenAnything from 'react-native-openanything';

const HelpAndSupport = () => {
  const navigation = useNavigation();
  const number = '+918825400076';

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <View
        style={{
          margin: 10,
          marginTop: 20,
          flexDirection: 'row',
          alignItems: 'center',
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
            Help & Support
          </Text>
        </View>
      </View>
      <View style={{marginTop: 20, margin: 10}}>
        <View style={{borderWidth: 1, borderColor: '#eeeeee', marginTop: 7}}>
          <View style={{paddingVertical: 25, paddingHorizontal: 10}}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`mailto:instalingual@gmail.com`);
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <EvilIcons name="envelope" size={22} color={'red'} />
                <Text
                  style={{
                    color: 'red',
                    marginLeft: 10,
                    fontFamily: 'sans-serif',
                    fontSize: 14,
                  }}>
                  Email us
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{paddingBottom: 20, paddingHorizontal: 10}}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`whatsapp://send?phone=${number}`);
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <FontAwesome name="whatsapp" size={20} color={'green'} />
                <Text
                  style={{
                    color: 'green',
                    marginLeft: 10,
                    fontFamily: 'sans-serif',
                    fontSize: 14,
                  }}>
                  Whatsapp
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HelpAndSupport;
