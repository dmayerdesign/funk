import { TAX_PUBLISHABLE_KEY, TAX_RATE_CALCULATOR_URL } from '@funk/config'
import { AvataxResponse } from '@funk/model/commerce/tax-rate/avatax-response'
import { EncryptedSecret } from '@funk/model/secret/encrypted-secret'
import { TAX_SERVICE_PROVIDER_SECRET_KEY } from '@funk/model/secret/keys'
import { store } from '@funk/plugins/db/store'
import getTaxRateForPostalCode, { Input, Output } from
  '@funk/plugins/tax/actions/get-tax-rate-for-postal-code'
import axios, { AxiosResponse } from 'axios'

const getTaxRateForPostalCodeImpl: typeof getTaxRateForPostalCode =
  async function({ postalCode }: Input): Output
  {
    const avataxLicenseKey = await store().collection('vault')
      .doc(TAX_SERVICE_PROVIDER_SECRET_KEY).get()
      .then((snapshot) => snapshot.data() as EncryptedSecret)
      .then(({ value }) => value)
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
