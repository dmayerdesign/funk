import ApplicableDiscountsBuilder from "@funk/model/commerce/discount/applicable-discounts-builder"
import { Discount, OrderDiscount } from "@funk/model/commerce/discount/discount"
import subtract from "@funk/model/commerce/price/behaviors/subtract"
import { Price } from "@funk/model/commerce/price/price"
import { sortBy } from "lodash"

/**
 * Only one discount may be applied, unless one or more are `compoundable`.
 * Compoundable discounts will always override non-compoundable discounts.
 * Percentage discounts are always applied before amount discounts.
 * All else being equal, more-recently-started discount(s) will be favored.
 */
export default function(
  discounts: OrderDiscount[],
  orderPrice: Price
): OrderDiscount[]
{
  return new ApplicableDiscountsForOrderBuilder(discounts, orderPrice)
    .onlyAllowOrderDiscounts()
    .removeDiscountsForWhichOrderAmountIsOutOfRange()
    .sortPercentageDiscountsFirst()
    .sortMostRecentlyStartedFirst()
    .onlyAllowOneUnlessCompoundable()
    .build()
}

class ApplicableDiscountsForOrderBuilder extends ApplicableDiscountsBuilder<OrderDiscount>
{

  public constructor(
    discounts: OrderDiscount[],
    private _orderPrice: Price
  )
  {
    super(discounts)
  }

  public onlyAllowOrderDiscounts(): this
  {
    this._applicableDiscounts = this._applicableDiscounts.filter((discount) =>
      (discount as Discount).type === "order")
    return this
  }

  public removeDiscountsForWhichOrderAmountIsOutOfRange(): this
  {
    this._applicableDiscounts = this._applicableDiscounts.filter((discount: OrderDiscount) =>
      !this._orderPriceDoesNotFallWithinDiscountLimits(discount, this._orderPrice))
    return this
  }

  public sortPercentageDiscountsFirst(): this
  {
    this._applicableDiscounts = sortBy(
      this._applicableDiscounts,
      (element) => typeof element.percentage === "number"
        ? -element.percentage
        : 1)
    return this
  }

  public sortMostRecentlyStartedFirst(): this
  {
    this._applicableDiscounts = sortBy(
      this._applicableDiscounts,
      ({ startAt }) => Math.ceil(1 / startAt))
    return this
  }

  public onlyAllowOneUnlessCompoundable(): this
  {
    // Only allow a single discount to be applied.
    this._applicableDiscounts = (() =>
    {
      const discounts = this._applicableDiscounts
      if (discounts.length > 1)
      {
        if (discounts.some(({ isCompoundable }) => isCompoundable))
        {
          return discounts.filter(
            ({ isCompoundable }) => isCompoundable
          )
        }
      }
      return discounts.slice(0, 1)
    })()
    return this
  }

  private _orderPriceDoesNotFallWithinDiscountLimits(
    discount: OrderDiscount,
    orderPrice: Price
  ): boolean
  {
    return orderPriceIsBelowDiscountLowerLimit()
      || orderPriceIsGteDiscountUpperLimit()

    function orderPriceIsBelowDiscountLowerLimit(): boolean
    {
      return !!discount.orderTotalLowerLimit
        && subtract(orderPrice, discount.orderTotalLowerLimit).amount < 0
    }

    function orderPriceIsGteDiscountUpperLimit(): boolean
    {
      return !!discount.orderTotalUpperLimit
        && subtract(orderPrice, discount.orderTotalUpperLimit).amount >= 0
    }
  }
}
