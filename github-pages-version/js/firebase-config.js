
/**
 * Firebase Configuration
 * 
 * This file contains your Firebase project credentials.
 * Replace these values with your actual Firebase project settings.
 * Do not commit this file with real credentials to public repositories.
 */

const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_FIREBASE_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_FIREBASE_PROJECT_ID",
  storageBucket: "YOUR_FIREBASE_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_FIREBASE_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID" // Optional, only if using Google Analytics
};

// Export the config for use in firebase.js
// The actual Firebase initialization happens in firebase.js