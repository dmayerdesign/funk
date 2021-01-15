import httpClientImpl, { Response } from "@funk/api/plugins/http/client"
import getSecretImpl from "@funk/api/plugins/secrets/behaviors/get-secret"
import { SALES_TAX_RATE_CALCULATOR_URL } from "@funk/api/plugins/tax/configuration"
import { TAX_PUBLISHABLE_KEY } from "@funk/configuration"
import { Address } from "@funk/model/address/address"
import { AvataxResponse } from "@funk/model/commerce/tax-rate/avatax-response"
import { TAX_SERVICE_PROVIDER_SECRET_KEY } from "@funk/model/secret/keys"

export function construct(
  getSecret: typeof getSecretImpl,
  httpClient: typeof httpClientImpl,
) {
  return async function ({ zip }: Address): Promise<number> {
    const avataxLicenseKey = await getSecret(TAX_SERVICE_PROVIDER_SECRET_KEY)
    const authString = Buffer.from(
      `${TAX_PUBLISHABLE_KEY}:${avataxLicenseKey}`,
    ).toString("base64")
    const authorizationHeader = `Basic ${authString}`
    const taxRateResponse: Response<AvataxResponse> = await httpClient.get(
      SALES_TAX_RATE_CALCULATOR_URL + "?country=USA" + `&postalCode=${zip}`,
      {
        headers: {
          authorization: authorizationHeader,
        },
      },
    )
    return taxRateResponse.data.totalRate
  }
}

export default construct(getSecretImpl, httpClientImpl)

export type getSalesTaxRateForAddress = ReturnType<typeof construct>
