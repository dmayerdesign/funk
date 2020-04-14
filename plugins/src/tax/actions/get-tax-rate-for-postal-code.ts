import { TAX_PUBLISHABLE_KEY, TAX_RATE_CALCULATOR_URL } from '@funk/config'
import getSecret from '@funk/functions-client/admin/get-secret'
import { AvataxResponse } from '@funk/model/commerce/tax-rate/avatax-response'
import { TAX_SERVICE_PROVIDER_SECRET_KEY } from '@funk/model/secret/keys'
import getTaxRateForPostalCode, { Input, Output } from
  '@funk/plugins-interface/tax/actions/get-tax-rate-for-postal-code'
import axios, { AxiosResponse } from 'axios'

const getTaxRateForPostalCodeImpl: typeof getTaxRateForPostalCode =
  async function({ postalCode }: Input): Output
  {
    const avataxLicenseKey = await getSecret(
      { body: { secretKey: TAX_SERVICE_PROVIDER_SECRET_KEY } }
    )
    const authString = Buffer.from(`${TAX_PUBLISHABLE_KEY}:${avataxLicenseKey}`)
      .toString('base64')
    const authorizationHeader = `Basic ${authString}`
    const taxRateResponse: AxiosResponse<AvataxResponse> = await axios.get(
      TAX_RATE_CALCULATOR_URL + `?country=USA` + `&postalCode=${postalCode}`,
      {
        headers: {
          authorization: authorizationHeader,
        },
      },
    )
    return taxRateResponse.data.totalRate
  }

export { Input, Output }
export default getTaxRateForPostalCodeImpl
