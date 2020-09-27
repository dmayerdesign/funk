import { GetPaymentProvider } from "@funk/api/plugins/payment/behaviors/get-payment-provider"
import { construct, CreateInput } from "@funk/api/plugins/payment/behaviors/upsert-customer"
import { createGetPaymentProviderStub, PaymentProviderStub } from "@funk/api/plugins/payment/stubs"
import { Stripe } from "stripe"

describe("upsertCustomer", () =>
{
  let psp: Stripe
  let getPaymentProvider: GetPaymentProvider

  beforeEach(() =>
  {
    psp = new PaymentProviderStub() as unknown as Stripe
    getPaymentProvider = createGetPaymentProviderStub(psp)
  })

  it("should create a customer", async () =>
  {
    const customerData = { address: {} } as any
    const upsertCustomer = construct(getPaymentProvider)

    spyOn(psp.customers, "create")
    spyOn(psp.customers, "update")

    await upsertCustomer({ customerData } as CreateInput)

    expect(getPaymentProvider).toHaveBeenCalled()
    expect(psp.customers.update).not.toHaveBeenCalled()
    expect(psp.customers.create).toHaveBeenCalledTimes(1)
    expect(psp.customers.create).toHaveBeenCalledWith(customerData)
  })

  it("should update a customer", async () =>
  {
    const id = "test-customer"
    const customerData = { id, address: {} } as any
    const upsertCustomer = construct(getPaymentProvider)

    spyOn(psp.customers, "update")
    spyOn(psp.customers, "create")

    await upsertCustomer({ customerData, id })

    expect(getPaymentProvider).toHaveBeenCalled()
    expect(psp.customers.create).not.toHaveBeenCalled()
    expect(psp.customers.update).toHaveBeenCalledTimes(1)
    expect(psp.customers.update).toHaveBeenCalledWith(id, customerData)
  })
})
