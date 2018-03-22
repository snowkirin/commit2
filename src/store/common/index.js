import types from './mutation-types';
import actions from './actions';

export default {
  namespaced: true,
  state: {
    phoneAuth: false,
    phoneAuthKey: 0,
    phoneAuthCnt: 0,
    userId: '',
    phonePwdAuth: false,
    phonePwdAuthKey: 0,
    phonePwdAuthCnt: 0,
    phonePwdComplete: false,
  },
  mutations: {
    [types.PHONE_VERIFY](state, data) {
      if (data.result) state.phoneAuthKey = data.authId;
      else alert('이름 또는 휴대전화가 정확하지 않습니다.');
    },
    [types.PHONE_VERIFY_CHECK](state, data) {
      if (data.result) {
        state.phoneAuth = true;
        state.userId = data.email;
      }
    },
    [types.PHONE_VERIFY_COUNT](state) {
      state.phoneAuthCnt += 1;
    },
    [types.PHONE_VERIFY_PWD](state, data) {
      if (data.result) state.phonePwdAuthKey = data.authId;
      else alert('이메일 또는 휴대전화가 정확하지 않습니다.');
    },
    [types.PHONE_VERIFY_CHECK_PWD](state, data) {
      if (data.result) state.phonePwdAuth = true;
    },
    [types.PHONE_VERIFY_COUNT_PWD](state) {
      state.phonePwdAuthCnt += 1;
    },
    [types.PHONE_VERIFY_PWD_COMPLETE](state) {
      state.phonePwdComplete = true;
    },
  },
  actions,
  getters: {
    getPhoneAuth: state => state.phoneAuth,
    getPhoneAuthKey: state => state.phoneAuthKey,
    getUserId: state => state.userId,
    getPhoneAuthPwd: state => state.phonePwdAuth,
    getPhoneAuthKeyPwd: state => state.phonePwdAuthKey,
    getPhonePwdComplete: state => state.phonePwdComplete,
  },
};
