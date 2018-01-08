import Vue from 'vue';
import Vuex from 'vuex';
import story from './main/story';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    story,
  },

  state: {
    isGnb: false,
  },

  mutations: {
    SET_GNB(state) {
      state.isGnb = !state.isGnb;
    },
    CLOSE_GNB(state) {
      if (state.isGnb) {
      	this.commit('SET_GNB');
      }
    }
  },

  actions: {
    setGnb({ commit }) {
      commit('SET_GNB');
    },
    setCloseGnb({ commit }) {
      commit('CLOSE_GNB');
    },
  },

  getters: {
    isGnb: state => state.isGnb,
  },
});
