import { TAX_PUBLISHABLE_KEY, TAX_RATE_CALCULATOR_URL } from '@funk/config'
import getSecretImpl from '@funk/functions/helpers/admin/get-secret'
import httpClientImpl, { Response } from '@funk/functions/helpers/http/client'
import { AvataxResponse } from '@funk/model/commerce/tax-rate/avatax-response'
import { TAX_SERVICE_PROVIDER_SECRET_KEY } from '@funk/model/secret/keys'
import getTaxRateForPostalCode, { Input, Output } from
  '@funk/plugins-interface/tax/actions/get-tax-rate-for-postal-code'

  export const construct = ({
    getSecret = getSecretImpl,
    httpClient = httpClientImpl,
  } = {}): typeof getTaxRateForPostalCode =>
  {
    return async function({ postalCode }: Input): Output
    {
      const avataxLicenseKey = await getSecret(
        { secretKey: TAX_SERVICE_PROVIDER_SECRET_KEY }
      )
      const authString = Buffer.from(`${TAX_PUBLISHABLE_KEY}:${avataxLicenseKey}`)
        .toString('base64')
      const authorizationHeader = `Basic ${authString}`
      const taxRateResponse: Response<AvataxResponse> = await httpClient.get(
        TAX_RATE_CALCULATOR_URL + `?country=USA` + `&postalCode=${postalCode}`,
        {
          headers: {
            authorization: authorizationHeader,
          },
        },
      )
      return taxRateResponse.data.totalRate
    }
  }

export { Input, Output }
export default construct()
