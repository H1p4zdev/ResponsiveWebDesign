// Firebase configuration - Replace these values with your Firebase project's values
const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // Replace with your actual Firebase API key
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com", // Replace with your project ID
  projectId: "YOUR_PROJECT_ID", // Replace with your project ID
  storageBucket: "YOUR_PROJECT_ID.appspot.com", // Replace with your project ID
  messagingSenderId: "123456789012", // Replace with your sender ID if available
  appId: "YOUR_APP_ID" // Replace with your app ID
};

// Initialize Firebase (using compat version for consistency)
if (typeof firebase !== 'undefined') {
  firebase.initializeApp(firebaseConfig);
}