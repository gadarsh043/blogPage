
import firebaseDB from '@/firebase/firebaseInit'
export default {
  name: 'AdminCreatePage',
  data () {
    return {
      adminEmail: '',
      functionMsg: null,
      createAdmin: this.$route.path.split('/').slice(-1)[0],
      userId: '',
      userdata: {
        firstName: '',
        lastName: '',
        username: '',
        email: ''
      },
      error: null,
      errorMsg: ''
    }
  },
  watch: {
    'admin' (newVal) {
      if (newVal === false) {
        this.$router.push({ name: 'Home' })
      }
    }
  },
  methods: {
    async addAdmin () {
      if (
        this.adminEmail !== ''
      ) {
        this.error = false
        this.errorMsg = ''
        const docRef = await firebaseDB.collection('users').where('email', '==', this.adminEmail)
        docRef.get()
          .then((users) => {
            users.forEach((user) => {
              this.userId = user.id
              this.userdata = user.data()
            })
            const dataBase = firebaseDB.collection('users').doc(this.userId)
            dataBase.set({
              firstName: this.userdata.firstName,
              lastName: this.userdata.lastName,
              username: this.userdata.username,
              email: this.userdata.email,
              admin: this.createAdmin === 'create-admin'
            })
            this.$router.push({ name: 'Home' })
          })
          .catch(() => {
            this.error = true
            this.errorMsg = 'Please enter valid email'
          })
        return
      }
      this.error = true
      this.errorMsg = 'Please fill out all the fields!'
    }
  },
  computed: {
    placeholderValue () {
      if (this.createAdmin === 'create-admin') {
        return 'Enter user email to make them an admin'
      } else {
        return 'Enter user email to remove an admin'
      }
    },
    admin () {
      return this.$store.state.profileAdmin
    }
  }
}
