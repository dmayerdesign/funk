import { FunctionsClient } from "@funk/ui/helpers/functions-client"

const functionName = "adminGetSecret"
type PayloadType = string
type ResolvedValueType = string | undefined

export function construct(client: FunctionsClient)
{
  return async function(secretKey: PayloadType): Promise<ResolvedValueType>
  {
    return client.rpcAuthorized<PayloadType, ResolvedValueType>(functionName, secretKey)
  }
}