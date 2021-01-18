import { Weight } from "@funk/model/weight/weight"

export class InvalidWeightError extends Error {}

class WeightUnitMismatchError extends Error {
  public constructor() {
    super("Operations on Weights with different units is not supported.")
  }
}

/** @throws WeightUnitMismatchError */
export function validateBeforeMath(weight1: Weight, weight2: Weight): void {
  if (weight1.unit !== weight2.unit) {
    throw new WeightUnitMismatchError()
  }
}
