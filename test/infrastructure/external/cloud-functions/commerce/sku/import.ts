import { FunctionsClient } from "@funk/ui/infrastructure/external/helpers/functions-client"

type PayloadType = string
type ResolvedValueType = void

export function construct(_client: FunctionsClient) {
  return async function (_payload: PayloadType): Promise<ResolvedValueType> {
    return undefined
  }
}

export type SkuImport = ReturnType<typeof construct>
