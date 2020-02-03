const { camelCase } = require('lodash')
const { resolve } = require('path')
const recursiveReaddir = require('recursive-readdir-sync')

require('./functions/src/bootstrap')

const API_PATH_RELATIVE = './functions/src/api'
const API_PATH_ABSOLUTE = resolve(__dirname, API_PATH_RELATIVE)
const functionNameFromEnv = process.env.FUNCTION_NAME

recursiveReaddir(API_PATH_ABSOLUTE).forEach((file) =>
{
  console.log('---------------------------------')
  console.log('1 - filename:', file)
  console.log('2 - process.env.FUNCTION_NAME', functionNameFromEnv)
  if (
    (!functionNameFromEnv || functionNameFromEnv === functionName)
    && file.endsWith('.js')
    && !file.endsWith('index.js')
    && !file.match(/(\/|\.)spec\.(js|ts)/gi)) {

    const filePathFromParentDir = file.split(API_PATH_ABSOLUTE)[1] || ''
    const filePathFromParentDirSansExt = filePathFromParentDir.substring(
      0,
      filePathFromParentDir.lastIndexOf('.')
    )
    const functionName = camelCase(
      filePathFromParentDirSansExt
    )

    console.log('3 - fn name', functionName)
    console.log('4 - api path', filePathFromParentDir)

    exports[functionName] = require(`${API_PATH_ABSOLUTE}/${filePathFromParentDir}`).default
  }
})
