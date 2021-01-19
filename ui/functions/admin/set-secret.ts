import { FunctionsClient } from "@funk/ui/helpers/functions-client"

const functionName = "adminSetSecret"
interface PayloadType {
  key: string
  value: string
}
type ResolvedValueType = void

export function construct(client: FunctionsClient) {
  return async function (secret: PayloadType): Promise<ResolvedValueType> {
    return client.rpcAuthorized<PayloadType, ResolvedValueType>(
      functionName,
      secret,
    )
  }
}

export type SetSecret = ReturnType<typeof construct>
