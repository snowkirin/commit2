import axios from 'axios';
import Http from '@/library/HTTP';
const API_URL = process.env.VUE_APP_API_URL;

export default {
  /*
  * 내일의 옷장 데이터
  * */
  getTomorrow() {
    return axios
      .get(`${API_URL}/subscriptions/tomorrow`, {
        withCredentials: true
      })
      .then(res => {
        return res;
      })
      .catch(err => {
        return {
          ...err.response,
          message: err.message
        };
      });
  },
  /*
  * 내일의 옷장 - 선택하기
  * data = { subscription_id: 65, products: [175,176] }
  * */
  putTomorrow(data) {
    return axios
      .put(`${API_URL}/subscriptions/tomorrow`, data, {
        withCredentials: true
      })
      .then(res => {
        return res;
      })
      .catch(err => {
        return {
          ...err.response,
          message: err.message
        };
      });
  },
  /*
  * 내일의 옷장 직접 접속
  * data = D2D42E57A6DC11E88ED9028465BB46CC (access_token)
  * */
  getTomorrowDirect(data) {
    return axios
      .get(`${API_URL}/subscriptions/tomorrow/${data}`)
      .then(res => {
        return res;
      })
      .catch(err => {
        return {
          ...err.response,
          message: err.message
        };
      });
  },
  /*
  * 내일의 옷장 직접 접속후 선택하기
  * data = {"subscription_id": 65,"member_id": 65, "products": [175,176]}
  * */
  putTomorrowDirect(data) {
    return axios
      .put(`${API_URL}/subscriptions/tomorrow/direct`, data)
      .then(res => {
        return res;
      })
      .catch(err => {
        return {
          ...err.response,
          message: err.message
        };
      });
  },

  /*
  * 상품 상세보기 - 현재는 내일의 옷장에 적용이 되어 있음.
  * data(params) = { id: 381 (Number) }
  * */
  getProductDetail(data) {
    return axios
      .get(`${API_URL}/subscriptions/products/detail/${data}`, {
        withCredentials: true
      })
      .then(res => {
        return res;
      })
      .catch(err => {
        return {
          ...err.response,
          message: err.message
        };
      });
  },

  /* 현재의 옷장 데이터 */
  GetCurrent() {
    return Http.get('/subscriptions/current', { withCredentials: true });
  },
  PostOrders(data) {
    return Http.post('/subscriptions/orders', data, { withCredentials: true });
  },
  GetTomorrowDirect(data) {
    return Http.get(`/subscriptions/tomorrow/${data}`);
  },
  GetCurrentDirect(data) {
    return Http.get(`/subscriptions/feedbacks/directs/${data}`)
  },
  // getCurrent() {
  //   return axios
  //     .get(`${API_URL}/subscriptions/current`, {
  //       withCredentials: true
  //     })
  //     .then(res => {
  //       return res;
  //     })
  //     .catch(err => {
  //       return {
  //         ...err.response,
  //         message: err.message
  //       };
  //     });
  // },

  /*
  * 과거의 옷장 데이터
  * */
  getPast() {
    return axios
      .get(`${API_URL}/subscriptions/past`, {
        withCredentials: true
      })
      .then(res => {
        return res;
      })
      .catch(err => {
        return {
          ...err.response,
          message: err.message
        };
      });
  },
  /*
  * 과거의 옷장 상세 (구매내역) 2018-09-05: 사용안하는중
  * data = { id: 1 }
  * */
  getPastDetail(data) {
    return axios
      .get(`${API_URL}/subscriptions/past/${data}`, {
        withCredentials: true
      })
      .then(res => {
        return res;
      })
      .catch(err => {
        return {
          ...err.response,
          message: err.message
        };
      });
  },
  /*
  * 현재의 옷장 데이터
  * */

  /*
  * 피드백 가져오기 (과거의 옷장, 현재의 옷장)
  * data = { subscriptionId: 180810000002 (Number) }
  * */
  getFeedbacks(data) {
    return axios
      .get(`${API_URL}/subscriptions/feedbacks`, {
        params: data
      })
      .then(res => {
        return res;
      })
      .catch(err => {
        return {
          ...err.response,
          message: err.message
        };
      });
  },
  /*
  * 피드백 답변했던 데이터 가져오기
  * data = { subscriptionId : 0000000, feedbackId : 0000 }
  * */
  getFeedbacksAnswers(data) {
    return axios
      .get(`${API_URL}/subscriptions/feedbacks/answers`, { params: data })
      .then(res => {
        return res;
      })
      .catch(err => {
        return {
          ...err.response,
          message: err.message
        };
      });
  },
  /*
  * 피드백 답변하기
  * data =
  {
    "subscriptionId": 581,
    "feedbackId": 6,
    "clothType": 10400,
    "questionCode": 14003,
    "answerCode": 14001,
    "barcode": 6867244835818
  }
  * */
  postFeedbacksAnswers(data) {
    return axios
      .post(`${API_URL}/subscriptions/feedbacks/answers`, data)
      .then(res => {
        return res;
      })
      .catch(err => {
        return {
          ...err.response,
          message: err.message
        };
      });
  },
  /*
  * 피드백 답변하기 (별로 일 경우) 입력창 데이터
  * data =
  {
    "subscriptionId": 581,
    "feedbackId": 6,
    "clothType": 10400,
    "questionCode": 14003,
    "answerCode": 14001,
    "answerReason": "소재 질감 둘다 별로잖아요! 나한테 잘 맞춰주세요!",
    "barcode": 6867244835818
  }
  * */
  postFeedbacksAnswersReasons(data) {
    return axios
      .post(`${API_URL}/subscriptions/feedbacks/answers-reasons`, data)
      .then(res => {
        return res;
      })
      .catch(err => {
        return {
          ...err.response,
          message: err.message
        };
      });
  },
  /*
  * 피드백 답변하기 숫자로 평가하기
  *
  * {
  "subscriptionId": 581,
  "feedbackId": 5,
  "npsScore": 10
}
  * */
  postFeedbacksNps(data) {
    return axios
      .post(`${API_URL}/subscriptions/feedbacks/nps`, data)
      .then(res => {
        return res;
      })
      .catch(err => {
        return {
          ...err.response,
          message: err.message
        };
      });
  },
  /*
  * 피드백 직접접근 : 현재의 옷장
  * data = '469DB8B49C3F11E88ED9028465BB46CC' (String)
  * */
  getFeedbacksDirect(data) {
    return axios
      .get(`${API_URL}/subscriptions/feedbacks/directs/${data}`)
      .then(res => {
        return res;
      })
      .catch(err => {
        return {
          ...err.response,
          message: err.message
        };
      });
  },

  /*
  * 구독 정보 조회
  * */
  getSubscriptionInfo() {
    return axios
      .get(`${API_URL}/subscriptions/info`, {
        withCredentials: true
      })
      .then(res => {
        return res;
      })
      .catch(err => {
        return {
          ...err.response,
          message: err.message
        };
      });
  },

  // 구독 재시작
  putSubscriptionRestart(data) {
    return axios
      .put(`${API_URL}/subscriptions/restart`, data, {
        withCredentials: true
      })
      .then(res => {
        return res;
      })
      .catch(err => {
        return {
          ...err.response,
          message: err.message
        };
      });
  },

  /*
  * 배송일 변경
  * params: { idNext: Number, date: YYYY-MM-DD }
  * */
  patchUpdateSubscriptionReturnDate(data) {
    return axios
      .patch(`${API_URL}/subscriptions/updateSubscriptionReturnDate`, data, {
        withCredentials: true
      })
      .then(res => {
        return res;
      })
      .catch(err => {
        return {
          ...err.response,
          message: err.message
        };
      });
  }
};
