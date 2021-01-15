import { ChangeHandler } from "@funk/api/plugins/cloud-function/listen/change-handler"
import listImpl from "@funk/api/plugins/persistence/behaviors/list"
import updateByIdImpl from "@funk/api/plugins/persistence/behaviors/update-by-id"
import { TAKE_ALL } from "@funk/api/plugins/persistence/pagination"
import { MarshalledProductAttributeValues } from "@funk/model/commerce/attribute/attribute-value"
import subtract from "@funk/model/commerce/price/behaviors/subtract"
import {
  MarshalledProduct,
  PRODUCTS,
} from "@funk/model/commerce/product/product"
import { MarshalledSku, SKUS } from "@funk/model/commerce/sku/sku"
import { isEqual, uniq } from "lodash"

export function construct(
  list: typeof listImpl,
  updateById: typeof updateByIdImpl,
) {
  return async function ({ before, after }): Promise<void> {
    const skuBefore = before.data()
    const sku = after.data()!

    if (
      isEqual(skuBefore?.attributeValues, sku.attributeValues) &&
      isEqual(skuBefore?.price, sku.price)
    ) {
      return
    }

    const skus = await list<MarshalledSku>({
      collection: SKUS,
      conditions: [["productId", "==", sku.productId]],
      pagination: {
        take: TAKE_ALL,
        skip: 0,
        orderBy: "id",
        orderByDirection: "desc",
      },
    })
    const skuPricesLowToHigh = skus
      .map(({ price }) => price)
      .sort((price1, price2) => subtract(price1, price2).amount)
    const minSkuPrice = skuPricesLowToHigh[0]
    const maxSkuPrice = skuPricesLowToHigh[skuPricesLowToHigh.length - 1]

    await updateById(PRODUCTS, sku.productId!, {
      attributeValues: skus.reduce((attributeValues, _sku) => {
        Object.keys(_sku.attributeValues ?? {}).forEach((attributeId) => {
          const attributeValue = _sku.attributeValues![attributeId]
          attributeValues[attributeId] = uniq([
            ...(attributeValues[attributeId] ?? []),
            attributeValue,
          ]) as string[] | number[]
        })
        return attributeValues
      }, {} as MarshalledProductAttributeValues),
      priceRange: {
        min: minSkuPrice,
        max: maxSkuPrice,
      },
    } as Partial<MarshalledProduct>)
  } as ChangeHandler<MarshalledSku>
}

export default construct(listImpl, updateByIdImpl)

export type SyncProduct = ReturnType<typeof construct>
