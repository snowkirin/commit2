import types from "./mutation-types";
import actions from "./actions";

export default {
  namespaced: true,
  state: {
    Membership: {},
    RecommendCode: {}
  },
  mutations: {
    [types.GET_MEMBERSHIP](state, data) {
      state.Membership = data;
    },
    [types.GET_RECOMMENDCODE](state, data) {
      console.log(data);
      state.RecommendCode = data;
    },
  },
  actions,
  getters: {
    Membership: state => state.Membership,
    RecommendCode: state => state.RecommendCode,
  }
};
