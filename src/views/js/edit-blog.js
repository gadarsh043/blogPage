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
      file: null, // Holds the selected file for blog cover photo
      error: null, // Flag to track errors
      errorMsg: null, // Error message for display
      loading: null, // Flag for loading state
      routeID: null, // Holds the ID of the blog post from the route
      currentBlog: null, // Stores the current blog post data
      editorSettings: {
        modules: {
          imageResize: {} // Settings for image resizing in Quill editor
        }
      }
    }
  },

  components: {
    BlogCoverPreview, // Blog cover preview component
    Loading // Loading indicator component
  },

  async mounted () {
    // Fetch the route ID and set the current blog post based on that ID
    this.routeID = this.$route.params.blogid
    this.currentBlog = await this.$store.state.blogPosts.filter((post) => {
      return post.blogID === this.routeID
    })
    // Commit the current blog post to the Vuex store
    this.$store.commit('setBlogState', this.currentBlog[0])
  },

  watch: {
    // Watch for changes in 'admin' and redirect to Home if user is no longer an admin
    'admin' (newVal, oldVal) {
      if (newVal === false) {
        this.$router.push({ name: 'Home' })
      }
    }
  },

  methods: {
    // Handles file change when a new blog cover photo is selected
    fileChange () {
      this.file = this.$refs.blogPhoto.files[0] // Get the selected file
      const fileName = this.file.name // Get the file name
      this.$store.commit('fileNameChange', fileName) // Commit file name to Vuex
      this.$store.commit('createFileURL', URL.createObjectURL(this.file)) // Create file preview URL
    },

    // Open the photo preview modal
    openPreview () {
      this.$store.commit('openPhotoPreview')
    },

    // Handles image uploads within the Quill editor
    imageHandler (file, Editor, cursorLocation, resetUploader) {
      const storageRef = firebase.storage().ref()
      const docRef = storageRef.child(`documents/blogPostPhotos/${file.name}`)
      docRef.put(file).on(
        'state_changed',
        (snapshot) => {
          console.log(snapshot) // Log upload progress
        },
        (err) => {
          console.log(err) // Log errors
        },
        async () => {
          const downloadURL = await docRef.getDownloadURL() // Get the image URL
          Editor.insertEmbed(cursorLocation, 'image', downloadURL) // Insert image in the editor
          resetUploader() // Reset uploader state
        }
      )
    },

    // Method to update an existing blog post
    async updateBlog () {
      const dataBase = await db.collection('blogPosts').doc(this.routeID) // Get the blog post doc
      if (this.blogTitle.length !== 0 && this.blogHTML.length !== 0) {
        if (this.file) {
          this.loading = true // Set loading state
          const storageRef = firebase.storage().ref()
          const docRef = storageRef.child(`documents/BlogCoverPhotos/${this.$store.state.blogPhotoName}`)
          docRef.put(this.file).on(
            'state_changed',
            (snapshot) => {
              console.log(snapshot) // Log file upload progress
            },
            (err) => {
              console.log(err) // Log error
              this.loading = false
            },
            async () => {
              const downloadURL = await docRef.getDownloadURL() // Get the uploaded photo URL

              // Update the blog post with new HTML, cover photo, and title
              await dataBase.update({
                blogHTML: this.blogHTML,
                blogCoverPhoto: downloadURL,
                blogCoverPhotoName: this.blogCoverPhotoName,
                blogTitle: this.blogTitle
              })
              await this.$store.dispatch('updatePost', this.routeID) // Dispatch Vuex action to update blog post
              this.loading = false // Reset loading state
              this.$router.push({ name: 'ViewBlog', params: { blogid: dataBase.id } }) // Redirect to view the blog post
            }
          )
          return
        }

        // If no file selected, update only the HTML and title
        this.loading = true
        await dataBase.update({
          blogHTML: this.blogHTML,
          blogTitle: this.blogTitle
        })
        await this.$store.dispatch('updatePost', this.routeID) // Dispatch Vuex action to update post
        this.loading = false // Reset loading state
        this.$router.push({ name: 'ViewBlog', params: { blogid: dataBase.id } }) // Redirect to blog view
        return
      }

      // Display error if the blog title or content is empty
      this.error = true
      this.errorMsg = 'Please ensure Blog Title & Blog Post has been filled!'
      setTimeout(() => {
        this.error = false // Clear error after 5 seconds
      }, 5000)
    }
  },

  computed: {
    profileId () {
      return this.$store.state.profileId // Get the profile ID from Vuex
    },
    blogCoverPhotoName () {
      return this.$store.state.blogPhotoName // Get the cover photo name from Vuex
    },
    blogTitle: {
      get () {
        return this.$store.state.blogTitle // Get the blog title from Vuex
      },
      set (payload) {
        this.$store.commit('updateBlogTitle', payload) // Commit blog title changes to Vuex
      }
    },
    blogHTML: {
      get () {
        return this.$store.state.blogHTML // Get the blog HTML content from Vuex
      },
      set (payload) {
        this.$store.commit('newBlogPost', payload) // Commit blog content changes to Vuex
      }
    },
    admin () {
      return this.$store.state.profileAdmin // Check if the user is an admin
    }
  }
}
