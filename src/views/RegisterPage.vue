<template>
    <div class="form-wrap">
      <form class="register">
        <p class="login-register" v-if="this.createAdmin !== 'create-admin'">
          Already have an account?
          <router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
        </p>
        <h2 v-if="this.createAdmin !== 'create-admin'">Create Your Account</h2>
        <h2 v-else>Create Admin Account</h2>
        <div class="inputs">
          <div class="input">
            <input type="text" placeholder="First Name" v-model="firstName" />
            <user class="icon" />
          </div>
          <div class="input">
            <input type="text" placeholder="Last Name" v-model="lastName" />
            <user class="icon" />
          </div>
          <div class="input">
            <input type="text" placeholder="Username" v-model="username" />
            <user class="icon" />
          </div>
          <div class="input">
            <input type="text" placeholder="Email" v-model="email" />
            <email class="icon" />
          </div>
          <div class="input">
            <input type="password" placeholder="Password" v-model="password" />
            <password class="icon" />
          </div>
          <div v-show="error" class="error">{{ this.errorMsg }}</div>
        </div>
        <button @click.prevent="register">{{this.createAdmin === 'create-admin' ? 'Create Account' : 'Sign Up'}}</button>
        <div class="angle"></div>
        <div class="h-angle"></div>
        <div class="angle2"></div>
      </form>
      <div class="background"></div>
    </div>
</template>

<script>
import email from '../assets/Icons/envelope-regular.svg'
import password from '../assets/Icons/lock-alt-solid.svg'
import user from '../assets/Icons/user-alt-light.svg'
import firebase from 'firebase/app'
import 'firebase/auth'
import db from '@/firebase/firebaseInit'

export default {
  name: 'RegisterPage',
  components: {
    email,
    password,
    user
  },
  data () {
    return {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      error: null,
      errorMsg: '',
      createAdmin: this.$route.path.split('/').slice(-1)[0]
    }
  },
  created () {
    if (this.createAdmin === 'create-admin' && !this.admin) {
      this.$router.push({ name: 'Home' })
    }
  },
  methods: {
    async register () {
      if (
        this.email !== '' &&
        this.password !== '' &&
        this.firstName !== '' &&
        this.lastName !== '' &&
        this.username !== ''
      ) {
        this.error = false
        this.errorMsg = ''
        const firebaseAuth = await firebase.auth()
        const createUser = await firebaseAuth.createUserWithEmailAndPassword(this.email, this.password)
        const result = await createUser
        const dataBase = db.collection('users').doc(result.user.uid)
        await dataBase.set({
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          email: this.email,
          admin: this.createAdmin === 'create-admin'
        })
        this.$router.push({ name: 'Home' })
        return
      }
      this.error = true
      this.errorMsg = 'Please fill out all the fields!'
    }
  },
  computed: {
    admin () {
      return this.$store.state.profileAdmin
    }
  }
}
</script>

<style lang="scss" scoped>
.register {
  h2 {
    max-width: 350px;
  }
}
</style>
