import types from './mutation-types';
import actions from './actions';

const initialState = {
  TomorrowResult: {}, //내일의 옷장 데이터.
  TomorrowProductDetail: {}, //내일의 옷장 상품 상세보기
  TomorrowDirectMemberId: '', // 직접접속 했을경우에는 Member ID가 필요하다.
  isTomorrowDirect: false, // 내일의 옷장 직접 접속 체크

  CurrentResult: {}, // 현재의 옷장 데이터
  CurrentImages: {}, // 현재의 옷장 이미지
  CurrentFeedbacks: {}, // 현재의 옷장 피드백 데이터
  isCurrentFeedbacks: false, // 현재의 옷장 피드백 체크
  CurrentFeedbacksAnswers: {},
  CurrentFeedbacksDirect: {}, // 현재의 옷장 직접접속 피드백 데이터, 이 데이터는 유저의 기본정보 (피드백아이디, 구독아이디, 유저이름등의 정보를 가지고 있다.)
  isCurrentFeedbacksDirect: false, // 현재의 옷장 직접접속 피드백 체크
  CurrentFeedbacksDirectAnswers: {},

  PastResult: [],
  PastIsShow: false,
  PastFeedbacks: [],
  PastProductDetail: {}, //과거의 옷장 상품 상세보기

  SubscriptionInfo: {
    info: {},
    coupons: []
  }
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
  [types.PUT_TOMORROW](state) {},
  [types.GET_TOMORROW_DIRECT](state, data) {
    state.TomorrowResult = data.data;
    state.isTomorrowDirect = true;
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
    state.CurrentResult = data.result[0];
    state.CurrentImages = data.images;
  },
  [types.GET_TOMORROW_PRODUCT_DETAIL](state, data) {
    _.assign(state.TomorrowProductDetail, data);
  },
  [types.GET_CURRENT_FEEDBACKS](state, data) {
    // 현재의 옷장 피드백
    state.CurrentFeedbacks = data;
    state.isCurrentFeedbacks = true;
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
  [types.GET_PAST_PRODUCT_DETAIL](state, data) {
    _.assign(state.PastProductDetail, data);
  },
  [types.GET_SUBSCRIPTION_INFO](state, data) {
    state.SubscriptionInfo.info = data.infors;
    state.SubscriptionInfo.coupons = data.coupons;
  }
};
const getters = {
  TomorrowResult: state => state.TomorrowResult,
  TomorrowProductDetail: state => state.TomorrowProductDetail,
  TomorrowDirectMemberId: state => state.TomorrowDirectMemberId,
  isTomorrowDirect: state => state.isTomorrowDirect,

  CurrentResult: state => state.CurrentResult,
  CurrentImages: state => state.CurrentImages,
  CurrentFeedbacks: state => state.CurrentFeedbacks,
  isCurrentFeedbacks: state => state.isCurrentFeedbacks,
  CurrentFeedbacksDirect: state => state.CurrentFeedbacksDirect,
  isCurrentFeedbacksDirect: state => state.isCurrentFeedbacksDirect,

  PastResult: state => state.PastResult,
  PastIsShow: state => state.PastIsShow,
  PastFeedbacks: state => state.PastFeedbacks,
  PastProductDetail: state => state.PastProductDetail,

  SubscriptionInfo: state => state.SubscriptionInfo
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
