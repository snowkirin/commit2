import Http from '@/library/HTTP';

export default {
  /* [ 공통 ] */
  // 상품 정보 가져오기
  GetProductDetail(data) {
    return Http.get(`/subscriptions/products/detail/${data}`);
  },
  // 피드백 정보 가져오기
  GetFeedbacks(data) {
    return Http.get(`/subscriptions/feedbacks`, {
      params: { subscriptionId: data }
    });
  },
  // 기존에 입력했던 피드백 답변 정보 가져오기
  GetFeedbacksAnswers(data) {
    return Http.get(`/subscriptions/feedbacks/answers`, {
      params: data
    });
  },
  GetFeedbacksDirect(data) {
    return Http.get(`/subscriptions/feedbacks/directs/${data}`);
  },
  // 피드백 답변하기
  PostFeedbacksAnswers(data) {
    return Http.post(`/subscriptions/feedbacks/answers`, data);
  },
  PostFeedbacksAnswersReasons(data) {
    return Http.post(`/subscriptions/feedbacks/answers-reasons`, data);
  },
  PostFeedbacksNps(data) {
    return Http.post(`/subscriptions/feedbacks/nps`, data);
  },

  /* [ 내일의 옷장 ] */
  // 내일의 옷장 데이터 가져오기
  GetTomorrow() {
    return Http.get('/subscriptions/tomorrow', { withCredentials: true });
  },
  PutTomorrow(data) {
    return Http.put('/subscriptions/tomorrow', data, { withCredentials: true });
  },
  GetTomorrowDirect(data) {
    return Http.get(`/subscriptions/tomorrow/${data}`);
  },
  /* [ 현재의 옷장 ] */
  // 현재의 옷장 데이터 가져오기
  GetCurrent() {
    return Http.get('/subscriptions/current', { withCredentials: true });
  },
  // 현재의 옷장 직접접근 데이터 가져오기
  GetCurrentDirect(data) {
    return Http.get(`/subscriptions/feedbacks/directs/${data}`);
  },
  // 상품 구매
  PostOrders(data) {
    return Http.post('/subscriptions/orders', data, { withCredentials: true });
  },
  /* [ 과거의 옷장]  */
  GetPast() {
    return Http.get(`/subscriptions/past`, {
      withCredentials: true
    });
  },
  GetPastDetail(data) {
    return Http.get(`/subscriptions/past/${data}`, {
      withCredentials: true
    });
  },

  /* [ 구독 정보 ] */
  GetSubscriptionInfo() {
    return Http.get(`/subscriptions/info`, {
      withCredentials: true
    });
  },

  // 구독 재시작
  PutSubscriptionRestart(data) {
    return Http.put(`/subscriptions/restart`, data, {
      withCredentials: true
    });
  },
  PatchUpdateSubscriptionReturnDate(data) {
    return Http.patch(`/subscriptions/updateSubscriptionReturnDate`, data, {
      withCredentials: true
    });
  }
};
