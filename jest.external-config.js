const { pathsToModuleNameMapper } = require("ts-jest/utils")
const baseConfig = require("./test/configuration/jest.base-config")
const { compilerOptions } = require("./tsconfig.external.spec.json")

module.exports = {
  ...baseConfig,
  testMatch: ["<rootDir>/**/external/**/?(*)(spec).ts"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>",
  }),
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.external.spec.json",
      diagnostics: {
        warnOnly: true,
      },
    },
  },
}
