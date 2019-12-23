import { Price } from './price'

class InvalidPriceError extends Error
{
  constructor(
    public readonly reason: ValidationFailureReason,
    public readonly message: ValidationFailureReason = reason,
  )
  {
    super(message)
  }
}

export class CurrencyMismatchError extends Error
{
  constructor()
  {
    super('Operations on Prices with different currencies is not supported.')
  }
}

export const enum ValidationFailureReason
{
  INVALID_AMOUNT = 'INVALID_AMOUNT',
  INVALID_CURRENCY = 'INVALID_CURRENCY',
}

/** @throws InvalidPriceError */
export function validate(price: Price): void
{
  if (typeof price.currency === 'undefined')
  {
    throw new InvalidPriceError(ValidationFailureReason.INVALID_CURRENCY)
  }
  if (typeof price.amount === 'undefined')
  {
    throw new InvalidPriceError(ValidationFailureReason.INVALID_AMOUNT)
  }
}

/** @throws CurrencyMismatchError */
export function validateBeforeMath(price1: Price, price2: Price): void
{
  if (price1.currency !== price2.currency)
  {
    throw new CurrencyMismatchError()
  }
}
