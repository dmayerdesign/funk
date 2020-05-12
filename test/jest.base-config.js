module.exports = {
  testRegex: '((\\.|/)(test|spec))\\.[jt]sx?$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
}
