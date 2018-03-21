import axios from 'axios';

const API_URL = process.env.API_URL;
const API_MESSAGE_URL = process.env.API_MESSAGE_URL;

const checkEmail = () => axios.post(`${API_MESSAGE_URL}/auth/email`, {
  email: 'wonyong@onionground.com',
});

// 자체 회원가입 호출
const localJoin = ({
  email,
  password,
  name,
  zipcode,
  addr,
  addrDetail,
}) => axios.post(`${API_URL}/auth/join`, {
  email,
  password,
  name,
  zipcode,
  addr,
  addr_detail: addrDetail,
}).then(result => result).catch(err => Promise.reject(err));

// 로그인
const localLogin = ({
  email,
  password,
}) => axios.post(`${API_URL}/auth/login`, {
  email,
  password,
}, {
  withCredentials: true,
}).then(result => result).catch(err => err.response);

// 폰인증
const authPhone = ({
  email,
  phone,
}) => axios.post(`${API_URL}/auth/phone`, {
  email,
  phone,
}).then(result => result).catch(err => err.response);

const authPhoneCheck = ({
  authId,
  authNumber,
}) => axios.patch(`${API_URL}/auth/phone`, {
  authId,
  authNumber,
}, {
  withCredentials: true,
}).then(result => result).catch(err => err.response);

// 아이디찾기
const authFindId = ({
  name,
  phone,
}) => axios.post(`${API_URL}/auth/findId`, {
  name,
  phone,
}).then(result => result).catch(err => err.response);

// 아이디찾기 인증
const finalAuthFindId = ({
  authId,
  authNumber,
}) => axios.post(`${API_URL}/auth/findId/auth`, {
  authId,
  authNumber,
}).then(result => result).catch(err => err.response);

// 로그아웃
const logout = () => axios.post(`${API_URL}/auth/logout`, { withCredentials: true });

// 로그인상태 체크
const loginStatusCheck = () => axios.get(`${API_URL}/auth/checkLoginStatus`, { withCredentials: true });

export default {
  checkEmail,
  localJoin,
  localLogin,
  logout,
  loginStatusCheck,
  authPhone,
  authPhoneCheck,
  authFindId,
  finalAuthFindId,
};
