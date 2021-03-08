import { GetById as GetOrderById } from "@funk/commerce/order/application/internal/behaviors/persistence/get-by-id"
import { Populate } from "@funk/commerce/order/application/internal/behaviors/persistence/populate"
import { SetMany as SetManyOrders } from "@funk/commerce/order/application/internal/behaviors/persistence/set-many"
import { UpdateById as UpdateOrderById } from "@funk/commerce/order/application/internal/behaviors/persistence/update-by-id"
import { construct } from "@funk/commerce/order/application/internal/behaviors/submit"
import { Cart, Order, Status } from "@funk/commerce/order/model/order"
import {
  createFakeCart,
  createFakeOrder,
} from "@funk/commerce/order/model/stubs"
import { SetMany as SetManySkus } from "@funk/commerce/sku/application/internal/behaviors/persistence/set-many"
import { Sku } from "@funk/commerce/sku/model/sku"
import { createFakeSku } from "@funk/commerce/sku/model/stubs"
import { ConfirmPaymentIntent } from "@funk/money/plugins/internal/payment/behaviors/confirm-payment-intent"
import { when } from "jest-when"
import { values } from "lodash"

describe("orderSubmit", () => {
  let fakeCartNoSkus: Cart
  let fakeCart: Cart
  let fakePopulatedCart: Order
  let fakeSku: Sku

  let getOrderById: GetOrderById
  let updateOrderById: UpdateOrderById
  let setManyOrders: SetManyOrders
  let setManySkus: SetManySkus
  let populate: Populate
  let confirmPaymentIntent: ConfirmPaymentIntent

  describe("failure", () => {
    beforeEach(() => {
      setUp()
    })

    it("should throw an error if the Order has no Skus", async () => {
      const submit = construct(
        getOrderById,
        updateOrderById,
        setManyOrders,
        setManySkus,
        populate,
        confirmPaymentIntent,
      )

      await expect(submit(fakeCartNoSkus.id)).rejects.toThrow()

      expect(updateOrderById).not.toHaveBeenCalled()
      expect(setManyOrders).not.toHaveBeenCalled()
      expect(setManySkus).not.toHaveBeenCalled()
    })

    it("should throw an error if confirmPaymentIntent fails", async () => {
      confirmPaymentIntent = jest.fn().mockImplementation(async () => {
        throw new Error()
      })
      const submit = construct(
        getOrderById,
        updateOrderById,
        setManyOrders,
        setManySkus,
        populate,
        confirmPaymentIntent,
      )

      await expect(submit(fakeCart.id)).rejects.toThrow()

      expect(updateOrderById).toHaveBeenCalledWith(
        fakeCart.id,
        expect.objectContaining({
          status: Status.PAYMENT_PENDING,
        }),
      )
      expect(setManyOrders).not.toHaveBeenCalled()
      expect(setManySkus).not.toHaveBeenCalled()
    })
  })

  describe("success", () => {
    beforeEach(async () => {
      setUp()

      const submit = construct(
        getOrderById,
        updateOrderById,
        setManyOrders,
        setManySkus,
        populate,
        confirmPaymentIntent,
      )

      await submit(fakeCart.id)
    })

    it("should submit payment via the payment service provider", async () => {
      expect(updateOrderById).toHaveBeenCalledWith(
        fakeCart.id,
        expect.objectContaining({
          status: Status.PAYMENT_PENDING,
        }),
      )
      expect(confirmPaymentIntent).toHaveBeenCalledTimes(1)
    })

    it("should update the Order Status to PAID", async () => {
      expect(setManyOrders).toHaveBeenCalledWith(
        expect.objectContaining({
          [fakeCart.id]: {
            status: Status.PAID,
          },
        }),
      )
    })

    it("should update the SKU inventory", async () => {
      expect(setManySkus).toHaveBeenCalledWith(
        expect.objectContaining({
          [fakeSku.id]: {
            inventory: {
              ...fakeSku.inventory,
              quantity: 0,
              quantityReserved: 0,
            },
          },
        }),
      )
    })

    it("should create a new Cart for the customer", async () => {
      const ordersBatchSet = (setManyOrders as jest.Mock).mock.calls[0][0]
      const ordersBatchSetNewCart = values<Partial<Order>>(ordersBatchSet).find(
        (orderOrPartial) => orderOrPartial.status === Status.CART,
      )

      expect(ordersBatchSetNewCart).toBeTruthy()
    })
  })

  function setUp(): void {
    fakeSku = createFakeSku("fake sku", {
      inventory: {
        type: "finite",
        quantity: 1,
        quantityReserved: 1,
      },
    })
    fakeCartNoSkus = createFakeCart("fake cart no skus")
    fakeCart = createFakeCart("fake cart good", {
      skus: [fakeSku],
      skuQuantityMap: {
        [fakeSku.id]: 1,
      },
    })
    fakePopulatedCart = createFakeOrder("fake cart good", {
      skus: [fakeSku],
      skuQuantityMap: {
        [fakeSku.id]: 1,
      },
    })

    getOrderById = jest.fn()
    updateOrderById = jest.fn()
    setManyOrders = jest.fn()
    setManySkus = jest.fn()
    populate = jest.fn()
    confirmPaymentIntent = jest.fn()

    when(getOrderById as jest.Mock)
      .calledWith(fakeCart.id)
      .mockResolvedValue(fakeCart)
    when(getOrderById as jest.Mock)
      .calledWith(fakeCartNoSkus.id)
      .mockResolvedValue(fakeCartNoSkus)
    when(populate as jest.Mock)
      .calledWith(expect.objectContaining(fakeCart))
      .mockResolvedValue(fakePopulatedCart)
  }
})
