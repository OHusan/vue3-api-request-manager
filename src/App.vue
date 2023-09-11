<template>
  <div class="wrapper">
    <header-page :showPage="showPage"></header-page>
    <login-form v-if="!showPage"></login-form>
  </div>
  <router-view v-if="showPage"></router-view>
</template>

<script>
import { computed, ref, watchEffect } from 'vue';

import HeaderPage from './pages/HeaderPage.vue';
import LoginForm from './components/login/LoginForm.vue';

import store from '@/store/index.js'

export default {
  components: {
    HeaderPage,
    LoginForm,
  },
  setup() {
    const showApiManager = ref(false)

    const permission = computed(() => store.getters['auth/permission'])
    const storedToken = ref(JSON.parse(localStorage.getItem('permission')))

    const showPage = computed(() => {
      return (permission.value || storedToken.value)
    })

    watchEffect(() => {
      console.log(showPage.value, 'text');
    })

    return {
      permission,
      showApiManager,
      showPage,
      storedToken
    }
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

body {
  margin: 0;
}

.wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #15769b;

  .container {
    padding: 0.5rem 2rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
