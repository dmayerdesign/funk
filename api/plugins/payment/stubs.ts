import Stripe from "stripe"

export class PaymentProviderStub {
  public customers = {
    create: async () => ({ id: "test-customer" }),
    update: async () => ({ id: "test-customer" }),
    confirm: async () => ({ id: "test-customer" }),
  }
  public paymentIntents = {
    create: async () => ({ id: "test-payment-intent" }),
    update: async () => ({ id: "test-payment-intent" }),
    confirm: async () => ({ id: "test-payment-intent" }),
  }
}

export const createGetPaymentProviderStub = (paymentProviderStub: Stripe) =>
  jest.fn().mockReturnValue(paymentProviderStub)
