import Arrow from '@/assets/Icons/arrow-right-light.svg' // Import arrow icon
import Edit from '@/assets/Icons/edit-regular.svg' // Import edit icon
import Delete from '@/assets/Icons/trash-regular.svg' // Import delete icon

export default {
  name: 'blogCard', // Name of the component
  props: ['post'], // Props to receive post data
  components: {
    Arrow, // Register Arrow component
    Edit, // Register Edit component
    Delete // Register Delete component
  },
  methods: {
    // Method to delete a post
    deletePost () {
      this.$store.dispatch('deletePost', this.post.blogID) // Dispatch action to delete post
    },
    // Method to navigate to edit blog page
    editBlog () {
      this.$router.push({ name: 'EditBlog', params: { blogid: this.post.blogID } }) // Navigate to EditBlog route with blogID
    }
  },
  computed: {
    // Computed property to get the edit post state from the store
    editPost () {
      return this.$store.state.editPost // Return editPost state
    }
  }
}
