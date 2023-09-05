<template>
  <the-header></the-header>
  <api-manager v-if="!showPage"></api-manager>
</template>

<script>
import TheHeader from './components/TheHeader.vue';
import ApiManager from './components/ApiManager.vue';
import { computed } from 'vue';
import store from '@/store/index.js'
import { ref } from 'vue'
export default {
  components: {
    TheHeader,
    ApiManager
  },
  setup() {
    const showApiManager = ref({
      isVisible: false
    });

    const permission = computed(() => store.getters['auth/permission'])
    const showPage = computed(() => {
      return showApiManager.value.isVisible === permission.value
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
