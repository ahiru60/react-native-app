import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBledKX2d0rRQtdca5bJLG5cwWVYgUua8g",
  authDomain: "assessment-app-5f1d0.firebaseapp.com",
  projectId: "assessment-app-5f1d0",
  storageBucket: "assessment-app-5f1d0.appspot.com",
  messagingSenderId: "336374591959",
  appId: "1:336374591959:web:875b12d3a47d00f8d81b92",
  measurementId: "G-B192D915KB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Firebase Authentication with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});


  