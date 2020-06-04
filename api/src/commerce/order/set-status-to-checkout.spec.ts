import { construct } from "@funk/api/commerce/order/set-status-to-checkout"
import { ORDERS, Status } from "@funk/model/commerce/order/order"

describe("setStatusToCheckout", () =>
{
  it("should set the order status to `Cart Checkout`", async (done) =>
  {
    const updateById = jasmine.createSpy()
    const setStatusToCheckout = construct({ updateById })
    const ORDER_ID = "order id"

    await setStatusToCheckout(ORDER_ID)

    expect(updateById).toHaveBeenCalledWith(
      ORDERS, ORDER_ID, { status: Status.CART_CHECKOUT }
    )
    done()
  })
})
