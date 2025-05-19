// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  ,
  authDomain: "esports-hp.firebaseapp.com",
  projectId: "esports-hp",
  storageBucket: "esports-hp.firebasestorage.app",
  messagingSenderId: "578218788593",
  appId: "1:578218788593:web:995d61bdbbfe374bf6cb50",
  measurementId: "G-ELP77R773B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);