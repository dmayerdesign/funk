const baseConfig = require('./jest.config')

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
