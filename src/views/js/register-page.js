
import email from '@/assets/Icons/envelope-regular.svg'
import password from '@/assets/Icons/lock-alt-solid.svg'
import user from '@/assets/Icons/user-alt-light.svg'
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
      errorMsg: ''
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
        await firebaseAuth
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((details) => {
            const result = details
            const dataBase = db.collection('users').doc(result.user.uid)
            dataBase.set({
              firstName: this.firstName,
              lastName: this.lastName,
              username: this.username,
              email: this.email,
              admin: false
            })
            this.$router.push({ name: 'Home' })
          })
          .catch((err) => {
            this.error = true
            this.errorMsg = err.message
          })
        return
      }
      this.error = true
      this.errorMsg = 'Please fill out all the fields!'
    }
  }
}
