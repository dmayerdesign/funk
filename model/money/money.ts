import { CurrencyCode } from "@funk/model/money/currency-code"

export interface Money {
  amount: number
  currency: CurrencyCode
}
