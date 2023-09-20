import { User } from './types';

export default {
  loginValidate({ commit, state }: any, userInput: User) {
    commit(
      'validate',
      userInput.username === state.user.username &&
        userInput.password === state.user.password
    );
  },
  changePermission({ commit }: any) {
    commit('validate', false);
  },
};
