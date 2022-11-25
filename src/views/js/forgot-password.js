
import email from '@/assets/Icons/envelope-regular.svg'
import Modal from '@/components/ModalDiv'
import Loading from '@/components/LoadingPage'
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
  name: 'ForgotPassword',
  data () {
    return {
      email: '',
      modalActive: false,
      modalMessage: '',
      loading: null
    }
  },
  components: {
    email,
    Modal,
    Loading
  },
  methods: {
    resetPassword () {
      this.loading = true
      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(() => {
          this.modalMessage = 'If your account exists, you will receive a email'
          this.loading = false
          this.modalActive = true
        })
        .catch((err) => {
          this.modalMessage = err.message
          this.loading = false
          this.modalActive = true
        })
    },
    closeModal () {
      this.modalActive = !this.modalActive
      this.email = ''
    }
  }
}
