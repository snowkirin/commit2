'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"http://dev-api.zuly.co.kr/api/v1.0"',
  API_MESSAGE_URL: '"http://localhost:4000/api/v1.0"',
  API_IMAGE_URL: '"http://dev-image.zuly.co.kr/"',
  HOST: '"dev-front.zuly.co.kr"',
})
