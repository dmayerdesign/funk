import { construct as constructCustomerHandleCreate, HandleCreate } from "@funk/api/commerce/customer/handle-create"
import { construct as constructOrderPopulate, Populate } from "@funk/api/commerce/order/populate"
import { construct as constructSetSkuQuantity, SetSkuQuantity } from "@funk/api/commerce/order/set-sku-quantity"
import { construct as constructOrderSubmit, Submit } from "@funk/api/commerce/order/submit"
import { constructGivenACustomer, givenASku, givenThatTheCartHasInStockSkus, listOrdersForUser } from "@funk/api/commerce/spec/helpers"
import { ConfirmPaymentIntent } from "@funk/api/plugins/payment/behaviors/confirm-payment-intent"
import { initializeStore } from "@funk/api/test/data-access/in-memory-store"
import getById from "@funk/api/test/plugins/persistence/behaviors/get-by-id"
import populate from "@funk/api/test/plugins/persistence/behaviors/populate"
import setById from "@funk/api/test/plugins/persistence/behaviors/set-by-id"
import setMany from "@funk/api/test/plugins/persistence/behaviors/set-many"
import updateById from "@funk/api/test/plugins/persistence/behaviors/update-by-id"
import { Status } from "@funk/model/commerce/order/order"
import { Person } from "@funk/model/identity/person"

describe("Cart", function ()
{
  let confirmPaymentIntent: ConfirmPaymentIntent

  let customerHandleCreate: HandleCreate
  let orderPopulate: Populate
  let orderSubmit: Submit
  let setSkuQuantity: SetSkuQuantity

  describe("A User must always have a shopping cart.", function ()
  {
    beforeEach(async function ()
    {
      await initializeStore()

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
      const { person, cart } = await constructGivenACustomer(customerHandleCreate)("Newt")

      expect(cart.customer.userId).toBe(person.id)
      expect(cart.status).toBe(Status.CART)
    })

    test("When a User submits an Order, a new Cart is created for them.", async function ()
    {
      const { person, cart } = await constructGivenACustomer(customerHandleCreate)("Annie")
      await givenThatTheCartHasInStockSkus({ theCart: cart })

      await orderSubmit(cart.id)

      const carts = (await listOrdersForUser(person.id))
        .filter((_order) => _order.status === Status.CART)
      expect(carts.length).toBe(1)
      expect(carts[0].id).not.toEqual(cart.id)
    })
  })

  describe("A User may only add in-stock products to their cart.", function ()
  {
    beforeEach(async function ()
    {
      await initializeStore()
      setSkuQuantity = constructSetSkuQuantity(getById, updateById)
    })

    test("Sally can add the in-stock SKU Rollerblades to their cart.", async function ()
    {
      const { person, cart } = await constructGivenACustomer(customerHandleCreate)("Sally")
      const sku = await givenASku({
        name: "Rollerblades",
        inventory: { type: "finite", quantity: 3, quantityReserved: 1 },
      })

      await setSkuQuantity({ orderId: cart.id, skuId: sku.id, quantity: 2 })

      const [ theUpdatedCart ] = await listOrdersForUser(person.id)
      expect(theUpdatedCart.skus!.length).toBe(1)
      expect(theUpdatedCart.skuQuantityMap).toMatchObject({
        [sku.id]: 2,
      })
    })
  })

  describe(
    "A User must go through a \"checkout\" flow before submitting an Order.",
    function ()
    {
      let chuck: Person

      beforeEach(async function ()
      {
        await initializeStore()
        const { person, cart } = await constructGivenACustomer(customerHandleCreate)("Newt")
        await givenThatTheCartHasInStockSkus({ theCart: cart })

        chuck = person
      })

      test("Chuck begins the \"checkout\" flow.", function ()
      {
        expect(chuck).toBeTruthy()
      })
    }
  )
})
