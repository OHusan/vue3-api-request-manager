<template>
  <section>
    <div class="container">
      <form class="form" @submit.prevent="submitForm">
        <div class="input-container">
          <label for="name">Name</label>
          <input type="text" id="name" v-model.trim="person.name" />
        </div>
        <div class="input-container">
          <label for="weight">Weight</label>
          <input type="number" id="weight" v-model.trim="person.weight" />
        </div>
        <base-button styleOf>Add</base-button>
      </form>
    </div>
  </section>
  <section class="text-container">
    <p>Get All data</p>
    <base-button styleOf @click="getData">Get</base-button>
    <p v-for="data in dataStore" :key="data">{{ data.name }} has weight of {{ data.weight }} <base-button styleOf
        @click="deleteData(data.id)">DELETE
        THIS ONE</base-button> <base-button @click="putData(data.id)" styleOf>PUT WEIGHT TO 200</base-button>
    </p>
  </section>
</template>

<script>
import { reactive, ref, onMounted } from 'vue';

export default {
  setup() {
    const person = reactive({
      name: '',
      weight: '',
    })
    const dataStore = ref([])

    const submitForm = async () => {
      try {
        const promise = await fetch('https://vue-http-demo-c219d-default-rtdb.firebaseio.com/person.json', {
          method: 'POST',
          body: JSON.stringify(person)
        })

        console.log(promise);
      } catch (error) {
        console.log(error);
      }

      person.name = '';
      person.weight = '';
    }

    const getData = async () => {
      dataStore.value = [];
      try {
        const promise = await fetch('https://vue-http-demo-c219d-default-rtdb.firebaseio.com/person.json');

        const promiseData = await promise.json();

        console.log(promiseData);
        const formattedData = Object.keys(promiseData).map((id) => ({
          id: id,
          name: promiseData[id].name,
          weight: promiseData[id].weight,
        }));
        // const formattedData = promiseData.map((person, id) => ({
        //   id: id,
        //   name: person.name,
        //   weight: person.weight
        // }))

        dataStore.value = formattedData;
      } catch (error) {
        console.log(error)
      }
    }

    const deleteData = async (id) => {
      try {
        const promise = await fetch(`https://vue-http-demo-c219d-default-rtdb.firebaseio.com/person/${id}.json`, {
          method: 'DELETE'
        });
        getData();
        console.log(promise)
      } catch (error) {
        console.log(error);
      }
    }

    const putData = async (id) => {
      try {
        const promise = await fetch(`https://vue-http-demo-c219d-default-rtdb.firebaseio.com/person/${id}.json`, {
          method: 'PATCH',
          body: JSON.stringify({
            weight: 200
          })
        })

        console.log(promise);
      } catch (error) {
        console.log(error)
      }

      getData();
    }

    onMounted(() => {
      getData();
    });

    return {
      person,
      submitForm,
      getData,
      deleteData,
      dataStore,
      putData
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 2rem;

  .form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;

    label {
      margin-right: 10px;
    }
  }
}

.text-container {
  text-align: center;
}
</style>
