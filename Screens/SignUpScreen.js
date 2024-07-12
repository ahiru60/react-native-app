// screens/SignUpScreen.js
import React, { useState } from 'react';
import { Image,View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import FloatingLabelInput from '../Components/FloatingLabelInput';
import AppBrandName from '../Components/AppBrandName';
import MainButton from '../Components/MainButton'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [isLoading,setIsLoading] = useState(false);

  const handelSighUp = () =>{
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
    navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome' }],
    });
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
  }

  const validatePassword = (input) => { 
    let newSuggestions = []; 
    if (input.length < 8) { 
        newSuggestions.push('Password should be at least 8 characters long') 
    } 
    if (!/\d/.test(input)) { 
        newSuggestions.push('Add at least one number') 
    } 

    if (!/[A-Z]/.test(input)) { 
        newSuggestions.push('Include both upper ') 
    } 
    if(!/[a-z]/.test(input)){
      newSuggestions.push('Include lower case letters') 
    }

    if (!/[^A-Za-z0-9]/.test(input)) { 
        newSuggestions.push('Include at least one special character') 
    } 

    setSuggestions(newSuggestions); 

    // Determine password strength based on suggestions 
    if (newSuggestions.length === 0) { 
        setStrength('Very Strong'); 
    } 
    else if (newSuggestions.length <= 1) { 
        setStrength('Strong') 
    } 
    else if (newSuggestions.length <= 2) { 
        setStrength('Moderate') 
    } 
    else if (newSuggestions.length <= 3) { 
        setStrength('Weak') 
    } 
    else { 
        setStrength('Too Weak') 
    } 
}  

  return (
    <View style={styles.container}>
      <AppBrandName/>
      <FloatingLabelInput
        label="Name"
        value={name}
        onChangeText={setName}
      />
      <FloatingLabelInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <FloatingLabelInput
        label="Password"
        value={password}
        onChangeText={(password)=>{setPassword();validatePassword(password)}}
        secureTextEntry
      />
      <FloatingLabelInput
        label="Confirm Password"
        value={confPassword}
        onChangeText={setConfPassword}
        secureTextEntry
      />
      <View style={styles.requirementsTable}>
      <View flex='1'>
      <View><Text style={styles.requirements}>- One lowercase character</Text></View>
      <View><Text style={styles.requirements}>- One uppercase character</Text></View>
      <View><Text style={styles.requirements}>- One number</Text></View>
      </View>
      <View flex='1'>
      <View><Text style={styles.requirements}>- 8 characters minimum</Text></View>
      </View>
      </View>
      
      <MainButton title = {'Sign Up'} onPress={() => /*navigation.navigate('Welcome')*/ handelSighUp()}/>
      <View style={styles.loginText}>
        <Text style={{color:'#FFF'}}>Have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>Sign In</Text>
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
    backgroundColor: '#000',
  },
  requirementsTable:{
    flexDirection:'row',
    marginBottom:26,
    marginTop:10
  },
  requirements: {
    color: '#FFF',
    fontSize: 12,
    marginVertical: 2,
  },
  loginText: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  
  loginLink: {
    color: '#FFA726',
  },
});

export default SignUpScreen;
