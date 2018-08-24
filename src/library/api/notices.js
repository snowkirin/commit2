import axios from 'axios'
const API_URL = process.env.VUE_APP_API_URL;

export default {
  getNotices() {
    const formData = {
      size: 9999,
      page: 1
    };
    return axios
      .get(`${API_URL}/notices`, {
        params: formData
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