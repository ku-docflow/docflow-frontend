// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmj90nWtGqEnYiXSe2F9qqxZVxgA4WKuw",

  authDomain: "docflow-dd375.firebaseapp.com",

  projectId: "docflow-dd375",

  storageBucket: "docflow-dd375.firebasestorage.app",

  messagingSenderId: "497732990186",

  appId: "1:497732990186:web:77792c396a86ef84191393",

  measurementId: "G-YZE9EPMX1X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
