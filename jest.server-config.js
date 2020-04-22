const baseConfig = require('./test/jest.base-config')

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
}
