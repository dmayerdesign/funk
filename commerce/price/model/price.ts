import { InclusiveRange } from "@funk/math/model/range"
import { CurrencyCode } from "@funk/money/model/currency-code"
import { Money } from "@funk/money/model/money"
import { WeightUnit } from "@funk/things/model/weight/weight-unit"

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
