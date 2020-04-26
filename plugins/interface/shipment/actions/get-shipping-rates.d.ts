import { Order } from '@funk/model/commerce/order/order'
import { SimpleRate } from '@funk/plugins/shipment/simple-rate'

export declare const construct: (deps?: {}) =>
  (order: Order) => Promise<SimpleRate[]>

