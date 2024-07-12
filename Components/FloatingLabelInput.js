// FloatingLabelInput.js
import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Animated, StyleSheet } from 'react-native';

const FloatingLabelInput = ({ label, value, onChangeText, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedIsFocused = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelStyle = {
    position: 'absolute',
    left: 18,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 2],
      outputRange: [23, -6],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 2],
      outputRange: [16, 12],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: ['#FFF', '#FFF'],
    }),
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={labelStyle}>
        {label}
      </Animated.Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingHorizontal:18,
    paddingBottom:20,
    marginVertical: 10,
    backgroundColor: '#3D3D3D',
    borderRadius:'12'
    
  },
  input: {
    position:'relative',
    top:10,
    height: 30,
    fontSize: 17,
    color: '#FFF',
  },
});

export default FloatingLabelInput;
