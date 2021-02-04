import { MarshalledProduct } from "@funk/commerce/product/model/product"
import { PrimaryKey } from "@funk/persistence/model/primary-key"
import { FunctionsClient } from "@funk/ui/infrastructure/external/helpers/functions-client"

interface PayloadType {
  orderId: PrimaryKey
  skuId: PrimaryKey
  quantity: number
}
type ResolvedValueType = MarshalledProduct[]

export function construct(_client: FunctionsClient) {
  return async function (_payload: PayloadType): Promise<ResolvedValueType> {
    return []
  }
}

export type SetSkuQuantity = ReturnType<typeof construct>
