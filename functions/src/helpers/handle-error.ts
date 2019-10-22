import { StatusCode } from '@funk/shared/contracts/http/status-code'
import * as express from 'express'

const handler: express.ErrorRequestHandler = (error, _request, response, next) => {
  if (response.headersSent) {
    return next(error)
  }
  response.status(StatusCode.INTERNAL_SERVER_ERROR)
  response.send({ error })
}
export default handler
