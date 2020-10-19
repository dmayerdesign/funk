import { BadRequestError } from "@funk/api/functions/helpers/http/error/bad-request-error"

export default function <NonNullExprType>(
  nullableExpression: NonNullExprType | null | undefined | false | "",
  errorMessage: string
): NonNullExprType {
  return (
    nullableExpression ||
    (() => {
      throw new BadRequestError(errorMessage)
    })()
  )
}
