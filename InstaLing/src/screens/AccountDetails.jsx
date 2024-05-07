import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const AccountDetails = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginTop: 20, margin: 10}}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'sans-serif',
              fontWeight: '700',
              color: 'gray',
            }}>
            ACCOUNT
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#eeeeee',
              marginTop: 7,
            }}>
            <View
              style={{
                paddingVertical: 25,
                paddingHorizontal: 10,
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 20,
                }}
                onPress={() => navigation.navigate('MyProfile')}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Feather name="user" size={22} color={'gray'} />
                  <Text
                    style={{
                      color: 'gray',
                      marginLeft: 10,
                      fontFamily: 'sans-serif',
                      fontSize: 14,
                    }}>
                    Personal Details
                  </Text>
                </View>

                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={25}
                  color={'gray'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('InformationScreen')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 20,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Feather name="info" size={22} color={'gray'} />
                  <Text
                    style={{
                      color: 'gray',
                      marginLeft: 10,
                      fontFamily: 'sans-serif',
                      fontSize: 14,
                    }}>
                    Information & Permissions
                  </Text>
                </View>

                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={25}
                  color={'gray'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                onPress={() => navigation.navigate('Subscription')}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <EvilIcons name="star" size={25} color={'gray'} />
                  <Text
                    style={{
                      color: 'gray',
                      marginLeft: 10,
                      fontFamily: 'sans-serif',
                      fontSize: 14,
                    }}>
                    Subscriptions
                  </Text>
                </View>

                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={25}
                  color={'gray'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* Settings */}
        <View style={{marginTop: 20, margin: 10}}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'sans-serif',
              fontWeight: '700',
              color: 'gray',
            }}>
            SETTINGS
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#eeeeee',
              marginTop: 7,
            }}>
            <View
              style={{
                paddingVertical: 25,
                paddingHorizontal: 10,
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 20,
                }}
                onPress={() => navigation.navigate('TermsAndCondtions')}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialCommunityIcons
                    name="lock-open-check-outline"
                    size={22}
                    color={'gray'}
                  />
                  <Text
                    style={{
                      color: 'gray',
                      marginLeft: 10,
                      fontFamily: 'sans-serif',
                      fontSize: 14,
                    }}>
                    Terms & condition
                  </Text>
                </View>

                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={25}
                  color={'gray'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 20,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <FontAwesome name="language" size={24} color={'gray'} />
                  <Text
                    style={{
                      color: 'gray',
                      marginLeft: 10,
                      fontFamily: 'sans-serif',
                      fontSize: 14,
                    }}>
                    Language
                  </Text>
                </View>

                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={25}
                  color={'gray'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Payment')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 20,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialIcons name="payment" size={22} color={'gray'} />
                  <Text
                    style={{
                      color: 'gray',
                      marginLeft: 10,
                      fontFamily: 'sans-serif',
                      fontSize: 14,
                    }}>
                    Payment methods
                  </Text>
                </View>

                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={25}
                  color={'gray'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialIcons name="headset-mic" size={22} color={'gray'} />
                  <Text
                    style={{
                      color: 'gray',
                      marginLeft: 10,
                      fontFamily: 'sans-serif',
                      fontSize: 14,
                    }}>
                    Help & support
                  </Text>
                </View>

                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={25}
                  color={'gray'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountDetails;
