import BlogCard from '@/components/BlogCard'

export default {
  name: 'blogPage',
  components: { BlogCard },

  computed: {
    // Fetches blog posts from the Vuex store
    blogPosts () {
      return this.$store.state.blogPosts
    },

    // Getter and setter for toggling edit post mode
    editPost: {
      get () {
        return this.$store.state.editPost // Get the current edit post state
      },
      set (payload) {
        this.$store.commit('toggleEditPost', payload) // Commit the payload to toggle edit post state
      }
    },

    // Checks if the profile belongs to an admin
    profileAdmin () {
      return this.$store.state.profileAdmin
    },

    // Duplicate check for admin status (could be simplified)
    admin () {
      return this.$store.state.profileAdmin
    }
  },

  // Reset edit post mode when component is destroyed
  beforeDestroy () {
    this.$store.commit('toggleEditPost', false)
  }
}
