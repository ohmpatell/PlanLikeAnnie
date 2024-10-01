// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDf5SMA3lo1oLuHEEiWVpA0le9mBi3lyL0",
  authDomain: "planlikeannie.firebaseapp.com",
  projectId: "planlikeannie",
  storageBucket: "planlikeannie.appspot.com",
  messagingSenderId: "780090260814",
  appId: "1:780090260814:web:c49128f8572181023d321f",
  measurementId: "G-34CGHVBKXX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);