import email from '@/assets/Icons/envelope-regular.svg' // Import email icon for the input field
import password from '@/assets/Icons/lock-alt-solid.svg' // Import password icon for the input field
import user from '@/assets/Icons/user-alt-light.svg' // Import user icon for the username input field

import firebase from 'firebase/app' // Import Firebase for authentication
import 'firebase/auth' // Import Firebase authentication service
import db from '@/firebase/firebaseInit' // Import Firebase Firestore database initialization

export default {
  name: 'RegisterPage', // Name of the component

  components: {
    email, // Register email icon component
    password, // Register password icon component
    user // Register user icon component
  },

  data () {
    return {
      firstName: '', // Bound to the first name input field
      lastName: '', // Bound to the last name input field
      username: '', // Bound to the username input field
      email: '', // Bound to the email input field
      password: '', // Bound to the password input field
      error: null, // Flag to show or hide error messages
      errorMsg: '' // Holds the error message content
    }
  },

  methods: {
    async register () {
      // Check if all fields are filled
      if (
        this.email !== '' &&
        this.password !== '' &&
        this.firstName !== '' &&
        this.lastName !== '' &&
        this.username !== ''
      ) {
        this.error = false // Reset error flag
        this.errorMsg = '' // Clear error message

        // Create new user using Firebase authentication
        const firebaseAuth = await firebase.auth()
        await firebaseAuth
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((details) => {
            const result = details // Get user details returned by Firebase
            const dataBase = db.collection('users').doc(result.user.uid) // Create Firestore document for the user

            // Save user details to Firestore database
            dataBase.set({
              firstName: this.firstName,
              lastName: this.lastName,
              username: this.username,
              email: this.email,
              password: this.password, // Although password should be hashed for security reasons
              admin: false // Default admin status for new users is set to false
            })

            // Redirect user to the 'Home' page after successful registration
            this.$router.push({ name: 'Home' })
          })
          .catch((err) => {
            // Handle registration errors
            this.error = true // Set error flag to true
            this.errorMsg = err.message // Set the error message from Firebase
          })
        return
      }
      // If any field is left empty, show an error message
      this.error = true
      this.errorMsg = 'Please fill out all the fields!'
    }
  }
}
