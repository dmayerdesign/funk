import { Cart } from '@funk/model/commerce/order/order'
import { Sku } from '@funk/model/commerce/product/sku/sku'
import { Initializer } from '@funk/ui/helpers/initializer'
import { Observable } from 'rxjs'

export const ORDERS = 'ORDERS'

export interface Orders extends Initializer {
  cart$: Observable<Cart | undefined>
  init(): Promise<void>
  setSkuQuantityInCart(sku: Sku, quantity: number): Promise<void>
}
