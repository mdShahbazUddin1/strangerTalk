import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

const InformationScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Information</Text>
      <View style={styles.infoItem}>
        <Text style={styles.infoTitle}>Camera Permission:</Text>
        <Text style={styles.infoText}>
          We require camera permission to make video calls.
        </Text>
      </View>
      <View style={styles.infoItem}>
        <Text style={styles.infoTitle}>Audio & Video Permission:</Text>
        <Text style={styles.infoText}>
          We need audio and video permission for audio and video calls.
        </Text>
      </View>
      <View style={styles.infoItem}>
        <Text style={styles.infoTitle}>Gallery Access:</Text>
        <Text style={styles.infoText}>
          Gallery access is required to share photos during calls.
        </Text>
      </View>
      <View style={styles.infoItem}>
        <Text style={styles.infoTitle}>Privacy:</Text>
        <Text style={styles.infoText}>
          We highly prioritize your privacy. We do not share your data with
          anyone. All communication is encrypted for added security.
        </Text>
      </View>
      <View style={styles.infoItem}>
        <Text style={styles.infoTitle}>Data Security:</Text>
        <Text style={styles.infoText}>
          Your data is securely stored on our servers. We use industry-standard
          security measures to protect your information from unauthorized access
          or misuse.
        </Text>
      </View>
      <View style={styles.infoItem}>
        <Text style={styles.infoTitle}>Customer Support:</Text>
        <Text style={styles.infoText}>
          We provide 24/7 customer support to assist you with any queries or
          issues you may have. You can reach out to us via email, phone, or live
          chat.
        </Text>
      </View>
      <View style={styles.infoItem}>
        <Text style={styles.infoTitle}>User Feedback:</Text>
        <Text style={styles.infoText}>
          We value your feedback! Feel free to share your thoughts and
          suggestions with us. Your feedback helps us improve our services.
        </Text>
      </View>
      <View style={styles.infoItem}>
        <Text style={styles.infoTitle}>Terms & Conditions:</Text>
        <Text style={styles.infoText}>
          Please review our Terms & Conditions for using our app. By using our
          app, you agree to abide by these terms.
        </Text>
      </View>
      <View style={styles.infoItem}>
        <Text style={styles.infoTitle}>Subscription:</Text>
        <Text style={styles.infoText}>
          Some features may require a subscription. You can view and manage your
          subscription in the app settings.
        </Text>
      </View>
      <View style={styles.infoItem}>
        <Text style={styles.infoTitle}>App Updates:</Text>
        <Text style={styles.infoText}>
          We regularly update our app to improve performance and add new
          features. Make sure to keep your app updated to access the latest
          enhancements.
        </Text>
      </View>
      <View style={styles.infoItem}>
        <Text style={styles.infoTitle}>Community Guidelines:</Text>
        <Text style={styles.infoText}>
          We have community guidelines in place to ensure a positive and
          respectful experience for all users. Please familiarize yourself with
          these guidelines.
        </Text>
      </View>
      <View style={styles.infoItem}>
        <Text style={styles.infoTitle}>Accessibility:</Text>
        <Text style={styles.infoText}>
          We strive to make our app accessible to everyone. If you encounter any
          accessibility issues, please let us know so we can address them.
        </Text>
      </View>
      <View style={styles.infoItem}>
        <Text style={styles.infoTitle}>Legal Information:</Text>
        <Text style={styles.infoText}>
          For legal inquiries or concerns, please contact our legal team. We
          take legal matters seriously and will address them promptly.
        </Text>
      </View>
      <View style={styles.infoItem}>
        <Text style={styles.infoTitle}>About Us:</Text>
        <Text style={styles.infoText}>
          Learn more about our company and mission. We are dedicated to
          providing innovative solutions to enhance your experience.
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
