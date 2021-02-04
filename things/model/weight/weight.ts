import { WeightUnit } from "@funk/things/model/weight/weight-unit"

export interface Weight {
  amount: number
  unit: WeightUnit
}

export const UNKNOWN_WEIGHT: Weight = {
  amount: 0,
  unit: WeightUnit.UNKNOWN,
}
