import types from './mutation-types';
import actions from './actions';

export default {
  namespaced: true,
  state: {
    selectInquiries: null,
    inquiriesInfo: {},
    inquiriesList: [],
    newInquiries: [],
  },
  mutations: {
    [types.SET_INQUIRIES_LIST](state, data) {
      state.inquiriesList = [...data];
    },
    [types.SET_INQUIRIES_INFO](state, data) {
      state.inquiriesInfo = { ...data };
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
    getInquiriesInfo: state => state.inquiriesInfo,
    getSelectInquiries: state => state.selectInquiries,
    getNewInquiries: state => state.newInquiries,
  },
};
