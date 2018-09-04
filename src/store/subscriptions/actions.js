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
  getTomorrowDirect({ commit }, data) {
    return Subscriptions.getTomorrowDirect(data).then(res => {
      if (res.data.result) {
        commit(types.GET_TOMORROW_DIRECT, res.data);
        return res;
      }
      else {
        console.log('내일의 옷장 직접접속 오류');
      }
    });
  },
  destroyTomorrowDirect({ commit }) {
    commit(types.DESTROY_TOMORROW_DIRECT);
  },
  putTomorrow({ commit }, data) {
    return Subscriptions.putTomorrow(data).then(res => {
      return res;
    });
  },
  putTomorrowDirect({ commit }, data) {
    return Subscriptions.putTomorrowDirect(data).then(res => {
      return res;
    });
  },
  getProductDetail({ commit }, data) {
    return Subscriptions.getProductDetail(data).then(res => {
      if (!_.isEmpty(res.data)) {
        let obj = {};
        obj[data] = res.data;
        commit(types.GET_PRODUCT_DETAIL, obj);
      } else {
        alert('상품 정보가 없습니다.');
      }
      return res;
    });
  },
  /*
  * data = { subscriptionId: id, type: 'current' or 'past' }
  * */
  getCurrentFeedbacks({ commit }, data) {
    return Subscriptions.getFeedbacks(data).then(res => {
      if (res.data.result) {
        commit(types.GET_CURRENT_FEEDBACKS, res.data);
        return res;
      }
    });
  },
  getPastFeedbacks({ commit}, data) {
    return Subscriptions.getFeedbacks(formData).then(res => {
      if (res.data.result) {
        commit(types.GET_PAST_FEEDBACKS, res.data);
        return res;
      }
    })
  },

  getFeedbacksDirect({ commit }, data) {
    return Subscriptions.getFeedbacksDirect(data).then(res => {
      if (res.data.result) {
        commit(types.GET_CURRENT_FEEDBACKS_DIRECT, res.data.info);
      }
      return res;
    });
  },

  destroyCurrentFeedbackDirect({ commit }) {
    commit(types.DESTROY_CURRENT_FEEDBACKS_DIRECT);
  },

  getPast({ commit }) {
    return Subscriptions.getPast().then(res => {
      if (!_.isEmpty(res.data.result)) {
        // 데이터가 있다면
        commit(types.GET_PAST_SUCCESS, res.data.result);
      } else {
        commit(types.GET_PAST_FAILED);
      }
      return res;
    });
  },
  getPastDetail({ commit }, data) {
    return Subscriptions.getPastDetail(data).then(res => {
      console.log(res);
    });
  }
};
