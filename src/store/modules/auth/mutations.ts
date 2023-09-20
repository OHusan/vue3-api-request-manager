import { MutationTree } from 'vuex';
import { AuthUser, User } from './types';

export default {
  validate(state: any, payload: AuthUser) {
    return (state.permission = payload);
  },
};
