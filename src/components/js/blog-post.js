import Arrow from '@/assets/Icons/arrow-right-light.svg' // Import the arrow icon

export default {
  name: 'blogPost', // Define the component name
  props: ['post'], // Define props for the component, expecting a 'post' object
  components: {
    Arrow // Register the arrow component
  },
  computed: {
    // Computed property to get the current user from the store
    user () {
      return this.$store.state.user // Return the user state from Vuex store
    }
  }
}
