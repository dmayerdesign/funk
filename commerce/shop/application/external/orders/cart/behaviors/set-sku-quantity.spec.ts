import { SetSkuQuantity } from "@funk/commerce/order/infrastructure/external/cloud-functions/set-sku-quantity"
import { Cart } from "@funk/commerce/order/model/order"
import { construct } from "@funk/commerce/shop/application/external/orders/cart/behaviors/set-sku-quantity"
import { Cart$ } from "@funk/commerce/shop/application/external/orders/cart/cart"
import { createFakeSku } from "@funk/commerce/sku/model/stubs"
import { of } from "rxjs"

describe("cartSetSkuQuantity", () => {
  const CART = { id: "cart id" } as Cart
  let cart: Cart$
  let setSkuQuantity: SetSkuQuantity

  beforeEach(() => {
    cart = of(CART)
    setSkuQuantity = jest.fn() as SetSkuQuantity
  })

  it("should add {n} SKUs to the cart", async () => {
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
