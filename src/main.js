import { createApp } from 'vue';
import App from './App.vue';
import store from './store/index.js';
import BaseButton from './components/ui/BaseButton.vue';
import router from './router.js';

const app = createApp(App);

app.component('base-button', BaseButton);

app.use(store);
app.use(router);

app.mount('#app');
