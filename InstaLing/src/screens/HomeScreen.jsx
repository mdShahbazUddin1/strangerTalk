import React from 'react';
import {ScrollView, Text, View, Image, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import UserStatus from '../components/UserStatus';
import ResendCall from '../components/ResendCall';
import UserGames from '../components/UserGames';

const user = [
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmFvsTU3oFayIDR7Amtxqh-No6UhNpolgVCSFk2dl01g&s',
    name: 'adam',
  },
  {
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmVzc2lvbmFsJTIwcHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D',
    name: 'Zoya',
  },
  {
    img: 'https://st4.depositphotos.com/16122460/20401/i/450/depositphotos_204010926-stock-photo-beautiful-young-woman-santa-hat.jpg',
    name: 'Emile',
  },
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsVGia80mDB4rpewJxgFplSvUYbdumAsohsuSZKzmzyw&s',
    name: 'John_Doe',
  },
  {
    img: 'https://cdn.openart.ai/published/8RyOnLDZw11dmqk6wvHF/QrFoLVlW_d4HS_1024.webp',
    name: 'Jay',
  },
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmFvsTU3oFayIDR7Amtxqh-No6UhNpolgVCSFk2dl01g&s',
    name: 'adam',
  },
  {
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmVzc2lvbmFsJTIwcHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D',
    name: 'Zoya',
  },
  {
    img: 'https://st4.depositphotos.com/16122460/20401/i/450/depositphotos_204010926-stock-photo-beautiful-young-woman-santa-hat.jpg',
    name: 'Emile',
  },
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsVGia80mDB4rpewJxgFplSvUYbdumAsohsuSZKzmzyw&s',
    name: 'John_Doe',
  },
  {
    img: 'https://cdn.openart.ai/published/8RyOnLDZw11dmqk6wvHF/QrFoLVlW_d4HS_1024.webp',
    name: 'Jay',
  },
];

const resendUser = [
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmFvsTU3oFayIDR7Amtxqh-No6UhNpolgVCSFk2dl01g&s',
    name: 'adam',
    bg: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmVzc2lvbmFsJTIwcHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D',
    name: 'Zoya',
    bg: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    img: 'https://st4.depositphotos.com/16122460/20401/i/450/depositphotos_204010926-stock-photo-beautiful-young-woman-santa-hat.jpg',
    name: 'Emile',
    bg: 'https://images.unsplash.com/photo-1523224042829-4731dd15a3bb?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsVGia80mDB4rpewJxgFplSvUYbdumAsohsuSZKzmzyw&s',
    name: 'John_Doe',
    bg: 'https://images.unsplash.com/photo-1546842931-886c185b4c8c?q=80&w=1370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    img: 'https://cdn.openart.ai/published/8RyOnLDZw11dmqk6wvHF/QrFoLVlW_d4HS_1024.webp',
    name: 'Jay',
    bg: 'https://images.unsplash.com/photo-1495231916356-a86217efff12?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmFvsTU3oFayIDR7Amtxqh-No6UhNpolgVCSFk2dl01g&s',
    name: 'adam',
    bg: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmVzc2lvbmFsJTIwcHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D',
    name: 'Zoya',
    bg: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    img: 'https://st4.depositphotos.com/16122460/20401/i/450/depositphotos_204010926-stock-photo-beautiful-young-woman-santa-hat.jpg',
    name: 'Emile',
    bg: 'https://images.unsplash.com/photo-1523224042829-4731dd15a3bb?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsVGia80mDB4rpewJxgFplSvUYbdumAsohsuSZKzmzyw&s',
    name: 'John_Doe',
    bg: 'https://images.unsplash.com/photo-1546842931-886c185b4c8c?q=80&w=1370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    img: 'https://cdn.openart.ai/published/8RyOnLDZw11dmqk6wvHF/QrFoLVlW_d4HS_1024.webp',
    name: 'Jay',
    bg: 'https://images.unsplash.com/photo-1495231916356-a86217efff12?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

function HomeScreen() {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10,
            borderBottomColor: '#D3D3D3',
            borderBottomWidth: 1,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>
              <Image
                style={{width: 30, height: 30}}
                source={require('../../assets/logo.png')}
              />
            </View>
            <Text
              style={{
                marginLeft: 10,
                fontFamily: 'sans-serif',
                fontSize: 16,
                fontWeight: '700',
                color: '#171A1FFF',
                lineHeight: 26,
              }}>
              Insta-ling
            </Text>
          </View>
          <Pressable>
            <Ionicons name="notifications-outline" size={24} color="gray" />
          </Pressable>
        </View>
        {/* status */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {user.map((user, index) =>
            index === 0 ? (
              <UserStatus user={user} index={index} key={index} />
            ) : (
              <UserStatus user={user} index={index} key={index} />
            ),
          )}
        </ScrollView>

        {/* Recent Call */}
        <ResendCall resendUser={resendUser} />

        {/* Games */}
        <UserGames />
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;
