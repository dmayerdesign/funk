import getSecretImpl from "@funk/api/admin/get-secret"
import { TAX_PUBLISHABLE_KEY, TAX_RATE_CALCULATOR_URL } from "@funk/config"
import httpClientImpl, { Response } from "@funk/functions/helpers/http/client"
import { AvataxResponse } from "@funk/model/commerce/tax-rate/avatax-response"
import { TAX_SERVICE_PROVIDER_SECRET_KEY } from "@funk/model/secret/keys"

export function construct(
  getSecret = getSecretImpl,
  httpClient = httpClientImpl
)
{
  return async function(postalCode: string): Promise<number>
  {
    const avataxLicenseKey = await getSecret(TAX_SERVICE_PROVIDER_SECRET_KEY)
    const authString = Buffer.from(`${TAX_PUBLISHABLE_KEY}:${avataxLicenseKey}`)
      .toString("base64")
    const authorizationHeader = `Basic ${authString}`
    const taxRateResponse: Response<AvataxResponse> = await httpClient.get(
      TAX_RATE_CALCULATOR_URL + "?country=USA" + `&postalCode=${postalCode}`,
      {
        headers: {
          authorization: authorizationHeader,
        },
      }
    )
    return taxRateResponse.data.totalRate
  }
}

export default construct()

export type GetTaxRateForPostalCode = ReturnType<typeof construct>
