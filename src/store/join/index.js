import types from './mutation-types';
import actions from './actions';
const initialState = {
  // 회원가입을 위한 사이즈 정보 저장
  SizesForMembership: {},
  // 선호스타일 저장
  PreferredStyleForMembership: {},
  // 유저 기본 정보등 저장
  UserInfoForMembership: {},
  // 결제 등의 정보를 저장
  PaymentForMembership: {},
  // 회원가입, 선호스타일, 유저 기본정보, 결제등의 정보등을 취합해서 회원가입 API에 전송
  MembershipData: {}
};

const state = Object.assign({}, initialState);

const mutations = {
  [types.RESET_STATE](state) {
    for (let prop in state) {
      state[prop] = initialState[prop];
    }
  },
  [types.SET_SIZES_DATA](state, payload) {
    state.SizesForMembership = Object.assign(state.SizesForMembership, payload);
  },
  [types.SET_PREFERRED_STYLE_DATA](state, payload) {
    state.PreferredStyleForMembership = _.assign(
      state.PreferredStyleForMembership,
      payload
    );
  },
  [types.SET_USER_INFO_DATA](state, payload) {
    state.UserInfoForMembership = _.assign(
      state.UserInfoForMembership,
      payload
    );
  },
  [types.SET_PAYMENT_INFO_DATA](state, payload) {
    state.PaymentForMembership = _.assign(state.PaymentForMembership, payload);
  },
  [types.SET_MEMBERSHIP_DATA](state, payload) {
    state.MembershipData = _.assign(state.MembershipData, payload);
  }
};
const getters = {
  SizesForMembership(state) {
    return state.SizesForMembership;
  },
  PreferredStyleForMembership(state) {
    return state.PreferredStyleForMembership;
  },
  UserInfoForMembership(state) {
    return state.UserInfoForMembership;
  },
  PaymentForMembership(state) {
    return state.PaymentForMembership;
  },
  MembershipData(state) {
    return state.MembershipData;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
