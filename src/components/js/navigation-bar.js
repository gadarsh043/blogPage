import menuIcon from '@/assets/Icons/bars-regular.svg'

export default {
  name: 'navigation',
  components: { menuIcon },
  data () {
    return {
      mobile: null,
      mobileNav: null,
      windowWidth: null
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
    }
  }
}
