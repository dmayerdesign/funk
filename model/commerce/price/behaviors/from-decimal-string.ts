import { CurrencyCode } from "@funk/model/money/currency-code"
import { Price } from "@funk/model/commerce/price/price"

export default function (
  decimalString: string | undefined,
  currency: CurrencyCode,
): Price | undefined {
  if (!decimalString) return undefined

  const floatString = decimalString.replace(/[^0-9\.]/gi, "")
  const parsedFloat = parseFloat(floatString)

  return {
    amount: Math.floor(parsedFloat * 100),
    currency,
  }
}
