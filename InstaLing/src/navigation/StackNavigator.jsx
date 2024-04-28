import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import FeedBackForm from '../components/FeedBackForm';
import MyProfileScreen from '../screens/MyProfileScreen';
import FriendsScreen from '../screens/FriendsScreen';
import FindCallScreen from '../screens/FindCallScreen';
import HomeScreen from '../screens/HomeScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import CallDetails from '../screens/CallDetails';
import ProfileStatusScreen from '../screens/ProfileStatusScreen';
import FriendProfileDetailScreen from '../screens/FriendProfileDetailScreen';

import GameWebView from '../components/GameWebView';
import WelcomeBack from '../components/WelComeBack';
import AccountDetails from '../screens/AccountDetails';
import TermsAndConditions from '../screens/TermsAndCondition';
import Subscription from '../screens/Subscription';
import CallScreen from '../components/CallScreen';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const StackNavigator = () => {
  function BottomTabs() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#6D31EDFF"
        inactiveColor="gray"
        barStyle={{backgroundColor: 'white', elevation: 10}}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({color}) => (
              <AntDesign name="home" size={26} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Find"
          component={FindCallScreen}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="phone-plus"
                size={27}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Friends"
          component={FriendsScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Feather name="users" size={23} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={AccountDetails}
          options={{
            tabBarIcon: ({color}) => (
              <EvilIcons name="user" size={34} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GameWebView"
          component={GameWebView}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="WelComeBack"
          component={WelcomeBack}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MyProfile"
          component={MyProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Subscription"
          component={Subscription}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TermsAndCondtions"
          component={TermsAndConditions}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Feedback"
          component={FeedBackForm}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CallDetails"
          component={CallDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProfileStatusScreen"
          component={ProfileStatusScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FriendProfileDetailScreen"
          component={FriendProfileDetailScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CallScreen"
          component={CallScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
