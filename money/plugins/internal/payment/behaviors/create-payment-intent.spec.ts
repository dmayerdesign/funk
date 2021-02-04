import { CurrencyCode } from "@funk/money/model/currency-code"
import { construct } from "@funk/money/plugins/internal/payment/behaviors/create-payment-intent"
import { GetPaymentProvider } from "@funk/money/plugins/internal/payment/behaviors/get-payment-provider"
import {
    createGetPaymentProviderStub,
    PaymentProviderStub
} from "@funk/money/plugins/internal/payment/stubs"
import Stripe from "stripe"

describe("createPaymentIntent", () => {
  let psp: Stripe
  let getPaymentProvider: GetPaymentProvider

  beforeEach(() => {
    psp = (new PaymentProviderStub() as unknown) as Stripe
    getPaymentProvider = createGetPaymentProviderStub(psp)
  })

  it("should create a payment intent", async function () {
    const createPaymentIntent = construct(getPaymentProvider)
    const PSP_CREATE_RESULT = "FAKE_RESULT"
    const expectedCreateParams = {
      amount: 1000,
      currency: CurrencyCode.USD,
      customer: GOOD_OPTIONS.customerId,
      receipt_email: GOOD_OPTIONS.customerEmail,
      payment_method: GOOD_OPTIONS.paymentMethodId,
      payment_method_types: ["card"],
      setup_future_usage: GOOD_OPTIONS.savePaymentMethod
        ? "off_session"
        : undefined,
      confirmation_method: "automatic",
    }
    spyOn(psp.paymentIntents, "create").and.returnValue(PSP_CREATE_RESULT)

    const paymentIntent = await createPaymentIntent(GOOD_OPTIONS)

    expect(getPaymentProvider).toHaveBeenCalled()
    expect(psp.paymentIntents.create).toHaveBeenCalledTimes(1)
    expect(psp.paymentIntents.create).toHaveBeenCalledWith(
      expectedCreateParams,
      { idempotencyKey: GOOD_OPTIONS.idempotencyKey },
    )
    expect(paymentIntent).toBe(PSP_CREATE_RESULT)
  })

  it("should not create a payment intent if the amount is less than the minimum", async function () {
    const createPaymentIntent = construct(getPaymentProvider)
    spyOn(psp.paymentIntents, "create")

    await expect(createPaymentIntent(BAD_OPTIONS_MIN_AMOUNT)).rejects.toThrow()

    expect(psp.paymentIntents.create).not.toHaveBeenCalled()
  })

  const GOOD_OPTIONS = {
    price: { amount: 1000, currency: CurrencyCode.USD },
    savePaymentMethod: false,
    idempotencyKey: "test idempotency key",
    customerId: "test customer id",
    paymentMethodId: "test payment method id",
    customerEmail: "test@customer.email",
  }
  const BAD_OPTIONS_MIN_AMOUNT = {
    ...GOOD_OPTIONS,
    price: { amount: 49, currency: CurrencyCode.USD },
  }
})
