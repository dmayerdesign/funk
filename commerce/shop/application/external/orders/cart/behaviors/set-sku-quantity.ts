import { SetSkuQuantity as SetSkuQuantityFunction } from "@funk/commerce/order/infrastructure/external/cloud-functions/set-sku-quantity"
import { Cart$ } from "@funk/commerce/shop/application/external/orders/cart/cart"
import { Sku } from "@funk/commerce/sku/domain/sku"
import { asPromise } from "@funk/helpers/as-promise"

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
