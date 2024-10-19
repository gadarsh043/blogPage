import Vue from 'vue' // Import Vue
import Vuex from 'vuex' // Import Vuex for state management
import firebase from 'firebase/app' // Import Firebase app
import 'firebase/auth' // Import Firebase authentication
import db from '@/firebase/firebaseInit' // Import Firestore database initialization

Vue.use(Vuex) // Use Vuex in Vue

export default new Vuex.Store({
  state: {
    // Define the initial state of the application
    blogPosts: [], // Array to hold blog posts
    postLoaded: null, // Flag to indicate if posts are loaded
    blogHTML: 'Write your thoughts here...', // Placeholder text for the blog editor
    blogTitle: '', // Title for the blog post
    blogPhotoName: '', // Name of the blog photo
    blogCoverPhoto: null, // Cover photo for the blog post
    blogPhotoFileURL: null, // URL for the uploaded photo
    blogPhotoPreview: null, // Preview of the blog photo
    editPost: null, // ID of the post currently being edited
    user: null, // Current user object
    profileAdmin: null, // Admin status of the user
    profileEmail: null, // User's email
    profileFirstName: null, // User's first name
    profileLastName: null, // User's last name
    profileUsername: null, // User's username
    profileId: null, // User's ID
    profileInitials: null // Initials for the user's profile
  },
  getters: {
    // Getters for accessing state data
    blogPostsFeed (state) {
      return state.blogPosts.slice(0, 2) // Get the first two blog posts
    },
    blogPostsCards (state) {
      return state.blogPosts.slice(2, 6) // Get the next four blog posts
    }
  },
  mutations: {
    // Synchronous functions to modify state
    newBlogPost (state, payload) {
      state.blogHTML = payload // Update the blog content
    },
    updateBlogTitle (state, payload) {
      state.blogTitle = payload // Update the blog title
    },
    fileNameChange (state, payload) {
      state.blogPhotoName = payload // Update the name of the blog photo
    },
    storeFile (state, payload) {
      state.blogCoverPhoto = payload // Store the uploaded photo file
    },
    createFileURL (state, payload) {
      state.blogPhotoFileURL = payload // Create a URL for the uploaded photo
    },
    openPhotoPreview (state) {
      state.blogPhotoPreview = !state.blogPhotoPreview // Toggle photo preview visibility
    },
    toggleEditPost (state, payload) {
      state.editPost = payload // Set the post ID being edited
    },
    setBlogState (state, payload) {
      // Set various blog state properties from the payload
      state.blogTitle = payload.blogTitle
      state.blogHTML = payload.blogHTML
      state.blogPhotoFileURL = payload.blogCoverPhoto
      state.blogPhotoName = payload.blogCoverPhotoName
    },
    filterBlogPost (state, payload) {
      // Remove a post from the state by filtering it out
      state.blogPosts = state.blogPosts.filter((post) => post.blogID !== payload)
    },
    updateUser (state, payload) {
      state.user = payload // Update the current user
    },
    setProfileInfo (state, doc) {
      // Set user profile information from Firestore document
      state.profileId = doc.id
      state.profileEmail = doc.data().email
      state.profileFirstName = doc.data().firstName
      state.profileLastName = doc.data().lastName
      state.profileUsername = doc.data().username
      state.profileAdmin = doc.data().admin
    },
    setProfileInitials (state) {
      // Set initials based on user's first and last name
      state.profileInitials = state.profileFirstName.match(/(\b\S)?/g).join('') + state.profileLastName.match(/(\b\S)?/g).join('')
    }
  },
  actions: {
    // Asynchronous functions that can commit mutations
    async getCurrentUser ({ commit }) {
      const dataBase = await db.collection('users').doc(firebase.auth().currentUser.uid) // Get current user document from Firestore
      const dbResults = await dataBase.get() // Fetch the document
      commit('setProfileInfo', dbResults) // Commit profile info to state
      commit('setProfileInitials') // Commit initials to state
    },
    async getPost ({ state }) {
      const dataBase = await db.collection('blogPosts').orderBy('date', 'desc') // Get blog posts ordered by date
      const dbResults = await dataBase.get() // Fetch the documents
      dbResults.forEach((doc) => {
        if (!state.blogPosts.some((post) => post.blogID === doc.id)) {
          const data = {
            blogID: doc.data().blogID,
            blogHTML: doc.data().blogHTML,
            blogCoverPhoto: doc.data().blogCoverPhoto,
            blogTitle: doc.data().blogTitle,
            blogDate: doc.data().date,
            blogCoverPhotoName: doc.data().blogCoverPhotoName
          }
          state.blogPosts.push(data) // Add the new post to the state
        }
      })
      state.postLoaded = true // Set the post loaded flag to true
    },
    async deletePost ({ commit }, blogId) {
      const getPost = await db.collection('blogPosts').doc(blogId) // Reference the blog post to be deleted
      await getPost.delete() // Delete the post from Firestore
      commit('filterBlogPost', blogId) // Commit the mutation to filter the deleted post
    },
    async updatePost ({ commit, dispatch }, payload) {
      commit('filterBlogPost', payload) // Commit the mutation to filter the updated post
      await dispatch('getPost') // Fetch the updated list of posts
    }
  },
  modules: {
    // Additional modules can be added here
  }
})
