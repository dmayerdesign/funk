import { TAX_PUBLISHABLE_KEY, TAX_RATE_CALCULATOR_URL } from '@funk/config'
import { createHttpClientStub } from '@funk/functions/helpers/http/stubs'
import { TAX_SERVICE_PROVIDER_SECRET_KEY } from '@funk/model/secret/keys'
import { construct } from '@funk/plugins/tax/actions/get-tax-rate-for-postal-code'

describe('getTaxRateForPostalCode', () =>
{
  it('should call the tax rate calculator API with the correct query', async (done) =>
  {
    const POSTAL_CODE = '10101'
    const TAX_SERVICE_PROVIDER_LICENSE_KEY = 'test_license_key'
    const expectedAuthHeader = 'Basic ' + Buffer
      .from(`${TAX_PUBLISHABLE_KEY}:${TAX_SERVICE_PROVIDER_LICENSE_KEY}`)
      .toString('base64')
    const getSecretSpy = jasmine.createSpy()
      .and.returnValue(TAX_SERVICE_PROVIDER_LICENSE_KEY)
    const httpClientStub = createHttpClientStub({
      data: { totalRate: 0.6 },
    })
    spyOn(httpClientStub, 'get').and.callThrough()

    const getTaxRateForPostalCode = construct({
      getSecret: getSecretSpy,
      httpClient: httpClientStub,
    })
    const returnValue = await getTaxRateForPostalCode({ postalCode: POSTAL_CODE })

    expect(getSecretSpy).toHaveBeenCalledTimes(1)
    expect(getSecretSpy).toHaveBeenCalledWith(
      { secretKey: TAX_SERVICE_PROVIDER_SECRET_KEY })
    expect(httpClientStub.get).toHaveBeenCalledTimes(1)
    expect(httpClientStub.get).toHaveBeenCalledWith(
      TAX_RATE_CALCULATOR_URL + `?country=USA` + `&postalCode=${POSTAL_CODE}`,
      {
        headers: {
          authorization: expectedAuthHeader,
        },
      })
    expect(returnValue).toBe(0.6)
    done()
  })
})
