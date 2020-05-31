import { PopulatedCart } from
  "@funk/model/commerce/order/order"
import { Sku } from "@funk/model/commerce/sku/sku"
import { first } from "rxjs/operators"
import { FunctionsClient } from "@funk/ui/helpers/functions-client"
import { construct as constructCart } from "@funk/ui/core/shop/orders/cart/cart"

export function construct(
  cart: ReturnType<typeof constructCart>,
  functionsClient: FunctionsClient
)
{
  return async function setSkuQuantityInCart(sku: Sku, quantity: number): Promise<void>
  {
    const _cart = await cart.pipe(first()).toPromise() as PopulatedCart

    // const marshalledCart = marshall({ ..._cart }) as MarshalledCart
    // const updatedMarshalledCart = setMarshalledSkuQuantity(
    //   marshalledCart,
    //   { skuId: sku.id, quantity }) as MarshalledCart

    functionsClient.rpcAuthorized<any>("commerceOrderSetSkuQuantity", {
      orderId: _cart.id,
      skuId: sku.id,
      quantity,
    })
  }
}
