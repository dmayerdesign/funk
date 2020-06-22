import { Sku } from "@funk/model/commerce/sku/sku"
import { FunctionsClient } from "@funk/ui/helpers/functions-client"
import { Cart$ } from "@funk/ui/core/shop/orders/cart/cart"

export function construct(
  cart$: Cart$,
  functionsClient: FunctionsClient
): SetSkuQuantity

export type SetSkuQuantity = (sku: Sku, quantity: number) => Promise<void>
