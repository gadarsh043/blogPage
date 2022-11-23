<template>
    <div class="admin">
      <div class="container">
        <h2>Administration</h2>
        <div class="admin-info">
          <h2 v-if="createAdmin === 'create-admin'">Add Admin Access</h2>
          <h2 v-else>Remove Admin Access</h2>
          <div class="input">
            <input :placeholder="placeholderValue" type="text" id="addAdmins" v-model="adminEmail" :class="{'wrong-input': error}" />
          </div>
          <span>{{ this.functionMsg }}</span>
          <button @click="addAdmin" class="button">Submit</button>
        </div>
        <div v-show="error" class="error">{{ this.errorMsg }}</div>
      </div>
    </div>
  </template>

<script>
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
</script>

  <style lang="scss" scoped>
  .admin {
    .container {
      max-width: 1000px;
      padding: 60px 25px;

      h2 {
        text-align: center;
        margin-bottom: 16px;
        font-weight: 300;
        font-size: 32px;
      }

      .admin-info {
        border-radius: 8px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        padding: 32px;
        background-color: #f1f1f1;
        display: flex;
        flex-direction: column;
        max-width: 600px;
        margin: 32px auto;

        span {
          font-size: 14px;
        }

        .input {
          margin: 16px 0;

          label {
            font-size: 14px;
            display: block;
            padding-bottom: 6px;
          }
          input {
            width: 100%;
            border: none;
            background-color: #f2f7f6;
            padding: 8px;
            height: 50px;
            @media (min-width: 900px) {
            }

            &:focus {
              outline: none;
            }
          }
        }

        button {
          align-self: center;
        }
      }
    }
  }
  .wrong-input {
    border: 1px solid red !important;
  }
  </style>
