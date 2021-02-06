import { SkuDiscount } from "@funk/commerce/discount/model/discount"
import getOrderDiscountPrice from "@funk/commerce/order/model/behaviors/get-order-discount-price"
import getPriceBeforeDiscounts from "@funk/commerce/order/model/behaviors/get-price-before-discounts"
import { Order } from "@funk/commerce/order/model/order"
import subtract from "@funk/commerce/price/model/behaviors/subtract"
import { NULL_PRICE, Price } from "@funk/commerce/price/model/price"
import {
  MarshalledProduct,
  PRODUCTS,
} from "@funk/commerce/product/model/product"
import getPriceAfterSkuDiscounts from "@funk/commerce/sku/model/behaviors/get-price-after-discounts"
import { asPromise } from "@funk/helpers/as-promise"
import add from "@funk/money/model/behaviors/add"
import getByIdImpl from "@funk/persistence/application/internal/behaviors/get-by-id"
import { DbDocumentInput } from "@funk/persistence/model/database-document"
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
                  sku.productId,
                ))!,
                activeDiscounts: activeDiscounts.filter(
                  ({ type }) => type === "sku",
                ) as SkuDiscount[],
              }),
            ),
          ),
        ),
      ).pipe(
        map((actualPrices) => actualPrices.reduce(add, NULL_PRICE)),
        map((priceAfterSkuDiscounts) =>
          subtract(
            priceAfterSkuDiscounts,
            subtract(
              getPriceBeforeDiscounts(order),
              getOrderDiscountPrice(order, getPriceBeforeDiscounts(order)),
            ),
          ),
        ),
        first(),
      ),
    )
  }
}

export default construct(getByIdImpl)

export type GetTotalBeforeTaxAndShipping = ReturnType<typeof construct>
