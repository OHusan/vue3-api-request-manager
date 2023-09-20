import mutations from './mutations';
import getters from './getters';
import actions from './actions';

export default {
  namespaced: true,
  state() {
    return {
      user: {
        username: 'admin',
        password: 'admin',
      },
      permission: false,
    };
  },
  mutations,
  getters,
  actions,
};
