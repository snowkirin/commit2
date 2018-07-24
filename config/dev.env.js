'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"http://dev-api.zuly.co.kr/api/v1.0"',
  API_MESSAGE_URL: '"http://localhost:4000/api/v1.0"',
  API_IMAGE_URL: '"http://dev-image.zuly.co.kr/medium/"',
  API_ORIGINAL_IMAGE_URL: '"http://dev-image.zuly.co.kr/"',
  HOST: '"zuly.co.kr"',
  GA_ID: '"UA-113930121-1"',
  TOKEN_NAME: '"dev_access_token"',
})
