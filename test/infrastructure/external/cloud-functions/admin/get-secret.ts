import { FunctionsClient } from "@funk/ui/infrastructure/external/helpers/functions-client"

type PayloadType = string
type ResolvedValueType = string | undefined

export function construct(_client: FunctionsClient) {
  return async function (_secretKey: PayloadType): Promise<ResolvedValueType> {
    return "fake secret"
  }
}

export type GetSecret = ReturnType<typeof construct>
