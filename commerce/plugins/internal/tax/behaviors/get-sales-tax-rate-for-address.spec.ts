import { TAX_SERVICE_PROVIDER_SECRET_KEY } from "@funk/admin/plugins/internal/secrets/keys"
import { Customer } from "@funk/commerce/customer/domain/customer"
import { construct } from "@funk/commerce/plugins/internal/tax/behaviors/get-sales-tax-rate-for-address"
import { TAX_PUBLISHABLE_KEY } from "@funk/configuration"
import { createHttpClientStub } from "@funk/http/plugins/internal/cloud-function/behaviors/stubs"
import { Address } from "@funk/places/domain/address"

const ADDRESS = {
  zip: "00000",
} as Address

export function customerWithGoodPostalCode(): Customer {
  return {
    billingAddress: ADDRESS,
  } as Customer
}
export function customerWithBadPostalCode(): Customer {
  return {
    billingAddress: {
      street1: "street 1 test",
    },
  } as Customer
}

describe("getSalesTaxRateForAddress", () => {
  it("should call the tax rate calculator API with the correct query", async function () {
    const TAX_SERVICE_PROVIDER_LICENSE_KEY = "test_license_key"
    const expectedAuthHeader =
      "Basic " +
      Buffer.from(
        `${TAX_PUBLISHABLE_KEY}:${TAX_SERVICE_PROVIDER_LICENSE_KEY}`,
      ).toString("base64")
    const getSecretSpy = jest
      .fn()
      .mockReturnValue(TAX_SERVICE_PROVIDER_LICENSE_KEY)
    const httpClientStub = createHttpClientStub({
      data: { totalRate: 0.6 },
    })
    spyOn(httpClientStub, "get").and.callThrough()

    const getSalesTaxRateForAddress = construct(getSecretSpy, httpClientStub)
    const returnValue = await getSalesTaxRateForAddress(ADDRESS)

    expect(getSecretSpy).toHaveBeenCalledTimes(1)
    expect(getSecretSpy).toHaveBeenCalledWith(TAX_SERVICE_PROVIDER_SECRET_KEY)
    expect(httpClientStub.get).toHaveBeenCalledTimes(1)
    expect(httpClientStub.get).toHaveBeenCalledWith(
      expect.stringContaining(`country=USA&postalCode=${ADDRESS.zip}`),
      {
        headers: {
          authorization: expectedAuthHeader,
        },
      },
    )
    expect(returnValue).toBe(0.6)
  })
})
