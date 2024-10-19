export default {
  name: 'ViewBlog',
  data () {
    return {
      currentBlog: null
    }
  },
  async mounted () {
    // Fetch the blog post by ID from the store
    const blogID = this.$route.params.blogid
    const blogPosts = this.$store.state.blogPosts

    // Use find to get the specific blog post
    this.currentBlog = blogPosts.find(post => post.blogID === blogID) || null

    // Optional: Handle case where the blog post is not found
    if (!this.currentBlog) {
      console.error('Blog post not found')
      // You could redirect or show a message to the user here
    }
  }
}
