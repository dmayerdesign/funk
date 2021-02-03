import { Price } from "@funk/commerce/price/domain/price"
import { validateBeforeMath } from "@funk/money/domain/validation"

export default function (price1: Price, price2: Price): Price {
  validateBeforeMath(price1, price2)
  return {
    amount: price1.amount - price2.amount,
    currency: price1.currency,
  }
}
