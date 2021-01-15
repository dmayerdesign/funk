import { asPromise } from "@funk/helpers/as-promise"
import { Sku } from "@funk/model/commerce/sku/sku"
import { Cart$ } from "@funk/ui/core/shop/orders/cart/cart"
import { SetSkuQuantity as SetSkuQuantityFunction } from "@funk/ui/functions/commerce/order/set-sku-quantity"

export function construct(
  cart$: Cart$,
  setSkuQuantity: SetSkuQuantityFunction,
) {
  return async function (sku: Sku, quantity: number): Promise<void> {
    const cart = await asPromise(cart$)

    setSkuQuantity({
      orderId: cart.id,
      skuId: sku.id,
      quantity,
    })
  }
}

export type SetSkuQuantity = ReturnType<typeof construct>
