// screens/LoginScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import FloatingLabelInput from '../Components/FloatingLabelInput';
import AppBrandName from '../Components/AppBrandName';
import MainButton from '../Components/MainButton';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError] = useState('');
  

  const handleLogin = async () => {
    if(email != '' && password != ''){
      const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
      navigation.reset({
        index: 0,
        routes: [{ name: 'Welcome' }],  
      });
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    if(errorCode == 'auth/invalid-email'){
      setError('Invalid Email');
    }
    else{
      setError(errorCode);
    }
    

  });
    }
    else{
      setError('Email or Password is missing');
    }

  };


  return (
    <View style={styles.container}>
      <View style={styles.AppName}>
      <AppBrandName/>
      </View>
      <FloatingLabelInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <FloatingLabelInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      <Text style={styles.error}>{error}</Text>
      
      <MainButton title = {'Sign In'} onPress={() => handleLogin()}/>
      <View style={styles.signupText}>
        <Text style={styles.signupPhrase}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={{flexDirection:'row', flexWrap:'wrap'}}>
          <Text style={styles.signupLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#1E1E1E',
  },
  forgotPassword: {
    color: '#FFF',
    textAlign: 'right',
    marginBottom: 20,
  },
  AppName: {
    marginBottom: 50,
  },
  loading: {
    textAlign:'center',
    width: 'auto',
    color:'white',
    marginBottom:15,
    fontWeight:'600'
  },
  signupText: {
    color:'#FFF',
    bottom:'-18%',
    flexDirection:'row', 
    flexWrap:'wrap',
    justifyContent:'center'
  },
  signupLink: {
    color: '#FFA726',
    textAlign:'center',
    bottom:'-18%',

  },
  signupPhrase: {
    color: '#FFF',
  },
  error:{
    color:'#F7470A',
    fontWeight:'500',
    textAlign:'center',
    marginBottom:20,
    marginTop:15,
  },
});

export default LoginScreen;
