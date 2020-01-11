import { Price } from '../price'
import { validateBeforeMath } from '../validation'

export default function(price1: Price, price2: Price): Price
{
  validateBeforeMath(price1, price2)
  return {
    amount: price1.amount + price2.amount,
    currency: price1.currency,
  }
}
