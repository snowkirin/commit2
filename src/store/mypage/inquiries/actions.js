import Inquiries from '@/library/api/inquiries';
import types from './mutation-types';

const setInquiriesList = async ({ commit }) => {
  try {
    const result = await Inquiries.inquiriesList();

    if (result.data.result.data.length > 0)
      commit(types.SET_INQUIRIES_LIST, result.data.result.data);
    else
      alert('서비스에 문제가 발생하였습니다.\n새로고침 후 다시 시도해주세요');
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
        list: result.data.result.list
      });
    } else
      alert('서비스에 문제가 발생하였습니다.\n새로고침 후 다시 시도해주세요');
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

const setSaveInquiries = async ({ state }) => {
  if (state.newInquiries.length > 0) {
    const result = await Inquiries.setNewInquiries({
      subject: state.newInquiries[0].text,
      email: 'a',
      email_noti: 'Y',
      cell_phone: 0,
      cell_phone_noti: 'Y',
      inquiryType: parseInt(state.selectInquiries, 10),
      content: state.newInquiries[0].text
    });

    if (result.data.inquiryId) {
      const prmList = [];

      for (let i = 1; i < state.newInquiries.length; i += 1) {
        prmList.push(
          Inquiries.setPutInquiries({
            inquiriesId: result.data.inquiryId,
            content: state.newInquiries[i].text
          })
        );
      }

      await Promise.all(prmList);
    }
  }
};

const setMobileInquiries = async ({ commit }, data) => {
  const result = await Inquiries.setNewInquiries({
    subject: data.subject,
    email: 'a',
    email_noti: 'Y',
    cell_phone: 0,
    cell_phone_noti: 'Y',
    inquiryType: parseInt(data.type, 10),
    content: data.text
  });

  if (result.data.inquiryId) commit(types.SET_INQUIRIES_SUCCESS);
  else alert('시스템에 문제가 발생했습니다.\n잠시 후 다시 시도해주세요.');
};

export default {
  setInquiriesList,
  setInquiriesInfo,
  selectInquiries,
  setNewInquiries,
  setSaveInquiries,
  setMobileInquiries
};
