import axios from 'axios';

const API_URL = process.env.API_URL;

export default {
  getSizes() {
    return axios.get(`${API_URL}/code/customer/sizes`);
  },
  getOptions() {
    return axios.get(`${API_URL}/code/customer/options`);
  },
};
