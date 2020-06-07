import { HttpClient } from "@funk/functions/helpers/http/client"
import getSecret from "@funk/api/admin/get-secret"

export function construct(deps: {
  getSecret: typeof getSecret
  httpClient: HttpClient
}): typeof getTaxRateForPostalCode

export default function getTaxRateForPostalCode(postalCode: string): Promise<number>

export type GetTaxRateForPostalCode = ReturnType<typeof construct>
