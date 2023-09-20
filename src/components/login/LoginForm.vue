<template>
  <div class="wrapper">
    <form @submit.prevent="submitForm">
      <div class="input-container">
        <label for="username">Username</label>
        <input type="text" id="username" v-model.trim="userInput.username" @focus="resetShowText" />
      </div>
      <div class="input-container">
        <label for="password">Password</label>
        <input type="password" id="password" v-model.trim="userInput.password" @focus="resetShowText" />
      </div>
      <base-button styleOf>Login</base-button>
    </form>
    <p v-if="isLoggedIn">Please login with correct credentials!</p>
  </div>
</template>

<script lang="ts">
import { reactive, computed, ref } from 'vue';
import store from '@/store/index'

interface userTypes {
  username: string,
  password: string,
}

export default {
  setup() {
    const userInput = reactive<userTypes>({
      username: '',
      password: ''
    })
    const isLoggedIn = ref(false);

    // const authData = computed(() => store.getters['auth/user'])
    const permission = computed(() => store.getters['auth/permission'])

    const submitForm = () => {
      if (userInput.username === '' && userInput.password === '') {
        loggedIn();
      } else {
        store.dispatch('auth/loginValidate', userInput);
        if (!permission.value) {
          loggedIn();
        } else {
          localStorage.setItem('permission', JSON.stringify(permission.value))
          userInput.username = '';
          userInput.password = '';
        }
      }
    }

    const loggedIn = () => {
      return isLoggedIn.value = true;
    }

    const resetShowText = () => {
      isLoggedIn.value = false;
    }

    return {
      userInput,
      submitForm,
      loggedIn,
      isLoggedIn,
      // authData,
      resetShowText
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 0.5rem 2rem;

  form {
    display: flex;
    flex-direction: row;
    gap: 10px;

    .input-container {
      label {
        margin: 0 10px;
        color: white;
      }

      input {
        border-radius: 5px;
        border: 1px solid #ccc;
      }
    }
  }

  p {
    display: block;
    text-align: center;
    margin: 0;
    margin-top: 1rem;
    color: rgb(255, 59, 59);
  }
}
</style>
