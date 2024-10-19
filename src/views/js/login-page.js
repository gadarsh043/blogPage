import email from '@/assets/Icons/envelope-regular.svg' // Import email icon for input field
import password from '@/assets/Icons/lock-alt-solid.svg' // Import password icon for input field
import Loading from '@/components/LoadingPage' // Import a loading spinner component

import firebase from 'firebase/app' // Import Firebase for authentication
import 'firebase/auth' // Import Firebase authentication service

export default {
  name: 'LoginPage', // Name of the component

  components: {
    email, // Register email icon as a component
    password, // Register password icon as a component
    Loading // Register Loading spinner as a component
  },

  data () {
    return {
      email: '', // Bound to email input field for user to enter their email
      password: '', // Bound to password input field for user to enter their password
      error: null, // Flag for showing/hiding error messages
      errorMsg: '', // Error message content
      loading: null // Flag to show loading spinner during async calls
    }
  },

  methods: {
    // Method to handle user login
    signIn () {
      this.loading = true // Set loading flag to true to show spinner

      // Call Firebase authentication method to sign in with email and password
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          // On successful login, redirect user to 'Home' page
          this.$router.push({ name: 'Home' })
          this.error = false // No error
          this.errorMsg = '' // Clear error message
          this.loading = false // Stop loading spinner
        })
        .catch((err) => {
          // If there's an error during login, catch it and display error message
          this.error = true // Set error flag to true
          this.errorMsg = err.message // Set error message from the Firebase response
          this.loading = false // Stop loading spinner
        })
    }
  }
}
