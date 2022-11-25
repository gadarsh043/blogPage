import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'
import db from '@/firebase/firebaseInit'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    blogPosts: [],
    postLoaded: null,
    blogHTML: 'Write your thoughts here...',
    blogTitle: '',
    blogPhotoName: '',
    blogCoverPhoto: null,
    blogPhotoFileURL: null,
    blogPhotoPreview: null,
    editPost: null,
    user: null,
    profileAdmin: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null
  },
  getters: {
    blogPostsFeed (state) {
      return state.blogPosts.slice(0, 2)
    },
    blogPostsCards (state) {
      return state.blogPosts.slice(2, 6)
    }
  },
  mutations: {
    newBlogPost (state, payload) {
      state.blogHTML = payload
    },
    updateBlogTitle (state, payload) {
      state.blogTitle = payload
    },
    fileNameChange (state, payload) {
      state.blogPhotoName = payload
    },
    storeFile (state, payload) {
      state.blogCoverPhoto = payload
    },
    createFileURL (state, payload) {
      state.blogPhotoFileURL = payload
    },
    openPhotoPreview (state) {
      state.blogPhotoPreview = !state.blogPhotoPreview
    },
    toggleEditPost (state, payload) {
      state.editPost = payload
    },
    setBlogState (state, payload) {
      state.blogTitle = payload.blogTitle
      state.blogHTML = payload.blogHTML
      state.blogPhotoFileURL = payload.blogCoverPhoto
      state.blogPhotoName = payload.blogCoverPhotoName
    },
    filterBlogPost (state, payload) {
      state.blogPosts = state.blogPosts.filter((post) => post.blogID !== payload)
    },
    updateUser (state, payload) {
      state.user = payload
    },
    setProfileInfo (state, doc) {
      state.profileId = doc.id
      state.profileEmail = doc.data().email
      state.profileFirstName = doc.data().firstName
      state.profileLastName = doc.data().lastName
      state.profileUsername = doc.data().username
      state.profileAdmin = doc.data().admin
    },
    setProfileInitials (state) {
      state.profileInitials = state.profileFirstName.match(/(\b\S)?/g).join('') + state.profileLastName.match(/(\b\S)?/g).join('')
    }
  },
  actions: {
    async getCurrentUser ({ commit }) {
      const dataBase = await db.collection('users').doc(firebase.auth().currentUser.uid)
      const dbResults = await dataBase.get()
      commit('setProfileInfo', dbResults)
      commit('setProfileInitials')
    },
    async getPost ({ state }) {
      const dataBase = await db.collection('blogPosts').orderBy('date', 'desc')
      const dbResults = await dataBase.get()
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
          state.blogPosts.push(data)
        }
      })
      state.postLoaded = true
    },
    async deletePost ({ commit }, blogId) {
      const getPost = await db.collection('blogPosts').doc(blogId)
      await getPost.delete()
      commit('filterBlogPost', blogId)
    },
    async updatePost ({ commit, dispatch }, payload) {
      commit('filterBlogPost', payload)
      await dispatch('getPost')
    }
  },
  modules: {
  }
})
