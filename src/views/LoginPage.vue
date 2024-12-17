<template>
    <div>
      <Loading v-if="loading" />
        <div class="form-wrap">
          <form class="login">
            <p class="login-register">
              Don't have an account?
              <router-link class="router-link" :to="{ name: 'Register' }">Register</router-link>
            </p>
            <h2>Login to Adarsh's Page</h2>
            <div class="inputs">
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
            <router-link class="forgot-password" :to="{ name: 'ForgotPassword' }">
                Forgot your password?
            </router-link>
            <button @click.prevent="signIn">Sign In</button>
            <div class="angle"></div>
            <div class="h-angle"></div>
            <div class="angle2"></div>
          </form>
          <div class="background"></div>
        </div>
    </div>
</template>

<style lang="scss">
.form-wrap {
  overflow: hidden;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-self: center;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 900px) {
    width: 100%;
  }

  .login-register {
    margin-bottom: 32px;

    .router-link {
      color: #000;
    }
  }

  form {
    padding: 0 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    @media (min-width: 900px) {
      padding: 0 50px;
    }

    h2 {
      text-align: center;
      font-size: 32px;
      color: #303030;
      margin-bottom: 40px;
      @media (min-width: 900px) {
        font-size: 40px;
      }
    }

    .inputs {
      width: 100%;
      max-width: 350px;

      .input {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 8px;
        input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 4px 4px 4px 30px;
          height: 50px;

          &:focus {
            outline: none;
          }
        }

        .icon {
          width: 12px;
          position: absolute;
          left: 6px;
        }
      }
    }

    .forgot-password {
      text-decoration: none;
      color: #000;
      cursor: pointer;
      font-size: 14px;
      margin: 16px 0 32px;
      border-bottom: 1px solid transparent;
      transition: 0.5s ease all;

      &:hover {
        border-color: #303030;
      }
    }

    .angle, .angle2, .h-angle {
      display: none;
      position: absolute;
      background-color: #fff;
      width: 60px;
      height: 101%;
      @media (min-width: 900px) {
        display: initial;
      }
      right: -230px;
      transform: rotateZ(15deg);
      border-radius: 30px 30px 0px 0px;

    }
    .angle2 {
      right: -440px;
      transform: rotateZ(-15deg);
    }
    .h-angle {
      right: -330px;
      transform: rotateZ(91deg);
      border-radius: 30px;
      height: 30%;
    }
  }

  .background {
    display: none;
    flex: 2;
    background-size: cover;
    background-image: url("@/assets/background.png");
    width: 100%;
    height: 100%;
    @media (min-width: 900px) {
      display: initial;
    }
  }
}

</style>

<script src="./js/login-page.js"></script>
