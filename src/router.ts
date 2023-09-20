import { createRouter, createWebHistory } from 'vue-router';

import ApiManager from './pages/requests/ApiManager.vue';
import PersonWeight from './pages/requests/PersonWeight.vue';
import HomePage from './pages/HomePage.vue';
import WeatherPage from './pages/requests/WeatherPage.vue';
import RequestCenter from './pages/RequestCenter.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/weather' },
    { path: '/apiManager', component: ApiManager },
    { path: '/person', component: PersonWeight },
    { path: '/home', component: HomePage },
    { path: '/weather', component: WeatherPage },
    { path: '/request-center', component: RequestCenter },
  ],
});

export default router;
