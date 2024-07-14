// screens/WelcomeScreen.js
import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,ActivityIndicator,FlatList,Image } from 'react-native';
import axios from 'axios';
import CharacterList from '../Components/CharacterList';


const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
          <Text style={styles.title}>Game of Thrones Characters</Text>
      <CharacterList></CharacterList>
    </View>
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
    backgroundColor: '#1E1E1E',
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
  title:{
    marginTop:100,
    marginBottom:15,
    fontSize:24,
    fontWeight:'700',
    color:'#FFA726'
  }
});

export default WelcomeScreen;
