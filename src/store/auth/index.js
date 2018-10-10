import types from './mutation-types';
import actions from './actions';

const initialState = {
  PasswordAuth: false,
  FindIdAuth: '', // 아이디 찾기 인증번호
  isFindIdAuth: false, // 아이디 찾기 인증 완료
  UserEmail: '',
  FindPwdAuth: '',
  isFindPwdAuth: false
};
const state = Object.assign({}, initialState);
const mutations = {
  [types.RESET_STATE](state) {
    for (let prop in state) {
      state[prop] = initialState[prop]
    }
  },
  [types.POST_PASSWORD](state) {
    state.PasswordAuth = true;
  },
  [types.DESTROY_PASSWORD_AUTH](state) {
    state.PasswordAuth = false;
  },
  [types.POST_FIND_ID](state, data) {
    state.FindIdAuth = data;
  },
  [types.POST_FIND_ID_AUTH](state, data) {
    state.isFindIdAuth = data.result;
    state.UserEmail = data.email;
  },
  [types.DESTROY_FIND_ID_AUTH](state) {
    //초기화
    state.FindIdAuth = '';
    state.isFindIdAuth = false;
    state.UserEmail = '';
  },
  [types.POST_FIND_PWD](state, data) {
    state.FindPwdAuth = data;
  },
  [types.POST_FIND_PWD_AUTH](state, data) {
    state.isFindPwdAuth = data.result;
  },
  [types.DESTROY_FIND_PWD_AUTH](state) {
    state.FindPwdAuth = '';
    state.isFindPwdAuth = false;
  }
};
const getters = {
  PasswordAuth: state => state.PasswordAuth,
  FindIdAuth: state => state.FindIdAuth,
  isFindIdAuth: state => state.isFindIdAuth,
  UserEmail: state => state.UserEmail,
  FindPwdAuth: state => state.FindPwdAuth,
  isFindPwdAuth: state => state.isFindPwdAuth
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
