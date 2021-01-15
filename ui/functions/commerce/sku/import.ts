import { FunctionsClient } from "@funk/ui/helpers/functions-client"

const functionName = "commerceSkuImport"
type PayloadType = string
type ResolvedValueType = void

export function construct(client: FunctionsClient) {
  return async function (payload: PayloadType): Promise<ResolvedValueType> {
    return client.rpcAuthorized<PayloadType, ResolvedValueType>(
      functionName,
      payload,
    )
  }
}

export type SkuImport = ReturnType<typeof construct>
