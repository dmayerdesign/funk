import { FunctionsClient } from "@funk/ui/infrastructure/external/helpers/functions-client"

const functionName = "adminSetSecret"
interface PayloadType {
  key: string
  value: string
}
type ResolvedValueType = void

export function construct(client: FunctionsClient) {
  return async function (payload: PayloadType): Promise<ResolvedValueType> {
    return client.rpcAuthorized<PayloadType, ResolvedValueType>(
      functionName,
      payload,
    )
  }
}

export type SetSecret = ReturnType<typeof construct>
