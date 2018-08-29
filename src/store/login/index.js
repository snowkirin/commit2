import types from './mutation-types';
import actions from './actions';

const initialState = {
  isLogin: false,
  Authentication: {
    isAuthenticated: false,
    userName: '',
    userStyleList: ''
  },
  feedbackDirect: {
    result: false,
    subscription_id: null,
    feedback_id: null
  },
  tomorrowDirect: {}
};
const state = Object.assign({}, initialState);
const mutations = {
  [types.RESET_STATE](state) {
    for (let prop in state) {
      console.log(prop);
      console.log(state);
      state[prop] = initialState[prop];
    }
    console.log(state,'최종 state');
  },
  [types.LOGIN_SUCCESS](state, data) {
    state.isLogin = true;
    state.Authentication.isAuthenticated = true;
    if (data) {
      state.Authentication.userName = data.displayName;
    }
  },
  [types.LOGIN_FAILURE]() {
    alert('아이디 혹은 비밀번호를 다시 확인해주세요.');
  },
  [types.LOGIN_ERROR]() {
    alert('현재 시스템이 불안정합니다.\n잠시후 다시 시도해주세요.');
  },
  [types.LOGOUT](state) {
    // console.log(rootState);
    state.isLogin = false;
    state.Authentication.isAuthenticated = false;
  }
};
const getters = {
  isLogin: state => state.isLogin,
  Authentication: state => state.Authentication
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
