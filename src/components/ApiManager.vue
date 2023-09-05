<template>
  <section>
    <div class="container">
      <form class="form" @submit.prevent="submitForm">
        <input type="url" id="apiText" placeholder="https://example.com" v-model.trim="urlInput" />
        <arrow-button></arrow-button>
      </form>
    </div>
  </section>
  <section>
    <div class="container-text">
      <p>{{ urlOutput }}</p>
      <p v-if="errorOutput">{{ errorOutput }}</p>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue';
import ArrowButton from './ArrowButton.vue';

export default {
  components: {
    ArrowButton
  },
  setup() {
    const urlInput = ref('')
    const urlOutput = ref('')
    const errorOutput = ref('')

    const submitForm = () => {
      urlOutput.value = '';
      errorOutput.value = '';

      fetch(`${urlInput.value}`).then(function (response) {
        if (response.ok) {
          return response.json();
        }

      }).then((data) => {
        urlOutput.value = data;
        console.log(urlOutput.value);

      }).catch((error) => {
        errorOutput.value = error;
      })

      console.log(urlInput.value);
      urlInput.value = '';
    }
    return {
      urlInput,
      submitForm,
      urlOutput,
      errorOutput
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  text-align: center;
  margin-top: 5rem;
  display: flex;
  flex-direction: row;
  justify-content: center;

  .form {
    display: flex;
    gap: 10px;

    input {
      padding: 10px 5px;
    }
  }
}

.container-text {
  p {
    margin: 2rem;
  }
}
</style>
