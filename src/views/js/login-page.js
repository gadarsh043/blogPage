
import email from '@/assets/Icons/envelope-regular.svg'
import password from '@/assets/Icons/lock-alt-solid.svg'
import Loading from '@/components/LoadingPage'
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
  name: 'LoginPage',
  components: {
    email,
    password,
    Loading
  },
  data () {
    return {
      email: '',
      password: '',
      error: null,
      errorMsg: '',
      loading: null
    }
  },
  methods: {
    signIn () {
      this.loading = true
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push({ name: 'Home' })
          this.error = false
          this.errorMsg = ''
          this.loading = false
        })
        .catch((err) => {
          this.error = true
          this.errorMsg = err.message
          this.loading = false
        })
    }
  }
}
