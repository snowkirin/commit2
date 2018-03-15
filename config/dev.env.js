'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"http://localhost:3000/api/v1.0"',
  API_MESSAGE_URL: '"http://localhost:4000/api/v1.0"',
})
