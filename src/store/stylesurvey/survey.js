import * as types from '../mutation-types';

export function setListProc(selList, dataList, imgKey) {
  if (selList.has(imgKey)) {
    selList.delete(imgKey);
    dataList[dataList.findIndex(el => el.key === imgKey)].selected = false;
  } else {
    selList.add(imgKey);
    dataList[dataList.findIndex(el => el.key === imgKey)].selected = true;
  }
}

export default {
  state: {
    surveyView: 'Step1',
    myImageList: null,
    myFvList: null,
    exceptColors: null,
    selectedList: new Set(),
    fvSelectedList: new Set(),
    selectedExceptColors: new Set(),
  },

  mutations: {
    [types.SET_SURVEY_VIEW](state, viewLocation) {
      state.surveyView = `Step${viewLocation}`;
    },
    [types.SET_MY_IMAGE_LIST](state, imageList) {
      state.myImageList = imageList;
    },
    [types.SET_MY_FAVORITE_LIST](state, favoriteList) {
      state.myFvList = favoriteList;
    },
    [types.SET_EXCEPTION_COLORS](state, colors) {
      state.exceptColors = colors;
    },
    [types.SET_SELECTED_IMAGE](state, imgData) {
      if (imgData.cat === 1) setListProc(state.selectedList, state.myImageList, imgData.imgKey);
      else if (imgData.cat === 2) setListProc(state.fvSelectedList, state.myFvList, imgData.imgKey);
    },
    [types.SET_SELECTED_EXCEPT_COLOR](state, color) {
      setListProc(state.selectedExceptColors, state.exceptColors, color.colorKey);
    },
  },

  actions: {
    setSurveyView({ commit }, viewLocation) {
      commit(types.SET_SURVEY_VIEW, viewLocation);
    },
    setSelectedImage({ commit }, imgData) {
      commit(types.SET_SELECTED_IMAGE, imgData);
    },
    setSelectedColor({ commit }, color) {
      commit(types.SET_SELECTED_EXCEPT_COLOR, color);
    },
    setMyImageList({ commit }) {
      const myImageList = [
        { key: 1, text: '귀여운', selected: false },
        { key: 2, text: '발랄한', selected: false },
        { key: 3, text: '공상적인', selected: false },
        { key: 4, text: '섬세함', selected: false },
        { key: 5, text: '편안한', selected: false },
        { key: 6, text: '꾸밈없는', selected: false },
        { key: 7, text: '품위있는', selected: false },
        { key: 8, text: '우아한', selected: false },
        { key: 9, text: '가벼운', selected: false },
        { key: 10, text: '자유로운', selected: false },
        { key: 11, text: '민첩한', selected: false },
        { key: 12, text: '외향적인', selected: false },
      ];

      commit(types.SET_MY_IMAGE_LIST, myImageList);
    },
    setMyFavoriteList({ commit }) {
      const myFavoriteList = [
        { key: 1, image: '/src/assets/image1.jpg', selected: false },
        { key: 2, image: '/src/assets/image2.jpg', selected: false },
        { key: 3, image: '/src/assets/image3.jpg', selected: false },
        { key: 4, image: '/src/assets/image4.jpg', selected: false },
      ];

      commit(types.SET_MY_FAVORITE_LIST, myFavoriteList);
    },
    setExceptionColors({ commit }) {
      const myColors = [
        { key: 1, text: 'white', code: 'FFFFFF', selected: false },
        { key: 2, text: 'pink', code: 'F3B9CE', selected: false },
        { key: 3, text: 'purple', code: '8E44AD', selected: false },
        { key: 4, text: 'gray', code: 'E0E0E0', selected: false },
        { key: 5, text: 'beige', code: 'CCBCA5', selected: false },
        { key: 6, text: 'brown', code: '795548', selected: false },
        { key: 7, text: 'yellow', code: 'FFEE58', selected: false },
        { key: 8, text: 'orange', code: 'EBA836', selected: false },
        { key: 9, text: 'red', code: 'FD3D39', selected: false },
        { key: 10, text: 'green', code: '43A047', selected: false },
        { key: 11, text: 'blue', code: '4562DC', selected: false },
        { key: 12, text: 'black', code: '000000', selected: false },
      ];

      commit(types.SET_EXCEPTION_COLORS, myColors);
    },
  },

  getters: {
    getSurveyView: state => state.surveyView,
    myImageList: state => state.myImageList,
    selectedList: state => state.selectedList,
    myFvList: state => state.myFvList,
    fvSelectedList: state => state.fvSelectedList,
    exceptColors: state => state.exceptColors,
    selectedExceptColors: state => state.selectedExceptColors,
  },
};
