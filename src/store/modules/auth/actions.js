export default {
  loginValidate({ commit, state }, userInput) {
    commit(
      'validate',
      userInput.username === state.user.username &&
        userInput.password === state.user.password
    );
  },
  changePermission({ commit }) {
    commit('validate', false);
  },
};
