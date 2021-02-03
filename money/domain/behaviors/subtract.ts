import { Money } from "@funk/money/domain/money"
import { validateBeforeMath } from "@funk/money/domain/validation"

export default function (money1: Money, money2: Money): Money {
  validateBeforeMath(money1, money2)
  return {
    amount: money1.amount - money2.amount,
    currency: money1.currency,
  }
}
