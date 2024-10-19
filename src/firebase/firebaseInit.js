import firebase from 'firebase/app' // Import Firebase core
import 'firebase/firestore' // Import Firestore for database functionalities

// Firebase configuration object containing project settings
const firebaseConfig = {
  apiKey: 'AIzaSyBY_-YtRb3GUIFVTV4Y886D2tcCweVG6BE', // Your API key
  authDomain: 'myblog-fb600.firebaseapp.com', // Auth domain for Firebase Authentication
  projectId: 'myblog-fb600', // Project ID for your Firebase project
  storageBucket: 'myblog-fb600.appspot.com', // Storage bucket for file storage
  messagingSenderId: '367014994103', // Sender ID for Firebase Cloud Messaging
  appId: '1:367014994103:web:0cd1d36c3a2049578ced32' // Unique identifier for your app
}

// Initialize Firebase app with the configuration
const firebaseApp = firebase.initializeApp(firebaseConfig)

// Reference to Firestore server timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp

// Export the timestamp function for use in other modules
export { timestamp }
// Export the Firestore database instance
export default firebaseApp.firestore()
