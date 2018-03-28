import types from './mutation-types';
import actions from './actions';
import inquiries from './inquiries';

export default {
  namespaced: true,
  modules: {
    inquiries,
  },
  state: {
    mypageAuth: false,
    mypageData: {},
    mypageChangeEmail: false,
  },
  mutations: {
    [types.MYPAGE_SECURITY](state) {
      state.mypageAuth = true;
    },
    [types.MYPAGE_SECURITY_DESTROYED](state) {
      state.mypageAuth = false;
    },
    [types.MYPAGE_LOAD](state, data) {
      state.mypageData = { ...data };
    },
    [types.MYPAGE_CHANGE_EMAIL](state) {
      state.mypageChangeEmail = true;
    },
  },
  actions,
  getters: {
    getMypageAuth: state => state.mypageAuth,
    getMypageData: state => state.mypageData,
    getMypageEmailFlag: state => state.mypageChangeEmail,
  },
};
