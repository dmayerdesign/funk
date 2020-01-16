const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.spec');

module.exports = {
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
  roots: [
    '<rootDir>/config',
    '<rootDir>/functions',
    '<rootDir>/helpers',
    '<rootDir>/model',
    '<rootDir>/ui',
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};
