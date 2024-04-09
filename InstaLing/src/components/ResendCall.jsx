import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

function ResendCall({resendUser}) {
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
            Resend Call
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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{marginTop: 5}}>
        {resendUser?.map((user, index) => (
          <Pressable key={index} style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: user.bg}} />
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
                  {user.name}
                </Text>
              </View>
              <View>
                <View>
                  <Image
                    style={{width: 50, height: 50, borderRadius: 50}}
                    source={{uri: user.img}}
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
          </Pressable>
        ))}
      </ScrollView>
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
