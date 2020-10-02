import {
  construct as constructCustomerHandleCreate,
  HandleCreate
} from "@funk/api/commerce/customer/handle-create"
import { construct as constructOrderPopulate, Populate } from "@funk/api/commerce/order/populate"
import {
  construct as constructOrderSubmit,
  Submit
} from "@funk/api/commerce/order/submit"
import { UserRecord } from "@funk/api/plugins/auth/user-record"
import { ConfirmPaymentIntent } from "@funk/api/plugins/payment/behaviors/confirm-payment-intent"
import { initializeStore } from "@funk/api/test/data-access/in-memory-store"
import getById from "@funk/api/test/plugins/persistence/behaviors/get-by-id"
import list from "@funk/api/test/plugins/persistence/behaviors/list"
import populate from "@funk/api/test/plugins/persistence/behaviors/populate"
import setById from "@funk/api/test/plugins/persistence/behaviors/set-by-id"
import setMany from "@funk/api/test/plugins/persistence/behaviors/set-many"
import updateById from "@funk/api/test/plugins/persistence/behaviors/update-by-id"
import { Order, ORDERS, Status } from "@funk/model/commerce/order/order"
import { createFakeMarshalledCart } from "@funk/model/commerce/order/stubs"
import { SKUS } from "@funk/model/commerce/sku/sku"
import { createFakeMarshalledSku } from "@funk/model/commerce/sku/stubs"

describe("A User must always have a shopping cart.", function ()
{
  let confirmPaymentIntent: ConfirmPaymentIntent

  let customerHandleCreate: HandleCreate
  let orderPopulate: Populate
  let orderSubmit: Submit

  beforeEach(function ()
  {
    initializeStore()

    confirmPaymentIntent = jest.fn()

    customerHandleCreate = constructCustomerHandleCreate(setById)
    orderPopulate = constructOrderPopulate(populate)
    orderSubmit = constructOrderSubmit(
      getById,
      updateById,
      setMany,
      orderPopulate,
      confirmPaymentIntent)
  })

  test("When a User is created, a Cart is created for them.", async function ()
  {
    // Given a first-time visitor named Newt
    const NEW_USER: Partial<UserRecord> = {
      uid: "new user uid",
      displayName: "Newt",
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

  test("When a User submits an Order, a new Cart is created for them.", async function ()
  {
    // Given a User named Annie
    const USER: Partial<UserRecord> = {
      uid: "user uid",
      displayName: "Annie",
    }
    // And that Annie has an Order ready to submit
    const ORDER_SKUS = {
      "fake sku 1": createFakeMarshalledSku("fake sku 1"),
    }
    const ORDER_ID = "fake order id"
    const ORDER = createFakeMarshalledCart(ORDER_ID, {
      customer: { userId: USER.uid },
      skus: Object.keys(ORDER_SKUS),
      skuQuantityMap: Object.keys(ORDER_SKUS).reduce((map, skuId) => ({ ...map, [skuId]: 1 }), {}),
    })
    await setMany({ [SKUS]: ORDER_SKUS })
    await setById(ORDERS, ORDER_ID, ORDER)

    // When Annie successfully submits their Order
    await orderSubmit(ORDER_ID)

    // Then a new Cart is created for Annie
    const userCarts = await list<Order>({
      collection: ORDERS,
      pagination: { skip: 0, take: 1, orderBy: "id", orderByDirection: "desc" },
      conditions: [
        [ "customer.userId", "==", USER.uid ],
        [ "status", "==", Status.CART ],
      ],
    })
    expect(userCarts.length).toBe(1)
    expect(userCarts[0].id).not.toEqual(ORDER_ID)
  })
})
