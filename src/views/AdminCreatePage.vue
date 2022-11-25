<template>
    <div class="admin">
      <div class="container">
        <h2>Administration</h2>
        <div class="admin-info">
          <h2 v-if="createAdmin === 'create-admin'">Add Admin Access</h2>
          <h2 v-else>Remove Admin Access</h2>
          <div class="input">
            <input :placeholder="placeholderValue" type="text" id="addAdmins" v-model="adminEmail" :class="{'wrong-input': error}" />
          </div>
          <span>{{ this.functionMsg }}</span>
          <button @click="addAdmin" class="button">Submit</button>
        </div>
        <div v-show="error" class="error">{{ this.errorMsg }}</div>
      </div>
    </div>
  </template>

  <style lang="scss" scoped>
  .admin {
    .container {
      max-width: 1000px;
      padding: 60px 25px;

      h2 {
        text-align: center;
        margin-bottom: 16px;
        font-weight: 300;
        font-size: 32px;
      }

      .admin-info {
        border-radius: 8px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        padding: 32px;
        background-color: #f1f1f1;
        display: flex;
        flex-direction: column;
        max-width: 600px;
        margin: 32px auto;

        span {
          font-size: 14px;
        }

        .input {
          margin: 16px 0;

          label {
            font-size: 14px;
            display: block;
            padding-bottom: 6px;
          }
          input {
            width: 100%;
            border: none;
            background-color: #f2f7f6;
            padding: 8px;
            height: 50px;
            @media (min-width: 900px) {
            }

            &:focus {
              outline: none;
            }
          }
        }

        button {
          align-self: center;
        }
      }
    }
  }
  .wrong-input {
    border: 1px solid red !important;
  }
  </style>

<script src="./js/admin-create-page.js" ></script>
