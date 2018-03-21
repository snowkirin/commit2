import types from './mutation-types';
import actions from './actions';

export default {
  namespaced: true,
  state: {
    phoneAuth: false,
    phoneAuthKey: 0,
    phoneAuthCnt: 0,
    userId: '',
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
  },
  actions,
  getters: {
    getPhoneAuth: state => state.phoneAuth,
    getPhoneAuthKey: state => state.phoneAuthKey,
    getUserId: state => state.userId,
  },
};
