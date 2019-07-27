const tsConfig = require('./tsconfig.json')
const tsConfigPaths = require('tsconfig-paths')
const { resolve } = require('path')

const baseUrl = resolve(__dirname, 'functions/lib')

module.exports = {
  bootstrapTsconfigPaths: tsConfigPaths.register({
    baseUrl,
    paths: tsConfig.compilerOptions.paths,
  })
}
