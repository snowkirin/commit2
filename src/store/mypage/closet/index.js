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
    tomorrowSelected: false,
    paymentCurrent: ''
  },
  mutations: {
    [types.SET_TOMORROW_CLOSET](state, data) {
      state.tomorrowCloset = { ...data };
    },
    [types.SET_TOMORROW_SELECT](state) {
      state.tomorrowSelected = true;
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
    [types.PAYMENT_CURRENT](state, data) {
      if (state.paymentCurrent !== '') {
        state.paymentCurrent += '\n';
      }
      state.paymentCurrent += `${data.name}\n${data.message}\n`;
    },
    [types.INIT_PAYMENT_CURRENT](state) {
      state.paymentCurrent = '';
    }
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
    getTomorrowSelect: state => state.tomorrowSelected,
    getPaymentCurrent: state => state.paymentCurrent
  }
};
