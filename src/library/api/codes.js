import axios from 'axios';
const API_URL = process.env.VUE_APP_API_URL;

export default {
  getSizes() {
    return axios
      .get(`${API_URL}/code/customer/sizes`)
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
  getFirstDeliveryDays(data) {
    return axios
      .get(`${API_URL}/calendar/firstdeliverydays`, {
        params: {
          schymd: data
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
  getChangeDeliveryDays(data) {
    return axios
      .get(`${API_URL}/calendar/changeDeliveryDays`, {
        withCredentials: true,
        params: {
          schymd: data
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
  getRecommendCode(membership, codeData) {
    return axios
      .get(`${API_URL}/payment/recommendCode`, {
        params: {
          id: membership,
          code: codeData
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
  getOptions() {
    /*
    * 옵션 코드 가져오기
    * path: join/addinfo
    * */
    return axios
      .get(`${API_URL}/code/customer/options`, {
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
