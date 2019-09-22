const { readFileSync, writeFileSync } = require('fs')
const { resolve } = require('path')

module.exports = function() {
  const indexJsContents = readFileSync(resolve(__dirname, '../templates/functions-index.js'))
  writeFileSync(resolve(__dirname, '../../', 'functions/lib/index.js'), indexJsContents)
}
