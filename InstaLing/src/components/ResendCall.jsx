import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

function ResendCall({resendUser}) {
  const navigation = useNavigation();

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.imageContainer}
      onPress={() =>
        navigation.navigate('CallDetails', {
          callId: item.receiver_user_id._id,
          username: item.receiver_user_id.username,
          email: item.receiver_user_id.email,
          receiver_user_id: item.receiver_user_id._id,
          backgroundImage: item.receiver_user_id.backgroundImage,
          profileImage: item.receiver_user_id.profileImage,
          call_duration: item.call_duration,
          call_datetime: item.call_datetime,
          followers: item.receiver_user_id.followers,
        })
      }>
      <Image
        style={styles.image}
        source={{uri: item.receiver_user_id.backgroundImage}}
      />
      <View
        style={{
          width: '100%',
          position: 'absolute',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          bottom: 0,
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}>
        <View>
          <Text
            style={{
              color: 'white',
              fontSize: 12,
              fontWeight: '700',
            }}>
            {item.receiver_user_id.username}
          </Text>
        </View>
        <View>
          <View>
            <Image
              style={{width: 50, height: 50, borderRadius: 50}}
              source={{uri: item.receiver_user_id.profileImage}}
            />
          </View>
          <View style={{paddingTop: 5, flexDirection: 'row'}}>
            <AntDesign name="star" size={12} color="orange" />
            <AntDesign name="star" size={12} color="orange" />
            <AntDesign name="star" size={12} color="orange" />
            <AntDesign name="star" size={12} color="orange" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{marginTop: 15}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: 10,
        }}>
        <View>
          <Text
            style={{
              color: '#171A1FFF',
              fontWeight: '700',
              fontFamily: 'sans-serif',
              fontSize: 16,
            }}>
            Recent Call
          </Text>
        </View>
        <View>
          <TouchableOpacity>
            <Text
              style={{
                color: '#6D31EDFF',
                fontWeight: '400',
                fontSize: 12,
              }}>
              View More
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={resendUser}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

export default ResendCall;

const styles = StyleSheet.create({
  imageContainer: {
    width: 150,
    height: 180,
    marginHorizontal: 5,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
