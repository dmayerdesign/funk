import { UserRecord } from "@funk/auth/plugins/internal/user-record"
import { HandleCreate } from "@funk/commerce/customer/application/internal/behaviors/handle-create"
import { Cart, Order, ORDERS, Status } from "@funk/commerce/order/model/order"
import { Sku, SKUS } from "@funk/commerce/sku/model/sku"
import { createFakeSku } from "@funk/commerce/sku/model/stubs"
import { createFakePerson } from "@funk/identity/model/stubs"
import { Person } from "@funk/identity/person/model/person"
import list from "@funk/test/plugins/internal/persistence/behaviors/list"
import setById from "@funk/test/plugins/internal/persistence/behaviors/set-by-id"
import setMany from "@funk/test/plugins/internal/persistence/behaviors/set-many"
import updateById from "@funk/test/plugins/internal/persistence/behaviors/update-by-id"
import { kebabCase, sortBy } from "lodash"

export function createFakeCustomerPerson(displayName?: string): Person {
  return createFakePerson({
    id: displayName ? kebabCase(displayName) : "test-user-basic",
    displayName,
  })
}

export type GivenACustomer = { person: Person; cart: Cart }
export function constructGivenACustomer(
  customerHandleCreate: HandleCreate,
): (displayName?: string) => Promise<GivenACustomer> {
  return async function givenACustomer(
    displayName?: string,
  ): Promise<GivenACustomer> {
    const person = createFakeCustomerPerson(displayName)
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

export async function givenASku(partialSku: Partial<Sku>): Promise<Sku> {
  const sku = createFakeSku(partialSku?.id, partialSku)
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
  skus?: Sku[]
}) {
  const skus = options?.skus ?? [createFakeSku("fake sku 1")]
  await setMany({
    [SKUS]: skus.reduce(
      (collection, sku) => ({ ...collection, [sku.id]: sku }),
      {} as Record<string, Sku>,
    ),
  })
  await updateById<Order>(ORDERS, options.theCart.id, { skus })
}
