import { construct } from "@funk/api/commerce/order/submit"
import { ConfirmPaymentIntent } from "@funk/api/plugins/payment/behaviors/confirm-payment-intent"
import { GetById } from "@funk/api/plugins/persistence/behaviors/get-by-id"
import { MarshalledCart, ORDERS } from "@funk/model/commerce/order/order"
import { createFakeMarshalledCart } from "@funk/model/commerce/order/stubs"
import { when } from "jest-when"

describe("orderSubmit", () =>
{
  describe("success", () =>
  {
    let fakeCart: MarshalledCart
    let getById: GetById
    let confirmPaymentIntent: ConfirmPaymentIntent

    beforeEach(() =>
    {
      fakeCart = createFakeMarshalledCart("fake cart 1")
      getById = jest.fn()
      confirmPaymentIntent = jest.fn()

      when(getById as jest.Mock).calledWith(ORDERS, fakeCart.id).mockResolvedValue(fakeCart)
    })

    it("should submit payment via the payment service provider", async () =>
    {
      const submit = construct(getById, confirmPaymentIntent)

      await submit(fakeCart.id)

      expect(confirmPaymentIntent).toHaveBeenCalledTimes(1)
    })
  })
  // It should first submit payment via the payment service provider.
  //   If this fails, it should throw an error.
  // It should then execute a batch write, which
  //   - should update the Status to PAYMENT_PENDING;
  //   - should update the inventory of each SKU (quantity and quantityReserved).
})
