import subtract from "@funk/commerce/price/model/behaviors/subtract"
import updateProductByIdImpl, {
  UpdateById as UpdateProductById,
} from "@funk/commerce/product/application/internal/behaviors/persistence/update-by-id"
import { Product } from "@funk/commerce/product/model/product"
import listImpl, {
  List,
} from "@funk/commerce/sku/application/internal/behaviors/persistence/list"
import { Sku } from "@funk/commerce/sku/model/sku"
import { ChangeHandler } from "@funk/http/plugins/internal/cloud-function/behaviors/listen/change-handler"
import { TAKE_ALL } from "@funk/persistence/application/internal/pagination"
import { flatMap, isEqual, uniqBy } from "lodash"

export function construct(list: List, updateProductById: UpdateProductById) {
  return async function ({ before, after }): Promise<void> {
    const skuBefore = before.data()
    const sku = after.data()!

    if (
      isEqual(skuBefore?.attributeValues, sku.attributeValues) &&
      isEqual(skuBefore?.price, sku.price)
    ) {
      return
    }

    const skus = await list({
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

    await updateProductById(sku.productId!, {
      attributeValues: uniqBy(
        flatMap(skus.map((_sku) => _sku.attributeValues)),
        "id",
      ),
      priceRange: {
        min: minSkuPrice,
        max: maxSkuPrice,
      },
    } as Partial<Product>)
  } as ChangeHandler<Sku>
}

export default construct(listImpl, updateProductByIdImpl)

export type SyncProduct = ReturnType<typeof construct>
