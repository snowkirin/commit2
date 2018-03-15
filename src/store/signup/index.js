import types from './mutation-types';
import actions from './actions';

export default {
  namespaced: true,
  state: {
    firstData: {},
    phoneAuth: false,
    phoneAuthKey: null,
    phoneAuthCnt: 0,
  },
  mutations: {
    [types.SET_SIGNUP_FIRST_DATA](state, data) {
      state.firstData = { ...data };
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
    getPhoneAuth: state => state.phoneAuth,
    getPhoneAuthKey: state => state.phoneAuthKey,
  },
};
