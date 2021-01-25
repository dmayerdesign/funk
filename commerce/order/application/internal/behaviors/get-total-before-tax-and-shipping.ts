import { SkuDiscount } from "@funk/commerce/discount/domain/discount"
import getOrderDiscountPrice from "@funk/commerce/order/domain/behaviors/get-order-discount-price"
import getPriceBeforeDiscounts from "@funk/commerce/order/domain/behaviors/get-price-before-discounts"
import { Order } from "@funk/commerce/order/domain/order"
import subtract from "@funk/commerce/price/domain/behaviors/subtract"
import { NULL_PRICE, Price } from "@funk/commerce/price/domain/price"
import {
  MarshalledProduct,
  PRODUCTS,
} from "@funk/commerce/product/domain/product"
import getPriceAfterSkuDiscounts from "@funk/commerce/sku/domain/behaviors/get-price-after-discounts"
import { asPromise } from "@funk/helpers/as-promise"
import add from "@funk/money/domain/behaviors/add"
import getByIdImpl from "@funk/persistence/application/internal/behaviors/get-by-id"
import { DbDocumentInput } from "@funk/persistence/domain/database-document"
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
