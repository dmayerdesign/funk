const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.spec');

module.exports = {
  testRegex: '((\\.|/)(test|spec))\\.[jt]sx?$',
  roots: [
    '<rootDir>/config',
    '<rootDir>/functions',
    '<rootDir>/helpers',
    '<rootDir>/model',
    '<rootDir>/plugins',
    '<rootDir>/ui',
  ],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.spec.json',
      diagnostics: {
        warnOnly: true,
      },
    },
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>'
  }),
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};
