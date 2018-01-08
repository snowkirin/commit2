import * as types from '../mutation-types';

export default {
  state: {
    isGnb: false,
  },

  mutations: {
    [types.REVERSE_GNB](state) {
      state.isGnb = !state.isGnb;
    },
    [types.CLOSE_GNB](state) {
      if (state.isGnb) this.commit(types.REVERSE_GNB);
    },
  },

  actions: {
    setGnb({ commit }) {
      commit(types.REVERSE_GNB);
    },
    setCloseGnb({ commit }) {
      commit(types.CLOSE_GNB);
    },
  },

  getters: {
    isGnb: state => state.isGnb,
  },
};
