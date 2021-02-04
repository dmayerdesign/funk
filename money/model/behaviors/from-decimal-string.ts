import { CurrencyCode } from "@funk/money/model/currency-code"
import { Money } from "@funk/money/model/money"

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
