import types from './mutation-types';
import actions from './actions';

export default {
  namespaced: true,
  state: {
    selectInquiries: null,
    inquiriesList: [],
    newInquiries: [],
  },
  mutations: {
    [types.SET_INQUIRIES_LIST](state, data) {
      state.inquiriesList = [...data];
    },
    [types.SELECT_INQUIRIES](state, data) {
      state.selectInquiries = data;
    },
    [types.NEW_INQUIRIES](state, data) {
      state.newInquiries.push(data);
    },
  },
  actions,
  getters: {
    getInquiriesList: state => state.inquiriesList,
    getSelectInquiries: state => state.selectInquiries,
    getNewInquiries: state => state.newInquiries,
  },
};
