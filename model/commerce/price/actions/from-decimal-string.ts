import { CurrencyCode } from "@funk/model/money/currency-code"
import { Price } from "@funk/model/commerce/price/price"

export default function(decimalString: string, currency: CurrencyCode): Price
{
  const parsedFloat = parseFloat(decimalString)
  return {
    amount: Math.floor(parsedFloat * 100),
    currency,
  }
}
