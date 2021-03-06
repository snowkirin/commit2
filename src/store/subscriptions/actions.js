import Subscriptions from '@/library/api/subscriptions';
import types from './mutation-types';
export default {
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
  getTomorrowDirect(context, payload) {
    return new Promise((resolve, reject) => {
      Subscriptions.GetTomorrowDirect(payload)
        .then(({ data }) => {
          context.commit(types.GET_TOMORROW_DIRECT, data);
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  putTomorrowDirect({ commit }, data) {
    return Subscriptions.putTomorrowDirect(data).then(res => {
      return res;
    });
  },
  destroyTomorrowDirect({ commit }) {
    commit(types.DESTROY_TOMORROW_DIRECT);
  },

  getTomorrowProductDetail({ commit }, data) {
    return Subscriptions.getProductDetail(data).then(res => {
      if (!_.isEmpty(res.data)) {
        let obj = {};
        obj[data] = res.data;
        commit(types.GET_TOMORROW_PRODUCT_DETAIL, obj);
      } else {
        alert('상품 정보가 없습니다.');
      }
      return res;
    });
  },
  CURRENT(context) {
    return new Promise((resolve, reject) => {
      Subscriptions.GetCurrent()
        .then(({ data }) => {
          context.commit(types.GET_CURRENT, data);
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  getCurrentFeedbacks({ commit }, data) {
    return Subscriptions.getFeedbacks(data).then(res => {
      if (res.data.result) {
        commit(types.GET_CURRENT_FEEDBACKS, res.data);
        return res;
      }
    });
  },

  /* 현재의 옷장 피드백 다이렉트 */
  getCurrentFeedbacksDirect( {commit} , data) {
    return Subscriptions.getFeedbacksDirect(data).then(res => {
      commit(types.GET_CURRENT_FEEDBACKS_DIRECT, res.data.info);
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
  /* 과거의 옷장 상품 상세보기, 2018-09-05: 사용 안하는중*/
  getPastDetail({ commit }, data) {
    return Subscriptions.getPastDetail(data).then(res => {});
  },
  getPastFeedbacks({ commit }, data) {
    return Subscriptions.getFeedbacks(data).then(res => {
      commit(types.GET_PAST_FEEDBACKS, res.data);
      return res;
    });
  },

  /* 피드백 답변 가져오기 */

  // 현재의 옷장
  getCurrentFeedbacksAnswers(data) {
    return Subscriptions.getFeedbacksAnswers(data).then(res => {
      return res;
    });
  },
  // 현재의 옷장 직접접속
  getCurrentFeedbacksDirectAnswers({ commit }, data) {
    return Subscriptions.getFeedbacksAnswers(data).then(res => {
      return res;
    });
  },
  // 과거의 옷장
  getPastFeedbacksAnswers(data) {
    return Subscriptions.getFeedbacksAnswers(data).then(res => {
      return res;
    });
  },

  /* 피드백 답변하기 */

  // 일반적인 피드백 답변

  postFeedbacksAnswers({ commit }, data) {
    return Subscriptions.postFeedbacksAnswers(data).then(res => {
      return res;
    });
  },

  //  피드백 답변 보내기 (색상 및 패턴)
  postFeedbacksAnswersReasons({ commit }, data) {
    return Subscriptions.postFeedbacksAnswersReasons(data).then(res => {
      return res;
    });
  },

  // NPS 답변
  postFeedbacksNps({ commit }, data) {
    return Subscriptions.postFeedbacksNps(data).then(res => {
      return res;
    });
  },

  getSubscriptionInfo({ commit }) {
    return Subscriptions.getSubscriptionInfo().then(res => {
      if (res.data.result) {
        commit(types.GET_SUBSCRIPTION_INFO, res.data);
        return res;
      }
    });
  },
  putSubscriptionRestart({ commit }, data) {
    return Subscriptions.putSubscriptionRestart(data).then(res => {
      if (res.data.result) {
        return res;
      } else {
        return res;
      }
    });
  },

  patchUpdateSubscriptionReturnDate({ commit }, data) {
    return Subscriptions.patchUpdateSubscriptionReturnDate(data).then(res => {
      if (res.data.result) {
        return res;
      } else {
        return res;
      }
    });
  }
};
