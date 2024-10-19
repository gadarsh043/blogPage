import BlogPost from '@/components/BlogPost' // BlogPost component to show blog details
import BlogCard from '@/components/BlogCard' // BlogCard component to show a card view of blogs
import Arrow from '@/assets/Icons/arrow-right-light.svg' // Arrow icon for UI

export default {
  name: 'Home',

  components: { BlogPost, BlogCard, Arrow }, // Register components for use in the template

  computed: {
    // Get the list of blog posts for the feed, typically ordered by latest posts
    blogPostsFeed () {
      return this.$store.getters.blogPostsFeed
    },
    // Get the list of blog posts to display in cards, typically a summarized view
    blogPostsCards () {
      return this.$store.getters.blogPostsCards
    },
    // Fetch the user data from Vuex store
    user () {
      return this.$store.state.user
    }
  },

  data () {
    return {
      // Object representing the welcome screen with a title, blog post info, and an image
      welcomeScreen: {
        title: 'Welcome!', // Title for the welcome section
        blogPost: 'Register now to get my regular updates.', // Message to encourage registration
        welcomeScreen: true, // Flag to display welcome screen
        photo: 'coding' // Placeholder for photo, might map to an image shown in the UI
      }
    }
  }
}
