import { FunctionsClient } from "@funk/ui/infrastructure/external/helpers/functions-client"

const functionName = "adminGrantSuperRoleToMe"
type ResolvedValueType = undefined

export function construct(client: FunctionsClient) {
  return async function (): Promise<ResolvedValueType> {
    return client.rpcAuthorized<undefined, ResolvedValueType>(functionName)
  }
}

export type GrantSuperRoleToMe = ReturnType<typeof construct>
