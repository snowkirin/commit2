import types from './mutation-types';
import actions from './actions';

export default {
  namespaced: true,
  state: {
    noticeList: [],
  },
  mutations: {
    [types.SET_NOTICE_LIST](state, data) {
      state.noticeList = [...data];
    },
  },
  actions,
  getters: {
    getNoticeList: state => state.noticeList,
  },
};
