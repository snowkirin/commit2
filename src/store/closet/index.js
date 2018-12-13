import types from './mutation-types';
import actions from './actions';

const initialState = {
};

const state = Object.assign({}, initialState);
const mutations = {
  [types.RESET_STATE](state) {
    for (let prop in state) {
      state[prop] = initialState[prop];
    }
  },
};
const getters = {
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};