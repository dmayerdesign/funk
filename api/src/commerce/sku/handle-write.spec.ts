import { construct } from "@funk/api/commerce/sku/handle-write"
import { PRODUCTS } from "@funk/model/commerce/product/product"
import { MarshalledSku } from "@funk/model/commerce/sku/sku"
import { createFakeMarshalledSku } from "@funk/model/commerce/sku/stubs"
import { ChangeContext } from "@funk/plugins/persistence/change"
import { DocumentSnapshot } from "@funk/plugins/persistence/document-snapshot"

describe("skuHandleWrite", () =>
{
  it("should update the parent product whenever attribute values change", async (done) =>
  {
    const ATTRIBUTE_ID_1 = "attribute id 1" as string
    const ATTRIBUTE_ID_2 = "attribute id 2" as string
    const ATTRIBUTE_VALUE_1_1 = "attribute value 1-1"
    const ATTRIBUTE_VALUE_1_2 = "attribute value 1-2"
    const ATTRIBUTE_VALUE_2 = "attribute value 2"
    const PRODUCT_ID = "product id"
    const CHANGED_SKU = {
      ...createFakeMarshalledSku(),
      productId: PRODUCT_ID,
      attributeValues: {
        [ATTRIBUTE_ID_1]: ATTRIBUTE_VALUE_1_1,
      },
    } as MarshalledSku
    const ALL_SKUS = [
      CHANGED_SKU,
      {
        productId: PRODUCT_ID,
        attributeValues: {
          [ATTRIBUTE_ID_1]: ATTRIBUTE_VALUE_1_2,
          [ATTRIBUTE_ID_2]: ATTRIBUTE_VALUE_2,
        },
      } as MarshalledSku,
    ] as MarshalledSku[]
    const list = jasmine.createSpy().and.returnValue(
      Promise.resolve(ALL_SKUS)
    )
    const updateById = jasmine.createSpy()
    const handleWrite = construct({ list, updateById })

    await handleWrite(
      {
        before: { data: () => undefined } as unknown as  DocumentSnapshot<MarshalledSku>,
        after: { data: () => CHANGED_SKU } as unknown as  DocumentSnapshot<MarshalledSku>,
      },
      {} as ChangeContext
    )

    expect(list).toHaveBeenCalled()
    expect(updateById).toHaveBeenCalledWith(PRODUCTS, PRODUCT_ID, {
      attributeValues: {
        [ATTRIBUTE_ID_1]: [ ATTRIBUTE_VALUE_1_1, ATTRIBUTE_VALUE_1_2 ],
        [ATTRIBUTE_ID_2]: [ ATTRIBUTE_VALUE_2 ],
      },
    })

    done()
  })
})

