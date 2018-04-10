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

    console.log(result);
    commit(types.SET_TOMORROW_SELECT);
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

export default {
  setTomorrowCloset,
  setTomorrowSelect,
  setPastCloset,
  pastDetailView,
  setCurrentCloset,
};
