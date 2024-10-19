import close from '@/assets/Icons/times-circle-light.svg' // Import close icon

export default {
  components: {
    close // Register close component
  },
  methods: {
    // Method to close the photo preview
    closePreview () {
      this.$store.commit('openPhotoPreview') // Commit mutation to toggle photo preview state
    }
  },
  computed: {
    // Computed property to get the blog cover photo URL from the store
    blogCoverPhoto () {
      return this.$store.state.blogPhotoFileURL // Return the cover photo file URL from state
    }
  }
}
