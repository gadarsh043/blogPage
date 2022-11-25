
import BlogCard from '@/components/BlogCard'
export default {
  name: 'blogPage',
  components: { BlogCard },
  computed: {
    blogPosts () {
      return this.$store.state.blogPosts
    },
    editPost: {
      get () {
        return this.$store.state.editPost
      },
      set (payload) {
        this.$store.commit('toggleEditPost', payload)
      }
    },
    profileAdmin () {
      return this.$store.state.profileAdmin
    },
    admin () {
      return this.$store.state.profileAdmin
    }
  },
  beforeDestroy () {
    this.$store.commit('toggleEditPost', false)
  }
}
