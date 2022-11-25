<template>
    <div class="form-wrap">
      <form class="register">
        <p class="login-register">
          Already have an account?
          <router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
        </p>
        <h2>Create Your Account</h2>
        <div class="inputs">
          <div class="input">
            <input type="text" placeholder="First Name" v-model="firstName" />
            <user class="icon" />
          </div>
          <div class="input">
            <input type="text" placeholder="Last Name" v-model="lastName" />
            <user class="icon" />
          </div>
          <div class="input">
            <input type="text" placeholder="Username" v-model="username" />
            <user class="icon" />
          </div>
          <div class="input">
            <input type="text" placeholder="Email" v-model="email" />
            <email class="icon" />
          </div>
          <div class="input">
            <input type="password" placeholder="Password" v-model="password" />
            <password class="icon" />
          </div>
          <div v-show="error" class="error">{{ this.errorMsg }}</div>
        </div>
        <button @click.prevent="register">Sign Up</button>
        <div class="angle"></div>
        <div class="h-angle"></div>
        <div class="angle2"></div>
      </form>
      <div class="background"></div>
    </div>
</template>

<style lang="scss" scoped>
.register {
  h2 {
    max-width: 350px;
  }
}
</style>

<script src="./js/register-page.js"></script>
