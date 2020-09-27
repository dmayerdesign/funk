import { Price } from "@funk/model/commerce/price/price"
import { validateBeforeMath } from "@funk/model/money/validation"

export default function(price1: Price, price2: Price): Price
{
  validateBeforeMath(price1, price2)
  return {
    amount: price1.amount - price2.amount,
    currency: price1.currency,
  }
}
