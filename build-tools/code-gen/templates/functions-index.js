const { camelCase } = require('lodash')
const { basename, dirname, resolve } = require('path')
const recursiveReaddir = require('recursive-readdir-sync')

const FUNCTIONS_FOLDER = './functions/src/api'
require('./functions/src/bootstrap')

const files = recursiveReaddir(resolve(__dirname, FUNCTIONS_FOLDER))
files.forEach((file) => {
  if (file.endsWith('.js') && !file.endsWith('index.js')) {
    const fileBaseName = basename(file)
    const fileBaseNameSansExt = fileBaseName.substring(0, fileBaseName.length - 3)
    let filePathFromApi = file.split('/api/')[1]
    let fileDirname = dirname(file).split('/').pop()
    if (fileDirname === 'api') {
      fileDirname = ''
    }
    const functionName = camelCase(
      `${fileDirname ? fileDirname + '-' : ''}${fileBaseNameSansExt}`
    )

    if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === functionName) {
      exports[functionName] = require(`${FUNCTIONS_FOLDER}/${filePathFromApi}`).default
    }
  }
})
