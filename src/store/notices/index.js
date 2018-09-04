import types from './mutation-types';
import actions from './actions';

export default {
  namespaced: true,
  state: {
    Notices: {}
  },
  mutations: {
    [types.GET_NOTICES](state, data) {
      state.Notices = data;
    }
  },
  actions,
  getters: {
    Notices: state => state.Notices
  }
};
