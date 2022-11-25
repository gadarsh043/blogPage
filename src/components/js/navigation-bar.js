import menuIcon from '@/assets/Icons/bars-regular.svg'
import userIcon from '@/assets/Icons/user-alt-light.svg'
import adminIcon from '@/assets/Icons/user-crown-light.svg'
import signOutIcon from '@/assets/Icons/sign-out-alt-regular.svg'
import logOut from '@/assets/log-out.png'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'navigation',
  components: { menuIcon, userIcon, adminIcon, signOutIcon },
  data () {
    return {
      logOut,
      profileMenu: null,
      mobile: null,
      mobileNav: null,
      windowWidth: null,
      toolTip: null
    }
  },
  created () {
    window.addEventListener('resize', this.checkScreen)
    this.checkScreen()
  },
  methods: {
    checkScreen () {
      this.windowWidth = window.innerWidth
      if (this.windowWidth <= 750) {
        this.mobile = true
        return
      }
      this.mobile = false
      this.mobileNav = false
    },
    toggleMobileNav () {
      this.mobileNav = !this.mobileNav
    },
    toggleProfileMenu (e) {
      if (e.target === this.$refs.profile && this.admin) {
        this.profileMenu = !this.profileMenu
      }
    },
    signOut () {
      firebase.auth().signOut()
      window.location.reload()
    },
    clickedOutside () {
      this.profileMenu = false
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    admin () {
      return this.$store.state.profileAdmin
    }
  }
}
