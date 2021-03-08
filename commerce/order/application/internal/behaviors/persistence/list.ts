import populateImpl, {
  Populate,
} from "@funk/commerce/order/application/internal/behaviors/persistence/populate"
import { Order, ORDERS } from "@funk/commerce/order/model/order"
import genericList, {
  List as GenericList,
} from "@funk/persistence/application/internal/behaviors/list"
import { Condition } from "@funk/persistence/application/internal/condition"
import {
  Pagination,
  VirtualPagination,
} from "@funk/persistence/model/pagination"

export function construct(list: GenericList, populate: Populate) {
  return async function ({
    pagination,
    conditions,
  }: {
    pagination: Pagination<Order> | VirtualPagination
    conditions: Condition<Order>[]
  }): Promise<Order[]> {
    const marshalledOrders = await list<Order>({
      collection: ORDERS,
      pagination,
      conditions,
    })

    return await Promise.all(
      marshalledOrders.map(
        (marshalledOrder) => populate(marshalledOrder) as Promise<Order>,
      ),
    )
  }
}

export type List = ReturnType<typeof construct>

export default construct(genericList, populateImpl)
