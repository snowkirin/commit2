import axios from 'axios';

const API_URL = process.env.API_URL;

const mypagePwdCheck = ({
  password,
}) => axios.post(`${API_URL}/auth/password`, {
  password,
}, {
  withCredentials: true,
}).then(result => result).catch(err => err.response);

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

// 비밀번호찾기
const authFindPwd = ({
  email,
  phone,
}) => axios.post(`${API_URL}/auth/findPwd`, {
  email,
  phone,
}).then(result => result).catch(err => err.response);

// 아이디찾기 인증
const finalAuth = ({
  authId,
  authNumber,
}) => axios.post(`${API_URL}/auth/find/auth`, {
  authId,
  authNumber,
}).then(result => result).catch(err => err.response);

// 비밀번호찾기 변경
const findPwdComplete = ({
  authId,
  password,
}) => axios.post(`${API_URL}/auth/password/complete`, {
  authId,
  password,
}).then(result => result).catch(err => err.response);

// 로그아웃
const logout = () => axios.post(`${API_URL}/auth/logout`, { withCredentials: true });

// 로그인상태 체크
const loginStatusCheck = () => axios.get(`${API_URL}/auth/checkLoginStatus`, { withCredentials: true });

export default {
  mypagePwdCheck,
  localJoin,
  localLogin,
  logout,
  loginStatusCheck,
  authPhone,
  authPhoneCheck,
  authFindId,
  authFindPwd,
  finalAuth,
  findPwdComplete,
};
