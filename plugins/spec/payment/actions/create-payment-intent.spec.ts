import { CurrencyCode } from "@funk/model/commerce/price/currency-code"
import { construct } from "@funk/plugins/payment/actions/create-payment-intent"
import { constructGetPaymentProviderStub } from "../stubs"

describe("createPaymentIntent", () =>
{
  const paymentProviderSecret = "TEST_PSP_SECRET"
  const IDEMPOTENCY_KEY = "TEST_IDEMPOTENCY_KEY"
  const GOOD_OPTIONS = {
    price: { amount: 1000, currency: CurrencyCode.USD },
    savePaymentMethod: false,
    idempotencyKey: IDEMPOTENCY_KEY,
    customerId: "TEST_CUSTOMER_ID",
    paymentMethodId: "TEST_PAYMENT_METHOD_ID",
    customerEmail: "test@customer.email",
  }
  const BAD_OPTIONS_MIN_AMOUNT = {
    ...GOOD_OPTIONS,
    price: { amount: 49, currency: CurrencyCode.USD },
  }

  it("should create a payment intent", async (done) =>
  {
    const { getPaymentProvider, pspInstance } = constructGetPaymentProviderStub()
    const createPaymentIntent = construct(paymentProviderSecret, getPaymentProvider)
    const PSP_CREATE_RESULT = "FAKE_RESULT"
    const expectedCreateParams = {
      amount: 1000,
      currency: CurrencyCode.USD,
      customer: GOOD_OPTIONS.customerId,
      receipt_email: GOOD_OPTIONS.customerEmail,
      payment_method: GOOD_OPTIONS.paymentMethodId,
      payment_method_types: [ "card" ],
      save_payment_method: GOOD_OPTIONS.savePaymentMethod,
      setup_future_usage: (GOOD_OPTIONS.savePaymentMethod ? "off_session" : undefined),
      confirmation_method: "automatic",
    }
    spyOn(pspInstance.paymentIntents, "create").and.returnValue(PSP_CREATE_RESULT)

    const paymentIntent = await createPaymentIntent(GOOD_OPTIONS)

    expect(getPaymentProvider).toHaveBeenCalledWith(paymentProviderSecret)
    expect(pspInstance.paymentIntents.create).toHaveBeenCalledTimes(1)
    expect(pspInstance.paymentIntents.create).toHaveBeenCalledWith(
      expectedCreateParams,
      { idempotencyKey: GOOD_OPTIONS.idempotencyKey }
    )
    expect(paymentIntent).toBe(PSP_CREATE_RESULT)

    done()
  })

  it("should not create a payment intent if the amount is less than the minimum",
    async (done) =>
    {
      let didThrow = false
      const { getPaymentProvider, pspInstance } = constructGetPaymentProviderStub()
      const createPaymentIntent = construct(
        paymentProviderSecret,
        getPaymentProvider
      )

      spyOn(pspInstance.paymentIntents, "create")

      try
      {
        await createPaymentIntent(BAD_OPTIONS_MIN_AMOUNT)
      }
      catch
      {
        didThrow = true
      }

      expect(getPaymentProvider).toHaveBeenCalledWith(paymentProviderSecret)
      expect(pspInstance.paymentIntents.create).not.toHaveBeenCalled()
      expect(didThrow).toBe(true)

      done()
    })
})
