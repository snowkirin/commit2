import types from "./mutation-types";
import actions from "./actions";

export default {
  namespaced: true,
  state: {
    MemberCount: null, // type: Number
    MemberStyleType: {}, // type: Object
    MemberStyle: {} // type: Object
  },
  mutations: {
    [types.MEMBER_COUNT](state, data) {
      state.MemberCount = data;
    },
    [types.MEMBER_STYLE_TYPE](state, data) {
      state.MemberStyleType = data;
    },
    [types.MEMBER_STYLE](state, data) {
      state.MemberStyle = data;
    }
  },
  actions,
  getters: {
    MemberCount: state => state.MemberCount,
    MemberStyleType: state => state.MemberStyleType,
    MemberStyle: state => state.MemberStyle
  }
};
