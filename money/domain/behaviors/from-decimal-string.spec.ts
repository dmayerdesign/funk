import fromDecimalString from "@funk/money/domain/behaviors/from-decimal-string"
import { CurrencyCode } from "@funk/money/domain/currency-code"

describe("fromDecimalString", () => {
  it('should parse the string "9.05" into a money of nine dollars and five cents', () => {
    const PRICE_STRING = "9.05"
    expect(fromDecimalString(PRICE_STRING, CurrencyCode.USD)).toEqual({
      amount: 905,
      currency: CurrencyCode.USD,
    })
  })
  it('should parse the string "$18.10" into a money of eighteen dollars and ten cents', () => {
    const PRICE_STRING = "$18.10"
    expect(fromDecimalString(PRICE_STRING, CurrencyCode.USD)).toEqual({
      amount: 1810,
      currency: CurrencyCode.USD,
    })
  })
  it("should parse an empty string into `undefined`", () => {
    expect(fromDecimalString("", CurrencyCode.USD)).toBe(undefined)
  })
})
