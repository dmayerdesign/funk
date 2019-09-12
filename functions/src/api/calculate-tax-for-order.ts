import { RequestWithBody } from '@funk/shared/contracts/data-access/request-with-body'
import { Order } from '@funk/shared/contracts/order/order'
import { CurrencyCode } from '@funk/shared/contracts/price/currency-code'
import { https } from 'firebase-functions'
import { createCorsApp } from '../helpers/create-cors-app'

const app = createCorsApp(true)
app.post('/', (request: RequestWithBody<Order>, response) => {
  const { body: order } = request
  // TODO: Calculate tax using Avalara free API. https://www.npmjs.com/package/avatax
  response.send(order.products.map(({ computedPrice }) => computedPrice
    ? {
      amount: computedPrice.amount * 0.06,
      currency: computedPrice.currency,
    }
    : {
      amount: 0,
      currency: CurrencyCode.USD
    }
  ))
})

export default https.onRequest(app)
