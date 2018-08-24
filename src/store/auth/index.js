import types from "./mutation-types";
import actions from "./actions";

export default {
  namespaced: true,
  state: {
    PasswordAuth: false,
  },
  mutations: {
    [types.POST_PASSWORD](state) {
      state.PasswordAuth = true;
    },
    [types.DESTROY_PASSWORD_AUTH](state) {
      state.PasswordAuth = false;
    }
  },
  actions,
  getters: {
    PasswordAuth: state => state.PasswordAuth,
  }
};
