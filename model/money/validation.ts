import { Money } from "@funk/model/money/money"

class InvalidMoneyError extends Error {
  public constructor(
    public readonly reason: ValidationFailureReason,
    public readonly message: ValidationFailureReason = reason
  ) {
    super(message)
  }
}

class CurrencyMismatchError extends Error {
  public constructor() {
    super("Operations on Monies with different currencies is not supported.")
  }
}

export const enum ValidationFailureReason {
  INVALID_AMOUNT = "INVALID_AMOUNT",
  INVALID_CURRENCY = "INVALID_CURRENCY",
}

/** @throws InvalidMoneyError */
export function validate(money: Money): void {
  if (typeof money.currency === "undefined") {
    throw new InvalidMoneyError(ValidationFailureReason.INVALID_CURRENCY)
  }
  if (typeof money.amount === "undefined") {
    throw new InvalidMoneyError(ValidationFailureReason.INVALID_AMOUNT)
  }
}

/** @throws CurrencyMismatchError */
export function validateBeforeMath(money1: Money, money2: Money): void {
  if (money1.currency !== money2.currency) {
    throw new CurrencyMismatchError()
  }
}
