import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/HomePage.vue'
import Blogs from '../views/BlogPage.vue'
import Login from '../views/LoginPage.vue'
import Register from '../views/RegisterPage.vue'
import ForgotPassword from '../views/ForgotPassword.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home',
      requiresAuth: false
    }
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: Blogs,
    meta: {
      title: 'Blogs',
      requiresAuth: false
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login',
      requiresAuth: false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: 'Register',
      requiresAuth: false
    }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
    meta: {
      title: 'Forgot Password',
      requiresAuth: false
    }
  },
  {
    path: '/register/create-admin',
    name: 'RegisterAdmin',
    component: Register,
    meta: {
      title: 'Create Admin',
      requiresAuth: false
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Monu's Blog`
  next()
})

export default router
