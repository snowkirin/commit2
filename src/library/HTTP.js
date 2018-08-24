import axios from 'axios';

const instance = axios.create();
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

export default instance;
