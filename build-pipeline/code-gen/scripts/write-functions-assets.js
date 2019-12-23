const { copySync } = require('fs-extra')
const { resolve } = require('path')

module.exports = function()
{
  copySync(
    resolve(__dirname, '../../../', 'functions/src/assets'),
    resolve(__dirname, '../../../', 'functions/lib/functions/src/assets'),
  )
}
