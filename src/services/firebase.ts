// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAp28xtJ73y-IQB8XoHienodB-ezs6HGxY",
  authDomain: "docflow-f28ab.firebaseapp.com",
  projectId: "docflow-f28ab",
  storageBucket: "docflow-f28ab.firebasestorage.app",
  messagingSenderId: "284206234641",
  appId: "1:284206234641:web:a7162c156203431f7f05b0",
  measurementId: "G-B9TVPXSH46",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
