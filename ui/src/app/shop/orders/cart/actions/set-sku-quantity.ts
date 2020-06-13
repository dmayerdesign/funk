import { Cart } from
  "@funk/model/commerce/order/order"
import { Sku } from "@funk/model/commerce/sku/sku"
import { FunctionsClient } from "@funk/ui/helpers/functions-client"
import { construct as constructCart } from "@funk/ui/app/shop/orders/cart/cart"
import setSkuQuantity from "@funk/api/commerce/order/set-sku-quantity"
import { first } from "rxjs/operators"

export function construct(
  cart: ReturnType<typeof constructCart>,
  functionsClient: FunctionsClient
)
{
  return async function(sku: Sku, quantity: number): Promise<void>
  {
    const _cart = await cart.pipe(first()).toPromise() as Cart

    functionsClient.rpcAuthorized<typeof setSkuQuantity>("commerceOrderSetSkuQuantity", {
      orderId: _cart.id,
      skuId: sku.id,
      quantity,
    })
  }
}
