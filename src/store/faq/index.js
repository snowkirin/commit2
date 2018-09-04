import types from "./mutation-types";
import actions from "./actions";

const initialState = {
  FaqMainListResult: [],
};
const state = Object.assign({}, initialState);
const mutations = {
  [types.GET_FAQ_MAIN_LIST](state, data) {
    state.FaqMainListResult = data;
  }
};
const getters = {
  FaqMainListResult: state => state.FaqMainListResult
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
