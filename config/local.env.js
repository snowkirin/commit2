'use strict'

const merge = require('webpack-merge');

module.exports = {
  NODE_ENV: '"local"',
  // API_URL: '"http://dev-api.zuly.co.kr/api/v1.0"',
  API_URL: '"http://localhost:3000/api/v1.0"',
  API_MESSAGE_URL: '"http://localhost:4000/api/v1.0"',
  API_IMAGE_URL: '"http://dev-image.zuly.co.kr/medium/"',
  HOST: '"localhost"',
  GA_ID: '"UA-113930121-1"',
  TOKEN_NAME: '"local_access_token"',
};
