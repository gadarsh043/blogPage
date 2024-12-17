<template>
  <header>
    <nav class="container">
      <div class="branding">
        <router-link class="header" :to="{ name : 'Home' }">Adarsh's Page</router-link>
      </div>
      <div class="nav-links">
        <ul v-show="!mobile">
          <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
          <router-link class="link" :to="{ name: 'Blogs' }">Blogs</router-link>
          <a v-if="admin" class="link" :href="$router.resolve({name: 'CreatePost'}).href"> Create Post </a>
          <router-link v-if="!user" class="link" :to="{ name: 'Login' }">Login/Register</router-link>
        </ul>
        <div v-if="user && admin !== null" :class="{ 'mobile-user-menu': mobile, 'no-admin': !admin }" @click="admin ? toggleProfileMenu($event) : signOut()" class="profile" ref="profile" v-click-outside="clickedOutside" @mouseover="toolTip = true" @mouseleave="toolTip = false">
          <span v-if="admin">{{ this.$store.state.profileInitials }}</span>
          <span v-else class="logout">
            <img :src="logOut" alt="LogOut" class="logout-img">
          </span>
          <div v-show="profileMenu" class="profile-menu">
            <div class="info">
              <p class="initials">{{ this.$store.state.profileInitials }}</p>
              <div class="right">
                <p>{{ this.$store.state.profileFirstName }} {{ this.$store.state.profileLastName }}</p>
                <p>{{ this.$store.state.profileUsername }}</p>
                <p>{{ this.$store.state.profileEmail }}</p>
              </div>
            </div>
            <div class="options">
              <div v-if="admin" class="option">
                <a class="option" :href="$router.resolve({name: 'CreateAdmin'}).href">
                  <adminIcon class="icon" />
                  <p>Create Admin</p>
                </a>
              </div>
              <div v-if="admin" class="option">
                <a class="option" :href="$router.resolve({name: 'DeleteAdmin'}).href">
                  <adminIcon class="icon" />
                  <p>Delete Admin</p>
                </a>
              </div>
              <div @click="signOut" class="option">
                <signOutIcon class="icon" />
                <p>Sign Out</p>
              </div>
            </div>
          </div>
          <div v-show="toolTip && !mobile" class="tooltip" :class="{'tooltip-hover': profileMenu}">{{admin ? 'Profile': 'Logout'}}</div>
        </div>
      </div>
    </nav>
    <menuIcon class="menu-icon" @click="toggleMobileNav" v-show="mobile" />
    <transition name="mobile-nav" v-click-outside="clickedOutside">
      <ul class="mobile-nav" v-show="mobileNav">
        <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
        <router-link class="link" :to="{ name: 'Blogs' }">Blogs</router-link>
        <a v-if="admin" class="link" :href="$router.resolve({name: 'CreatePost'}).href"> Create Post </a>
        <router-link v-if="!user" class="link" :to="{ name: 'Login' }">Login/Register</router-link>
      </ul>
    </transition>
  </header>
</template>

<style lang="scss" scoped>
header {
  background-color: #fff;
  padding: 0 25px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 99;

  .link {
    font-weight: 500;
    padding: 0 8px;
    transition: 0.3s color ease;

    &:hover {
      color: #1eb8b8;
    }
  }

  nav {
    display: flex;
    padding: 25px 0;

    .branding {
      display: flex;
      align-items: center;

      .header {
        font-weight: 600;
        font-size: 24px;
        color: #000;
        text-decoration: none;
      }
    }

    .nav-links {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: flex-end;

      ul {
        margin-right: 32px;

        .link {
          margin-right: 32px;
        }

        .link:last-child {
          margin-right: 0;
        }
      }

      .profile, .no-admin {
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        color: #fff;
        background-color: #303030;

        span {
          pointer-events: none;
        }

        .profile-menu {
          position: absolute;
          top: 60px;
          right: 0;
          width: 250px;
          background-color: #303030;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

          .info {
            display: flex;
            align-items: center;
            padding: 15px;
            border-bottom: 1px solid #fff;

            .initials {
              position: initial;
              width: 40px;
              height: 40px;
              background-color: #fff;
              color: #303030;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
            }

            .right {
              flex: 1;
              margin-left: 24px;

              p:nth-child(1) {
                font-size: 14px;
              }

              p:nth-child(2),
              p:nth-child(3) {
                font-size: 12px;
              }
            }
          }

          .options {
            padding: 15px;
            .option {
              text-decoration: none;
              color: #fff;
              display: flex;
              align-items: center;
              margin-bottom: 12px;

              .icon {
                width: 18px;
                height: auto;
              }
              p {
                font-size: 14px;
                margin-left: 12px;
              }

              &:last-child {
                margin-bottom: 0px;
              }
            }
          }
        }
      }
      .no-admin {
        background-color: white;
        .logout {
          display: flex;
          justify-content: center;
          align-items: center;
          &-img {
            width: 80%;
            height: 80%;
          }
        }
      }
    }

    .mobile-user-menu {
      margin-right: 40px;
    }
  }

  .menu-icon {
    cursor: pointer;
    position: absolute;
    top: 32px;
    right: 25px;
    height: 25px;
    width: auto;
  }

  .mobile-nav {
    padding: 20px;
    width: 70%;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100%;
    background-color: #303030;
    top: 0;
    left: 0;

    .link {
      padding: 15px 0;
      color: #fff;
    }
  }

  .mobile-nav-enter-active,
  .mobile-nav-leave-active {
    transition: all 1s ease;
  }

  .mobile-nav-enter {
    transform: translateX(-250px);
  }

  .mobile-nav-enter-to {
    transform: translateX(0);
  }

  .mobile-nav-leave-to {
    transform: translateX(-250px);
  }
}
.tooltip {
  display: flex;
  position: absolute;
  top: 40px;
  right: 35px;
  width: 55px;
  justify-content: center;
  background-color: white;
  color: #303030;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%);
  border-radius: 5px;
  border: 1px solid #303030;
  &-hover {
    top: 65px;
    color: white;
    z-index: 100;
    right: 9px;
    background-color: #303030;
    border: 1px solid white;
  }
}
</style>

<script src="./js/navigation-bar.js"></script>
