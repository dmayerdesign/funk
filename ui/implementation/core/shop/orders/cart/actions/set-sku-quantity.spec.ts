import { Cart } from "@funk/model/commerce/order/order"
import { createFakeSku } from "@funk/model/commerce/sku/stubs"
import { construct as constructCart } from "@funk/ui/core/shop/orders/cart/cart"
import { construct } from "@funk/ui/core/shop/orders/cart/actions/set-sku-quantity"
import { FunctionsClient } from "@funk/ui/helpers/functions-client"
import { of } from "rxjs"

describe("cartSetSkuQuantity", () =>
{
  const CART = { id: "cart id" } as Cart
  let cart: ReturnType<typeof constructCart>
  let functionsClient: FunctionsClient
  let rpcAuthorized: Function

  beforeEach(() =>
  {
    cart = of(CART)
    rpcAuthorized = jasmine.createSpy()
    functionsClient = { rpcAuthorized } as FunctionsClient
  })

  it("should add {n} SKUs to the cart", async (done) =>
  {
    const n = Math.ceil(Math.random() * 5)
    const SKU = createFakeSku()
    const setSkuQuantity = construct(cart, functionsClient)

    await setSkuQuantity(SKU, n)

    expect(rpcAuthorized).toHaveBeenCalledWith(
      "commerceOrderSetSkuQuantity",
      { orderId: CART.id, skuId: SKU.id, quantity: n }
    )
    done()
  })
})
