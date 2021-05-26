import { ForbiddenError } from "@funk/error/model/forbidden-error"
import { InvalidInputError } from "@funk/error/model/invalid-input-error"
import { NotFoundError } from "@funk/error/model/not-found-error"
import { Type } from "@funk/helpers/type"
import { StatusCode } from "@funk/http/model/status-code"
import { ErrorWithStatusCode } from "@funk/http/plugins/internal/cloud-function/behaviors/error/error-with-status-code"
import * as express from "express"

const handler: express.ErrorRequestHandler = (
  error,
  _request,
  response,
  next,
) => {
  if (response.headersSent) {
    return next(error)
  }
  console.error("[funk] Handled error:", error)
  response.status(getStatusCodeForError(error)).send({ error })
}
export default handler

function getStatusCodeForError(
  error?: Error | ErrorWithStatusCode,
): StatusCode {
  const errorsToResponseCodes = new Map<Type<any>, StatusCode>([
    [InvalidInputError, StatusCode.BAD_REQUEST],
    [NotFoundError, StatusCode.NOT_FOUND],
    [ForbiddenError, StatusCode.FORBIDDEN],
  ])

  for (const [ErrorType, responseCode] of errorsToResponseCodes.entries()) {
    if (error instanceof ErrorType) {
      return responseCode
    }
  }

  return (
    (error as ErrorWithStatusCode)?.statusCode ??
    StatusCode.INTERNAL_SERVER_ERROR
  )
}
