import types from './mutation-types';
import actions from './actions';

const initialState = {
  MemberCount: null, // Number
  MemberStyleType: {}, // Object
  MemberStyle: {}, // Object
  Mypage: {}, // Object
  PhoneAuth: null, // Number : authId
  isPhoneChange: false, // Boolean
  isPaymentChange: false, // Boolean
  isAddressChange: false, // Boolean
  isLobbyPasswordChange: false, // Boolean
  isAnnChange: false, // Boolean
  isPasswordChange: true, // Boolean
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
  },
  [types.POST_PHONE](state, data) {
    state.PhoneAuth = data;
  },
  [types.PATCH_PHONE](state) {
    state.isPhoneChange = true;
  },
  [types.PATCH_PAYMENT](state) {
    state.isPaymentChange = true;
  },
  [types.PATCH_ADDRESS](state) {
    state.isAddressChange = true;
  },
  [types.PATCH_LOBBY_PASSWORD](state) {
    state.isLobbyPasswordChange = true;
  },
  [types.PATCH_ANN](state) {
    state.isAnnChange = true;
  },
  [types.PATCH_PASSWORD](state) {
    state.isPasswordChange = true
  }
};
const getters = {
  MemberCount: state => state.MemberCount,
  MemberStyleType: state => state.MemberStyleType,
  MemberStyle: state => state.MemberStyle,
  Mypage: state => state.Mypage,
  PhoneAuth: state => state.PhoneAuth,
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
