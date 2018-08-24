import types from './mutation-types';
import actions from './actions';

export default {
  namespaced: true,
  state: {
    Current: {
      result: [],
      images: {},
      feedbacks: {},
      feedbacksDirect: {}
    },
    Tomorrow: {
      data: {},
      productDetail: {},
    }
  },
  mutations: {
    [types.GET_CURRENT](state, data) {
      state.Current.result = data.result;
      state.Current.images = data.images;
    },
    [types.GET_TOMORROW](state, data) {
      state.Tomorrow.data = data;
    },
    [types.GET_PRODUCT_DETAIL](state, data) {
      _.assign(state.Tomorrow.productDetail, data);
    },
    [types.GET_CURRENT_FEEDBACKS](state, data) {
      state.Current.feedbacks = data;
    },
    [types.GET_CURRENT_FEEDBACKS_DIRECT](state, data) {
      state.Current.feedbacksDirect = data;
    }
  },
  actions,
  getters: {
    Current: state => state.Current,
    Tomorrow: state => state.Tomorrow
  }
};
