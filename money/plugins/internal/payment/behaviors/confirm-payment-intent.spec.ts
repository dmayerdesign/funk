import { construct } from "@funk/money/plugins/internal/payment/behaviors/confirm-payment-intent"
import { GetPaymentProvider } from "@funk/money/plugins/internal/payment/behaviors/get-payment-provider"
import { MIN_TRANSACTION_CENTS } from "@funk/money/plugins/internal/payment/configuration"
import {
  createGetPaymentProviderStub,
  PaymentProviderStub,
} from "@funk/money/plugins/internal/payment/stubs"
import Stripe from "stripe"

describe("confirmPaymentIntent", () => {
  let psp: Stripe
  let getPaymentProvider: GetPaymentProvider

  beforeEach(() => {
    psp = (new PaymentProviderStub() as unknown) as Stripe
    getPaymentProvider = createGetPaymentProviderStub(psp)
  })

  it("should confirm a payment intent", async () => {
    const PAYMENT_INTENT_ID = "test payment intent id"
    const GOOD_AMOUNT = MIN_TRANSACTION_CENTS
    psp.paymentIntents.retrieve = jest.fn().mockResolvedValue({
      id: PAYMENT_INTENT_ID,
      amount: GOOD_AMOUNT,
    })
    psp.paymentIntents.confirm = jest.fn()
    const confirmPaymentIntent = construct(getPaymentProvider)

    await confirmPaymentIntent(PAYMENT_INTENT_ID)

    expect(getPaymentProvider).toHaveBeenCalled()
    expect(psp.paymentIntents.retrieve).toHaveBeenCalledWith(PAYMENT_INTENT_ID)
    expect(psp.paymentIntents.confirm).toHaveBeenCalledWith(PAYMENT_INTENT_ID)
  })

  it("should NOT confirm a payment intent if the amount is less than the minimum", async () => {
    const PAYMENT_INTENT_ID = "test payment intent id"
    const TOO_SMALL_AMOUNT = MIN_TRANSACTION_CENTS - 1
    psp.paymentIntents.retrieve = jest.fn().mockResolvedValue({
      id: PAYMENT_INTENT_ID,
      amount: TOO_SMALL_AMOUNT,
    })
    psp.paymentIntents.confirm = jest.fn()
    const confirmPaymentIntent = construct(getPaymentProvider)

    await expect(confirmPaymentIntent(PAYMENT_INTENT_ID)).rejects.toThrow()

    expect(psp.paymentIntents.retrieve).toHaveBeenCalledWith(PAYMENT_INTENT_ID)
    expect(psp.paymentIntents.confirm).not.toHaveBeenCalledWith(
      PAYMENT_INTENT_ID,
    )
  })
})
