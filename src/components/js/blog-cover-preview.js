
import close from '@/assets/Icons/times-circle-light.svg'
export default {
  components: {
    close
  },
  methods: {
    closePreview () {
      this.$store.commit('openPhotoPreview')
    }
  },
  computed: {
    blogCoverPhoto () {
      return this.$store.state.blogPhotoFileURL
    }
  }
}
