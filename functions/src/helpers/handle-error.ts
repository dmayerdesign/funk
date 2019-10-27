import { StatusCode } from '@funk/model/http/status-code'
import * as express from 'express'

const handler: express.ErrorRequestHandler = (error, _request, response, next) => {
  if (response.headersSent) {
    return next(error)
  }
  response
    .status(StatusCode.INTERNAL_SERVER_ERROR)
    .send({ error })
}
export default handler
