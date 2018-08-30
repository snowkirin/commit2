import axios from 'axios';
const API_URL = process.env.VUE_APP_API_URL;

export default {
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
  getCurrent() {
    return axios
      .get(`${API_URL}/subscriptions/current`, {
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
  getTomorrowDirect(data) {
    return axios
      .get(
        `${API_URL}/subscriptions/tomorrow`,
        {
          parms: data
        },
        {
          withCredentials: true
        }
      )
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
  /*
  * data = { subscriptionId: 180810000002 (Number) }
  * */
  getFeedbacks(data) {
    return axios
      .get(
        `${API_URL}/subscriptions/feedbacks`,
        {
          params: data
        },
        {
          withCredentials: true
        }
      )
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
  getFeedbacksAnswers() {},
  postFeedbacksAnswers() {},
  postFeedbacksAnswersReasons() {},
  postFeedbacksNps() {},
  /*
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
  }
};
