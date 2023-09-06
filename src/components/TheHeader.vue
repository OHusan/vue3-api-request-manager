<template>
  <header class="wrapper">
    <div class="container">
      <h2>Test Me</h2>
    </div>

    <div class="container">
      <login-form></login-form>
    </div>
  </header>
</template>

<script>
import LoginForm from './LoginForm.vue';

export default {
  components: {
    LoginForm
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #15769b;

  .container {
    padding: 0.5rem 2rem;

    h2 {
      font-weight: bold;
      font-size: 24px;
      color: white;
    }
  }
}
</style>
