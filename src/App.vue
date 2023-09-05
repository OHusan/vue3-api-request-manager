<template>
  <the-header></the-header>
  <api-manager v-if="showPage"></api-manager>
</template>

<script>
import TheHeader from './components/TheHeader.vue';
import ApiManager from './components/ApiManager.vue';
import { computed, ref } from 'vue';
import store from '@/store/index.js'
export default {
  components: {
    TheHeader,
    ApiManager
  },
  setup() {
    const showApiManager = ref(false)

    const permission = computed(() => store.getters['auth/permission'])
    const storedToken = JSON.parse(localStorage.getItem('permission'))

    const showPage = computed(() => {
      return (!showApiManager.value === permission.value || !showApiManager.value === storedToken)
    })
    return {
      permission,
      showApiManager,
      showPage
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

body {
  margin: 0;
}
</style>
