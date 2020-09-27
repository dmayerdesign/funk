import { construct } from "@funk/api/plugins/tax/behaviors/get-tax-rate-for-postal-code"
import { TAX_PUBLISHABLE_KEY, TAX_RATE_CALCULATOR_URL } from "@funk/config"
import { createHttpClientStub } from "@funk/functions/helpers/http/stubs"
import { Customer } from "@funk/model/commerce/order/customer/customer"
import { TAX_SERVICE_PROVIDER_SECRET_KEY } from "@funk/model/secret/keys"

const POSTAL_CODE = "00000"
export function customerWithGoodPostalCode(): Customer
{
  return {
    billingAddress: {
      zip: POSTAL_CODE,
    },
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

describe("getTaxRateForPostalCode", () =>
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

    const getTaxRateForPostalCode = construct(
      getSecretSpy,
      httpClientStub
    )
    const returnValue = await getTaxRateForPostalCode(POSTAL_CODE)

    expect(getSecretSpy).toHaveBeenCalledTimes(1)
    expect(getSecretSpy).toHaveBeenCalledWith(TAX_SERVICE_PROVIDER_SECRET_KEY)
    expect(httpClientStub.get).toHaveBeenCalledTimes(1)
    expect(httpClientStub.get).toHaveBeenCalledWith(
      TAX_RATE_CALCULATOR_URL + "?country=USA" + `&postalCode=${POSTAL_CODE}`,
      {
        headers: {
          authorization: expectedAuthHeader,
        },
      })
    expect(returnValue).toBe(0.6)
  })
})
