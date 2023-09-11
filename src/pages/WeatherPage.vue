<template>
  <section class="container">
    <div>
      <form class="form" @submit.prevent="getLocation">
        <p>Input city name</p>
        <input type="text" v-model.trim="searchCity" @keydown="resetCityValue" />
        <base-button styleOf>Get temperature</base-button>
      </form>
      <p v-if="errorText">Please enter valid name for city</p>
    </div>
  </section>
  <section class="container" v-if="isCityEntered">
    <div class="container-card">
      <p>{{ searchCity }}</p>
      <p>{{ temperature }} ℃</p>
    </div>
  </section>
</template>

<script>
import { ref, reactive } from 'vue';

export default {
  setup() {
    const searchCity = ref('');
    const temperature = ref('');
    const geoLocation = reactive({
      lat: '',
      lon: ''
    })
    const isCityEntered = ref(false);
    const errorText = ref('');

    const getLocation = async () => {
      try {
        errorText.value = '';
        const response = await fetch(`https://api.api-ninjas.com/v1/geocoding?city=` + searchCity.value.toLowerCase(), {
          method: 'GET',
          headers: { 'X-Api-Key': 'ZwpMjRrOPq9VlHCX1QnOAQ==hu562roS9ElCQxqY' },
          contentType: 'application/json',
        })

        const responseData = await response.json();

        geoLocation.lat = responseData[0].latitude;
        geoLocation.lon = responseData[0].longitude;
        isCityEntered.value = true;
        successCallback();
      } catch (error) {
        errorText.value = error
      }
    }

    const resetCityValue = () => { isCityEntered.value = false };

    const successCallback = async () => {
      const APIKey = ref('47eb51370270f925c2834c2cb2c01ac7')

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${geoLocation.lat}&lon=${geoLocation.lon}&units=metric&appid=${APIKey.value}`
      )

      const responseData = await response.json();

      searchCity.value = responseData.name;
      temperature.value = responseData.main.temp;
    };

    return {
      searchCity,
      temperature,
      isCityEntered,
      errorText,
      resetCityValue,
      getLocation,
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  text-align: center;

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
