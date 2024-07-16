// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbOeJrLx-tZWWVMibeCA_xUb57Z3v8jBI",
  authDomain: "groceryapp-9ed7b.firebaseapp.com",
  projectId: "groceryapp-9ed7b",
  storageBucket: "groceryapp-9ed7b.appspot.com",
  messagingSenderId: "572470177817",
  appId: "1:572470177817:web:736d7ed9d10f940ecd3a88",
  measurementId: "G-HD4MJ95B7S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);