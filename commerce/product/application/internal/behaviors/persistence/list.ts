import populateImpl, {
  Populate,
} from "@funk/commerce/product/application/internal/behaviors/persistence/populate"
import { Product, PRODUCTS } from "@funk/commerce/product/model/product"
import genericList, {
  List as GenericList,
} from "@funk/persistence/application/internal/behaviors/list"
import { Condition } from "@funk/persistence/application/internal/condition"
import {
  Pagination,
  VirtualPagination,
} from "@funk/persistence/application/internal/pagination"

export function construct(list: GenericList, populate: Populate) {
  return async function ({
    pagination,
    conditions,
  }: {
    pagination: Pagination<Product> | VirtualPagination
    conditions: Condition<Product>[]
  }): Promise<Product[]> {
    const marshalledProducts = await list<Product>({
      collection: PRODUCTS,
      pagination,
      conditions,
    })

    return await Promise.all(
      marshalledProducts.map(
        (marshalledProduct) => populate(marshalledProduct) as Promise<Product>,
      ),
    )
  }
}

export type List = ReturnType<typeof construct>

export default construct(genericList, populateImpl)
