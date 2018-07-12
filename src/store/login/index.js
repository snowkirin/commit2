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
    feedbackDirect: {
      result: false,
      subscription_id: null,
      feedback_id: null,
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
    [types.FEEDBACK_DIRECT](state, data) {
      state.feedbackDirect.result = data.result;
      state.feedbackDirect.subscription_id = data.info.subscription_id;
      state.feedbackDirect.feedback_id = data.info.feedback_id;
      state.Authentication.userName = data.info.user_name;
    },
  },
  actions,
  getters: {
    isLogin: state => state.login,
    Authentication: state => state.Authentication,
    feedbackDirect: state => state.feedbackDirect,
  },
};
