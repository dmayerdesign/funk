import { Money } from "@funk/money/model/money"

export class InvalidMoneyError extends Error {}

class CurrencyMismatchError extends Error {
  public constructor() {
    super("Operations on Monies with different currencies is not supported.")
  }
}

/** @throws CurrencyMismatchError */
export function validateBeforeMath(money1: Money, money2: Money): void {
  if (money1.currency !== money2.currency) {
    throw new CurrencyMismatchError()
  }
}
