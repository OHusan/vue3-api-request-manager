import { AuthUser } from './types';

export default {
  // user(state):string {
  //   return state.user;
  // },
  permission(state: AuthUser) {
    return state.permission;
  },
};
