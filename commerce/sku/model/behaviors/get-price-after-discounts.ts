import getApplicableDiscountsForSkuImpl from "@funk/commerce/discount/model/behaviors/get-applicable-discounts-for-sku"
import { SkuDiscount } from "@funk/commerce/discount/model/discount"
import subtract from "@funk/commerce/price/model/behaviors/subtract"
import { Price } from "@funk/commerce/price/model/price"
import { Product } from "@funk/commerce/product/model/product"
import { Sku } from "@funk/commerce/sku/model/sku"

/**
 * Computes a `Sku`'s actual price given all active discounts. Will only apply discounts
 * of type 'sku', as this is a `Sku`-level, not an `Order`-level, operation.
 *
 * @param activeDiscounts All discounts with a `startAt` less than, and an `endAt` greater
 * than, today's date, or any subset thereof. That filtering must be done before invoking
 * this function; it will not check `startAt` and `endAt` values.
 */
export function construct(
  getApplicableDiscountsForSku: typeof getApplicableDiscountsForSkuImpl,
) {
  return function (options: {
    sku: Sku
    product: Product
    activeDiscounts?: SkuDiscount[]
  }): Price {
    const { sku, product, activeDiscounts = [] } = options
    const applicableDiscounts = getApplicableDiscountsForSku(activeDiscounts, {
      sku,
      product,
    })
    return getSkuPriceAfterDiscounts(sku, applicableDiscounts)
  }
}

function getSkuPriceAfterDiscounts(sku: Sku, discounts: SkuDiscount[]): Price {
  return discounts.reduce<Price>((calculatedPrice, discount) => {
    if (!!discount.total) {
      return subtract(calculatedPrice, discount.total)
    } else if (!!discount.percentage) {
      return subtract(calculatedPrice, {
        ...calculatedPrice,
        amount: calculatedPrice.amount * (discount.percentage / 100),
      })
    }
    return calculatedPrice
  }, sku.price)
}

export default construct(getApplicableDiscountsForSkuImpl)
