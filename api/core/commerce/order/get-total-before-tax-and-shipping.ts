import getByIdImpl from "@funk/api/plugins/persistence/behaviors/get-by-id"
import { asPromise } from "@funk/helpers/as-promise"
import { SkuDiscount } from "@funk/model/commerce/discount/discount"
import getOrderDiscountPrice from "@funk/model/commerce/order/behaviors/get-order-discount-price"
import getPriceBeforeDiscounts from "@funk/model/commerce/order/behaviors/get-price-before-discounts"
import { Order } from "@funk/model/commerce/order/order"
import subtract from "@funk/model/commerce/price/behaviors/subtract"
import { NULL_PRICE, Price } from "@funk/model/commerce/price/price"
import {
  MarshalledProduct,
  PRODUCTS
} from "@funk/model/commerce/product/product"
import getPriceAfterSkuDiscounts from "@funk/model/commerce/sku/behaviors/get-price-after-discounts"
import { DbDocumentInput } from "@funk/model/data-access/database-document"
import add from "@funk/model/money/behaviors/add"
import { of, zip } from "rxjs"
import { first, map, switchMap } from "rxjs/operators"

export function construct(getById: typeof getByIdImpl) {
  return async function (order: DbDocumentInput<Order>): Promise<Price> {
    const skus = order.skus
    const activeDiscounts = order.discounts ?? []

    if (!skus || !skus.length) {
      return Promise.resolve(NULL_PRICE)
    }
    return await asPromise(
      zip(
        ...skus.map((_sku) =>
          of(_sku).pipe(
            switchMap(async (sku) =>
              getPriceAfterSkuDiscounts({
                sku,
                product: (await getById<MarshalledProduct>(
                  PRODUCTS,
                  sku.productId
                ))!,
                activeDiscounts: activeDiscounts.filter(
                  ({ type }) => type === "sku"
                ) as SkuDiscount[],
              })
            )
          )
        )
      ).pipe(
        map((actualPrices) => actualPrices.reduce(add, NULL_PRICE)),
        map((priceAfterSkuDiscounts) =>
          subtract(
            priceAfterSkuDiscounts,
            subtract(
              getPriceBeforeDiscounts(order),
              getOrderDiscountPrice(order, getPriceBeforeDiscounts(order))
            )
          )
        ),
        first()
      )
    )
  }
}

export default construct(getByIdImpl)

export type GetTotalBeforeTaxAndShipping = ReturnType<typeof construct>
