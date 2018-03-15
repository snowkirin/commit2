import types from './mutation-types';
import actions from './actions';

export default {
  namespaced: true,
  state: {
    login: false,
  },
  mutations: {
    [types.LOGIN_SUCCESS](state) {
      state.login = true;
    },
    [types.LOGIN_FAILURE]() {
      alert('아이디 혹은 비밀번호를 다시 확인해주세요.');
    },
    [types.LOGIN_ERROR]() {
      alert('현재 시스템이 불안정합니다.\n잠시후 다시 시도해주세요.');
    },
    [types.LOGOUT](state) {
      state.login = false;
    },
  },
  actions,
  getters: {
    isLogin: state => state.login,
  },
};
