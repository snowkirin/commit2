import types from './mutation-types';
import actions from './actions';

export default {
  namespaced: true,
  state: {
    isList: false,
    List: {}
  },
  mutations: {
    [types.GET_INQUIRIES_SUCCESS](state, data) {
      state.isList = true;
      state.List = data;
    },
    [types.GET_INQUIRIES_FAILED](state) {
      state.isList = false;
    }
  },
  actions,
  getters: {
    InquiresList: state => state.List
  }
};
