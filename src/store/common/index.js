import types from './mutation-types';
import actions from './actions';

const initialState = {
  sizes: {},

  phoneAuth: false,
  phoneAuthKey: 0,
  userId: '',
  isMainBanner: true,
  CurrentRoute: '',
  isRestart: false
};
const state = Object.assign({}, initialState);
const mutations = {
  [types.RESET_STATE](state) {
    for (let prop in state) {
      state[prop] = initialState[prop];
    }
  },
  [types.SET_SIZES](state, payload) {
    state.sizes = payload;
  },
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
  },
  [types.SUCCESS_RESTART](state) {
    state.isRestart = true;
  },
  [types.RESET_RESTART](state) {
    state.isRestart = false;
  }
};
const getters = {
  sizes: state => state.sizes,
  getPhoneAuth: state => state.phoneAuth,
  getPhoneAuthKey: state => state.phoneAuthKey,
  isMainBanner: state => state.isMainBanner,
  CurrentRoute: state => state.CurrentRoute,
  isRestart: state => state.isRestart
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
