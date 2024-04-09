import React, {useState} from 'react';
import {
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

function FeedBackForm() {
  const interests = [
    'Character Development',
    'Plot & Storyline',
    'Writing Style',
    'Pacing & Flow',
    'Originality & Creativity',
    'Dialogue',
    'Humor & Wit',
    'Character Relationships',
  ];

  const [selectedInterests, setSelectedInterests] = useState([]);
  const [thoughts, setThoughts] = useState('');
  const navigation = useNavigation();

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
            <TouchableOpacity>
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
              Syed
            </Text>
            <View style={{marginTop: 10, alignItems: 'center'}}>
              <Image
                style={{width: 100, height: 100, borderRadius: 50}}
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmFvsTU3oFayIDR7Amtxqh-No6UhNpolgVCSFk2dl01g&s',
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
            <View
              style={{
                paddingTop: 8,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                gap: 20,
              }}>
              <AntDesign name="star" size={12} color="orange" />
              <AntDesign name="star" size={12} color="orange" />
              <AntDesign name="star" size={12} color="orange" />
              <AntDesign name="star" size={12} color="orange" />
              <AntDesign name="star" size={12} color="orange" />
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
              What do you like the most?
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
                fontSize: 20,
                fontFamily: 'sans-serif',
              }}>
              Your thoughts about the call?
            </Text>
            <TextInput
              style={styles.textArea}
              placeholder="Write your thoughts here..."
              multiline={true}
              onChangeText={text => setThoughts(text)}
              value={thoughts}
            />
            <TouchableOpacity
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
  },
});

export default FeedBackForm;
