import { ErrorWithStatusCode } from "@funk/functions/helpers/http/error/error-with-status-code"
import { ForbiddenError } from "@funk/model/error/forbidden-error"
import { InvalidInputError } from "@funk/model/error/invalid-input-error"
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
  console.log("handling...")
  const errorsToResponseCodes = new Map<Function, StatusCode>([
    [ InvalidInputError,            /* ==> */ StatusCode.BAD_REQUEST ],
    [ ForbiddenError,               /* ==> */ StatusCode.FORBIDDEN ],
  ])

  for (const [ errorType, responseCode ] of errorsToResponseCodes.entries())
  {
    if (error instanceof errorType)
    {
      console.log("mapping...")
      return responseCode
    }
  }

  console.log("falling back...")
  return (error as ErrorWithStatusCode)?.statusCode ?? StatusCode.INTERNAL_SERVER_ERROR
}
