import { StatusCode } from '@funk/shared/contracts/http/status-code'
import { Request, RequestHandler, Response } from 'express'

export type RequestHandler = (request: Request, response: Response) => any

export default function(handler: (request: Request, response: Response) => any):
  RequestHandler {

  return function(request, response, next): void {
    try {
      const handlerResult = handler(request, response)

      if (!response.headersSent) {
        if (handlerResult) {
          if (typeof handlerResult.then === 'function') {
            (handlerResult as Promise<any>)
              .then((value) => response.send(value))
              .catch(next)
          }
          else {
            response.send(handlerResult)
          }
        }
        else {
          response.sendStatus(StatusCode.OK)
        }
      }
    }
    catch (error) {
      next(error)
    }
  }
}
