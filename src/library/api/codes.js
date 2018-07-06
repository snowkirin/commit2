import axios from 'axios';

const API_URL = process.env.API_URL;
// const API_URL = 'http://122.99.214.29:3000/api/v1.0';
// const API_URL = 'http://dev-api.zuly.co.kr/api/v1.0';
async function getSize() {
  try {
    const result = await axios.get(`${API_URL}/code/customer/sizes`);
    return result;
  } catch (err) {
    console.log(err);
  }
}
async function getFirstDeliveryDays() {
  try {
    const result = await axios.get(`${API_URL}/calendar/firstdeliverydays`);
    return result;
  } catch (err) {
    console.log(err);
  }
}
export default {
  getSize,
  getFirstDeliveryDays,
};
