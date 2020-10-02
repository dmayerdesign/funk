import { construct } from "@funk/api/commerce/order/set-status-to-checkout"
import { GetById } from "@funk/api/plugins/persistence/behaviors/get-by-id"
import { List } from "@funk/api/plugins/persistence/behaviors/list"
import { SetMany } from "@funk/api/plugins/persistence/behaviors/set-many"
import { PRESENTABLE_ERROR_MARKER } from "@funk/helpers/throw-presentable-error"
import { MarshalledCart, ORDERS, Status } from "@funk/model/commerce/order/order"
import { createFakeMarshalledCart } from "@funk/model/commerce/order/stubs"
import { FiniteInventory } from "@funk/model/commerce/sku/inventory"
import { MarshalledSku, SKUS } from "@funk/model/commerce/sku/sku"
import { createFakeMarshalledSku } from "@funk/model/commerce/sku/stubs"
import { when } from "jest-when"
import { escapeRegExp } from "lodash"

describe("setStatusToCheckout", () =>
{
  let setMany: SetMany
  let getById: GetById
  let list: List

  beforeEach(() =>
  {
    setMany = jest.fn()
    getById = jest.fn()
    list = jest.fn()
  })

  describe("success", () =>
  {
    let fakeCart: MarshalledCart
    let fakeSku: MarshalledSku
    let fakeBucketSku: MarshalledSku

    beforeEach(() =>
    {
      fakeSku = createFakeMarshalledSku(
        "test 1",
        {
          inventory: { type: "finite", quantity: 1, quantityReserved: 0 },
        })
      fakeBucketSku = createFakeMarshalledSku(
        "test 2",
        {
          inventory: { type: "bucket", bucket: "limited" },
        })
      fakeCart = createFakeMarshalledCart("fake order", {
        skus: [ fakeSku.id, fakeBucketSku.id ],
        skuQuantityMap: {
          [fakeSku.id]: 1,
          [fakeBucketSku.id]: 1,
        },
      })
      when(getById as jest.Mock)
        .calledWith(ORDERS, fakeCart.id)
        .mockResolvedValue(fakeCart)
      when(list as jest.Mock)
        .calledWith(expect.objectContaining({
          collection: SKUS,
          conditions: [ [ "id", "in", fakeCart.skus ] ],
        }))
        .mockResolvedValue([ fakeSku, fakeBucketSku ])
    })

    it("should set the order status to `Cart Checkout` if all SKUs still have enough inventory",
      async function ()
      {
        const setStatusToCheckout = construct(getById, list, setMany)

        await setStatusToCheckout(fakeCart.id)

        expect(getById).toHaveBeenCalled()
        expect(list).toHaveBeenCalled()
        expect(setMany).toHaveBeenCalledTimes(1)
        expect(setMany).toHaveBeenCalledWith(expect.objectContaining({
          [ORDERS]: { [fakeCart.id]: { status: Status.CART_CHECKOUT } },
        }))
      })

    it("should prevent the associated inventory from being added to other orders",
      async function ()
      {
        const setStatusToCheckout = construct(getById, list, setMany)

        await setStatusToCheckout(fakeCart.id)

        expect(getById).toHaveBeenCalled()
        expect(list).toHaveBeenCalled()
        expect(setMany).toHaveBeenCalledTimes(1)
        expect(setMany).toHaveBeenCalledWith(expect.objectContaining({
          [SKUS]: {
            [fakeSku.id]: {
              inventory: {
                ...fakeSku.inventory,
                quantityReserved: (fakeSku.inventory as FiniteInventory).quantityReserved
                  + fakeCart.skuQuantityMap[fakeSku.id],
              },
            },
          },
        }))
      })
  })

  describe("failure", () =>
  {
    const ORDER_ID = "fake order id"

    beforeEach(() =>
    {
      when(getById as jest.Mock)
        .calledWith(ORDERS, ORDER_ID)
        .mockResolvedValue(createFakeMarshalledCart("fake order", {
          skus: [ "test 1" ],
          skuQuantityMap: {
            "test 1": 1,
          },
        }))
    })

    it(
      "should NOT set the order status to `Cart Checkout` if one SKU does not have enough " +
      "inventory",
      async function ()
      {
        when(list as jest.Mock)
          .calledWith(expect.objectContaining({ collection: SKUS }))
          .mockResolvedValue([
            createFakeMarshalledSku("test 1", {
              inventory: { type: "finite", quantity: 1, quantityReserved: 1 },
            }),
          ])
        const setStatusToCheckout = construct(getById, list, setMany)

        await expect(setStatusToCheckout(ORDER_ID)).rejects.toThrow()

        expect(setMany).not.toHaveBeenCalled()
      })

    it("should throw a helpful error if one SKU does not have enough inventory",
      async function ()
      {
        when(list as jest.Mock)
          .calledWith(expect.objectContaining({ collection: SKUS }))
          .mockResolvedValue([
            createFakeMarshalledSku("test 1", {
              name: "test sku out of stock",
              inventory: { type: "finite", quantity: 1, quantityReserved: 1 },
            }),
            createFakeMarshalledSku("test 2", {
              name: "test sku out of stock",
              inventory: { type: "bucket", bucket: "out_of_stock" },
            }),
            createFakeMarshalledSku("test 3", {
              name: "test sku in stock",
              inventory: { type: "bucket", bucket: "in_stock" },
            }),
          ])
        const setStatusToCheckout = construct(getById, list, setMany)

        await expect(setStatusToCheckout(ORDER_ID)).rejects.toThrow(
          new RegExp(`${escapeRegExp(PRESENTABLE_ERROR_MARKER)}.+(test sku out of stock)`))

        expect(setMany).not.toHaveBeenCalled()
      })
  })
})

