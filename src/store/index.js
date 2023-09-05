import { createStore } from 'vuex';
import authModules from './modules/auth/index.js';

const store = createStore({
  modules: {
    auth: authModules,
  },
});

export default store;
