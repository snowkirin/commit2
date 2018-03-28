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

const setClothes = ({ commit }) => {
  const clothes = [
    { id: 1, title: '이미지1', src: 'IMAGE SRC' },
    { id: 2, title: '이미지2', src: 'IMAGE SRC' },
    { id: 3, title: '이미지3', src: 'IMAGE SRC' },
    { id: 4, title: '이미지4', src: 'IMAGE SRC' },
    { id: 5, title: '이미지5', src: 'IMAGE SRC' },
    { id: 6, title: '이미지6', src: 'IMAGE SRC' },
    { id: 7, title: '이미지7', src: 'IMAGE SRC' },
  ];

  commit(types.SET_CLOTHES, clothes);
};

const setPatterns = ({ commit }) => {
  const patterns = [
    { id: 1, title: '이미지1', src: 'IMAGE SRC' },
    { id: 2, title: '이미지2', src: 'IMAGE SRC' },
    { id: 3, title: '이미지3', src: 'IMAGE SRC' },
  ];

  commit(types.SET_PATTERNS, patterns);
};

const setMaterial = ({ commit }) => {
  const material = [
  ];

  commit(types.SET_MATERIAL, material);
};

const setRequirement = ({ commit }, data) => {
  const rtn = (data === '요구사항을 적어주세요.') ? '' : data;
  commit(types.SET_REQUIREMENT, rtn);
};

const pickMood = ({ commit }, data) => {
  commit(types.PICK_MOOD, data);
};

const pickColors = ({ state, commit }, data) => {
  const isColor = state.colors[data.type].indexOf(data.color);

  if (isColor > -1) commit(types.PICK_REMOVE_COLORS, { type: data.type, index: isColor });
  else {
    commit(types.PICK_COLORS, {
      type: data.type,
      colors: [...new Set([...state.colors[data.type], data.color])],
    });
  }
};

const pickClothes = ({ state, commit }, id) => {
  const isClothe = state.clothes.indexOf(id);

  if (isClothe > -1) commit(types.PICK_REMOVE_CLOTHES, isClothe);
  else commit(types.PICK_CLOTHES, [...new Set([...state.clothes, id])]);
};

const pickPatterns = ({ state, commit }, id) => {
  const isPattern = state.patterns.indexOf(id);

  if (isPattern > -1) commit(types.PICK_REMOVE_PATTERN, isPattern);
  else commit(types.PICK_PATTERN, [...new Set([...state.patterns, id])]);
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
  setClothes,
  pickClothes,
  setPatterns,
  setMaterial,
  pickPatterns,
  pickMood,
};
