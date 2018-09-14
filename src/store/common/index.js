import types from './mutation-types';
import actions from './actions';

const initialState = {
  phoneAuth: false,
  phoneAuthKey: 0,
  userId: '',
  isMainBanner: true,
  CurrentRoute: '',
};
const state = Object.assign({}, initialState);
const mutations = {
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
  [types.TOGGLE_MAIN_BANNER](state, data) {
    state.isMainBanner = data;
  },
  [types.CHECK_CURRENT_ROUTE](state, data) {
    state.CurrentRoute = data;
  }
};
const getters = {
  getPhoneAuth: state => state.phoneAuth,
  getPhoneAuthKey: state => state.phoneAuthKey,
  isMainBanner: state => state.isMainBanner,
  CurrentRoute: state => state.CurrentRoute
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
