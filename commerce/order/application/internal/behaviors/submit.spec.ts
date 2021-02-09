import { Populate } from "@funk/commerce/order/application/internal/behaviors/populate"
import { construct } from "@funk/commerce/order/application/internal/behaviors/submit"
import {
    MarshalledCart,
    Order,
    ORDERS,
    Status
} from "@funk/commerce/order/model/order"
import {
    createFakeMarshalledCart,
    createFakeOrder
} from "@funk/commerce/order/model/stubs"
import { MarshalledSku, SKUS } from "@funk/commerce/sku/model/sku"
import { createFakeMarshalledSku } from "@funk/commerce/sku/model/stubs"
import { ConfirmPaymentIntent } from "@funk/money/plugins/internal/payment/behaviors/confirm-payment-intent"
import { GetById } from "@funk/persistence/application/internal/behaviors/get-by-id"
import { SetMany } from "@funk/persistence/application/internal/behaviors/set-many"
import { UpdateById } from "@funk/persistence/application/internal/behaviors/update-by-id"
import { when } from "jest-when"
import { values } from "lodash"

describe("orderSubmit", () => {
  let fakeCartNoSkus: MarshalledCart
  let fakeMarshalledCart: MarshalledCart
  let fakePopulatedCart: Order
  let fakeSku: MarshalledSku

  let getById: GetById
  let updateById: UpdateById
  let setMany: SetMany
  let populate: Populate
  let confirmPaymentIntent: ConfirmPaymentIntent

  describe("failure", () => {
    beforeEach(() => {
      setUp()
    })

    it("should throw an error if the Order has no Skus", async () => {
      const submit = construct(
        getById,
        updateById,
        setMany,
        populate,
        confirmPaymentIntent,
      )

      await expect(submit(fakeCartNoSkus.id)).rejects.toThrow()

      expect(updateById).not.toHaveBeenCalled()
      expect(setMany).not.toHaveBeenCalled()
    })

    it("should throw an error if confirmPaymentIntent fails", async () => {
      confirmPaymentIntent = jest.fn().mockImplementation(async () => {
        throw new Error()
      })
      const submit = construct(
        getById,
        updateById,
        setMany,
        populate,
        confirmPaymentIntent,
      )

      await expect(submit(fakeMarshalledCart.id)).rejects.toThrow()

      expect(updateById).toHaveBeenCalledWith(
        ORDERS,
        fakeMarshalledCart.id,
        expect.objectContaining({
          status: Status.PAYMENT_PENDING,
        }),
      )
      expect(setMany).not.toHaveBeenCalled()
    })
  })

  describe("success", () => {
    beforeEach(async () => {
      setUp()

      const submit = construct(
        getById,
        updateById,
        setMany,
        populate,
        confirmPaymentIntent,
      )

      await submit(fakeMarshalledCart.id)
    })

    it("should submit payment via the payment service provider", async () => {
      expect(updateById).toHaveBeenCalledWith(
        ORDERS,
        fakeMarshalledCart.id,
        expect.objectContaining({
          status: Status.PAYMENT_PENDING,
        }),
      )
      expect(confirmPaymentIntent).toHaveBeenCalledTimes(1)
    })

    it("should update the Order Status to PAID", async () => {
      expect(setMany).toHaveBeenCalledWith(
        expect.objectContaining({
          [ORDERS]: expect.objectContaining({
            [fakeMarshalledCart.id]: {
              status: Status.PAID,
            },
          }),
        }),
      )
    })

    it("should update the SKU inventory", async () => {
      expect(setMany).toHaveBeenCalledWith(
        expect.objectContaining({
          [SKUS]: expect.objectContaining({
            [fakeSku.id]: {
              inventory: {
                ...fakeSku.inventory,
                quantity: 0,
                quantityReserved: 0,
              },
            },
          }),
        }),
      )
    })

    it("should create a new Cart for the customer", async () => {
      const ordersBatchSet = (setMany as jest.Mock).mock.calls[0][0][ORDERS]
      const ordersBatchSetNewCart = values<Partial<Order>>(ordersBatchSet).find(
        (orderOrPartial) => orderOrPartial.status === Status.CART,
      )

      expect(ordersBatchSetNewCart).toBeTruthy()
    })
  })

  function setUp(): void {
    fakeSku = createFakeMarshalledSku("fake sku", {
      inventory: {
        type: "finite",
        quantity: 1,
        quantityReserved: 1,
      },
    })
    fakeCartNoSkus = createFakeMarshalledCart("fake cart no skus")
    fakeMarshalledCart = createFakeMarshalledCart("fake cart good", {
      skus: [fakeSku.id],
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

    getById = jest.fn()
    updateById = jest.fn()
    setMany = jest.fn()
    populate = jest.fn()
    confirmPaymentIntent = jest.fn()

    when(getById as jest.Mock)
      .calledWith(ORDERS, fakeMarshalledCart.id)
      .mockResolvedValue(fakeMarshalledCart)
    when(getById as jest.Mock)
      .calledWith(ORDERS, fakeCartNoSkus.id)
      .mockResolvedValue(fakeCartNoSkus)
    when(populate as jest.Mock)
      .calledWith(expect.objectContaining(fakeMarshalledCart))
      .mockResolvedValue(fakePopulatedCart)
  }
})
