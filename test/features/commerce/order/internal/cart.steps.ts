import {
  construct as constructCustomerHandleCreate,
  HandleCreate,
} from "@funk/commerce/customer/application/internal/behaviors/handle-create"
import {
  construct as constructGetOrderById,
  GetById as GetOrderById,
} from "@funk/commerce/order/application/internal/behaviors/persistence/get-by-id"
import {
  construct as constructOrderMarshall,
  Marshall,
} from "@funk/commerce/order/application/internal/behaviors/persistence/marshall"
import {
  construct as constructOrderPopulate,
  Populate,
} from "@funk/commerce/order/application/internal/behaviors/persistence/populate"
import {
  construct as constructSetOrderById,
  SetById as SetOrderById,
} from "@funk/commerce/order/application/internal/behaviors/persistence/set-by-id"
import {
  construct as constructSetManyOrders,
  SetMany as SetManyOrders,
} from "@funk/commerce/order/application/internal/behaviors/persistence/set-many"
import {
  construct as constructUpdateOrderById,
  UpdateById as UpdateOrderById,
} from "@funk/commerce/order/application/internal/behaviors/persistence/update-by-id"
import {
  construct as constructSetSkuQuantity,
  SetSkuQuantity,
} from "@funk/commerce/order/application/internal/behaviors/set-sku-quantity"
import {
  construct as constructSetStatusToCheckout,
  SetStatusToCheckout,
} from "@funk/commerce/order/application/internal/behaviors/set-status-to-checkout"
import {
  construct as constructOrderSubmit,
  Submit,
} from "@funk/commerce/order/application/internal/behaviors/submit"
import { Cart, Status } from "@funk/commerce/order/model/order"
import {
  construct as constructGetSkuById,
  GetById as GetSkuById,
} from "@funk/commerce/sku/application/internal/behaviors/persistence/get-by-id"
import {
  construct as constructListSkus,
  List as ListSkus,
} from "@funk/commerce/sku/application/internal/behaviors/persistence/list"
import {
  construct as constructSkuMarshall,
  Marshall as SkuMarshall,
} from "@funk/commerce/sku/application/internal/behaviors/persistence/marshall"
import {
  construct as constructSkuPopulate,
  Populate as SkuPopulate,
} from "@funk/commerce/sku/application/internal/behaviors/persistence/populate"
import {
  construct as constructSetSkuById,
  SetById as SetSkuById,
} from "@funk/commerce/sku/application/internal/behaviors/persistence/set-by-id"
import {
  construct as constructSetManySkus,
  SetMany as SetManySkus,
} from "@funk/commerce/sku/application/internal/behaviors/persistence/set-many"
import { FiniteInventory } from "@funk/commerce/sku/model/inventory"
import { Sku } from "@funk/commerce/sku/model/sku"
import { createFakeSku } from "@funk/commerce/sku/model/stubs"
import { Person } from "@funk/identity/person/model/person"
import { ConfirmPaymentIntent } from "@funk/money/plugins/internal/payment/behaviors/confirm-payment-intent"
import marshallImpl from "@funk/persistence/application/internal/behaviors/marshall"
import { createFakeAddress } from "@funk/places/model/stubs"
import loadFeatureOptions from "@funk/test/configuration/load-feature-options"
import {
  constructGivenACustomer,
  givenASku,
  givenThatTheCartContainsInStockSkus,
  listOrdersForUser,
} from "@funk/test/features/commerce/order/internal/helpers"
import { background, rule } from "@funk/test/helpers/internal/helpers"
import getById from "@funk/test/plugins/internal/persistence/behaviors/get-by-id"
import list from "@funk/test/plugins/internal/persistence/behaviors/list"
import populate from "@funk/test/plugins/internal/persistence/behaviors/populate"
import setById from "@funk/test/plugins/internal/persistence/behaviors/set-by-id"
import setMany from "@funk/test/plugins/internal/persistence/behaviors/set-many"
import updateById from "@funk/test/plugins/internal/persistence/behaviors/update-by-id"
import { initializeStore } from "@funk/test/plugins/internal/persistence/in-memory-store"
import { SKUS_OUT_OF_STOCK_ERROR } from "@funk/ui/copy/error-messages"
import { defineFeature, DefineStepFunction, loadFeature } from "jest-cucumber"
import { resolve } from "path"

const feature = loadFeature(
  resolve(__dirname, "cart.feature"),
  loadFeatureOptions,
)

