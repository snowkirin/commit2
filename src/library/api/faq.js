import axios from 'axios';
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
  /*
  * data = {id: '113,122,112,114,111'}
  * */
  getFaqMain(data) {
    return axios
      .get(`${API_URL}/faq/mains`, {
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

