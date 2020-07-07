import { FunctionsClient } from "@funk/ui/helpers/functions-client"
import { MarshalledProduct } from "@funk/model/commerce/product/product"
import { PrimaryKey } from "@funk/model/data-access/primary-key"

const functionName = "commerceOrderSetSkuQuantity"
interface PayloadType {
  orderId: PrimaryKey
  skuId: PrimaryKey
  quantity: number
}
type ResolvedValueType = MarshalledProduct[]

export function construct(client: FunctionsClient)
{
  return async function(secretKey: PayloadType): Promise<ResolvedValueType>
  {
    return client.rpcAuthorized<PayloadType, ResolvedValueType>(functionName, secretKey)
  }
}
