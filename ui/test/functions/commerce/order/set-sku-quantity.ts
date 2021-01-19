import { MarshalledProduct } from "@funk/model/commerce/product/product"
import { PrimaryKey } from "@funk/model/data-access/primary-key"
import { FunctionsClient } from "@funk/ui/helpers/functions-client"

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
