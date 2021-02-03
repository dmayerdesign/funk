import { CurrencyCode } from "@funk/money/domain/currency-code"
import { Money } from "@funk/money/domain/money"
import { validateBeforeMath } from "@funk/money/domain/validation"

describe("money", () => {
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
