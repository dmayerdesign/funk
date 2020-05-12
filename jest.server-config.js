const { pathsToModuleNameMapper } = require('ts-jest/utils')
const baseConfig = require('./test/jest.base-config')
const { compilerOptions } = require('./tsconfig.node.spec.json')

module.exports = {
  ...baseConfig,
  testEnvironment: 'node',
  roots: [
    '<rootDir>/config',
    '<rootDir>/functions',
    '<rootDir>/helpers',
    '<rootDir>/model',
    '<rootDir>/plugins',
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>'
  }),
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.node.spec.json',
      diagnostics: {
        warnOnly: true,
      },
    },
  },
}
