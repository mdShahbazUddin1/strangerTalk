import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const languages = [
  {label: 'English', code: 'EN'},
  {label: 'हिन्दी', code: 'HI', translation: 'अनुवाद'},
  {label: 'தமிழ்', code: 'TA', translation: 'மொழிபெயர்ப்பு'},
  {label: 'తెలుగు', code: 'TE', translation: 'అనువాదం'},
  {label: 'ಕನ್ನಡ', code: 'KN', translation: 'ಭಾಷಾಂತರ'},
  {label: 'മലയാളം', code: 'ML', translation: 'വിവർത്തനം'},
  {label: 'বাংলা', code: 'BN', translation: 'অনুবাদ'},
  {label: 'मराठी', code: 'MR', translation: 'भाषांतर'},
];

const Language = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const handleLanguagePress = language => {
    setSelectedLanguage(language);
  };

  const handleCancelPress = () => {
    // Handle cancel logic here
    console.log('Cancel pressed');
  };

  const handleSavePress = () => {
    // Handle save changes logic here
    console.log('Save pressed', selectedLanguage);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Language Settings</Text>
      <Text style={styles.description}>
        Select the language you prefer for communications.
      </Text>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {languages.map((language, index) => (
          <TouchableOpacity
            key={index}
            style={styles.languageContainer}
            onPress={() => handleLanguagePress(language)}>
            <View style={styles.radioButton}>
              {selectedLanguage?.code === language.code && (
                <View style={styles.radioButtonSelected} />
              )}
            </View>
            <Text style={styles.languageText}>
              {language.label} - {language.code}
              {language.translation && ` - ${language.translation}`}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.cancelButton]}
          onPress={handleCancelPress}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.saveButton]}
          onPress={handleSavePress}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  scrollView: {
    paddingBottom: 20,
    alignItems: 'flex-start',
  },
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  radioButton: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007BFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  radioButtonSelected: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#007BFF',
  },
  languageText: {
    fontSize: 18,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
  },
  actionButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  saveButton: {
    backgroundColor: '#007BFF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Language;
