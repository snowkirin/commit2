import Management from '@/library/api/management';
import types from './mutation-types';

const setNoticeList = async ({ commit }) => {
  try {
    const result = await Management.getNoticeList();

    if (result.data.data.data.length > 0)
      commit(types.SET_NOTICE_LIST, result.data.data.data);
    else
      alert('서비스에 문제가 발생하였습니다.\n새로고침 후 다시 시도해주세요');
  } catch (e) {
    console.error(e.message);
  }
};

export default {
  setNoticeList
};
