import * as types from '../mutation-types';

export default {
  state: {
    storyView: 'MyCloset',
    isMyCloset: true,
    isNowCloset: false,
    isTomorrowCloset: false,
  },

  mutations: {
    [types.SET_CLOSET_VIEW](state, targetView) {
      state.isMyCloset = false;
      state.isNowCloset = false;
      state.isTomorrowCloset = false;

      if (targetView === 'MyCloset') {
        state.isMyCloset = true;
        state.closetView = 'MyCloset';
      } else if (targetView === 'NowCloset') {
        state.isNowCloset = true;
        state.closetView = 'NowCloset';
      } else if (targetView === 'TomorrowCloset') {
        state.isTomorrowCloset = true;
        state.closetView = 'TomorrowCloset';
      } else {
        state.isMyCloset = true;
        state.closetView = 'MyCloset';
      }
    },

  actions: {
    setClosetView({ commit }, targetView) {
      commit(types.SET_CLOSET_VIEW, targetView);
    },
  },

  getters: {
    getClosetView: state => state.closetView,
    isMyCloset: state => state.isMyCloset,
    isNowCloset: state => state.isNowCloset,
    isTomorrowCloset: state => state.isTomorrowCloset,
  },
};
