import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/HomePage.vue'
import Blogs from '../views/BlogPage.vue'
import Login from '../views/LoginPage.vue'
import Register from '../views/RegisterPage.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import Admin from '../views/AdminCreatePage.vue'
import CreatePost from '../views/CreatePost.vue'
import BlogPreview from '../views/BlogPreview.vue'
import ViewBlog from '../views/ViewBlog.vue'
import EditBlog from '../views/EditBlog.vue'
import ErrorPage from '../views/ErrorPage.vue'

Vue.use(VueRouter)

// Define routes for the application
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home', // Page title for SEO
      requiresAuth: false // No authentication required
    }
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: Blogs,
    meta: {
      title: 'Blogs', // Page title for SEO
      requiresAuth: false // No authentication required
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login', // Page title for SEO
      requiresAuth: false // No authentication required
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: 'Register', // Page title for SEO
      requiresAuth: false // No authentication required
    }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
    meta: {
      title: 'Forgot Password', // Page title for SEO
      requiresAuth: false // No authentication required
    }
  },
  {
    path: '/create-admin',
    name: 'CreateAdmin',
    component: Admin,
    meta: {
      title: 'Create Admin', // Page title for SEO
      requiresAuth: false // No authentication required
    }
  },
  {
    path: '/delete-admin',
    name: 'DeleteAdmin',
    component: Admin,
    meta: {
      title: 'Create Admin', // Page title for SEO (same component as CreateAdmin)
      requiresAuth: false // No authentication required
    }
  },
  {
    path: '/create-post',
    name: 'CreatePost',
    component: CreatePost,
    meta: {
      title: 'Create Post', // Page title for SEO
      requiresAuth: false // No authentication required
    }
  },
  {
    path: '/post-preview',
    name: 'BlogPreview',
    component: BlogPreview,
    meta: {
      title: 'Preview Blog Post', // Page title for SEO
      requiresAuth: true, // Authentication required
      requiresAdmin: true // Admin access required
    }
  },
  {
    path: '/view-blog/:blogid',
    name: 'ViewBlog',
    component: ViewBlog,
    meta: {
      title: 'View Blog Post', // Page title for SEO
      requiresAuth: false // No authentication required
    }
  },
  {
    path: '/edit-blog/:blogid',
    name: 'EditBlog',
    component: EditBlog,
    meta: {
      title: 'Edit Blog Post', // Page title for SEO
      requiresAuth: true, // Authentication required
      requiresAdmin: true // Admin access required
    }
  },
  {
    path: '/*', // Catch-all route for 404 errors
    name: '404 error',
    component: ErrorPage,
    meta: {
      title: 'Error Page', // Page title for SEO
      requiresAuth: false, // No authentication required
      requiresAdmin: false // No admin access required
    }
  }
]

const router = new VueRouter({
  mode: 'history', // Use HTML5 history mode for cleaner URLs
  base: process.env.BASE_URL, // Base URL from environment variables
  routes // Define routes
})

// Global navigation guard to set document title
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Monu's Blog` // Set the document title
  next() // Proceed to the route
})

export default router // Export the router instance
