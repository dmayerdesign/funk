import { ErrorWithStatusCode } from "@funk/functions/helpers/http/error/error-with-status-code"
import { ForbiddenError } from "@funk/model/error/forbidden-error"
import { InvalidInputError } from "@funk/model/error/invalid-input-error"
import { NotFoundError } from "@funk/model/error/not-found-error"
import { StatusCode } from "@funk/model/http/status-code"
import * as express from "express"

const handler: express.ErrorRequestHandler = (error, _request, response, next) =>
{
  if (response.headersSent)
  {
    return next(error)
  }
  response
    .status(getStatusCodeForError(error))
    .send({ error })
}
export default handler

function getStatusCodeForError(error?: Error | ErrorWithStatusCode): StatusCode
{
  const errorsToResponseCodes =
    new Map<Function, StatusCode>([
      [  InvalidInputError, StatusCode.BAD_REQUEST ],
      [  NotFoundError, StatusCode.NOT_FOUND ],
      [  ForbiddenError, StatusCode.FORBIDDEN ],
    ])

  for (const [ ErrorType, responseCode ] of errorsToResponseCodes.entries())
  {
    if (error instanceof ErrorType)
    {
      return responseCode
    }
  }

  return (error as ErrorWithStatusCode)?.statusCode ?? StatusCode.INTERNAL_SERVER_ERROR
}
