import { CurrencyCode } from "@funk/model/commerce/price/currency-code"
import { WeightUnit } from "@funk/model/units/weight-unit"

export interface Price {
  amount: number
  currency: CurrencyCode
}

export interface PricePerUnitWeight {
  amount: number
  currency: CurrencyCode
  unit: WeightUnit
}

export const NULL_PRICE: Price = {
  amount: 0,
  currency: CurrencyCode.USD,
}
