import { Price } from "@funk/commerce/price/domain/price"
import { CurrencyCode } from "@funk/money/domain/currency-code"

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
