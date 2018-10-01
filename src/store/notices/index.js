import types from './mutation-types';
import actions from './actions';

const initialState = {
  Notices: {}
};

const state = Object.assign({}, initialState);

const mutations = {
  [types.RESET_STATE](state) {
    for (let prop in state) {
      state[prop] = initialState[prop];
    }
  },
  [types.GET_NOTICES](state, data) {
    state.Notices = data;
  }
};

const getters = {
  Notices: state => state.Notices
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
