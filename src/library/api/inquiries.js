import axios from 'axios';
const API_URL = process.env.VUE_APP_API_URL;

export default {
  getInquiries() {
    return axios
      .get(`${API_URL}/inquiries`, {
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
  postInquiries(data) {
    return axios
      .post(`${API_URL}/inquiries`, data, {
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
  getInquiriesDetail(id) {
    return axios
      .get(`${API_URL}/inquiries/${id}`, {
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
  putInquiriesDetail(id, content) {
    return axios
      .put(`${API_URL}/inquiries/${id}`, content, {
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
}