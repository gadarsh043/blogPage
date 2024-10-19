import email from '@/assets/Icons/envelope-regular.svg' // Import email icon
import Modal from '@/components/ModalDiv' // Modal component for displaying messages
import Loading from '@/components/LoadingPage' // Loading component to show progress
import firebase from 'firebase/app'
import 'firebase/auth' // Import Firebase authentication

export default {
  name: 'ForgotPassword',

  data () {
    return {
      email: '', // User email input for password reset
      modalActive: false, // Modal visibility flag
      modalMessage: '', // Message to display in the modal
      loading: null // Loading state flag
    }
  },

  components: {
    email, // Icon for email
    Modal, // Modal component
    Loading // Loading component
  },

  methods: {
    // Function to trigger the password reset process
    resetPassword () {
      this.loading = true // Show loading indicator
      firebase
        .auth()
        .sendPasswordResetEmail(this.email) // Firebase method to send password reset email
        .then(() => {
          // On success, show a modal message
          this.modalMessage = 'If your account exists, you will receive an email'
          this.loading = false // Hide loading indicator
          this.modalActive = true // Show modal
        })
        .catch((err) => {
          // On error, show the error message in the modal
          this.modalMessage = err.message
          this.loading = false // Hide loading indicator
          this.modalActive = true // Show modal
        })
    },

    // Method to close the modal and reset the email input field
    closeModal () {
      this.modalActive = !this.modalActive // Toggle modal visibility
      this.email = '' // Clear the email input
    }
  }
}
