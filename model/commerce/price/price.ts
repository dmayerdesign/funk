import { CurrencyCode } from "@funk/model/money/currency-code"
import { WeightUnit } from "@funk/model/units/weight-unit"
import { Money } from "@funk/model/money/money"
import { InclusiveRange } from "@funk/model/range/range"

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
