// screens/SplashScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppBrandName from '../Components/AppBrandName';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <AppBrandName/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1E1E1E',
  }
});

export default SplashScreen;
