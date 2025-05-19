// Firebase configuration and initialization
// This file centralizes all Firebase-related functionality

// Firebase configuration - Replace these values with your Firebase project's values
const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // Replace with your actual Firebase API key
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com", // Replace with your project ID
  projectId: "YOUR_PROJECT_ID", // Replace with your project ID
  storageBucket: "YOUR_PROJECT_ID.appspot.com", // Replace with your project ID
  messagingSenderId: "123456789012", // Replace with your sender ID if available
  appId: "YOUR_APP_ID" // Replace with your app ID
};

// Initialize Firebase
function initFirebase() {
  // Check if Firebase SDK is loaded
  if (typeof firebase !== 'undefined') {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    console.log('Firebase initialized successfully');
    return true;
  } else {
    console.error('Firebase SDK not loaded');
    return false;
  }
}

// Firebase Authentication helper functions
const FirebaseAuth = {
  // Get current user
  getCurrentUser: function() {
    return firebase.auth().currentUser;
  },

  // Sign in with Google
  signInWithGoogle: function() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  },

  // Sign in with email and password
  signInWithEmail: function(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  },

  // Create user with email and password
  createUserWithEmail: function(email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  },

  // Update user profile
  updateProfile: function(user, data) {
    return user.updateProfile(data);
  },

  // Sign out
  signOut: function() {
    return firebase.auth().signOut();
  },

  // Set auth state change listener
  onAuthStateChanged: function(callback) {
    return firebase.auth().onAuthStateChanged(callback);
  }
};

// Initialize Firebase on page load
document.addEventListener('DOMContentLoaded', function() {
  initFirebase();
});

// Make Firebase services available globally
window.FirebaseAuth = FirebaseAuth;