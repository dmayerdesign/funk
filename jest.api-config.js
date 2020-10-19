const { pathsToModuleNameMapper } = require("ts-jest/utils")
const baseConfig = require("./test/jest.base-config")
const { compilerOptions } = require("./tsconfig.api.spec.json")

module.exports = {
  ...baseConfig,
  testEnvironment: "node",
  roots: [
    "<rootDir>/configuration",
    "<rootDir>/api",
    "<rootDir>/helpers",
    "<rootDir>/model",
    "<rootDir>/features",
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>",
  }),
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.api.spec.json",
      diagnostics: {
        warnOnly: true,
      },
    },
  },
}
