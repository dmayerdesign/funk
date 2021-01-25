import { WeightUnit } from "@funk/units/domain/weight-unit"
import { validateBeforeMath } from "@funk/weight/domain/validation"
import { UNKNOWN_WEIGHT, Weight } from "@funk/weight/domain/weight"
import { isEqual } from "lodash"

// TODO: Add ability to convert units. For now, just throw if mismatched.
export default function (weight1: Weight, weight2: Weight): Weight {
  const _weight1 = weight1
  if (isEqual(weight1, UNKNOWN_WEIGHT) && weight2.unit !== WeightUnit.UNKNOWN) {
    _weight1.unit = weight2.unit
  }
  validateBeforeMath(_weight1, weight2)
  return {
    amount: _weight1.amount + weight2.amount,
    unit: _weight1.unit,
  }
}
