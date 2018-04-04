import types from './mutation-types';
import actions from './actions';

export default {
  namespaced: true,
  state: {
    pastCloset: [],
    pastDetail: {},
    currentCloset: {},
  },
  mutations: {
    [types.SET_PAST_CLOSET](state, data) {
      state.pastCloset = [...data];
    },
    [types.SET_PAST_DETAIL_VIEW](state, data) {
      state.pastDetail = { ...data };
    },
    [types.SET_CURRENT_CLOSET](state, data) {
      state.currentCloset = { ...data };
    },
  },
  actions,
  getters: {
    getPastCloset: state => state.pastCloset,
    getPastDetail: state => state.pastDetail,
    getCurrentCloset: state => state.currentCloset,
  },
};
