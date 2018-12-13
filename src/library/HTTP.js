import axios from 'axios';
import NProgress from 'nprogress';

const API_URL = process.env.VUE_APP_API_URL;

const instance = axios.create({
  baseURL: API_URL
});

// Add a request interceptor
instance.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    NProgress.start();
    return config;
  },
  function(error) {
    // Do something with request error
    console.error(error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function(response) {
    // Do something with response data
    NProgress.done();
    return response;
  },
  function(error) {
    // Do something with response error
    NProgress.done();
    return Promise.reject(error);
  }
);

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
