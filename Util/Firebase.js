import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
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


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default {auth};


  