import fromDecimalString from "@funk/model/commerce/price/actions/from-decimal-string"
import { CurrencyCode } from "@funk/model/commerce/price/currency-code"

describe("fromDecimalString", () =>
{
  it("should parse the string \"9.05\" into a price of nine dollars and five cents", () =>
  {
    const PRICE_STRING = "9.05"
    expect(fromDecimalString(PRICE_STRING, CurrencyCode.USD)).toEqual({
      amount: 905,
      currency: CurrencyCode.USD,
    })
  })
})
