import { CurrencyCode } from "@funk/money/model/currency-code"

export interface Money {
  amount: number
  currency: CurrencyCode
}
