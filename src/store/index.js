import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'
import db from '@/firebase/firebaseInit'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    blogPostsFeed: [
      {
        blogTitle: 'Welcome 2!',
        blogHTML: 'Weekly blog 2',
        blogCoverPhoto: 'beautiful-stories'
      },
      {
        blogTitle: 'Welcome 3!',
        blogHTML: 'Weekly blog 3',
        blogCoverPhoto: 'designed-for-everyone'
      }
    ],
    blogPostsCards: [
      {
        blogTitle: 'Blog Card #1',
        blogDate: 'Nov 17, 2023',
        blogCoverPhoto: 'stock-1'
      },
      {
        blogTitle: 'Blog Card #2',
        blogDate: 'Nov 17, 2023',
        blogCoverPhoto: 'stock-2'
      },
      {
        blogTitle: 'Blog Card #3',
        blogDate: 'Nov 17, 2023',
        blogCoverPhoto: 'stock-3'
      }
    ],
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
    blogPostsFeed: state => state.blogPostsFeed,
    blogPostsCards: state => state.blogPostsCards
  },
  mutations: {
    toggleEditPost (state, payload) {
      state.editPost = payload
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
    }
  },
  modules: {
  }
})
