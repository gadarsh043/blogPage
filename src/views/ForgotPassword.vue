<template>
    <div class="reset-password">
      <Modal v-if="modalActive" :modalMessage="modalMessage" @close-modal="closeModal" />
      <Loading v-if="loading" />
      <div class="form-wrap">
        <form class="reset">
          <p class="login-register">
            Back to
            <router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
          </p>
          <h2>Reset Password</h2>
          <p>Forgot your password? Enter your email to reset it</p>
          <div class="inputs">
            <div class="input">
              <input type="text" placeholder="Email" v-model="email" />
              <email class="icon" />
            </div>
          </div>
          <button @click.prevent="resetPassword">Reset</button>
          <div class="angle"></div>
          <div class="h-angle"></div>
          <div class="angle2"></div>
        </form>
        <div class="background"></div>
      </div>
    </div>
</template>

<style lang="scss" scoped>
.reset-password {
  position: relative;
  .form-wrap {
    .reset {
      h2 {
        margin-bottom: 8px;
      }
      p {
        text-align: center;
        margin-bottom: 32px;
      }
    }
  }
}
</style>

<script src="./js/forgot-password.js"></script>
