
import BlogPost from '@/components/BlogPost'
import BlogCard from '@/components/BlogCard'
import Arrow from '@/assets/Icons/arrow-right-light.svg'
export default {
  name: 'Home',
  components: { BlogPost, BlogCard, Arrow },
  computed: {
    blogPostsFeed () {
      return this.$store.getters.blogPostsFeed
    },
    blogPostsCards () {
      return this.$store.getters.blogPostsCards
    },
    user () {
      return this.$store.state.user
    }
  },
  data () {
    return {
      welcomeScreen: {
        title: 'Welcome!',
        blogPost:
            'Register now to get my regular updates.',
        welcomeScreen: true,
        photo: 'coding'
      }
    }
  }
}
