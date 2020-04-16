import getPaymentProvider from '@funk/plugins/payment/actions/get-payment-provider'

export const constructGetPaymentProviderStub = (pspCtor = PaymentProviderStub) =>
{
  const pspInstance = new pspCtor()
  const getPaymentProviderStub: typeof getPaymentProvider =
    (_secret: string, _options: any = {}) => pspInstance as any
  return ({
    getPaymentProvider: getPaymentProviderStub,
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
