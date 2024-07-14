// screens/SplashScreen.js
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppBrandName from '../Components/AppBrandName';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login'); // Use 'replace' to avoid going back to the splash screen
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer); // Cleanup the timer if the component is unmounted
  }, [navigation]);

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
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
  }
});

export default SplashScreen;

