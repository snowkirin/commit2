import types from './mutation-types';
import actions from './actions';

export default {
  namespaced: true,
  state: {
    sizeData: {},
    firstData: {},
    colors: {
      prefer: [],
      except: [],
    },
    clothes: [],
    patterns: [],
    requirement: '',
    phoneAuth: false,
    phoneAuthKey: null,
    phoneAuthCnt: 0,
    surveyStorage: {
      colors: [],
      cloths: [],
      patterns: [],
      material: [],
    },
  },
  mutations: {
    [types.SET_SIGNUP_FIRST_DATA](state, data) {
      state.firstData = { ...data };
    },
    [types.SET_SIGNUP_SIZE](state, data) {
      state.sizeData = { ...data };
    },
    [types.PHONE_VERIFY](state, data) {
      state.phoneAuthKey = data.authId;
    },
    [types.PHONE_VERIFY_CHECK](state) {
      state.phoneAuth = true;
    },
    [types.PHONE_VERIFY_COUNT](state) {
      state.phoneAuthCnt += 1;
    },
    [types.SET_COLORS](state, colors) {
      state.surveyStorage.colors = [...colors];
    },
    [types.PICK_COLORS](state, data) {
      state.colors[data.type] = [...data.colors];
    },
    [types.PICK_REMOVE_COLORS](state, data) {
      state.colors[data.type].splice(data.index, 1);
    },
    [types.SET_REQUIREMENT](state, data) {
      state.requirement = data;
    },
    [types.SET_CLOTHES](state, clothes) {
      state.surveyStorage.clothes = [...clothes];
    },
    [types.PICK_CLOTHES](state, clothes) {
      state.clothes = [...clothes];
    },
    [types.PICK_REMOVE_CLOTHES](state, idx) {
      state.clothes.splice(idx, 1);
    },
    [types.SET_PATTERNS](state, patterns) {
      state.surveyStorage.patterns = [...patterns];
    },
    [types.SET_MATERIAL](state, material) {
      state.surveyStorage.material = [...material];
    },
    [types.PICK_PATTERN](state, patterns) {
      state.patterns = [...patterns];
    },
    [types.PICK_REMOVE_PATTERN](state, idx) {
      state.patterns.splice(idx, 1);
    },
  },
  actions,
  getters: {
    getPhoneAuth: state => state.phoneAuth,
    getPhoneAuthKey: state => state.phoneAuthKey,
    getColors: state => state.surveyStorage.colors,
    getPreferColors: state => state.colors.prefer,
    getExceptColors: state => state.colors.except,
    getRequirement: state => state.requirement,
    getClothes: state => state.surveyStorage.clothes,
    getSelectClothes: state => state.clothes,
    getPatterns: state => state.surveyStorage.patterns,
    getMaterial: state => state.surveyStorage.material,
    getSelectPatterns: state => state.patterns,
  },
};
