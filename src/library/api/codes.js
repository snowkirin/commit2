// import axios from '@/library/HTTP';
import axios from 'axios';

const API_URL = process.env.API_URL;

async function getSize() {
  try {
    const result = await axios.get(`${API_URL}/code/customer/sizes`);
    return result;
  } catch (err) {
    console.error(err);
  }
}
async function getFirstDeliveryDays() {
  try {
    const result = await axios.get(`${API_URL}/calendar/firstdeliverydays`);
    return result;
  } catch (err) {
    console.error(err);
  }
}
async function getRecommendCode(membership, codeData) {
  try {
    const result = axios.get(`${API_URL}/payment/recommendCode`, {
      params: {
        id: membership,
        code: codeData,
      }
    }).then(function(res) {
      return res;
    }).catch(function(error) {
      return error;
    });
    return result;
  } catch (err) {
    console.error(err);
  }
};
async function getMembership() {
  try {
    const result = axios.get(`${API_URL}/payment/membership`, {
      params: {
        // 오픈베타 동안 멤버쉽은 1로 고정
        id: 1,
      }
    }).then(function(res) {
      return res;
    }).catch(function(error) {
      return error;
    });
    return result;
  } catch (err) {
    console.error(err);
  }
}

async function getOptions() {
  try {
    const result = axios.get(`${API_URL}/code/customer/options`, {
      withCredentials: true,
    }).then(function(res) {
      return res;
    }).catch(function(error) {
      return error;
    });
    return result;
  } catch (err) {
    console.error(err);
  }
}
function postMemberImages(data) {
  const result = axios.post(`${API_URL}/member/images`, data,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    })
    .then(function(res) {
      return res;
    })
    .catch(function(err) {
      return err;
    });
  return result;
}
function postMemberStyle(data) {
  const result = axios.post(`${API_URL}/member/style`, data, {
      withCredentials: true,
    })
    .then(function(res) {
      return res;
    })
    .catch(function(err) {
      return err;
    });
  return result;
}

async function postMemberImageStyle(imageData, styleData) {
  try {
    const result = axios.all([postMemberImages(imageData), postMemberStyle(styleData)])
      .then(axios.spread(function(acct,perms) {
        console.log(acct, '헬로');
        console.log(perms, '월드');
      }));
    return result;
  } catch(err) {
    console.log(err);
  }
}



export default {
  getSize,
  getFirstDeliveryDays,
  getRecommendCode,
  getMembership,
  getOptions,
  postMemberImages,
  postMemberStyle,
  postMemberImageStyle,
};
