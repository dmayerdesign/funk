import { CurrencyCode } from "@funk/model/money/currency-code"
import { Money } from "@funk/model/money/money"

export default function (
  decimalString: string | undefined,
  currency: CurrencyCode,
): Money | undefined {
  if (!decimalString) return undefined

  const floatString = decimalString.replace(/[^0-9\.]/gi, "")
  const parsedFloat = parseFloat(floatString)

  return {
    amount: Math.floor(parsedFloat * 100),
    currency,
  }
}
