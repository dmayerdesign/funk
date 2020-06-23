import { Price } from "@funk/model/commerce/price/price"
import {
  validate,
  ValidationFailureReason,
  validateBeforeMath,
} from "@funk/model/commerce/price/validation"
import { CurrencyCode } from "@funk/model/commerce/price/currency-code"

describe("price", () =>
{
  describe("validate", () =>
  {
    it("should throw if the price is missing a currency", () =>
    {
      const priceWithoutCurrency = { amount: 100 } as Price
      let error: any
      try
      {
        validate(priceWithoutCurrency)
      }
      catch (_error)
      {
        error = _error
      }
      expect(error.message).toBe(ValidationFailureReason.INVALID_CURRENCY)
    })
    it("should throw if the price is missing an amount", () =>
    {
      const priceWithoutAmount = { currency: CurrencyCode.USD } as Price
      let error: any
      try
      {
        validate(priceWithoutAmount)
      }
      catch (_error)
      {
        error = _error
      }
      expect(error.message).toBe(ValidationFailureReason.INVALID_AMOUNT)
    })
  })

  describe("validateBeforeMath", () =>
  {
    it("should throw if the currencies are different", () =>
    {
      const price1: Price = { amount: 100, currency: CurrencyCode.USD }
      const price2: Price = { amount: 100, currency: CurrencyCode.CAD }
      let error: any

      try
      {
        validateBeforeMath(price1, price2)
      }
      catch (_error)
      {
        error = _error
      }

      expect(error).toBeTruthy()
    })
  })
})
