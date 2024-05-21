import React, {useContext, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {LanguageContext} from '../context/LanguageContext';
import strings from '../locales/LocalizedString';

const InformationScreen = () => {
  const {selectedLanguage, changeLanguage} = useContext(LanguageContext);

  useEffect(() => {
    fetchSelectedLanguage();
  }, [selectedLanguage]);

  const fetchSelectedLanguage = async () => {
    strings.setLanguage(selectedLanguage);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{strings.informationScreen.title}</Text>

      <View style={styles.infoItem}>
        <Text style={styles.infoTitle}>
          {strings.informationScreen.audioPermission}
        </Text>
        <Text style={styles.infoText}>
          {strings.informationScreen.audioPermissionText}
        </Text>
      </View>
      <View style={styles.infoItem}>
        <Text style={styles.infoTitle}>
          {strings.informationScreen.galleryAccess}
        </Text>
        <Text style={styles.infoText}>
          {strings.informationScreen.galleryAccessText}
        </Text>
      </View>
      <View style={styles.infoItem}>
        <Text style={styles.infoTitle}>
          {strings.informationScreen.privacy}
        </Text>
        <Text style={styles.infoText}>
          {strings.informationScreen.privacyText}
        </Text>
      </View>
      <View style={styles.infoItem}>
        <Text style={styles.infoTitle}>
          {' '}
          {strings.informationScreen.dataSecurity}
        </Text>
        <Text style={styles.infoText}>
          {strings.informationScreen.dataSecurityText}
        </Text>
      </View>
      <View style={styles.infoItem}>
        <Text style={styles.infoTitle}>
          {strings.informationScreen.customerSupport}
        </Text>
        <Text style={styles.infoText}>
          {strings.informationScreen.customerSupportText}
        </Text>
      </View>
      <View style={styles.infoItem}>
        <Text style={styles.infoTitle}>
          {strings.informationScreen.userFeedback}
        </Text>
        <Text style={styles.infoText}>
          {strings.informationScreen.userFeedbackText}
        </Text>
      </View>
      <View style={styles.infoItem}>
        <Text style={styles.infoTitle}>
          {strings.informationScreen.termsConditions}
        </Text>
        <Text style={styles.infoText}>
          {strings.informationScreen.termsConditionsText}
        </Text>
      </View>
      <View style={styles.infoItem}>
        <Text style={styles.infoTitle}>
          {strings.informationScreen.subscription}
        </Text>
        <Text style={styles.infoText}>
          {strings.informationScreen.subscriptionText}
        </Text>
      </View>
      <View style={styles.infoItem}>
        <Text style={styles.infoTitle}>
          {strings.informationScreen.appUpdates}
        </Text>
        <Text style={styles.infoText}>
          {strings.informationScreen.appUpdatesText}
        </Text>
      </View>
      <View style={styles.infoItem}>
        <Text style={styles.infoTitle}>
          {strings.informationScreen.communityGuidelines}
        </Text>
        <Text style={styles.infoText}>
          {strings.informationScreen.communityGuidelinesText}
        </Text>
      </View>
      <View style={styles.infoItem}>
        <Text style={styles.infoTitle}>
          {strings.informationScreen.accessibility}
        </Text>
        <Text style={styles.infoText}>
          {strings.informationScreen.accessibilityText}
        </Text>
      </View>
      <View style={styles.infoItem}>
        <Text style={styles.infoTitle}>
          {strings.informationScreen.legalInformation}
        </Text>
        <Text style={styles.infoText}>
          {strings.informationScreen.legalInformationText}
        </Text>
      </View>
      <View style={styles.infoItem}>
        <Text style={styles.infoTitle}>
          {strings.informationScreen.aboutUs}
        </Text>
        <Text style={styles.infoText}>
          {strings.informationScreen.aboutUsText}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  infoItem: {
    marginBottom: 20,
  },
  infoTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  infoText: {
    color: 'black',
  },
});

export default InformationScreen;
