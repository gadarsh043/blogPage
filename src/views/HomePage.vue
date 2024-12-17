<template>
  <div>
    <div class="home">
      <BlogPost v-if="!user" :post="welcomeScreen" />
      <BlogPost :post="post" v-for="post in blogPostsFeed" :key="post.id" />
    </div>
    <div class="blog-card-wrap">
      <div class="container">
        <h3>View More Recent Pages</h3>
        <div class="blog-cards">
          <BlogCard :post="post" v-for="(post, index) in blogPostsCards" :key="index" />
        </div>
      </div>
    </div>
    <div v-if="!user" class="updates">
      <div class="container">
        <h2>Never miss my update!</h2>
        <router-link class="router-button" :to="{ name: 'Login' }"> Register to <span class="bold">"Adarsh's Page"</span> <Arrow class="arrow arrow-light" /> </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.blog-card-wrap {
  h3 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
  }
}

.updates {
  .container {
    padding: 100px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: 800px) {
      padding: 125px 25px;
      flex-direction: row;
    }

    .router-button {
      display: flex;
      font-size: 14px;
      text-decoration: none;
      @media (min-width: 800px) {
        margin-left: auto;
      }
    }

    h2 {
      font-weight: 300;
      font-size: 32px;
      max-width: 425px;
      width: 100%;
      text-align: center;
      text-transform: uppercase;
      @media (min-width: 800px) {
        text-align: initial;
        font-size: 40px;
      }
    }
  }
}
.bold {
  font-weight: 600;
  padding-left: 5px;
}
</style>

<script src="./js/home-page.js"></script>
