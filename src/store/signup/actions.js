import Auth from '@/library/api/auth';
import types from './mutation-types';

const setFirstData = ({ commit }, data) => {
  commit(types.SET_SIGNUP_FIRST_DATA, data);
};

const setSizeData = ({ commit }, data) => {
  commit(types.SET_SIGNUP_SIZE, data);
};

const setColors = ({ commit }) => {
  const colors = [
    { code: 'b92021', text: '빨강' },
    { code: 'eb6f0e', text: '주황' },
    { code: 'ffd500', text: '노랑' },
    { code: '81bf48', text: '연두' },
    { code: '007438', text: '녹색' },
    { code: '005566', text: '청록' },
    { code: '0066a2', text: '파랑' },
    { code: '282d57', text: '남색' },
    { code: '653179', text: '보라' },
    { code: '851a4d', text: '자주' },
    { code: 'ea95a0', text: '핑크' },
    { code: '904f1c', text: '갈색' },
    { code: 'FFFFFF', text: '흰색' },
    { code: '797979', text: '회색' },
    { code: '000000', text: '검정' },
  ];

  commit(types.SET_COLORS, colors);
};

const setRequirement = ({ commit }, data) => {
  const rtn = (data === '요구사항을 적어주세요.') ? '' : data;
  commit(types.SET_REQUIREMENT, rtn);
};

const pickColors = ({ state, commit }, data) => {
  const isColor = state.colors[data.type].indexOf(data.color);

  if (isColor > -1) commit(types.PICK_REMOVE_COLORS, { type: data.type, index: isColor });
  else {
    commit(types.PICK_COLORS, {
      type: data.type,
      id: data.id,
      colors: [...new Set([...state.colors[data.type], data.color])],
    });
  }
};

const phoneVerify = async ({ commit }, data) => {
  try {
    commit(types.PHONE_VERIFY_COUNT);

    const result = await Auth.authPhone({
      ...data,
    });

    if (result.data.result) commit(types.PHONE_VERIFY, result.data);
  } catch (e) {
    console.error(e.message);
  }
};

const phoneCheckVerify = async ({ state, commit }, data) => {
  try {
    const result = await Auth.authPhoneCheck({
      authId: state.phoneAuthKey,
      ...data,
    });

    if (result.data.result) commit(types.PHONE_VERIFY_CHECK);
  } catch (e) {
    console.error(e.message);
  }
};

export default {
  setSizeData,
  setFirstData,
  phoneVerify,
  phoneCheckVerify,
  setColors,
  pickColors,
  setRequirement,
};
