import menuIcon from '@/assets/Icons/bars-regular.svg' // Import menu icon
import userIcon from '@/assets/Icons/user-alt-light.svg' // Import user icon
import adminIcon from '@/assets/Icons/user-crown-light.svg' // Import admin icon
import signOutIcon from '@/assets/Icons/sign-out-alt-regular.svg' // Import sign-out icon
import logOut from '@/assets/log-out.png' // Import log out image
import firebase from 'firebase/app' // Import Firebase core
import 'firebase/auth' // Import Firebase authentication

export default {
  name: 'navigation', // Define the component name
  components: { menuIcon, userIcon, adminIcon, signOutIcon }, // Register icon components
  data () {
    return {
      logOut, // Log out image reference
      profileMenu: null, // State for profile menu visibility
      mobile: null, // State to check if mobile view is active
      mobileNav: null, // State for mobile navigation visibility
      windowWidth: null, // State to store current window width
      toolTip: null // State for tooltips (if used)
    }
  },
  created () {
    window.addEventListener('resize', this.checkScreen) // Add event listener for window resize
    this.checkScreen() // Initial check for screen size
  },
  methods: {
    // Check current window width and set mobile states accordingly
    checkScreen () {
      this.windowWidth = window.innerWidth
      if (this.windowWidth <= 750) {
        this.mobile = true // Set mobile state to true for small screens
        return
      }
      this.mobile = false // Set mobile state to false for larger screens
      this.mobileNav = false // Ensure mobile navigation is closed
    },
    // Toggle the visibility of the mobile navigation
    toggleMobileNav () {
      this.mobileNav = !this.mobileNav // Flip the mobile navigation state
    },
    // Toggle the profile menu based on the event target
    toggleProfileMenu (e) {
      if (e.target === this.$refs.profile && this.admin) {
        this.profileMenu = !this.profileMenu // Show/hide profile menu if admin
      }
    },
    // Sign out user from Firebase and reload the window
    signOut () {
      firebase.auth().signOut() // Sign out from Firebase
      window.location.reload() // Reload the page to reflect the sign-out
    },
    // Hide profile menu and mobile navigation when clicking outside
    clickedOutside () {
      this.profileMenu = false // Close profile menu
      this.mobileNav = false // Close mobile navigation
    }
  },
  computed: {
    // Computed property to get the current user from the store
    user () {
      return this.$store.state.user // Return the user state from Vuex store
    },
    // Computed property to check if the user is an admin
    admin () {
      return this.$store.state.profileAdmin // Return the admin state from Vuex store
    }
  }
}
