import { InjectionToken } from "@angular/core"
import { SetSkuQuantity } from "@funk/commerce/order/infrastructure/external/cloud-functions/set-sku-quantity"
import { SetSkuQuantity as CartSetSkuQuantity } from "@funk/commerce/shop/application/external/orders/cart/behaviors/set-sku-quantity"
import { Cart$ } from "@funk/commerce/shop/application/external/orders/cart/cart"

export const CART = new InjectionToken<Cart$>("CART")
export const CART_SET_SKU_QUANTITY = new InjectionToken<CartSetSkuQuantity>(
  "CART_SET_SKU_QUANTITY",
)
export const SET_SKU_QUANTITY = new InjectionToken<SetSkuQuantity>(
  "SET_SKU_QUANTITY",
)
