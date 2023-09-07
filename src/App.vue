<template>
  <div class="wrapper">
    <page-header></page-header>
    <login-form></login-form>
  </div>
  <api-manager v-if="showPage"></api-manager>
  <hr>
  <data-changer></data-changer>
</template>

<script>
import { computed, ref } from 'vue';

import PageHeader from './components/PageHeader.vue';
import ApiManager from './components/ApiManager.vue';
import LoginForm from './components/LoginForm.vue';
import DataChanger from './components/DataChanger.vue';
import store from '@/store/index.js'

export default {
  components: {
    PageHeader,
    ApiManager,
    LoginForm,
    DataChanger
  },
  setup() {
    const showApiManager = ref(false)

    const permission = computed(() => store.getters['auth/permission'])
    const storedToken = ref(JSON.parse(localStorage.getItem('permission')))

    const showPage = computed(() => {
      return (!showApiManager.value === permission.value || !showApiManager.value === storedToken.value)
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
}
</style>
