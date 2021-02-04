import { MarshalledProduct } from "@funk/commerce/product/model/product"
import { Condition } from "@funk/persistence/application/external/condition"
import {
    Pagination,
    VirtualPagination
} from "@funk/persistence/application/external/pagination"
import { FunctionsClient } from "@funk/ui/infrastructure/external/helpers/functions-client"
import products from "../../../../../../build-pipeline/data/development-data/commerce.products.json"

interface PayloadType {
  pagination: Pagination<MarshalledProduct> | VirtualPagination
  conditions: Condition<MarshalledProduct>[]
}
type ResolvedValueType = MarshalledProduct[]

export function construct(_client: FunctionsClient) {
  const _products = products as Record<string, MarshalledProduct>
  return async function (_payload: PayloadType): Promise<ResolvedValueType> {
    return Object.keys(_products)
      .map((id) => _products[id])
      .filter((product) => product.isPublished)
  }
}

export type ListPublished = ReturnType<typeof construct>