import { InjectionToken } from "@angular/core"
import { Cart$ } from "@funk/ui/core/shop/orders/cart/cart"
import { SetSkuQuantity } from "@funk/ui/functions/commerce/order/set-sku-quantity"
import { SetSkuQuantity as CartSetSkuQuantity } from "@funk/ui/core/shop/orders/cart/behaviors/set-sku-quantity"

export const CART = new InjectionToken<Cart$>("CART")
export const CART_SET_SKU_QUANTITY = new InjectionToken<CartSetSkuQuantity>(
  "CART_SET_SKU_QUANTITY"
)
export const SET_SKU_QUANTITY = new InjectionToken<SetSkuQuantity>(
  "SET_SKU_QUANTITY"
)
