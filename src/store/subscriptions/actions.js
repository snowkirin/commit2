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
  putTomorrow({ commit }, data) {
    return Subscriptions.putTomorrow(data).then(res => {
      return res;
    });
  },
  getProductDetail({ commit }, data) {
    return Subscriptions.getProductDetail(data).then(res => {
      if (res.data.result) {
        let obj = {};
        obj[data] = res.data.data;
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
  getFeedbacks({ commit }, data) {
    const formData = {
      subscriptionId: data.subscriptionId
    }
    return Subscriptions.getFeedbacks(formData).then(res => {
      if (res.data.result) {
        if (data.type === 'current') {
          // 과거의 옷장
          commit(types.GET_CURRENT_FEEDBACKS, res.data);
        } else if (data.type === 'past') {
        // 현재의 옷장
          commit(types.GET_PAST_FEEDBACKS, res.data);
        }
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
  },
  getPast({ commit }) {
    return Subscriptions.getPast().then(res => {
      if (!_.isEmpty(res.data.result)) {
        // 데이터가 있다면
        commit(types.GET_PAST_SUCCESS, res.data.result);
      } else {
        commit(types.GET_PAST_FAILED);
      }
    });
  },
  getPastDetail({ commit }, data) {
    return Subscriptions.getPastDetail(data).then(res => {
      console.log(res);
    })
  }
};
