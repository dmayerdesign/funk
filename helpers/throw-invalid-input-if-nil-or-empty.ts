import { InvalidInputError } from "@funk/model/error/invalid-input-error"

/** @throws {InvalidInputError} */
export default function <NonNullExprType>(
  nullableExpression: NonNullExprType | null | undefined | "",
  errorMessage: string,
): NonNullExprType {
  const isNilOrEmpty = nullableExpression == null || nullableExpression === ""
  return isNilOrEmpty
    ? (() => {
        throw new InvalidInputError(errorMessage)
      })()
    : (nullableExpression as NonNullExprType)
}
