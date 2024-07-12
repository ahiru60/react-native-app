// screens/WelcomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Characters list goes here! You are free to come up with a design</Text>
      <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.settingsText}>⚙️</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  text: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  settingsButton: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  settingsText: {
    color: '#FFF',
    fontSize: 24,
  },
});

export default WelcomeScreen;
