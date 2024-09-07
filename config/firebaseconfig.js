
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "loop-c4ecd.firebaseapp.com",
  projectId: "loop-c4ecd",
  storageBucket: "loop-c4ecd.appspot.com",
  messagingSenderId: "789685497077",
  appId: "1:789685497077:web:fb94b3aed20b6bca32a9bc",
  measurementId: "G-JM17VZKELQ"
};

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
let app;
let db;

if (typeof window !== 'undefined') {
  // Ensure Firebase is only initialized in the browser
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
}

export { app, db };
