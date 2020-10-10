import { Cart } from "@funk/model/commerce/order/order"
import { createFakeSku } from "@funk/model/commerce/sku/stubs"
import { construct } from "@funk/ui/core/shop/orders/cart/behaviors/set-sku-quantity"
import { Cart$ } from "@funk/ui/core/shop/orders/cart/cart"
import { SetSkuQuantity } from "@funk/ui/functions/commerce/order/set-sku-quantity"
import { of } from "rxjs"

describe("cartSetSkuQuantity", () => {
  const CART = { id: "cart id" } as Cart
  let cart: Cart$
  let setSkuQuantity: SetSkuQuantity

  beforeEach(() => {
    cart = of(CART)
    setSkuQuantity = jest.fn() as SetSkuQuantity
  })

  it("should add {n} SKUs to the cart", async function () {
    const n = Math.ceil(Math.random() * 5)
    const SKU = createFakeSku()
    const functionUnderTest = construct(cart, setSkuQuantity)

    await functionUnderTest(SKU, n)

    expect(setSkuQuantity).toHaveBeenCalledWith({
      orderId: CART.id,
      skuId: SKU.id,
      quantity: n,
    })
  })
})
