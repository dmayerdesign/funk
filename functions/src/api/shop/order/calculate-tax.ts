import createFunction from '@funk/functions/helpers/create-function'
import { Order } from '@funk/model/commerce/order/order'
import { CurrencyCode } from '@funk/model/commerce/price/currency-code'
import { RequestWithBody } from '@funk/model/data-access/request-with-body'

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
