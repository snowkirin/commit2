import axios from 'axios';

const API_URL = process.env.API_URL;
// const API_URL = 'http://122.99.214.29:3000/api/v1.0';
// const API_URL = 'http://dev-api.zuly.co.kr/api/v1.0';
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

export default {
  getSize,
  getFirstDeliveryDays,
  getRecommendCode,
  getMembership,
};
