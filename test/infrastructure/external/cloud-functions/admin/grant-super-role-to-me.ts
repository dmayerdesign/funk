import { FunctionsClient } from "@funk/ui/infrastructure/external/helpers/functions-client"

type ResolvedValueType = undefined

export function construct(_client: FunctionsClient) {
  return async function (): Promise<ResolvedValueType> {
    return undefined
  }
}

export type GrantSuperRoleToMe = ReturnType<typeof construct>
