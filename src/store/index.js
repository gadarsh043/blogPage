import Vue from 'vue'
import Vuex from 'vuex'

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
    user: null
  },
  getters: {
    blogPostsFeed: state => state.blogPostsFeed,
    blogPostsCards: state => state.blogPostsCards
  },
  mutations: {
    toggleEditPost (state, payload) {
      state.editPost = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
