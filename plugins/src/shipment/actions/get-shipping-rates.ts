import { Order } from '@funk/model/commerce/order/order'
import { SimpleRate } from '@funk/plugins/shipment/simple-rate'

export const construct = (deps?: {}) =>
  async function(order: Order): Promise<SimpleRate[]>
  {
    return []
  }
