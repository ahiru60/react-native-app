import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore"; 

const ProfileScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setEmail(user.email);
        const userDoc = await getDoc(doc(db, "Users", user.uid));
        if (userDoc.exists()) {
          setName(userDoc.data().name);
        } else {
          console.log("No such document!");
        }
      } else {
        setEmail('');
        setName('');
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My App</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Name" 
        placeholderTextColor="#888" 
        value={name}
        editable={false} // Optional: If you want to allow editing
      />
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        placeholderTextColor="#888" 
        value={email}
        editable={false} // Make the email input non-editable
      />
      <Button 
        title="Log out" 
        onPress={() => navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })} 
        color="#FFA726" 
      />
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
