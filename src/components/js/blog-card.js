
import Arrow from '@/assets/Icons/arrow-right-light.svg'
import Edit from '@/assets/Icons/edit-regular.svg'
import Delete from '@/assets/Icons/trash-regular.svg'
export default {
  name: 'blogCard',
  props: ['post'],
  components: {
    Arrow,
    Edit,
    Delete
  },
  methods: {
    deletePost () {
      this.$store.dispatch('deletePost', this.post.blogID)
    },
    editBlog () {
      this.$router.push({ name: 'EditBlog', params: { blogid: this.post.blogID } })
    }
  },
  computed: {
    editPost () {
      return this.$store.state.editPost
    }
  }
}
