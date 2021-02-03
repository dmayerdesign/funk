import { CurrencyCode } from "@funk/money/domain/currency-code"

export interface Money {
  amount: number
  currency: CurrencyCode
}
