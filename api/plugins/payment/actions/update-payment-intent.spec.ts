import { CurrencyCode } from "@funk/model/money/currency-code"
import { Options, construct } from "@funk/api/plugins/payment/actions/update-payment-intent"
import { constructGetPaymentProviderStub } from "../stubs"

describe("updatePaymentIntent", () =>
{
  it("should update a payment intent", async () =>
  {
    const { getPaymentProvider, pspInstance } = constructGetPaymentProviderStub()
    const updatePaymentIntent = construct(
      paymentProviderSecret,
      getPaymentProvider
    )
    const PSP_UPDATE_RESULT = "FAKE_RESULT"
    const expectedUpdateParams = {
      amount: 1500,
      currency: CurrencyCode.USD,
      payment_method_types: [ "card" ],
    }
    spyOn(pspInstance.paymentIntents, "update").and.returnValue(PSP_UPDATE_RESULT)

    const paymentIntent = await updatePaymentIntent(
      PAYMENT_INTENT_ID,
      GOOD_OPTIONS_WITH_NULLISH
    )

    expect(getPaymentProvider).toHaveBeenCalledWith(paymentProviderSecret)
    expect(pspInstance.paymentIntents.update).toHaveBeenCalledTimes(1)
    expect(pspInstance.paymentIntents.update).toHaveBeenCalledWith(
      PAYMENT_INTENT_ID,
      expectedUpdateParams
    )
    expect(paymentIntent).toBe(PSP_UPDATE_RESULT)
  })

  it("should not update a payment intent if the amount is less than the minimum",
    async () =>
    {
      let didThrow = false
      const { getPaymentProvider, pspInstance } = constructGetPaymentProviderStub()
      const updatePaymentIntent = construct(
        paymentProviderSecret,
        getPaymentProvider)

      spyOn(pspInstance.paymentIntents, "update")

      try
      {
        await updatePaymentIntent(PAYMENT_INTENT_ID, BAD_OPTIONS_MIN_AMOUNT)
      }
      catch
      {
        didThrow = true
      }

      expect(getPaymentProvider).toHaveBeenCalledWith(paymentProviderSecret)
      expect(pspInstance.paymentIntents.update).not.toHaveBeenCalled()
      expect(didThrow).toBe(true)
    })

  const paymentProviderSecret = "TEST_PSP_SECRET"
  const PAYMENT_INTENT_ID = "TEST_PAYMENT_INTENT_ID"
  const GOOD_OPTIONS_WITH_NULLISH = {
    price: { amount: 1500, currency: CurrencyCode.USD },
    savePaymentMethod: undefined,
    customerEmail: null,
  } as unknown as Options
  const BAD_OPTIONS_MIN_AMOUNT = {
    ...GOOD_OPTIONS_WITH_NULLISH,
    price: { amount: 49, currency: CurrencyCode.USD },
  }
})
