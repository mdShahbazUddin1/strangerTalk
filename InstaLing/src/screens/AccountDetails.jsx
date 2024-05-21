import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import strings from '../locales/LocalizedString';
import {getLng} from '../helper/ChangeLang';
import {LanguageContext} from '../context/LanguageContext';

const AccountDetails = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const {selectedLanguage, changeLanguage} = useContext(LanguageContext);

  useEffect(() => {
    fetchSelectedLanguage();
  }, [selectedLanguage]);

  const fetchSelectedLanguage = async () => {
    strings.setLanguage(selectedLanguage);
  };

  const handleLogout = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await fetch(
        'https://stranger-backend.onrender.com/auth/logout',
        {
          method: 'GET',
          headers: {
            Authorization: token,
          },
        },
      );

      if (response.ok) {
        await AsyncStorage.removeItem('isLoggedIn');
        await AsyncStorage.removeItem('token');
        navigation.replace('Login');
      } else {
        // Handle non-successful response (e.g., display an error message)
        console.error('Failed to logout:', response.statusText);
      }
    } catch (error) {
      // Handle fetch errors (e.g., network error)
      console.error('Error during logout:', error);
      // Optionally, display an error message to the user
    } finally {
      setLoading(false); // Stop loading
    }
  };

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
            {strings.accountDetails.account}
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#eeeeee',
              marginTop: 7,
            }}>
            <View
              style={{
                paddingVertical: 20,
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
                    {strings.accountDetails.personalDetails}
                  </Text>
                </View>

                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={25}
                  color={'gray'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Friends')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 20,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Feather name="users" size={22} color={'gray'} />
                  <Text
                    style={{
                      color: 'gray',
                      marginLeft: 10,
                      fontFamily: 'sans-serif',
                      fontSize: 14,
                    }}>
                    {strings.accountDetails.friendList}
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
                    {strings.accountDetails.informationPermissions}
                  </Text>
                </View>

                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={25}
                  color={'gray'}
                />
              </TouchableOpacity>

              {/* <TouchableOpacity
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
              </TouchableOpacity> */}
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
            {strings.accountDetails.settings}
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
                    {strings.accountDetails.termsConditions}
                  </Text>
                </View>

                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={25}
                  color={'gray'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Language')}
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
                    {strings.accountDetails.language}
                  </Text>
                </View>

                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={25}
                  color={'gray'}
                />
              </TouchableOpacity>
              {/* <TouchableOpacity
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
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() => navigation.navigate('HelpAndSupport')}
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
                    {strings.accountDetails.helpSupport}
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

        <TouchableOpacity
          style={{
            width: '80%',
            backgroundColor: '#6D31EDFF',
            marginLeft: 40,
            borderRadius: 10,
          }}
          onPress={handleLogout}
          disabled={loading}>
          {loading ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ActivityIndicator size="small" color="red" />
            </View>
          ) : (
            <Text
              style={{
                color: 'white',
                margin: 10,
                fontWeight: '700',
                textAlign: 'center',
              }}>
              {strings.accountDetails.logout}
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountDetails;
