import { CurrencyCode } from "@funk/money/domain/currency-code"
import { Money } from "@funk/money/domain/money"
import { InclusiveRange } from "@funk/range/domain/range"
import { WeightUnit } from "@funk/units/domain/weight-unit"

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
