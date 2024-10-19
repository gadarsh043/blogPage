import firebaseDB from '@/firebase/firebaseInit'

export default {
  name: 'AdminCreatePage',
  data () {
    return {
      adminEmail: '', // Holds the email input for admin creation/removal
      functionMsg: null, // Message indicating the outcome of the function
      createAdmin: this.$route.path.split('/').slice(-1)[0], // Get action type (create-admin/remove-admin) from route
      userId: '', // Stores the user ID fetched from the database
      userdata: { // Object to store user data fetched from the database
        firstName: '',
        lastName: '',
        username: '',
        email: ''
      },
      error: null, // Error state flag
      errorMsg: '' // Message to display in case of an error
    }
  },
  watch: {
    // Redirect to Home if admin flag is set to false
    'admin' (newVal) {
      if (newVal === false) {
        this.$router.push({ name: 'Home' })
      }
    }
  },
  methods: {
    // Adds or removes admin based on the action from the route
    async addAdmin () {
      // Check if admin email is provided
      if (this.adminEmail !== '') {
        this.error = false
        this.errorMsg = ''

        // Query the 'users' collection for the provided email
        const docRef = await firebaseDB.collection('users').where('email', '==', this.adminEmail)
        docRef.get()
          .then((users) => {
            // Iterate through the users and get the first match
            users.forEach((user) => {
              this.userId = user.id // Save the user ID
              this.userdata = user.data() // Save the user data
            })
            const dataBase = firebaseDB.collection('users').doc(this.userId)

            // Update user data to set or remove admin privileges
            dataBase.set({
              firstName: this.userdata.firstName,
              lastName: this.userdata.lastName,
              username: this.userdata.username,
              email: this.userdata.email,
              admin: this.createAdmin === 'create-admin' // Set admin flag based on action type
            })

            // Redirect to the home page after updating
            this.$router.push({ name: 'Home' })
          })
          .catch(() => {
            // Handle error if no user found or query fails
            this.error = true
            this.errorMsg = 'Please enter a valid email'
          })
        return
      }

      // Handle case when admin email field is empty
      this.error = true
      this.errorMsg = 'Please fill out all the fields!'
    }
  },
  computed: {
    // Computed property for the placeholder text in the email input field
    placeholderValue () {
      // Return different placeholder text based on action type
      if (this.createAdmin === 'create-admin') {
        return 'Enter user email to make them an admin'
      } else {
        return 'Enter user email to remove an admin'
      }
    },
    // Computed property to check if current user is an admin
    admin () {
      return this.$store.state.profileAdmin
    }
  }
}
