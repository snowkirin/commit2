import types from './mutation-types';
import actions from './actions';

const initialState = {
  isList: false,
  List: {}
};

const state = Object.assign({}, initialState);

const mutations = {
  [types.RESET_STATE](state) {
    for (let prop in state) {
      state[prop] = initialState[prop];
    }
  },
  [types.GET_INQUIRIES_SUCCESS](state, data) {
    state.isList = true;
    state.List = data;
  },
  [types.GET_INQUIRIES_FAILED](state) {
    state.isList = false;
  },
  [types.GET_INQUIRIES_DETAIL](state) {}
};

const getters = {
  InquiresList: state => state.List
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
