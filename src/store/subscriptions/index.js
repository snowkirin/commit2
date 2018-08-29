import types from './mutation-types';
import actions from './actions';

const initialState = {
  CurrentResult: [],
  CurrentImages: {},
  CurrentFeedbacks: {},
  CurrentFeedBacksDirect: {},
  TomorrowResult: {},
  TomorrowProductDetail: {},
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
  [types.GET_CURRENT](state, data) {
    state.CurrentResult = data.result;
    state.CurrentImages = data.images;
  },
  [types.GET_TOMORROW](state, data) {
    state.TomorrowResult = data;
  },
  [types.GET_PRODUCT_DETAIL](state, data) {
    _.assign(state.TomorrowProductDetail, data);
  },
  [types.GET_CURRENT_FEEDBACKS](state, data) {
    state.CurrentFeedbacks = data;
  },
  [types.GET_CURRENT_FEEDBACKS_DIRECT](state, data) {
    state.CurrentFeedBacksDirect = data;
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
  }
};
const getters = {
  CurrentResult: state => state.CurrentResult,
  CurrentImages: state => state.CurrentImages,
  CurrentFeedbacks: state => state.CurrentFeedbacks,
  CurrentFeedBacksDirect: state => state.CurrentFeedBacksDirect,
  TomorrowResult: state => state.TomorrowResult,
  TomorrowProductDetail: state => state.TomorrowProductDetail,
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
