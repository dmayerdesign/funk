import {
  construct as constructCustomerHandleCreate,
  HandleCreate,
} from "@funk/api/core/commerce/customer/handle-create"
import {
  construct as constructOrderPopulate,
  Populate,
} from "@funk/api/core/commerce/order/populate"
import {
  construct as constructSetSkuQuantity,
  SetSkuQuantity,
} from "@funk/api/core/commerce/order/set-sku-quantity"
import {
  construct as constructSetStatusToCheckout,
  SetStatusToCheckout,
} from "@funk/api/core/commerce/order/set-status-to-checkout"
import {
  construct as constructOrderSubmit,
  Submit,
} from "@funk/api/core/commerce/order/submit"
import {
  constructGivenACustomer,
  givenASku,
  givenThatTheCartHasInStockSkus,
  listOrdersForUser,
} from "@funk/api/core/commerce/spec/helpers"
import { ConfirmPaymentIntent } from "@funk/api/plugins/payment/behaviors/confirm-payment-intent"
import { initializeStore } from "@funk/api/test/data-access/in-memory-store"
import getById from "@funk/api/test/plugins/persistence/behaviors/get-by-id"
import list from "@funk/api/test/plugins/persistence/behaviors/list"
import populate from "@funk/api/test/plugins/persistence/behaviors/populate"
import setById from "@funk/api/test/plugins/persistence/behaviors/set-by-id"
import setMany from "@funk/api/test/plugins/persistence/behaviors/set-many"
import updateById from "@funk/api/test/plugins/persistence/behaviors/update-by-id"
import { SKUS_OUT_OF_STOCK_ERROR } from "@funk/copy/error-messages"
import { Cart, Status } from "@funk/model/commerce/order/order"
import { FiniteInventory } from "@funk/model/commerce/sku/inventory"
import { MarshalledSku, SKUS } from "@funk/model/commerce/sku/sku"
import { createFakeMarshalledSku } from "@funk/model/commerce/sku/stubs"
import { Person } from "@funk/model/identity/person"

describe("Cart", function () {
  let confirmPaymentIntent: ConfirmPaymentIntent

  let customerHandleCreate: HandleCreate
  let orderPopulate: Populate
  let orderSubmit: Submit
  let setStatusToCheckout: SetStatusToCheckout
  let setSkuQuantity: SetSkuQuantity

  describe("A User must always have a shopping cart.", function () {
    beforeEach(async function () {
      await initializeStore()

      confirmPaymentIntent = jest.fn()

      customerHandleCreate = constructCustomerHandleCreate(setById)
      orderPopulate = constructOrderPopulate(populate)
      orderSubmit = constructOrderSubmit(
        getById,
        updateById,
        setMany,
        orderPopulate,
        confirmPaymentIntent
      )
      setStatusToCheckout = constructSetStatusToCheckout(getById, list, setMany)
    })

    test("When a User is created, a Cart is created for them.", async function () {
      const { person, cart } = await constructGivenACustomer(
        customerHandleCreate
      )("Newt")

      expect(cart.customer.userId).toBe(person.id)
      expect(cart.status).toBe(Status.CART)
    })

    test("When a User submits an Order, a new Cart is created for them.", async function () {
      const { person, cart } = await constructGivenACustomer(
        customerHandleCreate
      )("Annie")
      await givenThatTheCartHasInStockSkus({ theCart: cart })

      await orderSubmit(cart.id)

      const carts = (await listOrdersForUser(person.id)).filter(
        (_order) => _order.status === Status.CART
      )
      expect(carts.length).toBe(1)
      expect(carts[0].id).not.toEqual(cart.id)
    })
  })

  describe("A User may only add in-stock products to their cart.", function () {
    beforeEach(async function () {
      await initializeStore()
      setSkuQuantity = constructSetSkuQuantity(getById, updateById)
    })

    test("Sally can add the in-stock SKU Rollerblades to their cart.", async function () {
      const { person, cart } = await constructGivenACustomer(
        customerHandleCreate
      )("Sally")
      const sku = await givenASku({
        name: "Rollerblades",
        inventory: { type: "finite", quantity: 3, quantityReserved: 1 },
      })

      await setSkuQuantity({ orderId: cart.id, skuId: sku.id, quantity: 2 })

      const [theUpdatedCart] = await listOrdersForUser(person.id)
      expect(theUpdatedCart.skus!.length).toBe(1)
      expect(theUpdatedCart.skuQuantityMap).toMatchObject({
        [sku.id]: 2,
      })
    })
  })

  describe('A User must go through a "checkout" flow before submitting an Order.', function () {
    let chuck: Person
    let chucksCart: Cart

    beforeEach(async function () {
      await initializeStore()
      const { person, cart } = await constructGivenACustomer(
        customerHandleCreate
      )("Newt")
      await givenThatTheCartHasInStockSkus({ theCart: cart })

      chuck = person
      chucksCart = cart
    })

    test('Chuck begins the "checkout" flow.', async function () {
      await setStatusToCheckout(chucksCart.id)

      const [theUpdatedCart] = await listOrdersForUser(chuck.id)
      expect(theUpdatedCart.status).toBe(Status.CART_CHECKOUT)
    })

    test('Chuck completes the "checkout" flow.', async function () {
      confirmPaymentIntent = jest.fn().mockImplementation(async () => {
        throw new Error()
      })
      orderSubmit = constructOrderSubmit(
        getById,
        updateById,
        setMany,
        orderPopulate,
        confirmPaymentIntent
      )

      try {
        await orderSubmit(chucksCart.id)
      } catch {}

      const [theUpdatedCart] = await listOrdersForUser(chuck.id)
      expect(theUpdatedCart.status).toBe(Status.PAYMENT_PENDING)
    })
  })

  describe(
    'When an Order enters "Cart Checkout" status, its SKUs are reserved with respect to ' +
      "inventory",
    function () {
      beforeEach(async function () {
        await initializeStore()

        customerHandleCreate = constructCustomerHandleCreate(setById)
        setSkuQuantity = constructSetSkuQuantity(getById, updateById)
        setStatusToCheckout = constructSetStatusToCheckout(
          getById,
          list,
          setMany
        )
      })

      test("Sam and Cam each put one pair of shoes in their cart, and Sam begins checkout.", async function () {
        const { cart: samsCart } = await constructGivenACustomer(
          customerHandleCreate
        )("Sam")
        const { cart: camsCart } = await constructGivenACustomer(
          customerHandleCreate
        )("Cam")
        await setById(
          SKUS,
          "cool-shoes",
          createFakeMarshalledSku("cool-shoes", {
            inventory: { type: "finite", quantity: 1, quantityReserved: 0 },
          })
        )
        let coolShoes = await getById<MarshalledSku>(SKUS, "cool-shoes")
        await setSkuQuantity({
          orderId: samsCart.id,
          skuId: coolShoes!.id,
          quantity: 1,
        })
        await setSkuQuantity({
          orderId: camsCart.id,
          skuId: coolShoes!.id,
          quantity: 1,
        })

        await setStatusToCheckout(samsCart.id)

        await expect(setStatusToCheckout(camsCart.id)).rejects.toThrow(
          new RegExp(SKUS_OUT_OF_STOCK_ERROR, "g")
        )
        coolShoes = await getById<MarshalledSku>(SKUS, "cool-shoes")
        expect((coolShoes?.inventory as FiniteInventory).quantity).toBe(1)
        expect((coolShoes?.inventory as FiniteInventory).quantityReserved).toBe(
          1
        )
      })
    }
  )
})
