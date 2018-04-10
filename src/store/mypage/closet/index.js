import types from './mutation-types';
import actions from './actions';

export default {
  namespaced: true,
  state: {
    pastCloset: [],
    pastDetail: {},
    tomorrowCloset: {},
    currentCloset: {},
    tomorrowNone: false,
    pastNone: false,
    currentNone: false,
  },
  mutations: {
    [types.SET_TOMORROW_CLOSET](state, data) {
      state.tomorrowCloset = { ...data };
    },
    [types.SET_TOMORROW_SELECT](state) {
      console.log(state);
    },
    [types.SET_PAST_CLOSET](state, data) {
      state.pastCloset = [...data];
    },
    [types.SET_PAST_DETAIL_VIEW](state, data) {
      state.pastDetail = { ...data };
    },
    [types.SET_CURRENT_CLOSET](state, data) {
      state.currentCloset = { ...data };
    },
    [types.SET_TOMORROW_NONE](state) {
      state.tomorrowNone = true;
    },
    [types.SET_CURRENT_NONE](state) {
      state.currentNone = true;
    },
    [types.SET_PARENT_NONE](state) {
      state.pastNone = true;
    },
  },
  actions,
  getters: {
    getTomorrowCloset: state => state.tomorrowCloset,
    getPastCloset: state => state.pastCloset,
    getPastDetail: state => state.pastDetail,
    getCurrentCloset: state => state.currentCloset,
    getTomorrowNone: state => state.tomorrowNone,
    getPastNone: state => state.pastNone,
    getCurrentNone: state => state.currentNone,
  },
};
