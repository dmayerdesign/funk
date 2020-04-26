import { InvalidInputError } from '@funk/model/error/invalid-input-error'

export default function<NonNullExprType>(
  nullableExpression: NonNullExprType | null | undefined | false | '',
  errorMessage: string,
): NonNullExprType
{
  return nullableExpression
    || (() => { throw new InvalidInputError(errorMessage) })()
}
