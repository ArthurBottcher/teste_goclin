import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Registration from '../views/Registration.vue'
import Home from '../views/Homepage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path:'/register',
    name: 'Registration',
    component: Registration
  },
  {
    path:'/home',
    name: 'Home',
    component: Home
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
