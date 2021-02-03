import getSecretImpl from "@funk/admin/plugins/internal/secrets/behaviors/get-secret"
import { TAX_SERVICE_PROVIDER_SECRET_KEY } from "@funk/admin/plugins/internal/secrets/keys"
import { AvataxResponse } from "@funk/commerce/plugins/internal/tax/avatax-response"
import { TAX_PUBLISHABLE_KEY } from "@funk/configuration"
import httpClientImpl, {
  Response,
} from "@funk/http/plugins/internal/client/client"
import { Address } from "@funk/places/domain/address"

const SALES_TAX_RATE_CALCULATOR_URL =
  "https://rest.avatax.com/api/v2/taxrates/bypostalcode"

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
