import types from './mutation-types';
import actions from './actions';

export default {
  namespaced: true,
  state: {
    login: false,
    Authentication: {
      authenticated: false,
      userName: '',
      userStyleList: '',
    },
  },
  mutations: {
    [types.LOGIN_SUCCESS](state, data) {
      state.login = true;
      state.Authentication.authenticated = true;
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
      state.login = false;
      state.Authentication.authenticated = false;
    },
  },
  actions,
  getters: {
    isLogin: state => state.login,
    Authentication: state => state.Authentication,
  },
};
