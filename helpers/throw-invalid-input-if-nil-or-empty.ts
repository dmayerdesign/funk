import { InvalidInputError } from "@funk/model/error/invalid-input-error"

/** @throws {InvalidInputError} */
export default function<NonNullExprType>(
  nullableExpression: NonNullExprType | null | undefined | "",
  errorMessage: string
): NonNullExprType
{
  const isNullish = nullableExpression == null
    || nullableExpression === ""
  return isNullish
    ? (() => { throw new InvalidInputError(errorMessage) })()
    : nullableExpression as NonNullExprType
}
