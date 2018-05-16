import Closet from '@/library/api/closet';
import types from './mutation-types';

const setTomorrowCloset = async ({ commit }) => {
  try {
    const result = await Closet.mypageTomorrowCloset();

    if (result.data.result && result.data.data.subscription_id) commit(types.SET_TOMORROW_CLOSET, result.data.data);
    else if (!result.data.result) commit(types.SET_TOMORROW_NONE);
    else alert('시스템에 문제가 발생했습니다.\n잠시 후 다시 시도해주세요.');
  } catch (e) {
    console.error(e.message);
  }
};

const setTomorrowSelect = async ({ commit }, data) => {
  try {
    const result = await Closet.mypageTomorrowSelect({
      ...data,
    });

    if (result.data.result) commit(types.SET_TOMORROW_SELECT);
    else alert('시스템에 문제가 발생했습니다.\n잠시 후 다시 시도해주세요.');
  } catch (e) {
    console.error(e.message);
  }
};

const setPastCloset = async ({ commit }) => {
  try {
    const result = await Closet.mypagePastCloset();

    if (result.data.result.length > 0) commit(types.SET_PAST_CLOSET, result.data.result);
    else if (result.data.result.length === 0) commit(types.SET_PARENT_NONE);
    else alert('시스템에 문제가 발생했습니다.\n잠시 후 다시 시도해주세요.');
  } catch (e) {
    console.error(e.message);
  }
};

const pastDetailView = async ({ commit }, data) => {
  try {
    const result = await Closet.mypagePastClosetDetail(data);

    if (result.data.products.count > 0) commit(types.SET_PAST_DETAIL_VIEW, result.data);
    else alert('시스템에 문제가 발생했습니다.\n잠시 후 다시 시도해주세요.');
  } catch (e) {
    console.error(e.message);
  }
};

const setCurrentCloset = async ({ commit }) => {
  try {
    const result = await Closet.mypageCurrentCloset();

    if (result.data.result.length > 0) commit(types.SET_CURRENT_CLOSET, result.data.result[0]);
    else if (result.data.result.length === 0) commit(types.SET_CURRENT_NONE);
    else alert('시스템에 문제가 발생했습니다.\n잠시 후 다시 시도해주세요.');
  } catch (e) {
    console.error(e.message);
  }
};

const buyUsedProduct = async (Object, data) => {
  try {
    // for (let i = 0; data.length > i; i += 1) {
    //   const result = Closet.buyUsedProduct({
    //     amount: data[i].used_price,
    //     name: data[i].name,
    //     itemId: data[i].id,
    //     itemType: '13602', // 13600:결제항목구분
    //     paymentMethod: '10614', // 10600:결제방법
    //   });
    //   result.then(res => commit(types.PAYMENT_CURRENT, { name: data[i].name, message: res.data.message }))
    //     .catch(err => alert(`시스템에 문제가 발생했습니다.\n잠시 후 다시 시도해주세요.\n${err}`));

    const itemList = {};
    for (let i = 0; data.length > i; i += 1) {
      if (i === 0) {
        itemList.amount = Number(data[i].used_price);
        itemList.name = data[i].name;
        itemList.itemId = data[i].id;
        itemList.itemType = '13602'; // 13600:결제항목구분
        itemList.paymentMethod = '10614'; // 10600:결제방법
      } else {
        itemList.amount += Number(data[i].used_price);
        itemList.name = `${data[i].name} 외 ${i}건`;
      }
    }

    Closet.buyUsedProduct(itemList)
      .then(res => alert(`${itemList.name}\n${res.data.message}`))
      .catch(err => alert(`시스템에 문제가 발생했습니다.\n잠시 후 다시 시도해주세요.\n${err}`));
  } catch (e) {
    console.error(e.message);
  }
};

const initPaymentCurrent = async ({ commit }) => {
  try {
    commit(types.INIT_PAYMENT_CURRENT);
  } catch (e) {
    console.error(e.message);
  }
};

export default {
  setTomorrowCloset,
  setTomorrowSelect,
  setPastCloset,
  pastDetailView,
  setCurrentCloset,
  buyUsedProduct,
  initPaymentCurrent,
};
