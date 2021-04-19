import { CurrencyCode } from "@funk/money/model/currency-code"
import {
  construct,
  Options,
} from "@funk/money/plugins/internal/payment/behaviors/update-payment-intent"
import {
  createGetPaymentProviderStub,
  PaymentProviderStub,
} from "@funk/money/plugins/internal/payment/stubs"
import Stripe from "stripe"
import { GetPaymentProvider } from "./get-payment-provider"

describe("updatePaymentIntent", () => {
  let psp: Stripe
  let getPaymentProvider: GetPaymentProvider

  beforeEach(() => {
    psp = (new PaymentProviderStub() as unknown) as Stripe
    getPaymentProvider = createGetPaymentProviderStub(psp)
  })

  it("should update a payment intent", async () => {
    const updatePaymentIntent = construct(getPaymentProvider)
    const PSP_UPDATE_RESULT = "FAKE_RESULT"
    const expectedUpdateParams = {
      amount: 1500,
      currency: CurrencyCode.USD,
      payment_method_types: ["card"],
    }
    spyOn(psp.paymentIntents, "update").and.returnValue(PSP_UPDATE_RESULT)

    const paymentIntent = await updatePaymentIntent(
      PAYMENT_INTENT_ID,
      GOOD_OPTIONS_WITH_NULLISH,
    )

    expect(getPaymentProvider).toHaveBeenCalled()
    expect(psp.paymentIntents.update).toHaveBeenCalledTimes(1)
    expect(psp.paymentIntents.update).toHaveBeenCalledWith(
      PAYMENT_INTENT_ID,
      expectedUpdateParams,
    )
    expect(paymentIntent).toBe(PSP_UPDATE_RESULT)
  })

  it("should not update a payment intent if the amount is less than the minimum", async () => {
    let didThrow = false
    const updatePaymentIntent = construct(getPaymentProvider)

    spyOn(psp.paymentIntents, "update")

    try {
      await updatePaymentIntent(PAYMENT_INTENT_ID, BAD_OPTIONS_MIN_AMOUNT)
    } catch {
      didThrow = true
    }

    expect(psp.paymentIntents.update).not.toHaveBeenCalled()
    expect(didThrow).toBe(true)
  })

  const PAYMENT_INTENT_ID = "tst payment intent id"
  const GOOD_OPTIONS_WITH_NULLISH = ({
    price: { amount: 1500, currency: CurrencyCode.USD },
    savePaymentMethod: undefined,
    customerEmail: null,
  } as unknown) as Options
  const BAD_OPTIONS_MIN_AMOUNT = {
    ...GOOD_OPTIONS_WITH_NULLISH,
    price: { amount: 49, currency: CurrencyCode.USD },
  }
})
