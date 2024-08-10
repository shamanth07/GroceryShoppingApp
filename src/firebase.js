import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

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

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
