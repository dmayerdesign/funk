import { FunctionsClient } from "@funk/ui/helpers/functions-client"
import { Pagination, VirtualPagination } from "@funk/plugins/persistence/pagination"
import { MarshalledProduct } from "@funk/model/commerce/product/product"
import { Condition } from "@funk/plugins/persistence/condition"

const functionName = "commerceProductListPublished"
interface PayloadType {
  pagination: Pagination<MarshalledProduct> | VirtualPagination
  conditions: Condition<MarshalledProduct>[]
}
type ResolvedValueType = MarshalledProduct[]

export function construct(client: FunctionsClient)
{
  return async function(secretKey: PayloadType): Promise<ResolvedValueType>
  {
    return client.rpcAuthorized<PayloadType, ResolvedValueType>(functionName, secretKey)
  }
}
