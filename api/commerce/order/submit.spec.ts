import { construct } from "@funk/api/commerce/order/submit"
import { ConfirmPaymentIntent, construct as constructConfirmPaymentIntentImpl } from "@funk/api/plugins/payment/behaviors/confirm-payment-intent"
import { GetById } from "@funk/api/plugins/persistence/behaviors/get-by-id"
import { GetSecret } from "@funk/api/plugins/secrets/behaviors/get-secret"
import { MarshalledCart, ORDERS } from "@funk/model/commerce/order/order"
import { createFakeMarshalledCart } from "@funk/model/commerce/order/stubs"
import { when } from "jest-when"

describe("orderSubmit", () =>
{
  describe("success", () =>
  {
    let fakeCart: MarshalledCart
    let getById: GetById
    let getSecret: GetSecret
    let confirmPaymentIntent: ConfirmPaymentIntent
    let constructConfirmPaymentIntent: typeof constructConfirmPaymentIntentImpl

    beforeEach(() =>
    {
      fakeCart = createFakeMarshalledCart("fake cart 1")
      getById = jest.fn()
      getSecret = jest.fn()
      confirmPaymentIntent = jest.fn()
      constructConfirmPaymentIntent = jest.fn().mockReturnValue(confirmPaymentIntent)

      when(getById as jest.Mock).calledWith(ORDERS, fakeCart.id).mockResolvedValue(fakeCart)
    })

    it("should submit payment via the payment service provider", async () =>
    {
      const submit = construct(getById, getSecret, constructConfirmPaymentIntent)

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
