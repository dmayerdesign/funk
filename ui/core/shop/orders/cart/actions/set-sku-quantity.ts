// import setSkuQuantity from "@funk/api/commerce/order/set-sku-quantity"
import { asPromise } from "@funk/helpers/as-promise"
import { Sku } from "@funk/model/commerce/sku/sku"
import { FunctionsClient } from "@funk/ui/helpers/functions-client"
import { Cart$ } from "@funk/ui/core/shop/orders/cart/cart"

export function construct(
  cart$: Cart$,
  functionsClient: FunctionsClient
)
{
  return async function(sku: Sku, quantity: number): Promise<void>
  {
    const cart = await asPromise(cart$)

    functionsClient.rpcAuthorized<any>("commerceOrderSetSkuQuantity", {
      orderId: cart.id,
      skuId: sku.id,
      quantity,
    })
  }
}
