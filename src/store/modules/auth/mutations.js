export default {
  validate(state, payload) {
    return (state.permission = payload);
  },
};
