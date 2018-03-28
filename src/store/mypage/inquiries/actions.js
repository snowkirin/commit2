import Inquiries from '@/library/api/inquiries';
import types from './mutation-types';

const setInquiriesList = async ({ commit }) => {
  try {
    const result = await Inquiries.inquiriesList();

    if (result.data.result.data.length > 0) commit(types.SET_INQUIRIES_LIST, result.data.result.data);
    else alert('서비스에 문제가 발생하였습니다.\n새로고침 후 다시 시도해주세요');
  } catch (e) {
    console.error(e.message);
  }
};

const setInquiriesInfo = async ({ commit }, inquiriesId) => {
  try {
    const result = await Inquiries.inquiriesInfo({ inquiriesId });

    if (result.data.result.data.length > 0) {
      commit(types.SET_INQUIRIES_INFO, {
        first: result.data.result.data[0],
        list: result.data.result.list,
      });
    } else alert('서비스에 문제가 발생하였습니다.\n새로고침 후 다시 시도해주세요');
  } catch (e) {
    console.error(e.message);
  }
};

const selectInquiries = async ({ commit }, data) => {
  commit(types.SELECT_INQUIRIES, data);
};

const setNewInquiries = async ({ commit }, data) => {
  commit(types.NEW_INQUIRIES, data);
};

export default {
  setInquiriesList,
  setInquiriesInfo,
  selectInquiries,
  setNewInquiries,
};
