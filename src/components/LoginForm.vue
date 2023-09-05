<template>
  <form @submit.prevent="submitForm">
    <div class="input-container">
      <label for="username">Username</label>
      <input type="text" id="username" v-model.trim="userInput.username" @focus="resetShowText" />
    </div>
    <div class="input-container">
      <label for="password">Password</label>
      <input type="password" id="password" v-model.trim="userInput.password" @focus="resetShowText" />
    </div>
    <button class="button">Login</button>
  </form>
  <p v-if="isLoggedIn">Please login with correct credentials!</p>
</template>

<script>
import { reactive, computed, ref } from 'vue';
import store from '@/store/index.js'

export default {
  setup() {
    const userInput = reactive({
      username: '',
      password: ''
    })
    const isLoggedIn = ref(false);

    const authData = computed(() => store.getters['auth/user'])
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

    const resetShowText = () => {
      isLoggedIn.value = false;
    }

    const loggedIn = () => {
      return isLoggedIn.value = true;
    }

    return {
      userInput,
      submitForm,
      loggedIn,
      isLoggedIn,
      authData,
      resetShowText
    }
  }
}
</script>

<style lang="scss" scoped>
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

  .button {
    border-radius: 5px;
    border: 1px solid #ccc;
    cursor: pointer;

    &:active,
    &:hover {
      background-color: rgb(195, 194, 194);
    }
  }
}

p {
  text-align: center;
  margin: 0;
  margin-top: 1rem;
  color: rgb(255, 59, 59);
}
</style>
