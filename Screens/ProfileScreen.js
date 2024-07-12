// screens/ProfileScreen.js
import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>My App</Text>
      <TextInput style={styles.input} placeholder="Name" placeholderTextColor="#888" value="Example Application" />
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#888" value="example@app.com" />
      <Button title="Log out" onPress={() => navigation.reset({
  index: 0,
  routes: [{ name: 'Login' }],  // 'Welcome' is the screen you want to navigate to
      }) } color="#FFA726" />
      </View>
        );
      };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#000',
  },
  header: {
    color: '#FFF',
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#333',
    color: '#FFF',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});

export default ProfileScreen;
