import populateImpl, {
  Populate,
} from "@funk/commerce/sku/application/internal/behaviors/persistence/populate"
import { Sku, SKUS } from "@funk/commerce/sku/model/sku"
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
    pagination: Pagination<Sku> | VirtualPagination
    conditions: Condition<Sku>[]
  }): Promise<Sku[]> {
    const marshalledSkus = await list<Sku>({
      collection: SKUS,
      pagination,
      conditions,
    })

    return await Promise.all(
      marshalledSkus.map(
        (marshalledSku) => populate(marshalledSku) as Promise<Sku>,
      ),
    )
  }
}

export type List = ReturnType<typeof construct>

export default construct(genericList, populateImpl)
