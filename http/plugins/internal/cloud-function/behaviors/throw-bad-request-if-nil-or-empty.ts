import { BadRequestError } from "@funk/http/plugins/internal/cloud-function/behaviors/error/bad-request-error"

export default function <NonNullExprType>(
  nullableExpression: NonNullExprType | null | undefined | false | "",
  errorMessage: string,
): NonNullExprType {
  return (
    nullableExpression ||
    (() => {
      throw new BadRequestError(errorMessage)
    })()
  )
}
