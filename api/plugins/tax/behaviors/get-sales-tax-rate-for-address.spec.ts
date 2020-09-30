import { construct } from "@funk/api/plugins/tax/behaviors/get-sales-tax-rate-for-address"
import { SALES_TAX_RATE_CALCULATOR_URL, TAX_PUBLISHABLE_KEY } from "@funk/config"
import { createHttpClientStub } from "@funk/functions/helpers/http/stubs"
import { Address } from "@funk/model/address/address"
import { Customer } from "@funk/model/commerce/order/customer/customer"
import { TAX_SERVICE_PROVIDER_SECRET_KEY } from "@funk/model/secret/keys"

const ADDRESS = {
  zip: "00000",
} as Address

export function customerWithGoodPostalCode(): Customer
{
  return {
    billingAddress: ADDRESS,
  } as Customer
}
export function customerWithBadPostalCode(): Customer
{
  return {
    billingAddress: {
      street1: "street 1 test",
    },
  } as Customer
}

describe("getSalesTaxRateForAddress", () =>
{
  it("should call the tax rate calculator API with the correct query", async () =>
  {
    const TAX_SERVICE_PROVIDER_LICENSE_KEY = "test_license_key"
    const expectedAuthHeader = "Basic " + Buffer
      .from(`${TAX_PUBLISHABLE_KEY}:${TAX_SERVICE_PROVIDER_LICENSE_KEY}`)
      .toString("base64")
    const getSecretSpy = jest.fn().mockReturnValue(TAX_SERVICE_PROVIDER_LICENSE_KEY)
    const httpClientStub = createHttpClientStub({
      data: { totalRate: 0.6 },
    })
    spyOn(httpClientStub, "get").and.callThrough()

    const getSalesTaxRateForAddress = construct(
      getSecretSpy,
      httpClientStub
    )
    const returnValue = await getSalesTaxRateForAddress(ADDRESS)

    expect(getSecretSpy).toHaveBeenCalledTimes(1)
    expect(getSecretSpy).toHaveBeenCalledWith(TAX_SERVICE_PROVIDER_SECRET_KEY)
    expect(httpClientStub.get).toHaveBeenCalledTimes(1)
    expect(httpClientStub.get).toHaveBeenCalledWith(
      SALES_TAX_RATE_CALCULATOR_URL + "?country=USA" + `&postalCode=${ADDRESS.zip}`,
      {
        headers: {
          authorization: expectedAuthHeader,
        },
      })
    expect(returnValue).toBe(0.6)
  })
})
