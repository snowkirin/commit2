import actions from './join.actions';
import types from './join.mutations';

const initialState = {
  // 회원가입시 필요한 데이터 저장
  // 사이즈
  SizeData: {

  },
  // 선호스타일
  PreferredStyleData: {

  },
  // 유저 정보
  UserInfoData: {

  },
  JoinData: {}
};
const state = Object.assign({}, initialState);
const mutations = {
  [types.SAVE_SIZE_DATA](state, payload) {
    state.SizeData = {...payload}
  },
  [types.SAVE_PREFERRED_STYLE_DATA](state, payload) {
    state.PreferredStyleData = {...payload}
  },
  [types.SAVE_USER_INFO_DATA](state, payload) {
    state.UserInfoData = {...payload}
  },
};
const getters = {
  SizeData: state => state.SizeData,
  PreferredStyleData: state => state.PreferredStyleData,
  UserInfoData: state => state.UserInfoData
};


export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
