import types from "./mutation-types";
import actions from "./actions";

const initialState = {
  MemberCount: null, // type: Number
  MemberStyleType: {}, // Object
  MemberStyle: {}, // Object
  Mypage: {} // Object
};
const state = Object.assign({}, initialState);
const mutations = {
  [types.MEMBER_COUNT](state, data) {
    state.MemberCount = data;
  },
  [types.MEMBER_STYLE_TYPE](state, data) {
    state.MemberStyleType = data;
  },
  [types.MEMBER_STYLE](state, data) {
    state.MemberStyle = data;
  },
  [types.GET_MYPAGE](state, data) {
    state.Mypage = data;
  }

};
const getters = {
  MemberCount: state => state.MemberCount,
  MemberStyleType: state => state.MemberStyleType,
  MemberStyle: state => state.MemberStyle,
  Mypage: state => state.Mypage
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}