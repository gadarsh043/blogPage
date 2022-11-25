<template>
    <div class="post-view">
      <div class="container quillWrapper">
        <button class="preview">
          <router-link :to="{name : 'CreatePost'}" class="back-to-create">
            Back to create <Arrow class="arrow arrow-light" />
          </router-link>
        </button>
        <br>
        <h2>{{ this.blogTitle }}</h2>
        <img :src="blogCoverPhoto" alt="" />
        <div class="post-content ql-editor" v-html="blogHTML"></div>
      </div>
    </div>
  </template>

<script>
import Arrow from '@/assets/Icons/arrow-right-light.svg'
export default {
  name: 'PostPreview',
  components: { Arrow },
  computed: {
    blogTitle () {
      return this.$store.state.blogTitle
    },
    blogHTML () {
      return this.$store.state.blogHTML
    },
    blogCoverPhoto () {
      return this.$store.state.blogPhotoFileURL
    }
  }
}
</script>

  <style lang="scss">
  .post-view {
    min-height: 100%;

    .container {
      max-width: 1000px;
      padding: 60px 25px;
    }

    .ql-editor {
      padding: 0;
    }

    h2 {
      margin-bottom: 16px;
      font-weight: 300;
      font-size: 32px;
    }

    img {
      width: 100%;
      margin-bottom: 32px;
    }
  }
  .back-to-create {
    color: white;
    text-decoration: none;
  }
  </style>
