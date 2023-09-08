import { createRouter, createWebHistory } from 'vue-router';

import ApiManager from './pages/requests/ApiManager.vue';
import PersonWeight from './pages/requests/PersonWeight.vue';
import HomePage from './pages/HomePage.vue';
import WeatherPage from './pages/WeatherPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/weather' },
    { path: '/apiManager', component: ApiManager },
    { path: '/person', component: PersonWeight },
    { path: '/home', component: HomePage },
    { path: '/weather', component: WeatherPage },
  ],
});

export default router;
