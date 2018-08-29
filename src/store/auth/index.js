import types from "./mutation-types";
import actions from "./actions";

const initialState = {
  PasswordAuth: false
};
const state = Object.assign({}, initialState);
const mutations = {
  [types.POST_PASSWORD](state) {
    state.PasswordAuth = true;
  },
  [types.DESTROY_PASSWORD_AUTH](state) {
    state.PasswordAuth = false;
  }
};
const getters = {
  PasswordAuth: state => state.PasswordAuth
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
