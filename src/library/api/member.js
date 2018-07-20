import axios from 'axios';

const API_URL = process.env.API_URL;

async function getMemberCount() {
  try {
    axios.get(`${API_URL}/member/count`)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
  } catch (err) {
    console.error(err, 'member/count');
  }
}

function patchMemberAddress(data) {
  const result = axios.patch(`${API_URL}/member/address`, data, { withCredentials: true })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      alert(err);
      return err;
    });
  return result;
}

function patchMemberMemorialDay(data) {
  const result = axios.patch(`${API_URL}/member/memorialDay`, data, { withCredentials: true })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      alert(err);
      return err;
    });
  return result;
}

async function patchMemberLobbyPassword(data) {
  const result = axios.patch(`${API_URL}/member/addrPassword `, data, { withCredentials: true })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      alert(err);
      return err;
    });
  return result;
}

function patchMemberPassword(data) {
  const result = axios.patch(`${API_URL}/member/password`, data, { withCredentials: true })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      alert(err);
      return err;
    });
  return result;
}

function patchMemberPayment(data) {
  const result = axios.patch(`${API_URL}/member/payment`, data, { withCredentials: true })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      alert(err);
      return err;
    });
  return result;
}

export default {
  getMemberCount,
  patchMemberAddress,
  patchMemberMemorialDay,
  patchMemberLobbyPassword,
  patchMemberPassword,
  patchMemberPayment,
};
