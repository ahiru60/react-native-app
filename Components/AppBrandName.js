import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AppBrandName = () => {
  return (
      <Text style={styles.text}>My App</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '600',
    textAlign:"center",
    marginBottom:6
  },
});

export default AppBrandName;