defineFeature(feature, function (example) {
  let confirmPaymentIntent: ConfirmPaymentIntent

  let orderPopulate: Populate
  let orderMarshall: Marshall
  let skuPopulate: SkuPopulate
  let skuMarshall: SkuMarshall
  let getOrderById: GetOrderById
  let setOrderById: SetOrderById
  let updateOrderById: UpdateOrderById
  let setManyOrders: SetManyOrders
  let setManySkus: SetManySkus
  let getSkuById: GetSkuById
  let setSkuById: SetSkuById
  let listSkus: ListSkus
  let customerHandleCreate: HandleCreate
  let orderSubmit: Submit
  let setStatusToCheckout: SetStatusToCheckout
  let setSkuQuantity: SetSkuQuantity

  let person: Person
  let cart: Cart
  let cart2: Cart
  let sku: Sku

  background(async () => {
    await initializeStore()

    confirmPaymentIntent = jest.fn()

    orderPopulate = constructOrderPopulate(populate)
    orderMarshall = constructOrderMarshall(marshallImpl)
    skuPopulate = constructSkuPopulate(populate)
    skuMarshall = constructSkuMarshall(marshallImpl)
    getOrderById = constructGetOrderById(getById, orderPopulate)
    updateOrderById = constructUpdateOrderById(updateById, orderMarshall)
    setOrderById = constructSetOrderById(setById, orderMarshall)
    setManyOrders = constructSetManyOrders(setMany, orderMarshall)
    setManySkus = constructSetManySkus(setMany, skuMarshall)
    getSkuById = constructGetSkuById(getById, skuPopulate)
    setSkuById = constructSetSkuById(setById, skuMarshall)
    listSkus = constructListSkus(list, skuPopulate)
    customerHandleCreate = constructCustomerHandleCreate(setOrderById)
    orderSubmit = constructOrderSubmit(
      getOrderById,
      updateOrderById,
      setManyOrders,
      setManySkus,
      orderPopulate,
      confirmPaymentIntent,
    )
    setStatusToCheckout = constructSetStatusToCheckout(
      getOrderById,
      listSkus,
      updateOrderById,
      setManySkus,
    )
    setSkuQuantity = constructSetSkuQuantity(
      getOrderById,
      updateOrderById,
      getSkuById,
    )
  })

  rule("A user must always have a shopping cart.", () => {
    example("When Newt is created, a cart is created for Newt.", function ({
      given,
      when,
      then,
    }) {
      defineGivenACustomer(given)

      when(/(\w)+ visits the app for the first time$/, () => {})

      then(/the app creates an order associated with ([\w\s]+)$/, () => {
        expect(cart.customer.userId).toBe(person.id)
      })

      then(/the order has a status of "Cart"$/, () => {
        expect(cart.status).toBe(Status.CART)
      })
    })

    example(
      "When Annie submits an order, a new cart is created for Annie.",
      async function ({ given, when, then }) {
        defineGivenACustomer(given)
        defineGivenThatTheCartContainsInStockSkus(given)

        when(/([\w\s]+) successfully submits their order$/, async () => {
          await orderSubmit(cart.id)
        })

        then(/a new cart is created for ([\w\s]+)$/, async () => {
          const carts = (await listOrdersForUser(person.id)).filter(
            (_order) => _order.status === Status.CART,
          )
          expect(carts.length).toBe(1)
          expect(carts[0].id).not.toEqual(cart.id)
        })
      },
    )
  })

  rule("A user may only add in-stock products to their cart.", () => {
    example(
      "Sally can add the in-stock SKU Rollerblades to their cart.",
      function ({ given, when, then }) {
        defineGivenACustomer(given)

        given(/an in-stock SKU named ([\w\s]+)$/, async () => {
          sku = await givenASku({
            name: "Rollerblades",
            inventory: { type: "finite", quantity: 3, quantityReserved: 1 },
          })
        })

        when(/([\w\s]+) tries to add ([\w\s]+) to their cart$/, async () => {
          await setSkuQuantity({
            orderId: cart.id,
            skuId: sku.id,
            quantity: 2,
          })
        })

        then(/the ([\w\s]+) are successfully added$/, async () => {
          const [theUpdatedCart] = await listOrdersForUser(person.id)
          expect(theUpdatedCart.skus!.length).toBe(1)
          expect(theUpdatedCart.skuQuantityMap).toMatchObject({
            [sku.id]: 2,
          })
        })
      },
    )
  })

  rule(
    'A user must go through a "checkout" flow before submitting an order.',
    () => {
      example('Chuck begins the "checkout" flow.', function ({
        given,
        when,
        then,
      }) {
        defineGivenACustomer(given)
        defineGivenThatTheCartContainsInStockSkus(given)

        when(/([\w\s]+) begins the "checkout" flow$/, async () => {
          await setStatusToCheckout(cart.id)
        })

        then(
          /the status of ([\w\s]+)'s cart changes to "Cart Checkout"$/,
          async () => {
            const [theUpdatedCart] = await listOrdersForUser(person.id)
            expect(theUpdatedCart.status).toBe(Status.CART_CHECKOUT)
          },
        )
      })

      example('Chuck completes the "checkout" flow with errors.', function ({
        given,
        when,
        then,
      }) {
        defineGivenACustomer(given)
        defineGivenThatTheCartContainsInStockSkus(given)

        given(
          /that ([\w\s]+) has provided their payment information$/,
          async () => {
            cart.paymentIntentId = "fake payment intent id"
            confirmPaymentIntent = jest.fn().mockImplementation(async () => {
              // Doesn't matter whether `confirmPaymentIntent` succeeds.
              throw new Error()
            })
          },
        )

        given(
          /that ([\w\s]+) has provided their shipping address and chosen a shipping rate$/,
          async () => {
            cart.customer.shippingAddress = createFakeAddress()
            cart.shipmentCarrier = "fake carrier"
          },
        )

        when(/([\w\s]+) submits their order/, async () => {
          orderSubmit = constructOrderSubmit(
            getOrderById,
            updateOrderById,
            setManyOrders,
            setManySkus,
            orderPopulate,
            confirmPaymentIntent,
          )

          try {
            await orderSubmit(cart.id)
          } catch {}
        })

        then(
          /the status of ([\w\s]+)'s order changes to "Payment Pending"/,
          async () => {
            const [theUpdatedCart] = await listOrdersForUser(person.id)
            expect(theUpdatedCart.status).toBe(Status.PAYMENT_PENDING)
          },
        )
      })
    },
  )

  rule(
    'When an order enters "Cart Checkout" status, its SKUs are reserved with respect to ' +
      "inventory",
    () => {
      example(
        "Sam and Cam each put one pair of shoes in their cart, and Sam begins checkout.",
        function ({ given, when, then }) {
          let coolShoes: Sku | undefined

          given(/2 customers named (\w+) and (\w+)$/, async function (
            customer1Name: string,
            customer2Name: string,
          ) {
            const person1CartData = await constructGivenACustomer(
              customerHandleCreate,
            )(customer1Name)
            const person2CartData = await constructGivenACustomer(
              customerHandleCreate,
            )(customer2Name)

            person = person1CartData.person
            cart = person1CartData.cart
            cart2 = person2CartData.cart
          })

          given(
            /an in-stock SKU named ([\w\s]+) with 1 left in inventory$/,
            async () => {
              await setSkuById(
                "cool-shoes",
                createFakeSku("cool-shoes", {
                  inventory: {
                    type: "finite",
                    quantity: 1,
                    quantityReserved: 0,
                  },
                }),
              )
              coolShoes = await getSkuById("cool-shoes")
            },
          )

          given(
            /that Sam and Cam each put ([\w\s]+) into their carts$/,
            async () => {
              await setSkuQuantity({
                orderId: cart.id,
                skuId: coolShoes!.id,
                quantity: 1,
              })
              await setSkuQuantity({
                orderId: cart2.id,
                skuId: coolShoes!.id,
                quantity: 1,
              })
            },
          )

          when(/Sam begins the "checkout" flow$/, async () => {
            await setStatusToCheckout(cart.id)
          })

          then(/Cam is no longer able to purchase ([\w\s]+)$/, async () => {
            await expect(setStatusToCheckout(cart2.id)).rejects.toThrow(
              new RegExp(SKUS_OUT_OF_STOCK_ERROR, "g"),
            )
          })

          then(/the SKU's stock quantity appears to Cam as zero$/, async () => {
            coolShoes = await getSkuById("cool-shoes")
            expect((coolShoes?.inventory as FiniteInventory).quantity).toBe(1)
            expect(
              (coolShoes?.inventory as FiniteInventory).quantityReserved,
            ).toBe(1)
          })
        },
      )
    },
  )

  function defineGivenACustomer(given: DefineStepFunction) {
    given(/a customer named ([\w\s]+)/, async function (customerName: string) {
      const customerData = await constructGivenACustomer(customerHandleCreate)(
        customerName,
      )
      person = customerData.person
      cart = customerData.cart
    })
  }
  function defineGivenThatTheCartContainsInStockSkus(
    given: DefineStepFunction,
  ) {
    given(/that ([\w\s]+)'s cart contains in-stock SKUs$/, async () => {
      await givenThatTheCartContainsInStockSkus({ theCart: cart })
    })
  }
})
