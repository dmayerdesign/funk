import { UserRecord } from "@funk/auth/plugins/internal/user-record"
import { HandleCreate } from "@funk/commerce/customer/application/internal/behaviors/handle-create"
import {
  Cart,
  MarshalledOrder,
  Order,
  ORDERS,
  Status,
} from "@funk/commerce/order/domain/order"
import { MarshalledSku, SKUS } from "@funk/commerce/sku/domain/sku"
import { createFakeMarshalledSku } from "@funk/commerce/sku/domain/stubs"
import { Person } from "@funk/identity/domain/person"
import list from "@funk/test/plugins/internal/persistence/behaviors/list"
import setById from "@funk/test/plugins/internal/persistence/behaviors/set-by-id"
import setMany from "@funk/test/plugins/internal/persistence/behaviors/set-many"
import updateById from "@funk/test/plugins/internal/persistence/behaviors/update-by-id"
import { kebabCase, sortBy } from "lodash"

export function givenAUser(displayName?: string): Person {
  return {
    id: displayName ? kebabCase(displayName) : "test-user-basic",
    displayName,
  }
}

export type GivenACustomer = { person: Person; cart: Cart }
export function constructGivenACustomer(
  customerHandleCreate: HandleCreate,
): (displayName?: string) => Promise<GivenACustomer> {
  return async function givenACustomer(
    displayName?: string,
  ): Promise<GivenACustomer> {
    const person = givenAUser(displayName)
    await customerHandleCreate({
      uid: person.id,
      displayName,
    } as UserRecord)
    const orders = (await listOrdersForUser(person.id)) as Cart[]
    const [cart] = sortBy(
      orders.filter(({ status }) => status === Status.CART),
      "updatedAt",
    ).reverse()

    return { person, cart }
  }
}

export async function givenASku(
  partialSku: Partial<MarshalledSku>,
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

export async function givenThatTheCartContainsInStockSkus(options: {
  theCart: Cart
  skus?: MarshalledSku[]
}) {
  const skus = options?.skus ?? [createFakeMarshalledSku("fake sku 1")]
  await setMany({
    [SKUS]: skus.reduce(
      (collection, sku) => ({ ...collection, [sku.id]: sku }),
      {} as Record<string, MarshalledSku>,
    ),
  })
  await updateById<MarshalledOrder>(ORDERS, options.theCart.id, {
    skus: skus.map(({ id }) => id),
  })
}
