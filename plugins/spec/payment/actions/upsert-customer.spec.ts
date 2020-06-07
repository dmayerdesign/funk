import { construct } from "@funk/plugins/payment/actions/upsert-customer"
import { constructGetPaymentProviderStub } from "../stubs"

describe("upsertCustomer", () =>
{
  const paymentProviderSecret = "TEST_PSP_SECRET"

  it("should create a customer", async (done) =>
  {
    const customerData = { address: {} } as any
    const { getPaymentProvider, pspInstance } = constructGetPaymentProviderStub()
    const upsertCustomer = construct(getPaymentProvider)

    spyOn(pspInstance.customers, "create")
    spyOn(pspInstance.customers, "update")

    await upsertCustomer({ paymentProviderSecret, customerData })

    expect(getPaymentProvider).toHaveBeenCalledWith(paymentProviderSecret)
    expect(pspInstance.customers.update).not.toHaveBeenCalled()
    expect(pspInstance.customers.create).toHaveBeenCalledTimes(1)
    expect(pspInstance.customers.create).toHaveBeenCalledWith(customerData)

    done()
  })

  it("should update a customer", async (done) =>
  {
    const id = "test-customer"
    const customerData = { id, address: {} } as any
    const { getPaymentProvider, pspInstance } = constructGetPaymentProviderStub()
    const upsertCustomer = construct(getPaymentProvider)

    spyOn(pspInstance.customers, "update")
    spyOn(pspInstance.customers, "create")

    await upsertCustomer({ paymentProviderSecret, customerData, id })

    expect(getPaymentProvider).toHaveBeenCalledWith(paymentProviderSecret)
    expect(pspInstance.customers.create).not.toHaveBeenCalled()
    expect(pspInstance.customers.update).toHaveBeenCalledTimes(1)
    expect(pspInstance.customers.update).toHaveBeenCalledWith(id, customerData)

    done()
  })
})
