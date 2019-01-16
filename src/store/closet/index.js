import types from './mutation-types';
import actions from './actions';

const initialState = {
  /* [ 내일의 옷장 ] */
  TomorrowData: {
    subscription_date: '',
    subscription_id: 0,
    subscription_status: 0,
    productA: [],
    productB: []
  },
  TomorrowDataExist: false,
  TomorrowSelected: '',
  TomorrowDirectState: false,
  /* [ 현재의 옷장 ] */
  CurrentData: {
    coupons: [],
    images: {},
    result: {}
  },
  CurrentDataExist: false,
  CurrentFeedBackData: {},
  CurrentFeedBackState: false,
  CurrentFeedBackDirectState: false,

  DirectAccessFailure: {
    result: false,
    message: ''
  },

  /* [ 과거의 옷장 ] */
  PastData: [],
  PastDataExist: false,
  PastFeedBackData: [],

  /* [ 구독정보 ] */
  SubscriptionData: {
    coupons: [],
    infors: {
      return_date: '',
      payment_date: '',
      membership_name: '',
      membership_price: 0
    },
    price_coupons: []
  },

  /* [ FAQ ] */
  FaqData: {},
  FaqTypes: {},

  /* [ 공지사항 ]*/
  NoticesData: {}
};

const state = Object.assign({}, initialState);
const mutations = {
  [types.RESET_STATE](state) {
    for (let prop in state) {
      state[prop] = initialState[prop];
    }
  },
  /* [내일의 옷장] */
  [types.SET_TOMORROW_DATA](state, payload) {
    // payload = Object
    state.TomorrowData = payload;
  },
  [types.SET_TOMORROW_DATA_EXIST](state, payload) {
    // payload = Boolean
    state.TomorrowDataExist = payload;
  },
  [types.SET_TOMORROW_SELECTED](state, payload) {
    state.TomorrowSelected = payload;
  },
  [types.SET_TOMORROW_DIRECT_STATE](state, payload) {
    state.TomorrowDirectState = payload;
  },
  /* [현재의 옷장] */
  [types.SET_CURRENT_DATA](state, payload) {
    state.CurrentData = payload;
  },
  [types.SET_CURRENT_DATA_EXIST](state, payload) {
    state.CurrentDataExist = payload;
  },
  [types.SET_CURRENT_FEEDBACK_STATE](state, payload) {
    state.CurrentFeedBackState = payload;
  },
  [types.SET_CURRENT_FEEDBACK_DIRECT_STATE](state, payload) {
    state.CurrentFeedBackDirectState = payload;
  },
  [types.SET_CURRENT_FEEDBACK_DATA](state, payload) {
    state.CurrentFeedBackData = payload;
  },
  /* [과거의 옷장] */
  [types.SET_PAST_DATA](state, payload) {
    state.PastData = payload;
  },
  [types.SET_PAST_DATA_EXIST](state, payload) {
    state.PastDataExist = payload;
  },
  [types.SET_PAST_FEEDBACK_DATA](state, payload) {
    state.PastFeedBackData = payload;
  },
  /* [구독 정보] */
  [types.SET_SUBSCRIPTION_DATA](state, payload) {
    state.SubscriptionData.infors = payload.infors;
    state.SubscriptionData.coupons = payload.coupons;
  },

  /* [ FAQ ] */
  [types.SET_FAQ_DATA](state, payload) {
    state.FaqData = payload;
  },
  [types.SET_FAQ_TYPES](state, payload) {
    state.FaqTypes = payload;
  },

  /* [ 공지사항 ] */
  [types.SET_NOTICES_DATA](state, payload) {
    state.NoticesData = payload;
  },

  [types.SET_DIRECT_ACCESS_FAILURE](state, payload) {
    state.DirectAccessFailure = payload;
  }
};
const getters = {
  TomorrowData: state => state.TomorrowData,
  TomorrowDataExist: state => state.TomorrowDataExist,
  TomorrowSelected: state => state.TomorrowSelected,
  TomorrowDirectState: state => state.TomorrowDirectState,

  CurrentData: state => state.CurrentData,
  CurrentDataExist: state => state.CurrentDataExist,
  CurrentFeedBackState: state => state.CurrentFeedBackState,
  CurrentFeedBackDirectState: state => state.CurrentFeedBackDirectState,
  CurrentFeedBackData: state => state.CurrentFeedBackData,

  PastData: state => state.PastData,
  PastDataExist: state => state.PastDataExist,
  PastFeedBackData: state => state.PastFeedBackData,

  SubscriptionData: state => state.SubscriptionData,

  FaqData: state => state.FaqData,
  FaqTypes: state => state.FaqTypes,

  NoticesData: state => state.NoticesData,

  DirectAccessFailure: state => state.DirectAccessFailure
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
