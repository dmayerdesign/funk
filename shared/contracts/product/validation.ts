import { Product } from './product'

class InvalidProductError extends Error {
  constructor(
    public readonly reason: ValidationFailureReason,
    public readonly message: ValidationFailureReason = reason,
  ) {
    super(message)
  }
}

export const enum ValidationFailureReason {
  INVALID = 'INVALID',
  NOT_PURCHASABLE = 'NOT_PURCHASABLE',
}

/** @throws InvalidProductError */
export function validate(product: Product): void {
  const isNotValid = !product
    || product.stockQuantity < 0
  if (isNotValid) {
    throw new InvalidProductError(ValidationFailureReason.INVALID)
  }
}

/** @throws InvalidProductError */
export function validateForPurchase(product: Product): void {
  validate(product)

  if (product.stockQuantity === 0) {
    throw new InvalidProductError(ValidationFailureReason.NOT_PURCHASABLE)
  }
}

export function resolve(product: Product): Partial<Product> {
  const update = {} as Partial<Product>

  if (product.stockQuantity < 0) {
    update.stockQuantity = 0
  }

  return update
}
