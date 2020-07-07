import { FunctionsClient } from "@funk/ui/helpers/functions-client"

const functionName = "adminGrantSuperRoleToMe"
type ResolvedValueType = string | undefined

export function construct(client: FunctionsClient)
{
  return async function(): Promise<ResolvedValueType>
  {
    return client.rpcAuthorized<undefined, ResolvedValueType>(functionName)
  }
}
