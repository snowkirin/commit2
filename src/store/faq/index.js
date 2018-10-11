import types from './mutation-types';
import actions from './actions';

const initialState = {
  Faq: {
    total_cnt: 0,
    page_cnt: 0,
    data: []
  },
  FaqMainListResult: [],
  FaqTypes: [],
};
const state = Object.assign({}, initialState);
const mutations = {
  [types.RESET_STATE](state) {
    for (let prop in state) {
      state[prop] = initialState[prop];
    }
  },
  [types.GET_FAQ](state, data) {
    state.Faq = data;
  },
  [types.GET_FAQ_MAIN_LIST](state, data) {
    state.FaqMainListResult = data;
  },
  [types.GET_FAQ_TYPES](state, data) {
    state.FaqTypes = data;
  }

};
const getters = {
  Faq: state => state.Faq,
  FaqMainListResult: state => state.FaqMainListResult,
  FaqTypes: state => state.FaqTypes
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
