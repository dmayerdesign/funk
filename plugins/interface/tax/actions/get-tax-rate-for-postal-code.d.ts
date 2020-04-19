import { HttpClient } from '@funk/functions/helpers/http/client'
import getSecret from '@funk/functions/helpers/admin/get-secret'

export interface Input {
  postalCode: string
}

export type Output = number

export function construct(deps: {
  getSecret: typeof getSecret
  httpClient: HttpClient
}): ({ postalCode }: Input) => Promise<Output>

export default function({ postalCode }: Input): Promise<Output>
