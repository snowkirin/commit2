import axios from 'axios';
import Http from '@/library/HTTP';
const API_URL = process.env.VUE_APP_API_URL;

export default {
  getFaq(data) {
    return axios
      .get(`${API_URL}/faq`, {
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
  QueryMainFaq(data) {
    return Http.query('/faq/mains', {
      params: data
    });
  },
  // getFaqMain(data) {
  //   return axios
  //     .get(`${API_URL}/faq/mains`, {
  //       params: data
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
  getFaqTypes(data) {
    return axios
      .get(`${API_URL}/faq/types`, {
        params: data
      })
      .then(res => {
        return res;
      })
      .catch(err => {
        return {
          ...err.response,
          message: err.message
        }
      })
  }
};

