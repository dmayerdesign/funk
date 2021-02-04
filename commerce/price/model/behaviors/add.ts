import { Price } from "@funk/commerce/price/model/price"
import { validateBeforeMath } from "@funk/money/model/validation"

export default function (price1: Price, price2: Price): Price {
  validateBeforeMath(price1, price2)
  return {
    amount: price1.amount + price2.amount,
    currency: price1.currency,
  }
}
