import { MarshalledProduct } from "@funk/commerce/product/domain/product"
import { PrimaryKey } from "@funk/persistence/domain/primary-key"
import { FunctionsClient } from "@funk/ui/infrastructure/external/helpers/functions-client"

const functionName = "commerceOrderSetSkuQuantity"
interface PayloadType {
  orderId: PrimaryKey
  skuId: PrimaryKey
  quantity: number
}
type ResolvedValueType = MarshalledProduct[]

export function construct(client: FunctionsClient) {
  return async function (payload: PayloadType): Promise<ResolvedValueType> {
    return client.rpcAuthorized<PayloadType, ResolvedValueType>(
      functionName,
      payload,
    )
  }
}

export type SetSkuQuantity = ReturnType<typeof construct>
