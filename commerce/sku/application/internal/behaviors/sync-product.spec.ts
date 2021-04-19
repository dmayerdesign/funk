import { UpdateById as UpdateProductById } from "@funk/commerce/product/application/internal/behaviors/persistence/update-by-id"
import { List } from "@funk/commerce/sku/application/internal/behaviors/persistence/list"
import {
  construct,
  SyncProduct,
} from "@funk/commerce/sku/application/internal/behaviors/sync-product"
import { Sku } from "@funk/commerce/sku/model/sku"
import { createFakeSku } from "@funk/commerce/sku/model/stubs"
import { CurrencyCode } from "@funk/money/model/currency-code"
import { Marshalled } from "@funk/persistence/application/internal/behaviors/marshall"
import { DocumentSnapshot } from "@funk/persistence/application/internal/document-snapshot"
import { ChangeContext } from "@funk/persistence/plugins/internal/events/change"

describe("skuSyncProduct", () => {
  let ATTRIBUTE_VALUE_1_1: string
  let ATTRIBUTE_VALUE_1_2: string
  let ATTRIBUTE_VALUE_2: string
  let PRODUCT_ID: string
  let CHANGED_SKU: Marshalled<Sku>
  let ALL_SKUS: Marshalled<Sku>[]
  let list: List
  let updateProductById: UpdateProductById
  let syncProduct: SyncProduct

  it("should do nothing if there is no change in attribute values nor price", async () => {
    await syncProduct(
      {
        before: ({ data: () => CHANGED_SKU } as unknown) as DocumentSnapshot<
          Marshalled<Sku>
        >,
        after: ({ data: () => CHANGED_SKU } as unknown) as DocumentSnapshot<
          Marshalled<Sku>
        >,
      },
      {} as ChangeContext,
    )

    expect(list).not.toHaveBeenCalled()
    expect(updateProductById).not.toHaveBeenCalled()
  })

  it("should update the parent product whenever attribute values change", async () => {
    await syncProduct(
      {
        before: ({ data: () => undefined } as unknown) as DocumentSnapshot<
          Marshalled<Sku>
        >,
        after: ({ data: () => CHANGED_SKU } as unknown) as DocumentSnapshot<
          Marshalled<Sku>
        >,
      },
      {} as ChangeContext,
    )

    expect(list).toHaveBeenCalled()
    expect(updateProductById).toHaveBeenCalledWith(PRODUCT_ID, {
      attributeValues: [ATTRIBUTE_VALUE_1_1],
      priceRange: {
        min: { amount: 500, currency: CurrencyCode.USD },
        max: { amount: 600, currency: CurrencyCode.USD },
      },
    })
  })

  beforeEach(() => {
    ATTRIBUTE_VALUE_1_1 = "attribute value 1-1"
    ATTRIBUTE_VALUE_1_2 = "attribute value 1-2"
    ATTRIBUTE_VALUE_2 = "attribute value 2"
    PRODUCT_ID = "product id"
    CHANGED_SKU = {
      ...createFakeSku(),
      productId: PRODUCT_ID,
      attributeValues: [ATTRIBUTE_VALUE_1_1],
      price: { amount: 500, currency: CurrencyCode.USD },
    } as Marshalled<Sku>
    ALL_SKUS = [
      CHANGED_SKU,
      {
        productId: PRODUCT_ID,
        attributeValues: [ATTRIBUTE_VALUE_1_2, ATTRIBUTE_VALUE_2],
        price: { amount: 600, currency: CurrencyCode.USD },
      } as Marshalled<Sku>,
    ] as Marshalled<Sku>[]
    list = jest.fn().mockReturnValue(Promise.resolve(ALL_SKUS))
    updateProductById = jest.fn()
    syncProduct = construct(list, updateProductById)
  })
})
