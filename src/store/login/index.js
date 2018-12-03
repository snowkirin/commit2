import types from './mutation-types';
import actions from './actions';

const initialState = {
  isAuthenticated: false, // Login Status
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
  [types.CHANGE_USER_TYPE](state, data) {
    state.User.type = data;
  }
};
const getters = {
  isAuthenticated: state => state.isAuthenticated,
  User: state => state.User
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
