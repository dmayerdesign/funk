module.exports = {
  testMatch: ["<rootDir>/**/?(*)(spec|steps).ts"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  coverageReporters: ["lcov"],
}
