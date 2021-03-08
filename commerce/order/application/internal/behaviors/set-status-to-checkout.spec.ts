import { GetById as GetOrderById } from "@funk/commerce/order/application/internal/behaviors/persistence/get-by-id"
import { UpdateById as UpdateOrderById } from "@funk/commerce/order/application/internal/behaviors/persistence/update-by-id"
import { construct } from "@funk/commerce/order/application/internal/behaviors/set-status-to-checkout"
import { Cart, Status } from "@funk/commerce/order/model/order"
import { createFakeCart } from "@funk/commerce/order/model/stubs"
import { List as ListSkus } from "@funk/commerce/sku/application/internal/behaviors/persistence/list"
import { SetMany as SetManySkus } from "@funk/commerce/sku/application/internal/behaviors/persistence/set-many"
import { FiniteInventory } from "@funk/commerce/sku/model/inventory"
import { Sku, SKUS } from "@funk/commerce/sku/model/sku"
import { createFakeSku } from "@funk/commerce/sku/model/stubs"
import { PRESENTABLE_ERROR_MARKER } from "@funk/helpers/throw-presentable-error"
import { when } from "jest-when"
import { escapeRegExp } from "lodash"

describe("setStatusToCheckout", () => {
  let getOrderById: GetOrderById
  let listSkus: ListSkus
  let updateOrderById: UpdateOrderById
  let setManySkus: SetManySkus

  beforeEach(() => {
    getOrderById = jest.fn()
    listSkus = jest.fn()
    updateOrderById = jest.fn()
    setManySkus = jest.fn()
  })

  describe("success", () => {
    let fakeCart: Cart
    let fakeSku: Sku
    let fakeBucketSku: Sku

    beforeEach(() => {
      fakeSku = createFakeSku("test 1", {
        inventory: { type: "finite", quantity: 1, quantityReserved: 0 },
      })
      fakeBucketSku = createFakeSku("test 2", {
        inventory: { type: "bucket", bucket: "limited" },
      })
      fakeCart = createFakeCart("fake order", {
        skus: [fakeSku, fakeBucketSku],
        skuQuantityMap: {
          [fakeSku.id]: 1,
          [fakeBucketSku.id]: 1,
        },
      })
      when(getOrderById as jest.Mock)
        .calledWith(fakeCart.id)
        .mockResolvedValue(fakeCart)
      when(listSkus as jest.Mock)
        .calledWith(
          expect.objectContaining({
            conditions: [["id", "in", fakeCart.skus!.map(({ id }) => id)]],
          }),
        )
        .mockResolvedValue([fakeSku, fakeBucketSku])
    })

    it("should set the order status to `Cart Checkout` if all SKUs still have enough inventory", async () => {
      const setStatusToCheckout = construct(
        getOrderById,
        listSkus,
        updateOrderById,
        setManySkus,
      )

      await setStatusToCheckout(fakeCart.id)

      expect(getOrderById).toHaveBeenCalled()
      expect(listSkus).toHaveBeenCalled()
      expect(updateOrderById).toHaveBeenCalledWith(
        fakeCart.id,
        expect.objectContaining({
          status: Status.CART_CHECKOUT,
        }),
      )
    })

    it("should prevent the associated inventory from being added to other orders", async () => {
      const setStatusToCheckout = construct(
        getOrderById,
        listSkus,
        updateOrderById,
        setManySkus,
      )

      await setStatusToCheckout(fakeCart.id)

      expect(getOrderById).toHaveBeenCalled()
      expect(listSkus).toHaveBeenCalled()
      expect(updateOrderById).toHaveBeenCalled()
      expect(setManySkus).toHaveBeenCalledWith(
        expect.objectContaining({
          [fakeSku.id]: {
            inventory: {
              ...fakeSku.inventory,
              quantityReserved:
                (fakeSku.inventory as FiniteInventory).quantityReserved +
                fakeCart.skuQuantityMap[fakeSku.id],
            },
          },
        }),
      )
    })
  })

  describe("failure", () => {
    const ORDER_ID = "fake order id"

    beforeEach(() => {
      when(getOrderById as jest.Mock)
        .calledWith(ORDER_ID)
        .mockResolvedValue(
          createFakeCart("fake order", {
            skus: [createFakeSku("test 1")],
            skuQuantityMap: {
              "test 1": 1,
            },
          }),
        )
    })

    it(
      "should NOT set the order status to `Cart Checkout` if one SKU does not have enough " +
        "inventory",
      async () => {
        when(listSkus as jest.Mock)
          .calledWith(expect.objectContaining({ collection: SKUS }))
          .mockResolvedValue([
            createFakeSku("test 1", {
              inventory: { type: "finite", quantity: 1, quantityReserved: 1 },
            }),
          ])
        const setStatusToCheckout = construct(
          getOrderById,
          listSkus,
          updateOrderById,
          setManySkus,
        )

        await expect(setStatusToCheckout(ORDER_ID)).rejects.toThrow()

        expect(updateOrderById).not.toHaveBeenCalled()
        expect(setManySkus).not.toHaveBeenCalled()
      },
    )

    it("should throw a helpful error if one SKU does not have enough inventory", async () => {
      listSkus = jest.fn().mockResolvedValue([
        createFakeSku("test 1", {
          name: "test sku out of stock",
          inventory: { type: "finite", quantity: 1, quantityReserved: 1 },
        }),
        createFakeSku("test 2", {
          name: "test sku out of stock",
          inventory: { type: "bucket", bucket: "out_of_stock" },
        }),
        createFakeSku("test 3", {
          name: "test sku in stock",
          inventory: { type: "bucket", bucket: "in_stock" },
        }),
      ])
      const setStatusToCheckout = construct(
        getOrderById,
        listSkus,
        updateOrderById,
        setManySkus,
      )

      await expect(setStatusToCheckout(ORDER_ID)).rejects.toThrow(
        new RegExp(
          `${escapeRegExp(PRESENTABLE_ERROR_MARKER)}.+(test sku out of stock)`,
        ),
      )

      expect(updateOrderById).not.toHaveBeenCalled()
      expect(setManySkus).not.toHaveBeenCalled()
    })
  })
})
