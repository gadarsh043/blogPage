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
      file: null, // Holds the selected file for upload
      error: null, // Error flag for file upload issues
      errorMsg: null, // Stores error messages for display
      loading: null, // Flag for indicating loading state
      editorSettings: {
        modules: {
          imageResize: {} // Settings for image resizing in the editor
        }
      }
    }
  },

  components: {
    BlogCoverPreview,
    Loading
  },

  watch: {
    // Redirect to home if user is not an admin
    'admin' (newVal) {
      if (newVal === false) {
        this.$router.push({ name: 'Home' })
      }
    }
  },

  methods: {
    // Handles file selection and stores file in Vuex
    fileChange () {
      this.file = this.$refs.blogPhoto.files[0]
      const fileName = this.file.name
      this.$store.commit('fileNameChange', fileName) // Store file name in Vuex
      this.$store.commit('storeFile', this.file) // Store the file object
      this.$store.commit('createFileURL', URL.createObjectURL(this.file)) // Generate file URL
    },

    // Opens blog cover photo preview
    openPreview () {
      this.$store.commit('openPhotoPreview')
    },

    // Uploads image and inserts the URL in the editor
    imageHandler (file, Editor, cursorLocation, resetUploader) {
      const storageRef = firebase.storage().ref()
      const docRef = storageRef.child(`documents/blogPostPhotos/${file.name}`)
      docRef.put(file).on(
        'state_changed',
        (snapshot) => {
          console.log(snapshot) // Logs file upload progress
        },
        (err) => {
          console.log(err) // Logs any errors during upload
        },
        async () => {
          const downloadURL = await docRef.getDownloadURL() // Get URL after upload
          Editor.insertEmbed(cursorLocation, 'image', downloadURL) // Insert image in editor
          resetUploader() // Reset uploader after completion
        }
      )
    },

    // Uploads blog post with cover photo and HTML content
    uploadBlog () {
      if (this.blogTitle.length !== 0 && this.blogHTML.length !== 0) {
        this.file = this.$store.state.blogCoverPhoto
        if (this.file) {
          this.loading = true // Set loading state
          const storageRef = firebase.storage().ref()
          const docRef = storageRef.child(`documents/BlogCoverPhotos/${this.$store.state.blogPhotoName}`)
          docRef.put(this.file).on(
            'state_changed',
            (snapshot) => {
              console.log(snapshot) // Logs upload progress
            },
            (err) => {
              console.log(err) // Logs error and stops loading
              this.loading = false
            },
            async () => {
              const downloadURL = await docRef.getDownloadURL() // Get cover photo URL
              const timestamp = await Date.now()
              const dataBase = await db.collection('blogPosts').doc() // Create new blog post doc
              await dataBase.set({
                blogID: dataBase.id,
                blogHTML: this.blogHTML,
                blogCoverPhoto: downloadURL, // Save cover photo URL
                blogCoverPhotoName: this.blogCoverPhotoName,
                blogTitle: this.blogTitle,
                profileId: this.profileId,
                date: timestamp
              })
              await this.$store.dispatch('getPost') // Fetch new posts from Vuex
              this.loading = false // Stop loading after success
              this.$router.push({ name: 'ViewBlog', params: { blogid: dataBase.id } }) // Redirect to new blog post
            }
          )
          return
        }
        this.error = true
        this.errorMsg = 'Please ensure you uploaded a cover photo!' // Display error if no cover photo
        setTimeout(() => {
          this.error = false
        }, 5000)
        return
      }
      this.error = true
      this.errorMsg = 'Please ensure Blog Title & Blog Post has been filled!' // Error for missing title or content
      setTimeout(() => {
        this.error = false
      }, 5000)
    }
  },

  computed: {
    // Fetches the profile ID from Vuex
    profileId () {
      return this.$store.state.profileId
    },

    // Fetches blog cover photo name from Vuex
    blogCoverPhotoName () {
      return this.$store.state.blogPhotoName
    },

    // Getter and setter for blog title
    blogTitle: {
      get () {
        return this.$store.state.blogTitle
      },
      set (payload) {
        this.$store.commit('updateBlogTitle', payload) // Update blog title in Vuex
      }
    },

    // Getter and setter for blog HTML content
    blogHTML: {
      get () {
        return this.$store.state.blogHTML
      },
      set (payload) {
        this.$store.commit('newBlogPost', payload) // Update blog HTML content in Vuex
      }
    },

    // Checks if user is an admin
    admin () {
      return this.$store.state.profileAdmin
    }
  }
}
