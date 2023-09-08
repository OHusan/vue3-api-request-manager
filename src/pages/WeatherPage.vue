<template>
  <section class="container">
    <div class="container-card">
      <p>Bugojno</p>
      <p>32</p>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    // const temperature = ref('');

    const successCallback = async (position) => {
      const lat = ref(position.coords.latitude);
      const lon = ref(position.coords.longitude);
      const APIKey = ref('47eb51370270f925c2834c2cb2c01ac7')

      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat.value}&lon=${lon.value}&appid=${APIKey.value}`)


      const responseData = await response.json();

      console.log(responseData);
      console.log(lat.value);
      console.log(lon.value);
    };

    const errorCallback = (error) => {
      console.log(error);
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);


    return {
      successCallback
    }
  }
}
</script>

<style lang="scss" scoped>
.container {

  &-card {
    width: 20%;
    text-align: center;
    border: 1px solid #ccc;
    margin: 2rem auto;
    font-size: 1.5rem;
    border-radius: 1rem;
    background-color: #7cb9e8;
  }
}
</style>
