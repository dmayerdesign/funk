import { CurrencyCode } from "@funk/model/money/currency-code"
import { Money } from "@funk/model/money/money"
import {
  validate,
  validateBeforeMath,
  ValidationFailureReason
} from "@funk/model/money/validation"

describe("money", () => {
  describe("validate", () => {
    it("should throw if the money is missing a currency", () => {
      const moneyWithoutCurrency = { amount: 100 } as Money
      let error: any
      try {
        validate(moneyWithoutCurrency)
      } catch (_error) {
        error = _error
      }
      expect(error.message).toBe(ValidationFailureReason.INVALID_CURRENCY)
    })
    it("should throw if the money is missing an amount", () => {
      const moneyWithoutAmount = { currency: CurrencyCode.USD } as Money
      let error: any
      try {
        validate(moneyWithoutAmount)
      } catch (_error) {
        error = _error
      }
      expect(error.message).toBe(ValidationFailureReason.INVALID_AMOUNT)
    })
  })

  describe("validateBeforeMath", () => {
    it("should throw if the currencies are different", () => {
      const money1: Money = { amount: 100, currency: CurrencyCode.USD }
      const money2: Money = { amount: 100, currency: CurrencyCode.CAD }
      let error: any

      try {
        validateBeforeMath(money1, money2)
      } catch (_error) {
        error = _error
      }

      expect(error).toBeTruthy()
    })
  })
})
