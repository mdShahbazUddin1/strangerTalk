import React, {useState} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute} from '@react-navigation/native';

function FeedBackForm() {
  const route = useRoute();
  const {userId, username, profileImage} = route.params;

  const [rating, setRating] = useState(0);
  const interests = [
    'Intelligent',
    'Kind',
    'Knowledgeable',
    'Friendly',
    'Encouraging',
    'Supportive',
    'Skilled',
    'Great Listener',
    'Optimistic',
    'Well Spoken',
    'Open Minded',
    'Versatile',
    'Inspiring',
    'Generous',
    'Talented',
    'Charming',
  ];

  const [selectedInterests, setSelectedInterests] = useState([]);
  const [thoughts, setThoughts] = useState('');
  const navigation = useNavigation();
  console.log(profileImage);
  const handleStarClick = value => {
    setRating(value);
  };

  const toggleInterest = interest => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(item => item !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };
  const handleCancel = () => {
    navigation.replace('Main');
  };

  const handleBlockPress = () => {
    Alert.alert(
      'Block User',
      'Do you want to block this user?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Block',
          onPress: () => navigation.replace('Main'),
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  };

  const saveFeedBack = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await fetch(
        `https://stranger-backend.onrender.com/feedback/save/${userId}`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify({
            rating: rating,
            feedbackContent: {
              options: selectedInterests,
              comment: thoughts,
            },
          }),
        },
      );

      if (response.status === 200) {
        console.log('Feedback submitted successfully');
        navigation.replace('Main');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', backgroundColor: '#ffffff'}}>
      <TouchableOpacity activeOpacity={1} style={{flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false} style={{width: '90%'}}>
          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <TouchableOpacity onPress={handleCancel}>
              <Text
                style={{color: '#565D6DFF', fontSize: 14, fontWeight: '400'}}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleBlockPress}>
              <Text style={{color: 'red', fontSize: 14, fontWeight: '400'}}>
                Block
              </Text>
            </TouchableOpacity>
          </View>

          {/* Profile info */}
          <View style={{alignItems: 'center', marginTop: 30}}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '700',
                color: '#171A1FFF',
                lineHeight: 36,
              }}>
              {username}
            </Text>
            <View style={{marginTop: 10, alignItems: 'center'}}>
              <Image
                style={{width: 100, height: 100, borderRadius: 50}}
                source={{
                  uri: profileImage,
                }}
              />
              <Text
                style={{
                  marginTop: 10,
                  color: '#171A1FFF',
                  fontWeight: '500',
                  fontSize: 18,
                  lineHeight: 28,
                  fontFamily: 'sans-serif',
                  textAlign: 'center',
                }}>
                Write a review...
              </Text>
            </View>
            <View style={{alignItems: 'center', marginTop: 15}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  marginTop: 10,
                }}>
                {[1, 2, 3, 4, 5].map(value => (
                  <TouchableOpacity
                    key={value}
                    onPress={() => handleStarClick(value)}>
                    <AntDesign
                      name="star"
                      size={30}
                      color={value <= rating ? 'orange' : 'gray'}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Interests */}
          <View style={{marginTop: 15}}>
            <Text
              style={{
                color: '#171A1FFF',
                fontWeight: '500',
                fontSize: 20,
                fontFamily: 'sans-serif',
              }}>
              Feedback About The User?
            </Text>
            <View style={styles.container}>
              {interests?.map((interest, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => toggleInterest(interest)}
                  style={[
                    styles.text,
                    selectedInterests.includes(interest) && styles.selectedText,
                  ]}>
                  <Text
                    style={{
                      color: selectedInterests.includes(interest)
                        ? '#fff'
                        : '#000',
                    }}>
                    {interest}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Textarea for thoughts */}
          <View style={{marginTop: 15}}>
            <Text
              style={{
                color: '#171A1FFF',
                fontWeight: '500',
                fontSize: 17,
                fontFamily: 'sans-serif',
              }}>
              Type Feedback About The User?
            </Text>
            {/* Remaining code */}
            <TextInput
              style={styles.textArea}
              placeholder="Write your thoughts here..."
              placeholderTextColor={'gray'}
              multiline={true}
              onChangeText={text => setThoughts(text)}
              value={thoughts}
            />
            <TouchableOpacity
              onPress={saveFeedBack}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
                padding: 10,
                marginBottom: 20,
                backgroundColor: '#6D31EDFF',
                borderRadius: 5,
              }}>
              <Text style={{color: 'white'}}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  text: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  selectedText: {
    backgroundColor: '#6D31EDFF', // Change to your desired color for selected text
  },
  textArea: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 10,
    height: 150, // Adjust height as needed
    textAlignVertical: 'top', // Align the text to the top
    color: 'gray',
  },
});

export default FeedBackForm;
