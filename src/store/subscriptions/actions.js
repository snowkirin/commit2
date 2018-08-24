import Subscriptions from '@/library/api/subscriptions';
import types from './mutation-types';

export default {
  getCurrent({ commit }) {
    return Subscriptions.getCurrent().then(res => {
      // 여기엔 result 값으로 판단 할 수가 없다.
      if (!_.isEmpty(res.data.result)) {
        // 제대로 result 값이 있다면
        commit(types.GET_CURRENT, res.data);
      }
      return res;
    });
  },
  getTomorrow({ commit }) {
    return Subscriptions.getTomorrow().then(res => {
      if (res.data.result) {
        commit(types.GET_TOMORROW, res.data.data);
      }
      return res;
    });
  },
  getProductDetail({ commit }, data) {
    return Subscriptions.getProductDetail(data)
      .then(res => {
        if (res.data.result) {
          let obj = {};
          obj[data] = res.data.data;
          commit(types.GET_PRODUCT_DETAIL, obj);
        } else {
          alert('상품 정보가 없습니다.')
        }
        return res;
      })
  },
  getFeedbacks({ commit }, data) {
    return Subscriptions.getFeedbacks(data).then(res => {
      if (res.data.result) {
        commit(types.GET_CURRENT_FEEDBACKS, res.data);
      }
      return res;
    });
  },
  getFeedbacksDirect({ commit }, data) {
    return Subscriptions.getFeedbacksDirect(data).then(res => {
      console.log(res);
      if (res.data.result) {
        commit(types.GET_CURRENT_FEEDBACKS_DIRECT, res.data.info);
      }
      return res;
    });
  }
};
