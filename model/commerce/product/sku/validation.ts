import isInStock from './actions/get-is-in-stock'
import { Sku } from './sku'

class InvalidSkuError extends Error
{
  constructor(
    public readonly reason: ValidationFailureReason,
    public readonly message: ValidationFailureReason = reason,
  )
  {
    super(message)
  }
}

export const enum ValidationFailureReason
{
  INVALID = 'INVALID',
  NOT_PURCHASABLE = 'NOT_PURCHASABLE',
}

/** @throws InvalidSkuError */
export function validate(sku: Sku): void
{
  const isNotValid = !sku
    || !sku.inventory
    || isInStock(sku) === undefined
  if (isNotValid)
  {
    throw new InvalidSkuError(ValidationFailureReason.INVALID)
  }
}

/** @throws InvalidSkuError */
export function isPurchasable(sku: Sku): void
{
  validate(sku)

  if (!isInStock(sku))
  {
    throw new InvalidSkuError(ValidationFailureReason.NOT_PURCHASABLE)
  }
}
