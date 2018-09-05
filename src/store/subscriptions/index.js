import types from './mutation-types';
import actions from './actions';

const initialState = {
  //내일의 옷장 데이터.
  TomorrowResult: {},
  //내일의 옷장 상품 상세보기
  TomorrowProductDetail: {},
  // 직접접속 했을경우에는 Member ID가 필요하다.
  TomorrowDirectMemberId: '',
  // 내일의 옷장 직접 접속 체크
  isTomorrowDirect: false,

  CurrentResult: [],
  CurrentImages: {},
  CurrentFeedbacks: {},
  CurrentFeedbacksDirect: {},
  isCurrentFeedbacksDirect: false,

  PastResult: [],
  PastIsShow: false,
  PastFeedbacks: [],
};
const state = Object.assign({}, initialState);
const mutations = {
  [types.RESET_STATE](state) {
    for (let prop in state) {
      state[prop] = initialState[prop];
    }
  },
  [types.GET_TOMORROW](state, data) {
    state.TomorrowResult = data;
  },
  [types.PUT_TOMORROW](state) {

  },
  [types.GET_TOMORROW_DIRECT](state, data) {
    state.isTomorrowDirect = true;
    state.TomorrowResult = data.data;
    state.TomorrowDirectMemberId = data.info.member_id;
  },
  [types.DESTROY_TOMORROW_DIRECT](state) {
    // 내일의 옷장 초기화
    state.TomorrowResult = {};
    state.TomorrowProductDetail = {};
    state.isTomorrowDirect = false;
    state.TomorrowDirectMemberId = '';
  },

  [types.GET_CURRENT](state, data) {
    state.CurrentResult = data.result;
    state.CurrentImages = data.images;
  },
  [types.GET_PRODUCT_DETAIL](state, data) {
    _.assign(state.TomorrowProductDetail, data);
  },
  [types.GET_CURRENT_FEEDBACKS](state, data) {
    state.CurrentFeedbacks = data;
  },
  [types.GET_CURRENT_FEEDBACKS_DIRECT](state, data) {
    state.CurrentFeedbacksDirect = data;
    state.isCurrentFeedbacksDirect = true;
  },
  [types.DESTROY_CURRENT_FEEDBACKS_DIRECT](state) {
    state.CurrentResult = [];
    state.CurrentImages = {};
    state.CurrentFeedbacks = {};
    state.CurrentFeedbacksDirect = {};
    state.isCurrentFeedbacksDirect = false;
  },

  [types.GET_PAST_SUCCESS](state, data) {
    state.PastResult = data;
    state.PastIsShow = true;
  },
  [types.GET_PAST_FAILED](state) {
    state.PastIsShow = false;
  },
  [types.GET_PAST_FEEDBACKS](state, data) {
    state.PastFeedbacks = _.concat(state.PastFeedbacks, data);
  },

};
const getters = {
  TomorrowResult: state => state.TomorrowResult,
  TomorrowProductDetail: state => state.TomorrowProductDetail,
  TomorrowDirectMemberId: state => state.TomorrowDirectMemberId,
  isTomorrowDirect: state => state.isTomorrowDirect,

  CurrentResult: state => state.CurrentResult,
  CurrentImages: state => state.CurrentImages,
  CurrentFeedbacks: state => state.CurrentFeedbacks,
  CurrentFeedbacksDirect: state => state.CurrentFeedbacksDirect,
  isCurrentFeedbacksDirect: state => state.isCurrentFeedbacksDirect,

  PastResult: state => state.PastResult,
  PastIsShow: state => state.PastIsShow,
  PastFeedbacks: state => state.PastFeedbacks
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
