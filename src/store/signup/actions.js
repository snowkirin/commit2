import Auth from '@/library/api/auth';
import Management from '@/library/api/management';
import Closet from '@/library/api/closet';
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
    { code: '0066a2', text: '파랑' },
    { code: '282d57', text: '남색' },
    { code: '653179', text: '보라' },
    { code: '851a4d', text: '자주' },
    { code: 'ea95a0', text: '핑크' },
    { code: '904f1c', text: '갈색' },
    { code: 'FFFFFF', text: '흰색' },
    { code: '797979', text: '회색' },
    { code: '000000', text: '검정' },
    { code: '', text: '선택 없음' },
  ];

  commit(types.SET_COLORS, colors);
};

const setClothes = async ({ commit }, data) => {
  try {
    const result = await Management.getSingupManagement({
      groupName: data.text,
    });

    if (result.data.result) {
      commit(types.SET_CLOTHES, {
        type: data.type,
        data: result.data.data,
      });
    } else alert('서비스에 문제가 발생하였습니다.\n새로고침 후 다시 시도해주세요');
  } catch (e) {
    console.error(e.message);
  }
};

const setManagement = async ({ commit }, data) => {
  try {
    const result = await Management.getManagementCodes({
      code: data.code,
    });

    if (result.data.result) {
      commit(types.SET_MANAGEMENT, {
        type: data.type,
        data: result.data.data,
      });
    } else alert('서비스에 문제가 발생하였습니다.\n새로고침 후 다시 시도해주세요');
  } catch (e) {
    console.error(e.message);
  }
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

const pickClothes = ({ state, commit }, data) => {
  const isClothe = state.selected[data.type].indexOf(data.id);

  if (isClothe > -1) commit(types.PICK_REMOVE_CLOTHES, { type: data.type, id: isClothe });
  else commit(types.PICK_CLOTHES, { type: data.type, data: [...new Set([...state.selected[data.type], data.id])] });
};

const pickManagement = ({ state, commit }, data) => {
  const isManagement = state.selected[data.type].indexOf(data.id);

  if (isManagement > -1) commit(types.PICK_REMOVE_MANAGEMENT, { type: data.type, id: isManagement });
  else commit(types.PICK_MANAGEMENT, { type: data.type, data: [...new Set([...state.selected[data.type], data.id])] });
};

const phoneVerify = async ({ commit }, data) => {
  try {
    commit(types.PHONE_VERIFY_COUNT);

    const result = await Auth.authPhone({
      ...data,
    });

    commit(types.PHONE_VERIFY, result.data);

    if (result.data.emailDuplicated) {
      alert('이미 가입한 이메일입니다.');
    } else if (result.data.phoneDuplicated) {
      alert('이미 가입한 휴대전화입니다.');
    }
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

const signup = async ({ state }, data) => {
  try {
    let clothes = [];

    if (state.selected.blouse.length > 0) clothes = [...new Set([...clothes, ...state.selected.blouse])];
    else clothes = [...clothes, 12857];
    if (state.selected.knitvest.length > 0) clothes = [...new Set([...clothes, ...state.selected.knitvest])];
    else clothes = [...clothes, 12862];
    if (state.selected.tshirt.length > 0) clothes = [...new Set([...clothes, ...state.selected.tshirt])];
    else clothes = [...clothes, 12861];
    if (state.selected.shirt.length > 0) clothes = [...new Set([...clothes, ...state.selected.shirt])];
    else clothes = [...clothes, 12858];
    if (state.selected.skirt.length > 0) clothes = [...new Set([...clothes, ...state.selected.skirt])];
    else clothes = [...clothes, 12859];
    if (state.selected.pants.length > 0) clothes = [...new Set([...clothes, ...state.selected.pants])];
    else clothes = [...clothes, 12863];
    if (state.selected.onepiece.length > 0) clothes = [...new Set([...clothes, ...state.selected.onepiece])];
    else clothes = [...clothes, 12860];

    if (state.sizeData === undefined || Object.keys(state.sizeData).length === 0) {
      return { msg: '사이즈가 정상적으로 입력되지 않았습니다. 다시 진행해주세요.', result: false };
    } else if (state.mood === undefined || state.mood === null) {
      return { msg: '선호 스타일이 정상적으로 입력되지 않았습니다. 다시 진행해주세요.', result: false };
    } else if (state.firstData.name === undefined || state.firstData.name === null) {
      return { msg: '이름이 정상적으로 입력되지 않았습니다. 다시 진행해주세요.', result: false };
    } else if (state.firstData.email === undefined || state.firstData.email === null) {
      return { msg: '이메일을 정상적으로 입력되지 않았습니다. 다시 진행해주세요.', result: false };
    } else if (state.firstData.phone === undefined || state.firstData.phone === null) {
      return { msg: '핸드폰 번호가 정상적으로 입력되지 않았습니다. 다시 진행해주세요.', result: false };
    } else if (state.firstData.addr === undefined || state.firstData.addr === null) {
      return { msg: '주소를 정상적으로 입력되지 않았습니다. 다시 진행해주세요.', result: false };
    } else if (state.firstData.addrDetail === undefined || state.firstData.addrDetail === null) {
      return { msg: '주소 상세를 정상적으로 입력되지 않았습니다. 다시 진행해주세요.', result: false };
    } else if (state.firstData.zipcode === undefined || state.firstData.zipcode === null) {
      return { msg: '우편번호를 정상적으로 입력되지 않았습니다. 다시 진행해주세요.', result: false };
    } if (data.cardNumber.length <= 14) {
      return { msg: '카드번호를 잘못 입력하셨습니다. 다시 입력해주세요.', result: false };
    }

    const result = await Auth.localJoin({
      sizeData: state.sizeData,
      mood: state.mood,
      prefer: state.colors.prefer,
      except: state.colors.except,
      clothes,
      pattern: (state.selected.pattern.length !== 0) ? state.selected.pattern : [10399],
      material: (state.selected.material.length !== 0) ? state.selected.material : [10299],
      requirement: state.requirement,
      name: state.firstData.name,
      email: state.firstData.email,
      password: state.firstData.password,
      phone: state.firstData.phone,
      ann: state.firstData.ann,
      zipcode: state.firstData.zipcode,
      addr: state.firstData.addr,
      addrDetail: state.firstData.addrDetail,
      deliveryDay: data.deliveryDay,
      cardNumber: data.cardNumber,
      cardYearExpiry: data.cardYearExpiry,
      cardMonthExpiry: data.cardMonthExpiry,
      userBirth: data.userBirth,
      cardPassword: data.cardPassword,
      lobbyPassword: data.lobbyPassword,
      coupon: data.coupon,
    });

    if (result.data.paymentRtn) {
      return { msg: '유효한 카드가 아닙니다.<br/>카드정보를 확인하시고 다시 진행해주세요.', result: false };
    }
    if (result.data.result) return { msg: '회원가입이 완료되었습니다.<br/>로그인 페이지로 이동합니다.', result: true };
  } catch (e) {
    console.error(e.message);
  }

  return false;
};

const saveExit = async ({ state }, origin) => {
  let rtn = false;

  try {
    const result = await Closet.saveMypageStyle({
      selected: state.selected,
      selectedMood: state.mood,
      selectedSize: state.sizeData,
      selectedColor: state.colors,
      originClothes: origin.except_clothes_code,
      originColors: {
        prefer: origin.prefer_color_desc,
        except: origin.except_color_desc,
      },
      originMaterial: origin.except_material_code,
      originPattern: origin.except_pattern_code,
      originSize: {
        bust: origin.bust_size,
        hip: origin.hip_size,
        tall: origin.tall_size,
        waist: origin.waist_size,
      },
      originMood: origin.moodCode,
    });

    rtn = result;
  } catch (e) {
    console.error(e.message);
  }

  return rtn;
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
  setManagement,
  pickManagement,
  pickMood,
  signup,
  saveExit,
};
