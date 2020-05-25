import { HttpClient } from "@funk/functions/helpers/http/client"
import getSecret from "@funk/api/admin/get-secret"

export function construct(deps: {
  getSecret: typeof getSecret
  httpClient: HttpClient
}): (postalCode: string) => Promise<number>

export default function(postalCode: string): Promise<number>
