export default class CurrencyMismatchError extends Error {
  constructor() {
    super('Operations on Prices with different currencies is not supported.')
  }
}
