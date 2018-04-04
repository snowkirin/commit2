import types from './mutation-types';
import actions from './actions';
import notice from './notice';
import inquiries from './inquiries';
import closet from './closet';

export default {
  namespaced: true,
  modules: {
    inquiries,
    notice,
    closet,
  },
  state: {
    mypageAuth: false,
    mypageData: {},
    mypageStyleData: {},
    mypageChangeEmail: false,
    mypageChangePwd: false,
    phoneAuth: false,
    phoneAuthKey: null,
    phoneAuthCnt: 0,
  },
  mutations: {
    [types.MYPAGE_SECURITY](state) {
      state.mypageAuth = true;
    },
    [types.MYPAGE_SECURITY_DESTROYED](state) {
      state.mypageAuth = false;
    },
    [types.MYPAGE_LOAD](state, data) {
      if (data.type === 'mypage') state.mypageData = { ...data.data };
      else state.mypageStyleData = { ...data.data };
    },
    [types.MYPAGE_CHANGE_EMAIL](state, data) {
      state.mypageChangeEmail = data;
    },
    [types.MYPAGE_CHANGE_PASSWORD](state, data) {
      state.mypageChangePwd = data;
    },
    [types.PHONE_VERIFY](state, data) {
      state.phoneAuthKey = data.authId;
    },
    [types.PHONE_VERIFY_CHECK](state) {
      state.phoneAuth = true;
    },
    [types.PHONE_VERIFY_COUNT](state) {
      state.phoneAuthCnt += 1;
    },
  },
  actions,
  getters: {
    getMypageAuth: state => state.mypageAuth,
    getMypageData: state => state.mypageData,
    getMypageStyleData: state => state.mypageStyleData,
    getMypageEmailFlag: state => state.mypageChangeEmail,
    getMypagePwdFlag: state => state.mypageChangePwd,
    getPhoneAuth: state => state.phoneAuth,
    getPhoneAuthKey: state => state.phoneAuthKey,
  },
};
