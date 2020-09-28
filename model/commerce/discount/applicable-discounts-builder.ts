export default class<DiscountType>
{
  protected _applicableDiscounts: DiscountType[] = []

  public constructor(
    discounts: DiscountType[]
  )
  {
    this._setInitialDiscounts(discounts)
  }

  private _setInitialDiscounts(discounts: DiscountType[]): void
  {
    this._applicableDiscounts = [ ...discounts ]
  }

  public build(): DiscountType[]
  {
    return this._applicableDiscounts
  }
}
