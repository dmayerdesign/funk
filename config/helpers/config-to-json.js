const { readFileSync } = require('fs')
const { resolve } = require('path')
const stripComments = require('strip-comments')
const { chunk } = require('lodash')

module.exports.configToJson = function (configuration) {
  const configFileName = `config.${configuration || 'local'}.ts`
  const configFile = readFileSync(
    resolve(__dirname, '../../config', configFileName),
    { encoding: 'utf8' }
  )
  const configRawString = stripComments(
      configFile.replace(/export /g, '')
    )
    .replace(/\=/g, '[SPLIT]')
    .replace(/(var|const|let)/g, '[SPLIT]')
    .replace(/^\[SPLIT\]/, '')
    .replace(/(?<!\\)['"`]/g, '')
  
  const configMap = chunk(
      configRawString.split('[SPLIT]').map((element) => element.trim()),
      2,
    )
    .reduce(
      (configObject, pair) => {
        configObject[pair[0]] = pair[1]
        return configObject
      },
      { configuration }
    )
  const configString = JSON.stringify(configMap, null, 2) + '\n'
  return JSON.parse(configString)
}
