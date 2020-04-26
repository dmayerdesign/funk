export const constructGetPaymentProviderStub = (pspCtor = PaymentProviderStub) =>
{
  const pspInstance = new pspCtor()
  const getPaymentProvider = jasmine
      .createSpy('getPaymentProvider', () => pspInstance as any)
      .and.callThrough()
  return ({
    getPaymentProvider,
    pspInstance,
  })
}

class PaymentProviderStub
{
  public customers = {
    create: async () => ({ id: 'test-customer' }),
    update: async () => ({ id: 'test-customer' }),
  }
  public paymentIntents = {
    create: async () => ({ id: 'test-payment-intent' }),
    update: async () => ({ id: 'test-payment-intent' }),
  }
}
