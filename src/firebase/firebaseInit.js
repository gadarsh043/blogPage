import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBY_-YtRb3GUIFVTV4Y886D2tcCweVG6BE',
  authDomain: 'myblog-fb600.firebaseapp.com',
  projectId: 'myblog-fb600',
  storageBucket: 'myblog-fb600.appspot.com',
  messagingSenderId: '367014994103',
  appId: '1:367014994103:web:0cd1d36c3a2049578ced32'
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { timestamp }
export default firebaseApp.firestore()
