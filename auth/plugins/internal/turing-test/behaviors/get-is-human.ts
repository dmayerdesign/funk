import httpClientImpl, {
  Response,
} from "@funk/http/plugins/internal/client/client"
import getSecretImpl from "@funk/secrets/plugins/internal/encrypted-storage/behaviors/get-secret"
import { TURING_TEST_SERVICE_PROVIDER_SECRET_KEY } from "@funk/secrets/plugins/internal/encrypted-storage/keys"

interface TuringTestRequest {
  /** The reCaptcha token */
  response: string
  secret: string
}

export interface TuringTestResult {
  success: boolean
  /** Between 0 and 1, 1 indicating certainty that the user is human. */
  score: number
}

export function construct(
  httpClient: typeof httpClientImpl,
  getSecret: typeof getSecretImpl,
) {
  return async function (token: string): Promise<boolean> {
    const secret = await getSecret(TURING_TEST_SERVICE_PROVIDER_SECRET_KEY)
    const turingTestResponse = await httpClient.get<
      TuringTestRequest,
      Response<TuringTestResult>
    >(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
    )
    const turingTestResult = turingTestResponse.data
    return turingTestResult.success && turingTestResult.score > 0.6
  }
}

export default construct(httpClientImpl, getSecretImpl)

export type GetIsHuman = ReturnType<typeof construct>
