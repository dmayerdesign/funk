import { Cart } from "@funk/model/commerce/order/order"
import { createFakeSku } from "@funk/model/commerce/sku/stubs"
import { construct as constructCart } from "@funk/ui/core/shop/orders/cart/cart"
import { construct as constructSetSkuQuantity } from
  "@funk/ui/functions/commerce/order/set-sku-quantity"
import { construct } from "@funk/ui/core/shop/orders/cart/actions/set-sku-quantity"
import { of } from "rxjs"

describe("cartSetSkuQuantity", () =>
{
  const CART = { id: "cart id" } as Cart
  let cart: ReturnType<typeof constructCart>
  let setSkuQuantity: ReturnType<typeof constructSetSkuQuantity>

  beforeEach(() =>
  {
    cart = of(CART)
    setSkuQuantity = jasmine.createSpy() as ReturnType<typeof constructSetSkuQuantity>
  })

  it("should add {n} SKUs to the cart", async () =>
  {
    const n = Math.ceil(Math.random() * 5)
    const SKU = createFakeSku()
    const functionUnderTest = construct(cart, setSkuQuantity)

    await functionUnderTest(SKU, n)

    expect(setSkuQuantity).toHaveBeenCalledWith(
      { orderId: CART.id, skuId: SKU.id, quantity: n }
    )
  })
})
