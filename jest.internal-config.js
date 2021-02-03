const { pathsToModuleNameMapper } = require("ts-jest/utils")
const baseConfig = require("./test/configuration/jest.base-config")
const { compilerOptions } = require("./tsconfig.internal.spec.json")

module.exports = {
  ...baseConfig,
  testEnvironment: "node",
  testMatch: ["<rootDir>/**/internal/**/?(*)(spec|steps).ts"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>",
  }),
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.internal.spec.json",
      diagnostics: {
        warnOnly: true,
      },
    },
  },
}
