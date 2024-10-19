<template>
  <div class="app-wrapper">
    <!-- Render app content only when post is loaded -->
    <div class="app" v-if="this.$store.state.postLoaded">
      <!-- Conditionally show Navigation component -->
      <Navigation v-if="!navigation" />
      <!-- Display the current route view -->
      <router-view />
      <!-- Conditionally show Footer component -->
      <Footer v-if="!navigation" />
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/NavigationBar'
import Footer from '@/components/FooterBar'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'app',
  components: { Navigation, Footer },
  data () {
    return {
      // Controls visibility of navigation elements
      navigation: null
    }
  },
  created () {
    // Auth state listener to update user state in the store
    firebase.auth().onAuthStateChanged((user) => {
      this.$store.commit('updateUser', user) // Commit user data to store
      if (user) {
        this.$store.dispatch('getCurrentUser', user) // Fetch current user info
      }
    })
    this.$store.dispatch('getPost') // Dispatch action to load post data
    this.checkRoute() // Check if current route requires hiding navigation
  },
  mounted () {},
  methods: {
    // Check the current route to toggle navigation visibility
    checkRoute () {
      // Hide navigation for login, register, and password reset pages
      if (this.$route.name === 'Login' || this.$route.name === 'Register' || this.$route.name === 'ForgotPassword') {
        this.navigation = true
        return
      }
      this.navigation = false // Show navigation for other routes
    }
  },
  watch: {
    // Watch for route changes and update navigation visibility
    $route () {
      this.checkRoute()
    }
  }
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");

/* Reset default margins and set box-sizing globally */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;  /* Ensure app takes at least full viewport height */
}

/* Center content container */
.container {
  max-width: 1440px;
  margin: 0 auto;
}

/* Define styles for links */
.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}

/* Light theme for links */
.link-light {
  color: #fff;
}

.arrow {
  margin-left: 8px;
  width: 12px;

  /* Style for arrow path */
  path {
    fill: #000;
  }
}

/* Light theme for arrow */
.arrow-light {
  path {
    fill: #fff;
  }
}

/* Style for buttons */
button,
.router-button {
  transition: 500ms ease all;  /* Smooth transitions */
  cursor: pointer;
  margin-top: 24px;
  padding: 12px 24px;
  background-color: #303030;
  color: #fff;
  border-radius: 20px;
  border: none;
  text-transform: uppercase;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: rgba(48, 48, 48, 0.7);  /* Dim background on hover */
  }
}

/* Ghost button style with transparent background */
.button-ghost {
  color: #000;
  padding: 0;
  border-radius: 0;
  margin-top: 50px;
  font-size: 15px;
  font-weight: 500;
  background-color: transparent;

  @media (min-width: 700px) {
    margin-top: 0;
    margin-left: auto;
  }

  i {
    margin-left: 8px;
  }
}

/* Light theme for buttons */
.button-light {
  background-color: transparent;
  border: 2px solid #fff;
  color: #fff;
}

/* Inactive button style (disabled state) */
.button-inactive {
  pointer-events: none !important;
  cursor: none !important;
  background-color: rgba(128, 128, 128, 0.5) !important;  /* Dimmed background */
}

/* Style for error messages */
.error {
  text-align: center;
  font-size: 12px;
  color: red;
}

/* Blog card styles for layout */
.blog-card-wrap {
  position: relative;
  padding: 80px 16px;
  background-color: #f1f1f1;

  @media (min-width: 500px) {
    padding: 100px 16px;
  }

  .blog-cards {
    display: grid;
    gap: 32px;
    grid-template-columns: 1fr;

    /* Adjust grid layout for larger screens */
    @media (min-width: 500px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 900px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (min-width: 1200px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
</style>
