import { FunctionsClient } from "@funk/ui/infrastructure/external/helpers/functions-client"

interface PayloadType {
  key: string
  value: string
}
type ResolvedValueType = void

export function construct(_client: FunctionsClient) {
  return async function (_secret: PayloadType): Promise<ResolvedValueType> {
    return undefined
  }
}

export type SetSecret = ReturnType<typeof construct>
