import { TimeUnit } from "@funk/model/units/time-unit"

export interface Duration {
  amount: number
  unit: TimeUnit
}

export const ZERO_DURATION = { amount: 0, unit: TimeUnit.Milliseconds }
