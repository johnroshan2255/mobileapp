// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, initializeAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, collection } from "firebase/firestore";
import { getReactNativePersistence } from '@firebase/auth/dist/rn/index.js';




// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6tgBk2DaZNYlfAZVNr49a9fGquREb0m0",
  authDomain: "mobile-app-99d69.firebaseapp.com",
  projectId: "mobile-app-99d69",
  storageBucket: "mobile-app-99d69.appspot.com",
  messagingSenderId: "568876648226",
  appId: "1:568876648226:web:87bd4b7f642db06de7877b",
  measurementId: "G-JESTY1H5V8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export const auth = getAuth(app);
export const auth = initializeAuth(app,{
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export const userRef = collection(db, 'users');

export const roomsRef = collection(db, 'rooms');