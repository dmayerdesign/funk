const baseConfig = require('./test/jest.base-config')

module.exports = {
  ...baseConfig,
  roots: [
    '<rootDir>/ui',
  ],
}
