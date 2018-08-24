import types from "./mutation-types";
import actions from "./actions";

export default {
  namespaced: true,
  state: {
    Join: {
    },
    PhoneVerify: {
      isVerify: false,
      authId: null,
    },
    isJoin: false
  },
  mutations: {
    [types.SET_SIZES](state, payload) {
      Object.assign(state.Join, { ...payload });
    },
    [types.SET_JOIN_FIRST](state, payload) {
      Object.assign(state.Join, { ...payload });
    },
    [types.SET_JOIN_SECOND](state, payload) {
      Object.assign(state.Join, { ...payload });
    },
    [types.SET_MANAGEMENT](state, data) {
      state.surveyStorage[data.type] = [...data.data];
    },
    [types.PICK_MANAGEMENT](state, data) {
      state.selected[data.type] = [...data.data];
    },
    [types.PICK_REMOVE_MANAGEMENT](state, data) {
      state.selected[data.type].splice(data.id, 1);
    },
    [types.POST_PHONE](state,data) {
      state.PhoneVerify.authId = data.authId;
    },
    [types.PATCH_PHONE](state) {
      state.PhoneVerify.isVerify = true;
    },
    [types.SET_JOIN](state, data) {
      _.assign(state.Join, data);
    },
    [types.POST_JOIN](state) {
      state.isJoin = true
    }
  },
  actions,
  getters: {
    Join: state => state.Join,
    PhoneVerify: state => state.PhoneVerify,
  }
};
