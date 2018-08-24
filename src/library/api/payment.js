import axios from 'axios';
const API_URL = process.env.VUE_APP_API_URL;

export default {
  getMembership() {
    return axios
      .get(`${API_URL}/payment/membership`, {
        params: {
          id: 1
        }
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
  getRecommendCode(data) {
    return axios
      .get(`${API_URL}/payment/recommendCode`, {
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
  }
};
