import { TimeUnit } from "@funk/time/model/time-unit";

export interface Duration {
  amount: number
  unit: TimeUnit
}

export const ZERO_DURATION = { amount: 0, unit: TimeUnit.Milliseconds }
