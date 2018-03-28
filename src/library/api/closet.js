import axios from 'axios';

const API_URL = process.env.API_URL;

const mypageInfo = () => axios.get(`${API_URL}/member/mypage`, {
  withCredentials: true,
}).then(result => result).catch(err => err.response);

const setChangeEmail = ({
  changeEmail,
}) => axios.patch(`${API_URL}/member/email`, {
  changeEmail,
}, {
  withCredentials: true,
}).then(result => result).catch(err => err.response);

export default {
  mypageInfo,
  setChangeEmail,
};
