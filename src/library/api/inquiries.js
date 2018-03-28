import axios from 'axios';

const API_URL = process.env.API_URL;

const inquiriesList = () => axios.get(`${API_URL}/inquiries/`, {
  withCredentials: true,
}).then(result => result).catch(err => err.response);

export default {
  inquiriesList,
};
