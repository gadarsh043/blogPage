import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vue2Editor from 'vue2-editor'
import firebase from 'firebase/app'
import 'firebase/auth'
import vClickOutside from 'v-click-outside'

// Register vClickOutside directive for handling clicks outside an element
Vue.use(vClickOutside)

// Register Vue2Editor for rich text editing functionality
Vue.use(Vue2Editor)

// Disable Vue production tip message
Vue.config.productionTip = false

let app

// Watch for authentication state changes
firebase.auth().onAuthStateChanged(() => {
  // Initialize the Vue app only if it hasn't been created yet
  if (!app) {
    new Vue({
      router, // Inject router for navigation
      store, // Inject Vuex store for state management
      render: (h) => h(App) // Render the root component
    }).$mount('#app') // Mount the app to the element with id 'app'
  }
})
