import { HttpClient } from "@funk/functions/helpers/http/client"
import { GetSecret } from "@funk/plugins/secrets/actions/get-secret"

export function construct(
  getSecret: GetSecret,
  httpClient: HttpClient
): typeof getTaxRateForPostalCode

export default function getTaxRateForPostalCode(postalCode: string): Promise<number>

export type GetTaxRateForPostalCode = ReturnType<typeof construct>
