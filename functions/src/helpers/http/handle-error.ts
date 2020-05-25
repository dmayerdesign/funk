import { ErrorWithStatusCode } from "@funk/functions/helpers/http/error/error-with-status-code"
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
  if (error instanceof InvalidInputError) return StatusCode.BAD_REQUEST

  return (error as ErrorWithStatusCode)?.statusCode ?? StatusCode.INTERNAL_SERVER_ERROR
}
