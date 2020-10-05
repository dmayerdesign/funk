module.exports = {
  testMatch: [
    "<rootDir>/**/?(*)spec.ts"
  ],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  coverageReporters: [ "lcov" ],
}
