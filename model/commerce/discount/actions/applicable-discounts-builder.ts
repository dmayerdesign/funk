import { SkuDiscount } from '@funk/model/commerce/discount/discount'

export default class {
  protected _applicableDiscounts: SkuDiscount[] = []

  constructor(
    discounts: SkuDiscount[],
  )
  {
    this._setInitialDiscounts(discounts)
  }

  private _setInitialDiscounts(discounts: SkuDiscount[]): void
  {
    this._applicableDiscounts = [ ...discounts ]
  }

  public build(): SkuDiscount[]
  {
    return this._applicableDiscounts
  }
}
