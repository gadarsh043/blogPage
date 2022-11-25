import BlogCoverPreview from '@/components/BlogCoverPreview'
import Loading from '@/components/LoadingPage'
import firebase from 'firebase/app'
import 'firebase/storage'
import db from '@/firebase/firebaseInit'
import Quill from 'quill'
window.Quill = Quill
const ImageResize = require('quill-image-resize-module').default
Quill.register('modules/imageResize', ImageResize)
export default {
  name: 'CreatePost',
  data () {
    return {
      file: null,
      error: null,
      errorMsg: null,
      loading: null,
      editorSettings: {
        modules: {
          imageResize: {}
        }
      }
    }
  },
  components: {
    BlogCoverPreview,
    Loading
  },
  watch: {
    'admin' (newVal) {
      if (newVal === false) {
        this.$router.push({ name: 'Home' })
      }
    }
  },
  methods: {
    fileChange () {
      this.file = this.$refs.blogPhoto.files[0]
      const fileName = this.file.name
      this.$store.commit('fileNameChange', fileName)
      this.$store.commit('storeFile', this.file)
      this.$store.commit('createFileURL', URL.createObjectURL(this.file))
    },
    openPreview () {
      this.$store.commit('openPhotoPreview')
    },
    imageHandler (file, Editor, cursorLocation, resetUploader) {
      const storageRef = firebase.storage().ref()
      const docRef = storageRef.child(`documents/blogPostPhotos/${file.name}`)
      docRef.put(file).on(
        'state_changed',
        (snapshot) => {
          console.log(snapshot)
        },
        (err) => {
          console.log(err)
        },
        async () => {
          const downloadURL = await docRef.getDownloadURL()
          Editor.insertEmbed(cursorLocation, 'image', downloadURL)
          resetUploader()
        }
      )
    },
    uploadBlog () {
      if (this.blogTitle.length !== 0 && this.blogHTML.length !== 0) {
        this.file = this.$store.state.blogCoverPhoto
        if (this.file) {
          this.loading = true
          const storageRef = firebase.storage().ref()
          const docRef = storageRef.child(`documents/BlogCoverPhotos/${this.$store.state.blogPhotoName}`)
          docRef.put(this.file).on(
            'state_changed',
            (snapshot) => {
              console.log(snapshot)
            },
            (err) => {
              console.log(err)
              this.loading = false
            },
            async () => {
              const downloadURL = await docRef.getDownloadURL()
              const timestamp = await Date.now()
              const dataBase = await db.collection('blogPosts').doc()
              await dataBase.set({
                blogID: dataBase.id,
                blogHTML: this.blogHTML,
                blogCoverPhoto: downloadURL,
                blogCoverPhotoName: this.blogCoverPhotoName,
                blogTitle: this.blogTitle,
                profileId: this.profileId,
                date: timestamp
              })
              await this.$store.dispatch('getPost')
              this.loading = false
              this.$router.push({ name: 'ViewBlog', params: { blogid: dataBase.id } })
            }
          )
          return
        }
        this.error = true
        this.errorMsg = 'Please ensure you uploaded a cover photo!'
        setTimeout(() => {
          this.error = false
        }, 5000)
        return
      }
      this.error = true
      this.errorMsg = 'Please ensure Blog Title & Blog Post has been filled!'
      setTimeout(() => {
        this.error = false
      }, 5000)
    }
  },
  computed: {
    profileId () {
      return this.$store.state.profileId
    },
    blogCoverPhotoName () {
      return this.$store.state.blogPhotoName
    },
    blogTitle: {
      get () {
        return this.$store.state.blogTitle
      },
      set (payload) {
        this.$store.commit('updateBlogTitle', payload)
      }
    },
    blogHTML: {
      get () {
        return this.$store.state.blogHTML
      },
      set (payload) {
        this.$store.commit('newBlogPost', payload)
      }
    },
    admin () {
      return this.$store.state.profileAdmin
    }
  }
}
