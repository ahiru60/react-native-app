// screens/SignUpScreen.js
import React, { useEffect, useState } from 'react';
import { Image, View, Text, TextInput, Button, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import FloatingLabelInput from '../Components/FloatingLabelInput';
import AppBrandName from '../Components/AppBrandName';
import MainButton from '../Components/MainButton';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [requirements, setRequirements] = useState(newRequirements);
  const [eightLengthStatImg, setEightLengthStatImg] = useState();
  const [oneNumberStatImg, setOneNumberStatImg] = useState();
  const [upperCaseStatImg, setUpperCaseStatImg] = useState();
  const [lowerCaseStatImg, setLowerCaseStatImg] = useState();
  const [specialCharStatImg, setSpecialCharStatImg] = useState();

  const db = getFirestore(); // Initialize Firestore

  const handelSighUp = () => {
    if (name !== '' && email !== '' && password !== '' && confPassword !== '') {
      if (password === confPassword) {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
          .then(async (userCredential) => {
            // Signed up 
            const user = userCredential.user;
            
            // Save user details to Firestore
            await setDoc(doc(db, "sers", user.uid), {
              name: name,
              email: email,
              uid: user.uid
            });

            // Navigate to Welcome screen
            navigation.reset({
              index: 0,
              routes: [{ name: 'Welcome' }],
            });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === 'auth/invalid-email') {
              setError("Invalid Email");
            }
            // Other error handling...
          });
      } else {
        setError('Confirm password doesn\'t match');
      }
    } else {
      setError('Missing field inputs');
    }
  }

  const newRequirements = {
    eightLengthStatImg: require('../assets/ic_pending.png'),
    oneNumberStatImg: require('../assets/ic_pending.png'),
    lowerCaseStatImg: require('../assets/ic_pending.png'),
    upperCaseStatImg: require('../assets/ic_pending.png'),
    specialCharStatImg: require('../assets/ic_pending.png')
  }

  const validatePassword = (input) => {
    if (password.length > 7) {
      setEightLengthStatImg(require('../assets/ic_check.png'));
    } else {
      setEightLengthStatImg(require('../assets/ic_pending.png'));
    }
    if (/\d/.test(input)) {
      setOneNumberStatImg(require('../assets/ic_check.png'));
    } else {
      setOneNumberStatImg(require('../assets/ic_pending.png'));
    }

    if (/[A-Z]/.test(input)) {
      setUpperCaseStatImg(require('../assets/ic_check.png'));
    } else {
      setUpperCaseStatImg(require('../assets/ic_pending.png'));
    }
    if (/[a-z]/.test(input)) {
      setLowerCaseStatImg(require('../assets/ic_check.png'));
    } else {
      setLowerCaseStatImg(require('../assets/ic_pending.png'));
    }

    if (/[^A-Za-z0-9]/.test(input)) {
      setSpecialCharStatImg(require('../assets/ic_check.png'));
    } else {
      setSpecialCharStatImg(require('../assets/ic_pending.png'));
    }
  }

  useEffect(() => {
    validatePassword(password);
  }, [password]);

  return (
    <View style={styles.container}>
      <AppBrandName />
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
        onChangeText={setPassword}
        secureTextEntry
      />
      <FloatingLabelInput
        label="Confirm Password"
        value={confPassword}
        onChangeText={setConfPassword}
        secureTextEntry
      />
      <Text style={styles.error}>{error}</Text>
      <KeyboardAvoidingView behavior='padding'>
        <View style={styles.requirementsTable}>
          <View flex='1'>
            <View style={styles.requirementRow}><Image source={lowerCaseStatImg} style={styles.requirementImg} /><Text style={styles.requirements}> One lowercase character</Text></View>
            <View style={styles.requirementRow}><Image source={upperCaseStatImg} style={styles.requirementImg} /><Text style={styles.requirements}> One uppercase character</Text></View>
            <View style={styles.requirementRow}><Image source={oneNumberStatImg} style={styles.requirementImg} /><Text style={styles.requirements}> One number</Text></View>
          </View>
          <View flex='1'>
            <View style={styles.requirementRow}><Image source={eightLengthStatImg} style={styles.requirementImg} /><Text style={styles.requirements}>8 characters minimum </Text></View>
            <View style={styles.requirementRow}><Image source={specialCharStatImg} style={styles.requirementImg} /><Text style={styles.requirements}>One special character </Text></View>
          </View>
        </View>
      </KeyboardAvoidingView>

      <MainButton title={'Sign Up'} onPress={() => handelSighUp()} />
      <View style={styles.loginText}>
        <Text style={{ color: '#FFF' }}>Have an account? </Text>
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
    backgroundColor: '#1E1E1E',
  },
  requirementsTable: {
    flexDirection: 'row',
    marginBottom: 7,
    marginTop: 10
  },
  requirementRow: {
    flexDirection: 'row',
    marginStart: 6
  },
  requirementImg: {
    height: 15,
    width: 15,
  },
  requirements: {
    color: '#FFF',
    fontSize: 10.5,
    marginVertical: 3,
    paddingHorizontal: 4
  },
  loginText: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  loginLink: {
    color: '#FFA726',
  },
  error: {
    color: '#F7470A',
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default SignUpScreen;
