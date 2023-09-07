<template>
  <section>
    <div class="container">
      <base-button class="button" @click="changeForm">
        <img src="@/assets/settings.svg" alt="Settings icon" />
      </base-button>

      <form v-if="!showForm" @submit.prevent="savingHeaderInput">
        <p>API header</p>
        <input type="text" placeholder="Enter name" v-model.trim="headerInput.headerName" />
        <input type="text" placeholder="Enter Value" v-model.trim="headerInput.headerValue" />
        <base-button styleOf>Add</base-button>
      </form>

      <form class="form" @submit.prevent="submitForm" v-if="showForm">
        <input type="url" id="apiText" placeholder="https://example.com" v-model.trim="urlInput" />
        <base-button type='submit'>
          <img src="@/assets/arrow.svg" alt="arrow button to right" />
        </base-button>
      </form>
    </div>
  </section>

  <section>
    <div class="container-text">
      <p>{{ urlLog }}</p>
      <p v-if="errorOutput">{{ errorOutput }}</p>
    </div>
  </section>
</template>

<script>
import { ref, reactive } from 'vue';

export default {
  setup() {
    const urlInput = ref('')
    const urlLog = ref('')
    const errorOutput = ref('')
    const showForm = ref(true);
    const headerInput = reactive({
      headerName: '',
      headerValue: '',
    })

    const submitForm = () => {
      urlLog.value = '';
      errorOutput.value = '';
      const customHeaders = new Headers();

      if (headerInput.headerName !== '' && headerInput.headerValue !== '') {
        customHeaders.append(headerInput.headerName, headerInput.headerValue);
      }

      fetch(`${urlInput.value}`, {
        method: 'GET',
        headers: customHeaders
      })
        .then(function (response) {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          urlLog.value = data;
        })
        .catch((error) => {
          errorOutput.value = error;
        });
      urlInput.value = '';
    }

    const savingHeaderInput = () => {
      changeForm();
    }

    const changeForm = () => {
      showForm.value = !showForm.value;
    }

    return {
      urlInput,
      submitForm,
      urlLog,
      errorOutput,
      showForm,
      changeForm,
      savingHeaderInput,
      headerInput
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

  .button {
    margin-right: 10px;
  }

  .form {
    display: flex;
    gap: 10px;

    input {
      padding: 10px 5px;
    }
  }
}

.container-text {
  text-align: center;

  p {
    margin: 2rem;
  }
}
</style>
