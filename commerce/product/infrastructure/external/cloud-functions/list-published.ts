import { MarshalledProduct } from "@funk/commerce/product/domain/product"
import { Condition } from "@funk/persistence/application/external/condition"
import {
  Pagination,
  VirtualPagination,
} from "@funk/persistence/application/external/pagination"
import { FunctionsClient } from "@funk/ui/infrastructure/external/helpers/functions-client"

const functionName = "commerceProductListPublished"
interface PayloadType {
  pagination: Pagination<MarshalledProduct> | VirtualPagination
  conditions: Condition<MarshalledProduct>[]
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

export type ListPublished = ReturnType<typeof construct>
