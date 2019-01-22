import types from './mutation-types';
import actions from './actions';

const initialState = {
  isAuthenticated: false, // Login Status
  // 유저 정보
  User: {
    userId: '',
    email: '',
    displayName: '',
    type: null,
    inserted: ''
  },
  // 사이즈 정보
  Sizes: {},
  // 옵션 정보
  Options: {}
};
const state = Object.assign({}, initialState);
const mutations = {
  [types.RESET_STATE](state) {
    for (let prop in state) {
      state[prop] = initialState[prop];
    }
  },
  [types.SET_SIZES](state, payload) {
    state.Sizes = payload;
  },
  [types.SET_OPTIONS](state, payload) {
    state.Options = payload;
  },
  [types.LOGIN_SUCCESS](state, data) {
    state.isAuthenticated = true;
    if (data) {
      state.User.userId = data.userId;
      state.User.email = data.email;
      state.User.displayName = data.displayName;
      state.User.type = data.type;
      state.User.inserted = data.inserted;
    }
  },
  [types.LOGOUT_SUCCESS](state) {
    state.isAuthenticated = false;
  },
  [types.SET_SUBSCRIPTION_STATUS](state, data) {
    state.User.type = data;
  }
};
const getters = {
  isAuthenticated: state => state.isAuthenticated,
  User: state => state.User,
  Sizes: state => state.Sizes,
  Options: state => state.Options
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
