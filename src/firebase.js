

import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBbOeJrLx-tZWWVMibeCA_xUb57Z3v8jBI",
  authDomain: "groceryapp-9ed7b.firebaseapp.com",
  projectId: "groceryapp-9ed7b",
  storageBucket: "groceryapp-9ed7b.appspot.com",
  databaseURL:"https://groceryapp-9ed7b-default-rtdb.firebaseio.com/",
  messagingSenderId: "572470177817",
  appId: "1:572470177817:web:736d7ed9d10f940ecd3a88",
  measurementId: "G-HD4MJ95B7S"
};


const app = initializeApp(firebaseConfig);
const mydb = getFirestore(app); 
const database = getDatabase(app);

export const realtimedb = database;
export const auth = getAuth(app); 
export  const db = mydb; 
