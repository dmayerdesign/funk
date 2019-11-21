const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>'
  }),
  roots: [
    '<rootDir>/functions/src',
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};
