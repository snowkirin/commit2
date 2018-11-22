import axios from 'axios';
import NProgress from 'nprogress';

const API_URL = process.env.VUE_APP_API_URL;

const instance = axios.create({
  baseURL: API_URL
});

// before a request is made start the nprogress
instance.interceptors.request.use(config => {
  NProgress.start();
  return config;
});

// before a response is returned stop nprogress
instance.interceptors.response.use(response => {
  NProgress.done();
  return response;
});
export default {
  query(url, params) {
    return instance.get(url, params).catch(err => {
      throw new Error(`[ZULY] Service - Query ${err}`);
    });
  },
  get(url, config) {
    return instance.get(url, config).catch(err => {
      throw new Error(`[ZULY] Service - Get ${err}`);
    });
  },
  post(url, params, config) {
    return instance.post(url, params, config).catch(err => {
      throw new Error(`[ZULY] Service - Post ${err}`);
    });
  },
  patch(url, params) {
    return instance.patch(url, params).catch(err => {
      throw new Error(`[ZULY] Service - Patch ${err}`);
    });
  },
  put(url, params) {
    return instance.put(url, params).catch(err => {
      throw new Error(`[ZULY] Service - Put ${err}`);
    });
  }
};
