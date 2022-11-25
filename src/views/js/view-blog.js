export default {
  name: 'ViewBlog',
  data () {
    return {
      currentBlog: null
    }
  },
  async mounted () {
    this.currentBlog = await this.$store.state.blogPosts.filter((post) => {
      return post.blogID === this.$route.params.blogid
    })
  }
}
