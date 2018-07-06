import axios from 'axios';

const API_URL = process.env.API_URL;


async function mypageFeedback(id) {
  try {
    const result = axios.get(`${API_URL}/subscriptions/feedbacks`, {
      params: {
        subscriptionId: id
      }
    }).then(function(res) {
      return res;
    }).catch(function(error) {
      return error;
    });
    return result;
  } catch (err) {
    console.log(err);
  }
}

const mypageInfo = () => axios.get(`${API_URL}/member/mypage`, {
  withCredentials: true,
}).then(result => result).catch(err => err.response);

const mypageStyle = () => axios.get(`${API_URL}/member/mypage/style`, {
  withCredentials: true,
}).then(result => result).catch(err => err.response);

const mypageTomorrowCloset = () => axios.get(`${API_URL}/subscriptions/tomorrow`, {
  withCredentials: true,
}).then(result => result).catch(err => err.response);

const mypageTomorrowSelect = ({
  subscriptionId,
  products,
}) => axios.put(`${API_URL}/subscriptions/tomorrow`, {
  subscription_id: subscriptionId,
  products,
}, {
  withCredentials: true,
}).then(result => result).catch(err => err.response);

const mypagePastCloset = () => axios.get(`${API_URL}/subscriptions/past`, {
  withCredentials: true,
}).then(result => result).catch(err => err.response);

const mypagePastClosetDetail = ({
  pastId,
}) => axios.get(`${API_URL}/subscriptions/past/${pastId}`, {
  withCredentials: true,
}).then(result => result).catch(err => err.response);

const mypageCurrentCloset = () => axios.get(`${API_URL}/subscriptions/current`, {
  withCredentials: true,
}).then(result => result).catch(err => err.response);

const saveMypageStyle = ({
  selected,
  selectedMood,
  selectedSize,
  selectedColor,
  originClothes,
  originColors,
  originMaterial,
  originPattern,
  originSize,
  originMood,
}) => axios.post(`${API_URL}/member/mypage/style`, {
  selected,
  selectedMood,
  selectedSize,
  selectedColor,
  originClothes,
  originColors,
  originMaterial,
  originPattern,
  originSize,
  originMood,
}, {
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

const setChangePayment = ({
  cardNumber,
  cardYearExpiry,
  cardMonthExpiry,
  userBirth,
  cardPassword,
}) => axios.patch(`${API_URL}/member/payment`, {
  cardNumber,
  cardYearExpiry,
  cardMonthExpiry,
  userBirth,
  cardPassword,
}, {
  withCredentials: true,
}).then(result => result).catch(err => Promise.reject(err));

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

const buyUsedProduct = ({
  amount,
  name,
  itemId,
  itemType,
  paymentMethod,
}) => axios.post(`${API_URL}/payment/buyUsedProduct`, {
  amount,
  name,
  itemId,
  itemType,
  paymentMethod,
}, {
  withCredentials: true,
}).then(result => result).catch(err => err.response);

export default {
  mypageInfo,
  mypageStyle,
  mypageTomorrowCloset,
  mypageTomorrowSelect,
  mypagePastCloset,
  mypagePastClosetDetail,
  mypageCurrentCloset,
  saveMypageStyle,
  setChangeEmail,
  setChangePwd,
  setChangePayment,
  authPhone,
  authPhoneCheck,
  buyUsedProduct,
  mypageFeedback,
};
