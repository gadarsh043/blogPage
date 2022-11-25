import Arrow from '@/assets/Icons/arrow-right-light.svg'
export default {
  name: 'blogPost',
  props: ['post'],
  components: {
    Arrow
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  }
}
