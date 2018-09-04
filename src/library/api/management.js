import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL;

const getSingupManagement = ({ groupName }) =>
  axios
    .get(`${API_URL}/code/customer/select`, {
      params: {
        groupName
      }
    })
    .then(result => result)
    .catch(err => err.response);

const getManagementCodes = ({ code }) =>
  axios
    .get(`${API_URL}/code/${code}`)
    .then(result => result)
    .catch(err => err.response);

export default {
  getSingupManagement,
  getManagementCodes
};
