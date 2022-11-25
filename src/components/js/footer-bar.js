
import youTube from '@/assets/Icons/youtube-brands.svg'
import twitter from '@/assets/Icons/twitter-brands.svg'
import instagram from '@/assets/Icons/instagram-brands.svg'
import linkedin from '@/assets/Icons/linkedin-brands.svg'
export default {
  name: 'footer-vue',
  components: {
    youTube,
    twitter,
    instagram,
    linkedin
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
