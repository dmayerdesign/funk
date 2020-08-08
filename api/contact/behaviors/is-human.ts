import getSecretImpl from "@funk/api/plugins/secrets/behaviors/get-secret"
import httpClientImpl, { Response } from "@funk/api/plugins/http/client"
import { TURING_TEST_SERVICE_PROVIDER_SECRET_KEY } from "@funk/model/secret/keys"
import { TuringTestResult } from "@funk/model/turing-test/turing-test-result"

interface TuringTestRequest {
  /** The reCaptcha token */
  response: string
  secret: string
}

export function construct(
  httpClient = httpClientImpl,
  getSecret = getSecretImpl
)
{
  return async function(token: string): Promise<boolean>
  {
    const secret = await getSecret(TURING_TEST_SERVICE_PROVIDER_SECRET_KEY)
    const turingTestResponse = await httpClient.get<TuringTestRequest, Response<TuringTestResult>>(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`
    )
    const turingTestResult = turingTestResponse.data
    return turingTestResult.success && turingTestResult.score > 0.6
  }
}

export default construct()

export type IsHuman = ReturnType<typeof construct>
