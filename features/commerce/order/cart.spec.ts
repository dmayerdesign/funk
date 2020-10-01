import {
  construct as constructCustomerHandleCreate,
  HandleCreate
} from "@funk/api/commerce/customer/handle-create"
import { UserRecord } from "@funk/api/plugins/auth/user-record"
import { initializeStore } from "@funk/api/test/data-access/in-memory-store"
import list from "@funk/api/test/plugins/persistence/behaviors/list"
import setById from "@funk/api/test/plugins/persistence/behaviors/set-by-id"
import { Order, ORDERS, Status } from "@funk/model/commerce/order/order"

describe("A User must always have a shopping cart.", function ()
{
  let customerHandleCreate: HandleCreate

  beforeEach(function ()
  {
    initializeStore()

    customerHandleCreate = constructCustomerHandleCreate(setById)
  })

  test("When a User is created, a Cart is created for them.", async function ()
  {
    // Given a first-time visitor named Newt
    const NEW_USER: Partial<UserRecord> = {
      uid: "new user uid",
    }
    // When Newt visits the app for the first time
    await customerHandleCreate(NEW_USER as UserRecord)
    // Then the app creates an Order associated with Newt
    // And the Order has a status of "Cart"
    const [ theOrder ] = await list<Order>({
      collection: ORDERS,
      pagination: { skip: 0, take: 1, orderBy: "id", orderByDirection: "desc" },
      conditions: [
        [ "customer.userId", "==", NEW_USER.uid ],
      ],
    })
    expect(theOrder.customer.userId).toBe(NEW_USER.uid)
    expect(theOrder.status).toBe(Status.CART)
  })
})
