import marshallImpl from "@funk/commerce/order/application/internal/behaviors/persistence/marshall"
import { Order, ORDERS } from "@funk/commerce/order/model/order"
import { Marshalled } from "@funk/persistence/application/internal/behaviors/marshall"
import genericSetMany from "@funk/persistence/application/internal/behaviors/set-many"
import { PrimaryKey } from "@funk/persistence/model/primary-key"

interface Orders {
  [documentPath: string]: Order
}

interface MarshalledOrders {
  [documentPath: string]: Marshalled<Order>
}

export function construct(
  setMany: typeof genericSetMany,
  marshall: typeof marshallImpl,
) {
  return async function (
    orders: Orders | MarshalledOrders,
    options?: { overwrite?: boolean },
  ): Promise<void> {
    const marshalledOrders: MarshalledOrders = Object.keys(orders)
      .map(
        (orderId) =>
          [orderId, marshall(orders[orderId] as Order)] as [PrimaryKey, Order],
      )
      .reduce(
        (_marshalledOrders, [orderId, marshalledOrder]) => ({
          ..._marshalledOrders,
          [orderId]: marshalledOrder,
        }),
        {} as MarshalledOrders,
      )
    await setMany(
      {
        [ORDERS]: marshalledOrders,
      },
      options,
    )
  }
}

export type SetMany = ReturnType<typeof construct>

export default construct(genericSetMany, marshallImpl)
