import types from "./mutation-types";
import actions from "./actions";

const initialState = {
  Sizes: {}, // Object
  FirstDeliveryDays: {}, //Object
  Options: {}, // Object
  SubscriptionPrice: {} // Object
};
const state = Object.assign({}, initialState);
const mutations = {
  [types.GET_SIZES](state, data) {
    state.Sizes = data;
  },
  [types.GET_FIRST_DELIVERY_DAYS](state, data) {
    state.FirstDeliveryDays = data.result;
  },
  [types.GET_OPTIONS](state, data) {
    state.Options = data;
  }
};
const getters = {
  Sizes: state => state.Sizes,
  FirstDeliveryDays: state => state.FirstDeliveryDays,
  Options: state => state.Options,
  SubscriptionPrice: state => state.SubscriptionPrice
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
