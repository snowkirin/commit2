import * as types from '../mutation-types';

export default {
  state: {
    surveyView: 'Step1',
    myImageList: null,
    selectedList: new Set(),
    myFavoriteList: null,
  },

  mutations: {
    [types.SET_SURVEY_VIEW](state, viewLocation) {
      state.surveyView = `Step${viewLocation}`;
    },
    [types.SET_MY_IMAGE_LIST](state, imageList) {
      state.myImageList = imageList;
    },
    [types.SET_MY_FAVORITE_LIST](state, favoriteList) {
      state.myFavoriteList = favoriteList;
    },
    [types.SET_SELECTED_IMAGE](state, imageKey) {
      if (state.selectedList.has(imageKey)) {
        state.selectedList.delete(imageKey);
        state.myImageList[state.myImageList.findIndex(el => el.key === imageKey)].selected = false;
      } else {
        state.selectedList.add(imageKey);
        state.myImageList[state.myImageList.findIndex(el => el.key === imageKey)].selected = true;
      }
    },
  },

  actions: {
    setSurveyView({ commit }, viewLocation) {
      commit(types.SET_SURVEY_VIEW, viewLocation);
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
    setSelectedImage({ commit }, imageKey) {
      commit(types.SET_SELECTED_IMAGE, imageKey);
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
  },

  getters: {
    getSurveyView: state => state.surveyView,
    myImageList: state => state.myImageList,
    selectedList: state => state.selectedList,
    myFavoriteList: state => state.myFavoriteList,
  },
};
