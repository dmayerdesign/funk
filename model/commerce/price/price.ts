import { CurrencyCode } from '@funk/model/commerce/price/currency-code'

export interface Price
{
    amount: number
    currency: CurrencyCode
}

export const NULL_PRICE: Price = {
    amount: 0,
    currency: CurrencyCode.USD,
}
