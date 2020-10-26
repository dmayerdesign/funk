import { HandleCreate } from "@funk/api/core/commerce/customer/handle-create"
import { UserRecord } from "@funk/api/plugins/auth/user-record"
import list from "@funk/api/test/plugins/persistence/behaviors/list"
import setById from "@funk/api/test/plugins/persistence/behaviors/set-by-id"
import setMany from "@funk/api/test/plugins/persistence/behaviors/set-many"
import updateById from "@funk/api/test/plugins/persistence/behaviors/update-by-id"
import {
  Cart,
  MarshalledOrder,
  Order,
  ORDERS
} from "@funk/model/commerce/order/order"
import { MarshalledSku, SKUS } from "@funk/model/commerce/sku/sku"
import { createFakeMarshalledSku } from "@funk/model/commerce/sku/stubs"
import { Person } from "@funk/model/identity/person"

export function givenAUser(displayName?: string): Person {
  return {
    id: "user uid",
    displayName,
  }
}

export type GivenACustomer = { person: Person; cart: Cart }
export function constructGivenACustomer(
  customerHandleCreate: HandleCreate
): (displayName?: string) => Promise<GivenACustomer> {
  return async function givenACustomer(
    displayName?: string
  ): Promise<GivenACustomer> {
    const person = givenAUser(displayName)
    await customerHandleCreate({
      uid: person.id,
      displayName,
    } as UserRecord)
    const [cart] = (await listOrdersForUser(person.id)) as Cart[]
    return { person, cart }
  }
}

export async function givenASku(
  partialSku: Partial<MarshalledSku>
): Promise<MarshalledSku> {
  const sku = createFakeMarshalledSku(partialSku?.id, partialSku)
  await setById(SKUS, sku.id, sku)
  return sku
}

export async function listOrdersForUser(userId: string) {
  return await list<Order>({
    collection: ORDERS,
    pagination: { skip: 0, take: 100, orderBy: "id", orderByDirection: "desc" },
    conditions: [["customer.userId", "==", userId]],
  })
}

export async function givenThatTheCartHasInStockSkus(options: {
  theCart: Cart
  skus?: MarshalledSku[]
}) {
  const skus = options?.skus ?? [createFakeMarshalledSku("fake sku 1")]
  await setMany({
    [SKUS]: skus.reduce(
      (collection, sku) => ({ ...collection, [sku.id]: sku }),
      {} as Record<string, MarshalledSku>
    ),
  })
  await updateById<MarshalledOrder>(ORDERS, options.theCart.id, {
    skus: skus.map(({ id }) => id),
  })
}
