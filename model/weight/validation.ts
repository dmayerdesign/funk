import { Weight } from "@funk/model/weight/weight"

class InvalidWeightError extends Error {
  public constructor(
    public readonly reason: ValidationFailureReason,
    public readonly message: ValidationFailureReason = reason
  ) {
    super(message)
  }
}

class UnitMismatchError extends Error {
  public constructor() {
    super("Operations on Weights with different units is not supported.")
  }
}

export const enum ValidationFailureReason {
  INVALID_AMOUNT = "INVALID_AMOUNT",
  INVALID_UNITS = "INVALID_UNITS",
}

/** @throws InvalidWeightError */
export function validate(weight: Weight): void {
  if (typeof weight.unit === "undefined") {
    throw new InvalidWeightError(ValidationFailureReason.INVALID_UNITS)
  }
  if (typeof weight.amount === "undefined") {
    throw new InvalidWeightError(ValidationFailureReason.INVALID_AMOUNT)
  }
}

/** @throws UnitMismatchError */
export function validateBeforeMath(weight1: Weight, weight2: Weight): void {
  if (weight1.unit !== weight2.unit) {
    throw new UnitMismatchError()
  }
}
