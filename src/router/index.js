import Vue from 'vue'
import VueRouter from 'vue-router'
import Demo from '../views/DemoPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Demo',
    component: Demo
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
