import youTube from '@/assets/Icons/youtube-brands.svg' // Import YouTube icon
import twitter from '@/assets/Icons/twitter-brands.svg' // Import Twitter icon
import instagram from '@/assets/Icons/instagram-brands.svg' // Import Instagram icon
import linkedin from '@/assets/Icons/linkedin-brands.svg' // Import LinkedIn icon

export default {
  name: 'footer-vue', // Define the component name
  components: {
    youTube, // Register the YouTube icon component
    twitter, // Register the Twitter icon component
    instagram, // Register the Instagram icon component
    linkedin // Register the LinkedIn icon component
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
