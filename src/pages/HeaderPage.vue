<template>
  <header class="container">
    <h2>Test Me</h2>
    <nav class="navigation" v-if="showPage">
      <router-link class="router" to="/apiManager">Api management</router-link>
      <router-link class="router" to="/person">Weight manager</router-link>
      <router-link class="router" to="/weather">Weather</router-link>
      <router-link class="router" to="/request-center">Request-center</router-link>
    </nav>
    <base-button styleOf @click="logout" v-if="showPage">Logout</base-button>
  </header>
</template>

<script type="ts">
import { useRouter } from 'vue-router';
import { defineComponent } from 'vue';

import store from '@/store/index'


export default defineComponent({
  props: {
    showPage: Boolean
  },
  setup() {
    const router = useRouter();

    const logout = () => {
      localStorage.removeItem('permission');
      store.dispatch('auth/changePermission');
      router.push('/home')
    }

    return {
      logout
    }
  }
})
</script>

<style lang="scss" scoped>
.container {

  h2 {
    font-weight: bold;
    font-size: 24px;
    color: white;
  }

  .navigation {
    display: flex;
    gap: 1rem;

    .router {
      text-decoration: none;
      color: black;
      background-color: #e6e3e3;
      padding: 10px;
      border-radius: 20% 10%;
      border: 1px solid #ccc;
      transition: all .2s ease-in-out;

      &:hover {
        transform: scale(1.2);
      }

      &:active {
        border: 2px solid #2e25a7;
      }
    }
  }
}
</style>
