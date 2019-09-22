const { readdirSync } = require('fs')
const { camelCase } = require('lodash')
const { resolve } = require('path')

const FUNCTIONS_FOLDER = './functions/src/api'
require('./functions/src/bootstrap')

readdirSync(resolve(__dirname, FUNCTIONS_FOLDER)).forEach(file => {
  if (file.endsWith('.js') && !file.endsWith('index.js')) {
    const fileBaseName = file.slice(0, -3) // Remove the '.js' extension
    if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === fileBaseName) {
      exports[camelCase(fileBaseName)] = require(`${FUNCTIONS_FOLDER}/${fileBaseName}`).default
    }
  }
})
