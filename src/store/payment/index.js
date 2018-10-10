import types from './mutation-types';
import actions from './actions';

const initialState = {
  Membership: {},
  RecommendCode: {}
};

const state = Object.assign({}, initialState);

const mutations = {
  [types.RESET_STATE](state) {
    for (let prop in state) {
      state[prop] = initialState[prop];
    }
  },
  [types.GET_MEMBERSHIP](state, data) {
    state.Membership = data;
  },
  [types.GET_RECOMMENDCODE](state, data) {
    console.log(data);
    state.RecommendCode = data;
  }
};

const getters = {
  Membership: state => state.Membership,
  RecommendCode: state => state.RecommendCode
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
