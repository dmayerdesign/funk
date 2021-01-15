import {
  construct,
  SyncProduct,
} from "@funk/api/core/commerce/sku/sync-product"
import { List } from "@funk/api/plugins/persistence/behaviors/list"
import { UpdateById } from "@funk/api/plugins/persistence/behaviors/update-by-id"
import { ChangeContext } from "@funk/api/plugins/persistence/change"
import { DocumentSnapshot } from "@funk/api/plugins/persistence/document-snapshot"
import { PRODUCTS } from "@funk/model/commerce/product/product"
import { MarshalledSku } from "@funk/model/commerce/sku/sku"
import { createFakeMarshalledSku } from "@funk/model/commerce/sku/stubs"
import { CurrencyCode } from "@funk/model/money/currency-code"

describe("skuSyncProduct", () => {
  let ATTRIBUTE_ID_1: string
  let ATTRIBUTE_ID_2: string
  let ATTRIBUTE_VALUE_1_1: string
  let ATTRIBUTE_VALUE_1_2: string
  let ATTRIBUTE_VALUE_2: string
  let PRODUCT_ID: string
  let CHANGED_SKU: MarshalledSku
  let ALL_SKUS: MarshalledSku[]
  let list: List
  let updateById: UpdateById
  let syncProduct: SyncProduct

  it("should do nothing if there is no change in attribute values nor price", async function () {
    await syncProduct(
      {
        before: ({ data: () => CHANGED_SKU } as unknown) as DocumentSnapshot<
          MarshalledSku
        >,
        after: ({ data: () => CHANGED_SKU } as unknown) as DocumentSnapshot<
          MarshalledSku
        >,
      },
      {} as ChangeContext,
    )

    expect(list).not.toHaveBeenCalled()
    expect(updateById).not.toHaveBeenCalled()
  })

  it("should update the parent product whenever attribute values change", async function () {
    await syncProduct(
      {
        before: ({ data: () => undefined } as unknown) as DocumentSnapshot<
          MarshalledSku
        >,
        after: ({ data: () => CHANGED_SKU } as unknown) as DocumentSnapshot<
          MarshalledSku
        >,
      },
      {} as ChangeContext,
    )

    expect(list).toHaveBeenCalled()
    expect(updateById).toHaveBeenCalledWith(PRODUCTS, PRODUCT_ID, {
      attributeValues: {
        [ATTRIBUTE_ID_1]: [ATTRIBUTE_VALUE_1_1, ATTRIBUTE_VALUE_1_2],
        [ATTRIBUTE_ID_2]: [ATTRIBUTE_VALUE_2],
      },
      priceRange: {
        min: { amount: 500, currency: CurrencyCode.USD },
        max: { amount: 600, currency: CurrencyCode.USD },
      },
    })
  })

  beforeEach(() => {
    ATTRIBUTE_ID_1 = "attribute id 1" as string
    ATTRIBUTE_ID_2 = "attribute id 2" as string
    ATTRIBUTE_VALUE_1_1 = "attribute value 1-1"
    ATTRIBUTE_VALUE_1_2 = "attribute value 1-2"
    ATTRIBUTE_VALUE_2 = "attribute value 2"
    PRODUCT_ID = "product id"
    CHANGED_SKU = {
      ...createFakeMarshalledSku(),
      productId: PRODUCT_ID,
      attributeValues: {
        [ATTRIBUTE_ID_1]: ATTRIBUTE_VALUE_1_1,
      },
      price: { amount: 500, currency: CurrencyCode.USD },
    } as MarshalledSku
    ALL_SKUS = [
      CHANGED_SKU,
      {
        productId: PRODUCT_ID,
        attributeValues: {
          [ATTRIBUTE_ID_1]: ATTRIBUTE_VALUE_1_2,
          [ATTRIBUTE_ID_2]: ATTRIBUTE_VALUE_2,
        },
        price: { amount: 600, currency: CurrencyCode.USD },
      } as MarshalledSku,
    ] as MarshalledSku[]
    list = jest.fn().mockReturnValue(Promise.resolve(ALL_SKUS))
    updateById = jest.fn()
    syncProduct = construct(list, updateById)
  })
})
