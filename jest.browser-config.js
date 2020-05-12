const { pathsToModuleNameMapper } = require('ts-jest/utils')
const baseConfig = require('./test/jest.base-config')
const { compilerOptions } = require('./tsconfig.web.spec.json')

module.exports = {
  ...baseConfig,
  roots: [
    '<rootDir>/ui',
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>'
  }),
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.web.spec.json',
      diagnostics: {
        warnOnly: true,
      },
    },
  },
}
