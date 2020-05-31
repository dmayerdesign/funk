import { InjectionToken } from "@angular/core"
import { construct as constructCart } from "@funk/ui/core/shop/orders/cart/cart"
import { construct as constructCartSetSkuQuantity } from
  "@funk/ui/core/shop/orders/cart/actions/set-sku-quantity"

export const CART = new InjectionToken<ReturnType<typeof constructCart>>("CART")
export const CART_SET_SKU_QUANTITY =
  new InjectionToken<ReturnType<typeof constructCartSetSkuQuantity>>(
    "CART_SET_SKU_QUANTITY")
