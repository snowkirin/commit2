import types from './mutation-types';
import actions from './actions';

const initialState = {
  isLogin: false,
  Authentication: {
    isAuthenticated: false,
  },
  User: {
    userId: '',
    email: '',
    displayName: '',
    type: null,
    inserted: ''
  }
};
const state = Object.assign({}, initialState);
const mutations = {
  [types.RESET_STATE](state) {
    for (let prop in state) {
      state[prop] = initialState[prop];
    }
  },
  [types.LOGIN_SUCCESS](state, data) {
    state.isLogin = true;
    state.Authentication.isAuthenticated = true;
    if (data) {
      state.User.userId = data.userId;
      state.User.email = data.email;
      state.User.displayName = data.displayName;
      state.User.type = data.type;
      state.User.inserted = data.inserted;
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
    // 초가화 작업 할것.
  },
  [types.CHANGE_USER_TYPE](state, data) {
    state.User.type = data;
  }
};
const getters = {
  isLogin: state => state.isLogin,
  Authentication: state => state.Authentication,
  User: state => state.User
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
