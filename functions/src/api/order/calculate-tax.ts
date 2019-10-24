import { RequestWithBody } from '@funk/shared/contracts/data-access/request-with-body'
import { Order } from '@funk/shared/contracts/order/order'
import { CurrencyCode } from '@funk/shared/contracts/price/currency-code'
import createFunction from '../../helpers/create-function'

export default createFunction((request: RequestWithBody<Order>) => {
  // TODO: Calculate tax using Avalara free API. https://www.npmjs.com/package/avatax
  return request.body.products.map(({ computedPrice }) => computedPrice
    ? {
      amount: computedPrice.amount * (1 + (6 / 100)),
      currency: computedPrice.currency,
    }
    : {
      amount: 0,
      currency: CurrencyCode.USD
    }
  )
})
