import { CurrencyCode } from "@funk/money/model/currency-code"
import { Money } from "@funk/money/model/money"
import { InclusiveRange } from "@funk/range/model/range"
import { WeightUnit } from "@funk/units/model/weight-unit"

export type Price = Money

export type PriceRange = InclusiveRange<Price>

export interface PricePerUnitWeight {
  amount: number
  currency: CurrencyCode
  unit: WeightUnit
}

export const NULL_PRICE: Price = {
  amount: 0,
  currency: CurrencyCode.USD,
}
