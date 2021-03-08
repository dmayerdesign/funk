import { Product } from "@funk/commerce/product/model/product"
import { Condition } from "@funk/persistence/application/external/condition"
import {
  Pagination,
  VirtualPagination,
} from "@funk/persistence/model/pagination"
import { FunctionsClient } from "@funk/ui/infrastructure/external/helpers/functions-client"
import products from "../../../../../../build-pipeline/data/development-data/commerce.products.json"

interface PayloadType {
  pagination: Pagination<Product> | VirtualPagination
  conditions: Condition<Product>[]
}
type ResolvedValueType = Product[]

export function construct(_client: FunctionsClient) {
  const _products = products as Record<string, Partial<Product>>
  return async function (_payload: PayloadType): Promise<ResolvedValueType> {
    return Object.keys(_products)
      .map((id) => _products[id])
      .filter((product) => product.isPublished) as Product[]
  }
}

export type ListPublished = ReturnType<typeof construct>
