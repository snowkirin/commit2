import axios from 'axios';

const API_URL = process.env.API_URL;

const checkEmail = () => axios.post('http://localhost:4000/api/v1.0/auth/email', {
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
});

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
};
