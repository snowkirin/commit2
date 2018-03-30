import axios from 'axios';

const API_URL = process.env.API_URL;

const mypageInfo = () => axios.get(`${API_URL}/member/mypage`, {
  withCredentials: true,
}).then(result => result).catch(err => err.response);

const mypageStyle = () => axios.get(`${API_URL}/member/mypage/style`, {
  withCredentials: true,
}).then(result => result).catch(err => err.response);

const setChangeEmail = ({
  changeEmail,
}) => axios.patch(`${API_URL}/member/email`, {
  changeEmail,
}, {
  withCredentials: true,
}).then(result => result).catch(err => err.response);

const setChangePwd = ({
  curPassword,
  newPassword,
}) => axios.patch(`${API_URL}/member/password`, {
  cur_password: curPassword,
  new_password: newPassword,
}, {
  withCredentials: true,
}).then(result => result).catch(err => err.response);

const authPhone = ({
  phone,
}) => axios.post(`${API_URL}/member/phone`, {
  phone,
}, {
  withCredentials: true,
}).then(result => result).catch(err => err.response);

const authPhoneCheck = ({
  authId,
  authNumber,
}) => axios.patch(`${API_URL}/member/phone`, {
  authId,
  authNumber,
}, {
  withCredentials: true,
}).then(result => result).catch(err => err.response);

export default {
  mypageInfo,
  mypageStyle,
  setChangeEmail,
  setChangePwd,
  authPhone,
  authPhoneCheck,
};
